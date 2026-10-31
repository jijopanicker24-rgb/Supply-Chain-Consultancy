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
  name: requiredText("Please enter your name.", 100),
  email,
  company: optionalText(150),
  message: requiredText("Please tell us a little about what you need.", 5000),
});

export async function POST(request: Request) {
  const body = await readJson(request);
  if (!body) return badRequest();

  // Bots fill in the hidden field; pretend it worked so they don't retry.
  if (body[HONEYPOT_FIELD]) return ok();
  if (isRateLimited(request, "contact")) return tooManyRequests();

  const parsed = schema.safeParse(body);
  if (!parsed.success) return badRequest(z.flattenError(parsed.error).fieldErrors);
  const d = parsed.data;

  try {
    await sql`
      INSERT INTO contact_messages (full_name, email, company, message)
      VALUES (${d.name}, ${d.email}, ${d.company}, ${d.message})`;
    return ok();
  } catch (error) {
    return serverError(error);
  }
}
