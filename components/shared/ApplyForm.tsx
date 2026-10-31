"use client";

import { useCallback, useState, type FormEvent } from "react";
import {
  errorInputClass,
  FieldError,
  Honeypot,
  inputClass,
  isEmail,
  labelClass,
  OptionalTag,
  submitClass,
  submitForm,
  Toast,
  type Errors,
  type ToastState,
} from "./form";

const fields = [
  { name: "fullName", label: "Full name", type: "text", autoComplete: "name", maxLength: 100, required: true },
  { name: "email", label: "Email", type: "email", autoComplete: "email", maxLength: 254, required: true },
  { name: "phone", label: "Phone", type: "tel", autoComplete: "tel", maxLength: 30, required: false },
  { name: "linkedinUrl", label: "LinkedIn profile", type: "url", autoComplete: "url", maxLength: 300, required: false },
] as const;

const COVER_MAX = 5000;
const SUCCESS = "Thanks for applying! Our team reviews every application and will be in touch within two weeks.";

function validate(data: FormData): Errors {
  const value = (key: string) => String(data.get(key) ?? "").trim();
  const errors: Errors = {};
  if (!value("fullName")) errors.fullName = "Please enter your full name.";
  if (!value("email")) errors.email = "Please enter your email address.";
  else if (!isEmail(value("email"))) errors.email = "That email doesn't look right. Please check it.";
  if (value("phone") && !/^\+?[\d\s()-]{7,20}$/.test(value("phone"))) {
    errors.phone = "Please enter a valid phone number, e.g. +971 50 123 4567.";
  }
  if (value("linkedinUrl") && !/^https?:\/\/([a-z]{2,3}\.)?linkedin\.com\/.+/i.test(value("linkedinUrl"))) {
    errors.linkedinUrl = "Please enter your LinkedIn profile link, e.g. https://www.linkedin.com/in/your-name.";
  }
  if (!value("coverLetter")) errors.coverLetter = "Please tell us briefly why you're a good fit.";
  return errors;
}

export default function ApplyForm({ jobSlug, jobTitle }: { jobSlug: string; jobTitle: string }) {
  const [toast, setToast] = useState<ToastState>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const closeToast = useCallback(() => setToast(null), []);

  function showErrors(form: HTMLFormElement, found: Errors) {
    setErrors(found);
    const firstInvalid = Object.keys(found)[0];
    if (firstInvalid) form.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
    return !!firstInvalid;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (showErrors(form, validate(new FormData(form)))) return;

    setSending(true);
    const result = await submitForm("/api/applications", form);
    setSending(false);

    if (result.ok) {
      form.reset();
      setToast({ tone: "success", message: SUCCESS });
    } else {
      showErrors(form, result.fieldErrors);
      setToast({ tone: "error", message: result.fieldErrors.job ?? result.error });
    }
  }

  function clearError(name: string) {
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  const a11y = (name: string) => ({
    "aria-invalid": !!errors[name],
    "aria-describedby": errors[name] ? `${name}-error` : undefined,
    onChange: () => clearError(name),
    className: `${inputClass} ${errors[name] ? errorInputClass : ""}`,
  });

  return (
    <>
      <form
        id="apply"
        onSubmit={handleSubmit}
        noValidate
        aria-label={`Apply for ${jobTitle}`}
        className="relative scroll-mt-28 space-y-5 rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-200 sm:p-8 dark:bg-navy-900 dark:ring-navy-800"
      >
        <Honeypot />
        <input type="hidden" name="job" value={jobSlug} />
        <h2 className="text-2xl font-extrabold">Apply for this role</h2>
        <div className="grid gap-5 sm:grid-cols-2">
          {fields.map((f) => (
            <div key={f.name}>
              <label htmlFor={f.name} className={labelClass}>
                {f.label}
                {!f.required && <OptionalTag />}
              </label>
              <input
                id={f.name}
                name={f.name}
                type={f.type}
                autoComplete={f.autoComplete}
                maxLength={f.maxLength}
                required={f.required}
                placeholder={f.name === "linkedinUrl" ? "https://www.linkedin.com/in/…" : undefined}
                {...a11y(f.name)}
              />
              <FieldError id={`${f.name}-error`} message={errors[f.name]} />
            </div>
          ))}
        </div>
        <div>
          <label htmlFor="coverLetter" className={labelClass}>
            Why are you a good fit?
          </label>
          <textarea id="coverLetter" name="coverLetter" rows={6} maxLength={COVER_MAX} required {...a11y("coverLetter")} />
          <FieldError id="coverLetter-error" message={errors.coverLetter} />
        </div>
        <button type="submit" disabled={sending} className={submitClass}>
          {sending ? "Sending…" : "Submit Application"}
        </button>
      </form>

      {toast && <Toast {...toast} onClose={closeToast} />}
    </>
  );
}
