"use client";

import { useCallback, useState, type FormEvent } from "react";
import { contactSection } from "@/lib/content";
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
  { name: "name", label: "Name", type: "text", autoComplete: "name", maxLength: 100, required: true },
  { name: "email", label: "Email", type: "email", autoComplete: "email", maxLength: 254, required: true },
  { name: "company", label: "Company", type: "text", autoComplete: "organization", maxLength: 150, required: false },
] as const;

const MESSAGE_MAX = 5000;

function validate(data: FormData): Errors {
  const value = (key: string) => String(data.get(key) ?? "").trim();
  const errors: Errors = {};
  if (!value("name")) errors.name = "Please enter your name.";
  if (!value("email")) errors.email = "Please enter your email address.";
  else if (!isEmail(value("email"))) errors.email = "That email doesn't look right. Please check it.";
  if (!value("message")) errors.message = "Please tell us a little about what you need.";
  return errors;
}

export default function ContactForm() {
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
    const result = await submitForm("/api/contact", form);
    setSending(false);

    if (result.ok) {
      form.reset();
      setToast({ tone: "success", message: contactSection.successMessage });
    } else {
      showErrors(form, result.fieldErrors);
      setToast({ tone: "error", message: result.error });
    }
  }

  function clearError(name: string) {
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        noValidate
        className="relative space-y-5 rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-200 sm:p-8 dark:bg-navy-900 dark:ring-navy-800"
      >
        <Honeypot />
        <div className="grid gap-5 sm:grid-cols-2">
          {fields.map((f) => (
            <div key={f.name} className={f.name === "company" ? "sm:col-span-2" : ""}>
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
                aria-invalid={!!errors[f.name]}
                aria-describedby={errors[f.name] ? `${f.name}-error` : undefined}
                onChange={() => clearError(f.name)}
                className={`${inputClass} ${errors[f.name] ? errorInputClass : ""}`}
              />
              <FieldError id={`${f.name}-error`} message={errors[f.name]} />
            </div>
          ))}
        </div>
        <div>
          <label htmlFor="message" className={labelClass}>
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            maxLength={MESSAGE_MAX}
            required
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "message-error" : undefined}
            onChange={() => clearError("message")}
            className={`${inputClass} ${errors.message ? errorInputClass : ""}`}
          />
          <FieldError id="message-error" message={errors.message} />
        </div>
        <button type="submit" disabled={sending} className={submitClass}>
          {sending ? "Sending…" : contactSection.submitLabel}
        </button>
      </form>

      {toast && <Toast {...toast} onClose={closeToast} />}
    </>
  );
}
