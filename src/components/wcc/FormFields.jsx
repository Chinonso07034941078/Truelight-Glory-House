import { ChevronDown } from "lucide-react";

function fieldClasses(hasError, withIcon) {
  return `w-full rounded-2xl border bg-white py-3.5 text-orange-950 outline-none transition-all duration-200 placeholder:text-orange-900/40 focus:bg-white focus:ring-4 ${
    withIcon ? "pl-12 pr-4" : "px-4"
  } ${
    hasError
      ? "border-orange-700 focus:border-orange-700 focus:ring-orange-100"
      : "border-orange-100 focus:border-orange-600 focus:ring-orange-100 hover:border-orange-200"
  }`;
}

export function TextField({
  id,
  label,
  value,
  onChange,
  required,
  error,
  icon: Icon,
  type = "text",
  placeholder,
}) {
  const errorId = `${id}-error`;
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2.5 block text-sm font-semibold tracking-[-0.01em] text-orange-950"
      >
        {label} {required && <span className="text-orange-700">*</span>}
      </label>
      <div className="relative">
        {Icon && (
          <Icon
            size={18}
            strokeWidth={1.8}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-orange-800/45"
          />
        )}
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className={fieldClasses(!!error, !!Icon)}
        />
      </div>
      {error && (
        <p id={errorId} className="mt-1.5 text-xs font-medium text-orange-700">
          {error}
        </p>
      )}
    </div>
  );
}

export function TextAreaField({
  id,
  label,
  value,
  onChange,
  required,
  error,
  placeholder,
}) {
  const errorId = `${id}-error`;
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2.5 block text-sm font-semibold tracking-[-0.01em] text-orange-950"
      >
        {label} {required && <span className="text-orange-700">*</span>}
      </label>
      <textarea
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={5}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        className={`${fieldClasses(!!error, false)} min-h-32 resize-y leading-7`}
      />
      {error && (
        <p id={errorId} className="mt-1.5 text-xs font-medium text-orange-700">
          {error}
        </p>
      )}
    </div>
  );
}

export function SelectField({
  id,
  label,
  value,
  onChange,
  options,
  placeholder,
  required,
  error,
  isYesNo = false,
}) {
  const errorId = `${id}-error`;
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2.5 block text-sm font-semibold tracking-[-0.01em] text-orange-950"
      >
        {label} {required && <span className="text-orange-700">*</span>}
      </label>
      <div className="relative">
        <select
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className={`${fieldClasses(!!error, false)} appearance-none pr-11 ${
            isYesNo
              ? "border-orange-200 bg-gradient-to-br from-white via-white to-orange-50/70 font-semibold shadow-[0_8px_24px_rgba(154,63,18,0.08)] focus:border-orange-700 focus:ring-orange-100"
              : ""
          }`}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-2">
          {isYesNo && (
            <span className="hidden rounded-full bg-orange-100 px-2 py-1 text-[9px] font-bold uppercase tracking-[0.14em] text-orange-800 sm:inline-flex">
              Choose
            </span>
          )}
          <ChevronDown
            size={18}
            className={isYesNo ? "text-orange-700" : "text-orange-800/45"}
          />
        </div>
      </div>
      {error && (
        <p id={errorId} className="mt-1.5 text-xs font-medium text-orange-700">
          {error}
        </p>
      )}
    </div>
  );
}

