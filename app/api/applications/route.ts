import { sql } from "@/lib/db";
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

const schema = z.object({
  job: requiredText("Please choose a position.", 150),
  fullName: requiredText("Please enter your full name.", 100),
  email,
  phone: optionalText(30).refine((v) => !v || /^\+?[\d\s()-]{7,20}$/.test(v), "Please enter a valid phone number, e.g. +971 50 123 4567."),
  linkedinUrl: optionalText(300).refine(
    (v) => !v || /^https?:\/\/([a-z]{2,3}\.)?linkedin\.com\/.+/i.test(v),
    "Please enter your LinkedIn profile link, e.g. https://www.linkedin.com/in/your-name.",
  ),
  coverLetter: requiredText("Please tell us briefly why you're a good fit.", 5000),
});

export async function POST(request: Request) {
  const body = await readJson(request);
  if (!body) return badRequest();

  // Bots fill in the hidden field; pretend it worked so they don't retry.
  if (body[HONEYPOT_FIELD]) return ok();
  if (isRateLimited(request, "application")) return tooManyRequests();

  const parsed = schema.safeParse(body);
  if (!parsed.success) return badRequest(z.flattenError(parsed.error).fieldErrors);
  const d = parsed.data;

  try {
    const [job] = await sql<{ id: number }>`SELECT id FROM job_openings WHERE slug = ${d.job} AND is_open`;
    if (!job) return badRequest({ job: ["Sorry, this position is no longer open."] });

    await sql`
      INSERT INTO job_applications (job_opening_id, full_name, email, phone, linkedin_url, cover_letter)
      VALUES (${job.id}, ${d.fullName}, ${d.email}, ${d.phone}, ${d.linkedinUrl}, ${d.coverLetter})`;
    return ok();
  } catch (error) {
    return serverError(error);
  }
}
