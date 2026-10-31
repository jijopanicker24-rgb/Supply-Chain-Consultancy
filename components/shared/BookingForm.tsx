"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import { bookingSection, NO_CHOICE } from "@/lib/content";
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

export type Option = { value: string; label: string };

type Field =
  | { name: string; label: string; kind: "input"; type: "text" | "email" | "tel" | "date"; autoComplete?: string; maxLength?: number; required: boolean }
  | { name: string; label: string; kind: "select"; options: readonly Option[]; placeholder: string; required: boolean };

const MESSAGE_MAX = 2000;

const toOptions = (labels: readonly string[]): Option[] => labels.map((l) => ({ value: l, label: l }));

const requiredMessages: Record<string, string> = {
  fullName: "Please enter your full name.",
  email: "Please enter your email address.",
  phone: "Please enter a phone number we can reach you on.",
  company: "Please enter your company name.",
  industry: "Please choose your industry.",
  service: "Please choose the service you're interested in.",
  preferredDate: "Please pick a preferred date.",
  preferredTime: "Please pick a preferred time.",
};

// Today's date as YYYY-MM-DD in the visitor's local time.
function todayISO() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function validate(data: FormData, fields: Field[]): Errors {
  const value = (key: string) => String(data.get(key) ?? "").trim();
  const errors: Errors = {};

  for (const f of fields) {
    if (f.required && !value(f.name)) errors[f.name] = requiredMessages[f.name];
  }

  if (!errors.email && !isEmail(value("email"))) errors.email = "That email doesn't look right. Please check it.";

  if (!errors.phone && !/^\+?[\d\s()-]{7,20}$/.test(value("phone"))) {
    errors.phone = "Please enter a valid phone number, e.g. +971 50 123 4567.";
  }

  const date = value("preferredDate");
  if (!errors.preferredDate) {
    const [y, m, d] = date.split("-").map(Number);
    const day = new Date(y, m - 1, d).getDay();
    if (date < todayISO()) errors.preferredDate = "Please choose today or a future date.";
    else if (day === 5 || day === 6) errors.preferredDate = "We meet Sunday to Thursday. Please choose a weekday.";
  }

  if (value("message").length > MESSAGE_MAX) errors.message = `Please keep your message under ${MESSAGE_MAX} characters.`;

  return errors;
}

export default function BookingForm({ industries, services }: { industries: Option[]; services: Option[] }) {
  const [toast, setToast] = useState<ToastState>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  // Set after mount so server and client render the same markup.
  const [minDate, setMinDate] = useState<string>();
  const closeToast = useCallback(() => setToast(null), []);

  useEffect(() => setMinDate(todayISO()), []);

  const fields: Field[] = [
    { name: "fullName", label: "Full name", kind: "input", type: "text", autoComplete: "name", maxLength: 100, required: true },
    { name: "email", label: "Work email", kind: "input", type: "email", autoComplete: "email", maxLength: 254, required: true },
    { name: "phone", label: "Phone", kind: "input", type: "tel", autoComplete: "tel", maxLength: 30, required: true },
    { name: "company", label: "Company", kind: "input", type: "text", autoComplete: "organization", maxLength: 150, required: true },
    {
      name: "industry",
      label: "Industry",
      kind: "select",
      options: [...industries, { value: NO_CHOICE, label: bookingSection.otherIndustryLabel }],
      placeholder: "Select your industry",
      required: true,
    },
    {
      name: "service",
      label: "Service of interest",
      kind: "select",
      options: [...services, { value: NO_CHOICE, label: bookingSection.otherServiceLabel }],
      placeholder: "Select a service",
      required: true,
    },
    { name: "companySize", label: "Company size", kind: "select", options: toOptions(bookingSection.companySizes), placeholder: "Select company size", required: false },
    { name: "preferredDate", label: "Preferred date", kind: "input", type: "date", required: true },
    { name: "preferredTime", label: "Preferred time", kind: "select", options: toOptions(bookingSection.times), placeholder: "Select a time", required: true },
  ];

  function showErrors(form: HTMLFormElement, found: Errors) {
    setErrors(found);
    const firstInvalid = Object.keys(found)[0];
    if (firstInvalid) form.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
    return !!firstInvalid;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (showErrors(form, validate(new FormData(form), fields))) return;

    setSending(true);
    const result = await submitForm("/api/bookings", form);
    setSending(false);

    if (result.ok) {
      form.reset();
      setToast({ tone: "success", message: bookingSection.successMessage });
    } else {
      showErrors(form, result.fieldErrors);
      setToast({ tone: "error", message: result.error });
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
        onSubmit={handleSubmit}
        noValidate
        className="relative space-y-5 rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-200 sm:p-8 dark:bg-navy-900 dark:ring-navy-800"
      >
        <Honeypot />
        <div className="grid gap-5 sm:grid-cols-2">
          {fields.map((f) => (
            <div key={f.name}>
              <label htmlFor={f.name} className={labelClass}>
                {f.label}
                {!f.required && <OptionalTag />}
              </label>
              {f.kind === "select" ? (
                <select id={f.name} name={f.name} required={f.required} defaultValue="" {...a11y(f.name)}>
                  <option value="" disabled>
                    {f.placeholder}
                  </option>
                  {f.options.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  id={f.name}
                  name={f.name}
                  type={f.type}
                  autoComplete={f.autoComplete}
                  maxLength={f.maxLength}
                  min={f.type === "date" ? minDate : undefined}
                  required={f.required}
                  {...a11y(f.name)}
                />
              )}
              <FieldError id={`${f.name}-error`} message={errors[f.name]} />
            </div>
          ))}
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400">{bookingSection.timeZoneNote}</p>
        <div>
          <label htmlFor="message" className={labelClass}>
            What would you like to discuss?
            <OptionalTag />
          </label>
          <textarea id="message" name="message" rows={4} maxLength={MESSAGE_MAX} {...a11y("message")} />
          <FieldError id="message-error" message={errors.message} />
        </div>
        <button type="submit" disabled={sending} className={submitClass}>
          {sending ? "Sending…" : bookingSection.submitLabel}
        </button>
      </form>

      {toast && <Toast {...toast} onClose={closeToast} />}
    </>
  );
}
