"use client";

import { useEffect } from "react";
import { AlertCircle, CheckCircle2, X } from "lucide-react";

// Shared styling and pieces for the site's forms (contact, booking).

export const inputClass =
  "w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-navy-900 outline-none dark:border-navy-700 dark:bg-navy-950 dark:text-white transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30";
export const errorInputClass = "border-red-500 dark:border-red-400";
export const labelClass = "mb-1.5 block text-sm font-medium text-navy-900 dark:text-slate-200";
export const submitClass =
  "w-full rounded-full bg-emerald-500 px-7 py-3.5 font-semibold text-white transition-colors hover:bg-emerald-600 disabled:cursor-wait disabled:opacity-70";

export const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);

export type Errors = Partial<Record<string, string>>;
export type SubmitResult = { ok: true } | { ok: false; error: string; fieldErrors: Errors };

const HONEYPOT_FIELD = "website";

/** Sends the form as JSON to an API route and normalises the reply. */
export async function submitForm(url: string, form: HTMLFormElement): Promise<SubmitResult> {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(new FormData(form))),
    });
    if (res.ok) return { ok: true };
    const data = await res.json().catch(() => ({}));
    const fieldErrors: Errors = {};
    for (const [key, messages] of Object.entries((data.fieldErrors ?? {}) as Record<string, string[]>)) {
      fieldErrors[key] = messages?.[0];
    }
    return { ok: false, error: data.error ?? "Something went wrong. Please try again.", fieldErrors };
  } catch {
    return { ok: false, error: "We couldn't reach the server. Please check your connection and try again.", fieldErrors: {} };
  }
}

/** Hidden field that people never see but spam bots fill in. */
export function Honeypot() {
  return (
    <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label htmlFor={HONEYPOT_FIELD}>Leave this field empty</label>
      <input id={HONEYPOT_FIELD} name={HONEYPOT_FIELD} type="text" tabIndex={-1} autoComplete="off" />
    </div>
  );
}

export function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 text-sm text-red-600 dark:text-red-400">
      {message}
    </p>
  );
}

export function OptionalTag() {
  return <span className="font-normal text-slate-500 dark:text-slate-400"> (optional)</span>;
}

export type ToastState = { tone: "success" | "error"; message: string } | null;

export function Toast({ tone, message, onClose }: { tone: "success" | "error"; message: string; onClose: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onClose, tone === "error" ? 8000 : 5000);
    return () => clearTimeout(timer);
  }, [onClose, tone]);

  const Icon = tone === "error" ? AlertCircle : CheckCircle2;
  return (
    <div
      role={tone === "error" ? "alert" : "status"}
      className={`fixed bottom-6 left-1/2 z-50 flex w-[calc(100%-2rem)] max-w-md -translate-x-1/2 items-start gap-3 rounded-xl p-4 text-white shadow-2xl ${
        tone === "error" ? "bg-red-700" : "bg-navy-900 dark:ring-1 dark:ring-emerald-500/40"
      }`}
    >
      <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${tone === "error" ? "text-white" : "text-emerald-400"}`} aria-hidden />
      <p className="flex-1 text-sm">{message}</p>
      <button type="button" onClick={onClose} aria-label="Dismiss">
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
