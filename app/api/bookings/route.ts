import { sql } from "@/lib/db";
import { bookingSection, NO_CHOICE } from "@/lib/content";
import {
  badRequest,
  email,
  HONEYPOT_FIELD,
  isRateLimited,
  ok,
  optionalText,
  readJson,
  requiredText,
  serverError,
  tooManyRequests,
  z,
} from "@/lib/forms";

// Today's date (YYYY-MM-DD) in Dubai, where consultations take place.
const todayInDubai = () => new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Dubai" }).format(new Date());

const schema = z.object({
  fullName: requiredText("Please enter your full name.", 100),
  email,
  phone: requiredText("Please enter a phone number we can reach you on.", 30).regex(
    /^\+?[\d\s()-]{7,20}$/,
    "Please enter a valid phone number, e.g. +971 50 123 4567.",
  ),
  company: requiredText("Please enter your company name.", 150),
  industry: requiredText("Please choose your industry.", 100),
  service: requiredText("Please choose the service you're interested in.", 100),
  // Optional: an empty selection arrives as "".
  companySize: z.preprocess(
    (v) => (v === "" ? undefined : v),
    z.enum(bookingSection.companySizes as [string, ...string[]], "Please choose a company size from the list.").optional(),
  ),
  preferredDate: requiredText("Please pick a preferred date.", 10)
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Please pick a valid date.")
    .refine((d) => d >= todayInDubai(), "Please choose today or a future date.")
    .refine((d) => ![5, 6].includes(new Date(`${d}T00:00:00Z`).getUTCDay()), "We meet Sunday to Thursday. Please choose a weekday."),
  preferredTime: z.enum(bookingSection.times as [string, ...string[]], "Please pick a preferred time."),
  message: optionalText(2000),
});

/** Looks up an id by slug; NO_CHOICE maps to null, an unknown slug to undefined. */
async function idForSlug(table: "industries" | "services", slug: string): Promise<number | null | undefined> {
  if (slug === NO_CHOICE) return null;
  const rows =
    table === "industries"
      ? await sql<{ id: number }>`SELECT id FROM industries WHERE slug = ${slug}`
      : await sql<{ id: number }>`SELECT id FROM services WHERE slug = ${slug} AND is_active`;
  return rows[0]?.id;
}

export async function POST(request: Request) {
  const body = await readJson(request);
  if (!body) return badRequest();

  // Bots fill in the hidden field; pretend it worked so they don't retry.
  if (body[HONEYPOT_FIELD]) return ok();
  if (isRateLimited(request, "booking")) return tooManyRequests();

  const parsed = schema.safeParse(body);
  if (!parsed.success) return badRequest(z.flattenError(parsed.error).fieldErrors);
  const d = parsed.data;

  try {
    const [industryId, serviceId] = await Promise.all([idForSlug("industries", d.industry), idForSlug("services", d.service)]);
    if (industryId === undefined || serviceId === undefined) {
      return badRequest({
        ...(industryId === undefined && { industry: ["Please choose your industry from the list."] }),
        ...(serviceId === undefined && { service: ["Please choose a service from the list."] }),
      });
    }

    await sql`
      INSERT INTO consultation_bookings
        (full_name, email, phone, company, industry_id, service_id, company_size, preferred_date, preferred_time, message)
      VALUES
        (${d.fullName}, ${d.email}, ${d.phone}, ${d.company}, ${industryId}, ${serviceId},
         ${d.companySize ?? null}, ${d.preferredDate}, ${d.preferredTime}, ${d.message})`;
    return ok();
  } catch (error) {
    return serverError(error);
  }
}
