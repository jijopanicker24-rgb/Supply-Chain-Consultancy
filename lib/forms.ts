import "server-only";

import { NextResponse } from "next/server";
import { z } from "zod";

// Shared helpers for the public form API routes: validation, spam protection and responses.

export const HONEYPOT_FIELD = "website";

export const requiredText = (message: string, max: number) =>
  z
    .string({ error: message })
    .trim()
    .min(1, message)
    .max(max, `Please keep this under ${max} characters.`);

export const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max, `Please keep this under ${max} characters.`)
    .optional()
    .transform((v) => v || null);

export const email = z
  .string({ error: "Please enter your email address." })
  .trim()
  .min(1, "Please enter your email address.")
  .max(254, "That email address is too long.")
  .pipe(z.email("That email doesn't look right. Please check it."));

// Simple in-memory rate limit: at most LIMIT submissions per IP per form within WINDOW_MS.
// Resets when the server restarts, which is fine for spam protection on a small site.
const LIMIT = 5;
const WINDOW_MS = 10 * 60 * 1000;
const hits = new Map<string, number[]>();

export function isRateLimited(request: Request, form: string) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || request.headers.get("x-real-ip") || "local";
  const key = `${form}:${ip}`;
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= LIMIT) return true;
  recent.push(now);
  hits.set(key, recent);
  return false;
}

/** Reads the JSON body; returns null for anything that isn't a JSON object. */
export async function readJson(request: Request): Promise<Record<string, unknown> | null> {
  try {
    const body = await request.json();
    return body && typeof body === "object" && !Array.isArray(body) ? body : null;
  } catch {
    return null;
  }
}

export const ok = () => NextResponse.json({ ok: true }, { status: 201 });

export const badRequest = (fieldErrors: Record<string, string[] | undefined> = {}) =>
  NextResponse.json({ error: "Please check the highlighted fields.", fieldErrors }, { status: 400 });

export const tooManyRequests = () =>
  NextResponse.json(
    { error: "You've sent several requests in a short time. Please wait a few minutes and try again." },
    { status: 429 },
  );

export function serverError(error: unknown) {
  console.error("[forms] database error:", error);
  return NextResponse.json(
    { error: "Sorry, we couldn't save your request right now. Please try again shortly or call us directly." },
    { status: 503 },
  );
}

export { z };
