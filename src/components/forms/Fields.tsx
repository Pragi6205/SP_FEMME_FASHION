import { forwardRef } from "react";

const inputBase =
  "w-full border-0 border-b bg-transparent px-0 py-3 text-[1rem] text-ink outline-none transition-colors placeholder:text-stone/50 focus:border-ink";

type FieldShellProps = {
  id: string;
  label: string;
  optional?: boolean;
  hint?: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
};

export function FieldShell({ id, label, optional, hint, error, children, className = "" }: FieldShellProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="flex items-baseline justify-between gap-4 text-[0.8125rem] font-semibold text-ink">
        {label}
        {optional && <span className="text-xs font-normal text-stone">Optional</span>}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-2 text-xs text-stone">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-2 text-xs font-medium text-[#a2392f]">
          {error}
        </p>
      )}
    </div>
  );
}

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label: string;
  optional?: boolean;
  hint?: string;
  error?: string;
  wrapperClassName?: string;
};

export const TextField = forwardRef<HTMLInputElement, InputProps>(function TextField(
  { id, label, optional, hint, error, wrapperClassName, className = "", ...rest },
  ref,
) {
  return (
    <FieldShell id={id} label={label} optional={optional} hint={hint} error={error} className={wrapperClassName}>
      <input
        ref={ref}
        id={id}
        name={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        className={`${inputBase} ${error ? "border-[#a2392f]" : "border-line-strong"} ${className}`}
        {...rest}
      />
    </FieldShell>
  );
});

type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  id: string;
  label: string;
  optional?: boolean;
  hint?: string;
  error?: string;
  wrapperClassName?: string;
};

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(function TextArea(
  { id, label, optional, hint, error, wrapperClassName, className = "", ...rest },
  ref,
) {
  return (
    <FieldShell id={id} label={label} optional={optional} hint={hint} error={error} className={wrapperClassName}>
      <textarea
        ref={ref}
        id={id}
        name={id}
        rows={5}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        className={`${inputBase} resize-y ${error ? "border-[#a2392f]" : "border-line-strong"} ${className}`}
        {...rest}
      />
    </FieldShell>
  );
});

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  options: readonly (string | { value: string; label: string })[];
  placeholder?: string;
  wrapperClassName?: string;
};

export function SelectField({ id, label, optional, error, options, placeholder = "Select…", wrapperClassName, ...rest }: SelectProps) {
  return (
    <FieldShell id={id} label={label} optional={optional} error={error} className={wrapperClassName}>
      <select
        id={id}
        name={id}
        aria-invalid={error ? true : undefined}
        className={`${inputBase} cursor-pointer appearance-none bg-[url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' stroke='%236b625c' stroke-width='1.4'%3E%3Cpath d='M2 4.5l4 4 4-4'/%3E%3C/svg%3E")] bg-[length:12px] bg-[right_2px_center] bg-no-repeat pr-6 ${error ? "border-[#a2392f]" : "border-line-strong"}`}
        {...rest}
      >
        <option value="">{placeholder}</option>
        {options.map((o) => {
          const value = typeof o === "string" ? o : o.value;
          const text = typeof o === "string" ? o : o.label;
          return (
            <option key={value} value={value}>
              {text}
            </option>
          );
        })}
      </select>
    </FieldShell>
  );
}

/** Large selectable options rendered as a radio group. */
export function ChoiceGroup({
  name,
  legend,
  options,
  value,
  onChange,
  error,
  columns = "sm:grid-cols-2",
}: {
  name: string;
  legend: string;
  options: readonly { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
  columns?: string;
}) {
  return (
    <fieldset aria-describedby={error ? `${name}-error` : undefined}>
      <legend className="text-[0.8125rem] font-semibold text-ink">{legend}</legend>
      <div className={`mt-4 grid gap-2 ${columns}`}>
        {options.map((o) => {
          const checked = value === o.value;
          return (
            <label
              key={o.value}
              className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3.5 text-sm transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-1 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-rose-deep ${
                checked ? "border-ink bg-ink text-paper" : "border-line-strong text-ink hover:border-ink"
              }`}
            >
              <input
                type="radio"
                name={name}
                value={o.value}
                checked={checked}
                onChange={() => onChange(o.value)}
                className="sr-only"
              />
              <span
                aria-hidden
                className={`grid size-4 shrink-0 place-items-center rounded-full border ${checked ? "border-paper" : "border-stone"}`}
              >
                {checked && <span className="size-2 rounded-full bg-paper" />}
              </span>
              {o.label}
            </label>
          );
        })}
      </div>
      {error && (
        <p id={`${name}-error`} role="alert" className="mt-2 text-xs font-medium text-[#a2392f]">
          {error}
        </p>
      )}
    </fieldset>
  );
}
