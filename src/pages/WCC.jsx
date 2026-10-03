import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  ArrowDown,
  CheckCircle2,
  ChevronDown,
  Loader2,
  Mail,
  Phone,
  User,
  Church,
} from "lucide-react";

// Paste the deployed Google Apps Script Web App URL here.
const GOOGLE_SHEETS_ENDPOINT =
  "https://script.google.com/macros/s/AKfycbwLr43-zPDMqX0ophirx4UrdGnFuqBL0B9aDLXQPydWkEDzHWKFvc2p9pPHQMZkAz7_/exec";

// Keep this order aligned with the header row in Google Sheets.
// Every answer is mapped explicitly, including the generated IDs.
const REGISTRATION_COLUMNS = [
  "registrationId",
  "checkInCode",
  "submittedAt",
  "name",
  "email",
  "phone",
  "attendedWccBefore",
  "expectations",
  "isTrueLighter",
  "isWorker",
  "unit",
  "church",
  "locationScope",
  "needsAccommodation",
  "isPastor",
  "pastorChurch",
];

function buildRegistrationPayload(formData, registrationId) {
  const answers = {
    registrationId,
    checkInCode: registrationId,
    submittedAt: new Date().toISOString(),
    name: formData.name.trim(),
    email: formData.email.trim(),
    phone: formData.phone.trim(),
    attendedWccBefore: formData.attendedWccBefore,
    expectations: formData.expectations.trim(),
    isTrueLighter: formData.isTrueLighter,
    isWorker: formData.isWorker,
    unit: formData.unit,
    church: formData.church.trim(),
    locationScope: formData.locationScope,
    needsAccommodation: formData.needsAccommodation,
    isPastor: formData.isPastor,
    pastorChurch: formData.pastorChurch.trim(),
  };

  return {
    ...answers,
    formType: "wcc-registration",
    // Useful when Apps Script appends arrays by column order.
    row: REGISTRATION_COLUMNS.map((column) => answers[column] ?? ""),
  };
}

function buildChildRegistrationPayload(childFormData, registrationId) {
  const childName = childFormData.childName.trim();
  const guardianName = childFormData.guardianName.trim();
  const guardianPhone = childFormData.guardianPhone.trim();
  const answers = {
    registrationId,
    checkInCode: registrationId,
    submittedAt: new Date().toISOString(),
    name: childName,
    email: "",
    phone: guardianPhone,
    attendedWccBefore: "",
    expectations: `Child age: ${childFormData.childAge.trim()}; Parent/guardian: ${guardianName}`,
    isTrueLighter: "",
    isWorker: "",
    unit: "",
    church: "",
    locationScope: "",
    needsAccommodation: "",
    isPastor: "",
    pastorChurch: "",
  };

  return {
    ...answers,
    formType: "wcc-registration",
    registrationKind: "child",
    row: REGISTRATION_COLUMNS.map((column) => answers[column] ?? ""),
  };
}

async function submitRegistration(payload) {
  if (GOOGLE_SHEETS_ENDPOINT.startsWith("PASTE_")) return;

  await fetch(GOOGLE_SHEETS_ENDPOINT, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(payload),
    keepalive: true,
  });
}

const UNITS = [
  "Choir",
  "Media",
  "Ushering",
  "Technical",
  "Children",
  "Drama",
  "Protocol",
  "Welfare",
  "Prayer",
  "Other",
];

const INITIAL_FORM_DATA = {
  name: "",
  email: "",
  phone: "",
  attendedWccBefore: "",
  expectations: "",
  isTrueLighter: "",
  isWorker: "",
  unit: "",
  church: "",
  locationScope: "",
  needsAccommodation: "",
  isPastor: "",
  pastorChurch: "",
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

function generateRegistrationId() {
  // Generate a six-digit numeric code for check-in.
  // The code is sent to Google Sheets with every registration.
  const randomValues = new Uint32Array(1);
  if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    crypto.getRandomValues(randomValues);
  } else {
    randomValues[0] = Math.floor(Math.random() * 0xffffffff);
  }
  return String(100000 + (randomValues[0] % 900000));
}

function fieldClasses(hasError, withIcon) {
  return `w-full rounded-xl border bg-white py-3.5 text-orange-950 outline-none transition-all duration-200 placeholder:text-orange-900/40 focus:bg-white focus:ring-4 ${
    withIcon ? "pl-12 pr-4" : "px-4"
  } ${
    hasError
      ? "border-orange-700 focus:border-orange-700 focus:ring-orange-100"
      : "border-orange-100 focus:border-orange-600 focus:ring-orange-100 hover:border-orange-200"
  }`;
}

function TextField({
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

function TextAreaField({
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
        className={`${fieldClasses(!!error, false)} min-h-32 resize-none leading-7`}
      />
      {error && (
        <p id={errorId} className="mt-1.5 text-xs font-medium text-orange-700">
          {error}
        </p>
      )}
    </div>
  );
}

function SelectField({
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
              ? "border-orange-200 wcc-smooth-orange-fade font-semibold shadow-[0_8px_24px_rgba(154,63,18,0.08)] focus:border-orange-700 focus:ring-orange-100"
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

const YES_NO_OPTIONS = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
];

const UNIT_OPTIONS = UNITS.map((unit) => ({ value: unit, label: unit }));

const NEXT_STEP_IMAGE_URL =
  "https://res.cloudinary.com/dnvgl9k4i/image/upload/v1790520059/90749eb0-03a6-4982-868e-a07b3534a06d.png";
const WCC_LOGO_URL =
  "https://res.cloudinary.com/dnvgl9k4i/image/upload/v1790827899/The_Takeover_Generation_Logo_2_zcvm8n.png";
const WCC_DRESS_IMAGE_URL =
  "https://res.cloudinary.com/dnvgl9k4i/image/upload/v1790828208/aacc7e85-f668-4ae8-8786-84c00c511696_fdlovh.jpg";
const HANDSHAKE_IMAGE_URL =
  "https://res.cloudinary.com/dnvgl9k4i/image/upload/v1790872098/92d74279-d379-4a61-8f4a-c56b2a7950ff_iw0rqo.png";
const GUEST_SPEAKER_IMAGES = [
  "https://res.cloudinary.com/dnvgl9k4i/image/upload/v1790877657/PKU_PASTOR_KACHI_1_cjniyi.png",
  "https://res.cloudinary.com/dnvgl9k4i/image/upload/v1790877652/PIU2_ndy79o.png",
  "https://res.cloudinary.com/dnvgl9k4i/image/upload/v1790877656/PYD_ny5rk3.png",
  "https://res.cloudinary.com/dnvgl9k4i/image/upload/v1790877653/PVO_ypbfe8.png",
  "https://res.cloudinary.com/dnvgl9k4i/image/upload/v1790877654/PDO_ujiv6v.png",
  "https://res.cloudinary.com/dnvgl9k4i/image/upload/v1790877652/MDO_cyqopq.png",
  "https://res.cloudinary.com/dnvgl9k4i/image/upload/v1790877652/MEB_kvbeps.png",
];

const PARTNER_ACCOUNT_NUMBER = "1025555159";

const COUNTDOWN_TARGET = new Date("2026-11-11T00:00:00").getTime();

function getCountdown() {
  const remaining = Math.max(0, COUNTDOWN_TARGET - Date.now());
  const totalSeconds = Math.floor(remaining / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

// Keep the one-second countdown updates out of the main page tree. This prevents
// the registration and child portal sections from re-rendering every second.
function Countdown() {
  const [countdown, setCountdown] = useState(getCountdown);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCountdown((previous) => {
        const next = getCountdown();
        // Avoid a state update when the target has already been reached.
        return next.days === previous.days &&
          next.hours === previous.hours &&
          next.minutes === previous.minutes &&
          next.seconds === previous.seconds
          ? previous
          : next;
      });
    }, 1000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="wcc-countdown mb-3 flex w-full items-end divide-x divide-orange-200/25 border-y border-orange-200/25 py-3 sm:max-w-xl sm:py-4">
      {[
        [countdown.days, "Days"],
        [countdown.hours, "Hours"],
        [countdown.minutes, "Minutes"],
        [countdown.seconds, "Seconds"],
      ].map(([value, label]) => (
        <div
          key={label}
          className="min-w-0 flex-1 px-2 text-center first:pl-0 last:pr-0 sm:px-4"
        >
          <div className="text-2xl font-black tabular-nums tracking-[-0.08em] text-white sm:text-4xl">
            {String(value).padStart(2, "0")}
          </div>
          <div className="mt-1 text-[8px] font-bold uppercase tracking-[0.18em] text-orange-200 sm:text-[9px]">
            {label}
          </div>
        </div>
      ))}
    </div>
  );
}

// ========================= PARTNER WITH US =========================
// White section with dark-red decoration lines. The handshake image is a link;
// by default it scrolls to the registration form on this page.
function PartnerSection({ onHandshakeClick, href = "#registration" }) {
  const [copied, setCopied] = useState(false);

  const copyNumber = async () => {
    try {
      await navigator.clipboard.writeText(PARTNER_ACCOUNT_NUMBER);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* Clipboard blocked, ignore */
    }
  };

  return (
    <section
      className="relative overflow-hidden bg-[#fffaf5] px-4 py-16 sm:px-8 sm:py-24 lg:px-12 lg:py-28"
      aria-labelledby="wcc-partner-title"
    >
      <div className="pointer-events-none absolute -left-32 top-0 h-80 w-80 rounded-full bg-orange-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-amber-200/40 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-10 bg-[#c2410c]" />
            <span className="text-[10px] font-black uppercase tracking-[0.32em] text-[#9a3412]">
              Partner with us
            </span>
          </div>

          <h2
            id="wcc-partner-title"
            className="max-w-xl text-5xl font-black leading-[0.9] tracking-[-0.07em] text-[#35140b] sm:text-6xl lg:text-7xl"
          >
            Help us make
            <span className="block text-[#c2410c]">an impact.</span>
          </h2>

          <p className="mt-7 max-w-lg text-base leading-8 text-[#7c2d12]/70 sm:text-lg">
            Your partnership helps us create a meaningful WCC experience and
            reach more people with the Gospel.
          </p>

          <div className="mt-9 rounded-2xl border border-orange-200 bg-white p-5 shadow-[0_20px_60px_rgba(124,45,18,0.08)] sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#c2410c]/70">
                  Partnership account
                </p>
                <p className="mt-3 text-sm font-bold uppercase tracking-wide text-[#7c2d12]">
                  Truelight Glory House WCC Acc.
                </p>
              </div>

              <div className="rounded-xl bg-orange-100 px-3 py-2 text-xs font-black uppercase tracking-wider text-[#9a3412]">
                UBA
              </div>
            </div>

            <button
              type="button"
              onClick={copyNumber}
              className="mt-5 block text-left text-[clamp(2.2rem,7vw,4.5rem)] font-black leading-none tracking-[-0.06em] text-[#7c2d12] transition hover:text-[#c2410c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f59e0b] focus-visible:ring-offset-4"
              aria-label={`Account number ${PARTNER_ACCOUNT_NUMBER
                .split("")
                .join(" ")}. Press to copy.`}
            >
              {PARTNER_ACCOUNT_NUMBER}
            </button>

            <div
              className="mt-4 min-h-5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#c2410c]"
              role="status"
              aria-live="polite"
            >
              {copied ? "Account number copied" : "Tap the account number to copy"}
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-3 rounded-[2rem] border border-orange-300/50" />

          <div className="relative overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-[#35140b] via-[#7c2d12] to-[#c2410c] p-4 shadow-[0_30px_90px_rgba(124,45,18,0.25)] sm:p-6">
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full border border-orange-200/20" />
            <div className="pointer-events-none absolute -bottom-24 -left-20 h-72 w-72 rounded-full border border-orange-200/15" />

            <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-white/10">
              <img
                src={HANDSHAKE_IMAGE_URL}
                alt="A gold hand and a silver hand in a handshake"
                loading="lazy"
                decoding="async"
                className="block w-full object-contain transition duration-500 hover:scale-105"
              />

              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#35140b]/90 via-[#35140b]/40 to-transparent px-5 pb-5 pt-16 sm:px-7 sm:pb-7">
                <p className="text-[10px] font-black uppercase tracking-[0.28em] text-orange-200">
                  Together, we can
                </p>
                <p className="mt-2 text-2xl font-black tracking-tight text-white sm:text-3xl">
                  Make WCC 2026 Memorable.
                </p>
              </div>
            </div>

            
          </div>
        </div>
      </div>
    </section>
  );
}


const CHILD_INITIAL_DATA = {
  childName: "",
  childAge: "",
  guardianName: "",
  guardianPhone: "",
};

export default function WCC() {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [registrationId, setRegistrationId] = useState("");
  const [childFormOpen, setChildFormOpen] = useState(false);
  const [childFormData, setChildFormData] = useState(CHILD_INITIAL_DATA);
  const [childSubmitted, setChildSubmitted] = useState(false);

  const handleChildChange = (e) => {
    const { name, value } = e.target;
    setChildFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleChildSubmit = async (e) => {
    e.preventDefault();
    if (Object.values(childFormData).some((value) => !value.trim())) return;

    const registrationId = generateRegistrationId();
    const payload = buildChildRegistrationPayload(
      childFormData,
      registrationId,
    );

    try {
      await submitRegistration(payload);
      setChildSubmitted(true);
      setChildFormData(CHILD_INITIAL_DATA);
    } catch (err) {
      console.error("Child submission failed", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const key = name;

    setFormData((prev) => {
      const updated = { ...prev, [key]: value };
      if (key === "isTrueLighter") {
        if (value === "yes") {
          updated.church = "";
          updated.locationScope = "";
        } else if (value === "no") {
          updated.isWorker = "";
          updated.unit = "";
        }
      }
      if (key === "isWorker" && value === "no") updated.unit = "";
      if (key === "isPastor" && value === "no") updated.pastorChurch = "";
      return updated;
    });

    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev, [key]: undefined };
      if (key === "isTrueLighter") {
        delete next.isWorker;
        delete next.unit;
        delete next.church;
        delete next.locationScope;
      }
      if (key === "isWorker") delete next.unit;
      if (key === "locationScope") {
        delete next.locationScope;
      }
      return next;
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Please enter your full name.";
    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Please enter your phone number.";
    }
    if (!formData.attendedWccBefore) {
      newErrors.attendedWccBefore =
        "Please let us know if you have attended WCC before.";
    }
    if (!formData.expectations.trim()) {
      newErrors.expectations = "Please tell us what you expect from WCC.";
    }
    if (!formData.isTrueLighter)
      newErrors.isTrueLighter = "Please let us know if you are a True Lighter.";
    if (formData.isTrueLighter === "yes") {
      if (!formData.isWorker)
        newErrors.isWorker = "Please let us know if you serve in a unit.";
      else if (formData.isWorker === "yes" && !formData.unit)
        newErrors.unit = "Please select your unit.";
    }
    if (formData.isTrueLighter === "no") {
      if (!formData.church.trim())
        newErrors.church = "Please enter the church you attend.";
      if (!formData.locationScope)
        newErrors.locationScope =
          "Please let us know if you are coming from outside Owerri.";
    }

    // These questions apply to everyone and are intentionally independent
    // of the True Lighter / visitor branch above.
    if (!formData.needsAccommodation) {
      newErrors.needsAccommodation =
        "Please let us know if you need accommodation.";
    }
    if (!formData.isPastor) {
      newErrors.isPastor = "Please let us know if you are a pastor.";
    } else if (formData.isPastor === "yes" && !formData.pastorChurch.trim()) {
      newErrors.pastorChurch =
        "Please tell us which church you pastor or attend.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    const id = generateRegistrationId();
    const payload = buildRegistrationPayload(formData, id);

    try {
      await submitRegistration(payload);
      // Show the exact ID that was sent to Sheets for check-in.
      setRegistrationId(payload.registrationId);
      setSubmitted(true);
      setFormData(INITIAL_FORM_DATA);
    } catch (err) {
      console.error("Submission failed", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToRegistration = () => {
    const isMobile = window.matchMedia("(max-width: 640px)").matches;
    const targetId = isMobile ? "registration-form" : "registration";

    document
      .getElementById(targetId)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // After the success screen renders, center the check-in number on screen.
  useEffect(() => {
    if (!submitted) return;
    const timer = setTimeout(() => {
      document
        .getElementById("checkin-result")
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 150);
    return () => clearTimeout(timer);
  }, [submitted]);

  return (
    <main
      className="wcc-page min-h-screen bg-white text-orange-950 antialiased selection:bg-orange-200 selection:text-orange-950"
      style={{
        fontFamily:
          "'Adero Trial Family', 'Adero', 'Trebuchet MS', ui-sans-serif, system-ui, sans-serif",
        fontSize: "15px",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700;800&display=swap');

        .wcc-page {
          --wcc-ink: #35140b;
          --wcc-wine: #7c2d12;
          --wcc-orange: #c2410c;
          --wcc-amber: #f59e0b;
          --wcc-cream: #fffaf5;
          --wcc-line: rgba(194, 65, 12, 0.22);
          font-family: 'Adero Trial Family', 'Adero', 'Trebuchet MS', ui-sans-serif, system-ui, sans-serif;
        }

        .wcc-page h1,
        .wcc-page h2,
        .wcc-page h3,
        .wcc-page h4,
        .wcc-page button,
        .wcc-page label,
        .wcc-page .font-black,
        .wcc-page .font-semibold {
          font-family: 'Adero Trial Family', 'Adero', 'Trebuchet MS', ui-sans-serif, system-ui, sans-serif;
        }

        .wcc-page p,
        .wcc-page input,
        .wcc-page textarea,
        .wcc-page select,
        .wcc-page option,
        .wcc-page small,
        .wcc-page span.text-xs,
        .wcc-page span.text-sm,
        .wcc-page div.text-xs,
        .wcc-page div.text-sm {
          font-family: 'Montserrat', ui-sans-serif, system-ui, sans-serif;
        }

        .wcc-page input,
        .wcc-page textarea,
        .wcc-page select {
          border-radius: 16px !important;
          border-color: rgba(194, 65, 12, 0.18) !important;
          background: linear-gradient(135deg, #ffffff 0%, #fffaf5 58%, #ffedd5 100%) !important;
          box-shadow: 0 10px 28px rgba(124, 45, 18, 0.06);
        }

        .wcc-page input:focus,
        .wcc-page textarea:focus,
        .wcc-page select:focus {
          border-color: rgba(194, 65, 12, 0.72) !important;
          box-shadow: 0 0 0 4px rgba(251, 146, 60, 0.15), 0 12px 30px rgba(124, 45, 18, 0.08);
        }

        .wcc-page button,
        .wcc-page a:not(.wcc-partner__handshake) {
          border-radius: 14px;
        }

        .wcc-page img {
          border-radius: 18px;
        }

        .wcc-flag-line {
          position: relative;
          display: inline-block;
          height: 3px;
          flex: 0 0 auto;
          overflow: visible;
          background: linear-gradient(90deg, #7c2d12 0%, #c2410c 62%, #f59e0b 100%);
          box-shadow: 0 2px 10px rgba(194, 65, 12, 0.16);
        }

        .wcc-flag-line::after {
          position: absolute;
          right: -1px;
          top: 0;
          width: 8px;
          height: 3px;
          background: #f59e0b;
          content: '';
          clip-path: polygon(0 0, 100% 50%, 0 100%);
        }

        .wcc-smooth-dark-fade {
          background: linear-gradient(180deg, rgba(23, 11, 6, 0) 0%, rgba(74, 28, 10, 0.56) 54%, #170b06 100%) !important;
        }

        .wcc-smooth-orange-fade {
          background: linear-gradient(135deg, #fffaf5 0%, #fff7ed 48%, #ffedd5 100%) !important;
        }

        .wcc-countdown {
          font-family: 'Montserrat', ui-sans-serif, system-ui, sans-serif;
        }

        .wcc-hero-content {
          isolation: isolate;
        }

        /* Lower the complete hero content group on desktop only. */
        @media (min-width: 1024px) {
          .wcc-hero-content {
            top: 3rem;
          }
        }

        .wcc-hero-lockup {
          position: relative;
          z-index: 7;
        }

        .wcc-hero-theme {
          z-index: 3;
          transform: translateY(0.35rem);
        }

        .wcc-hero-theme img {
          border: 1px solid rgba(255, 240, 225, 0.3);
          background: rgba(20, 7, 3, 0.18);
          box-shadow: 0 20px 55px rgba(14, 5, 2, 0.42), 0 0 0 8px rgba(245, 158, 11, 0.04);
        }

        .wcc-hero-title {
          position: relative;
          z-index: 1;
          font-family: 'Adero Trial Family', 'Adero', 'Trebuchet MS', sans-serif;
          filter: drop-shadow(0 18px 28px rgba(20, 7, 3, 0.24));
        }

        .wcc-hero-title::after {
          position: absolute;
          left: 8%;
          right: -18%;
          top: 56%;
          height: 2px;
          background: linear-gradient(90deg, #f59e0b, rgba(245, 158, 11, 0));
          content: '';
          opacity: 0.82;
          transform: rotate(-3deg);
        }

        .wcc-hero-year {
          color: transparent;
          -webkit-text-stroke: 1px rgba(255, 240, 225, 0.72);
          text-shadow: 0 0 36px rgba(232, 111, 19, 0.22);
        }

        .wcc-hero-ghost {
          position: absolute;
          right: -8vw;
          top: 45%;
          z-index: 0;
          color: transparent;
          font-family: 'Adero Trial Family', 'Adero', 'Trebuchet MS', sans-serif;
          font-size: clamp(5rem, 15vw, 15rem);
          font-weight: 900;
          letter-spacing: -0.12em;
          line-height: 0.72;
          opacity: 0.13;
          pointer-events: none;
          text-transform: uppercase;
          transform: rotate(-8deg);
          -webkit-text-stroke: 1px rgba(255, 240, 225, 0.85);
          white-space: nowrap;
        }

        .wcc-hero-mark {
          position: absolute;
          left: 3%;
          top: 23%;
          z-index: 2;
          color: rgba(255, 240, 225, 0.64);
          font-family: 'Montserrat', ui-sans-serif, system-ui, sans-serif;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.32em;
          line-height: 1.5;
          text-transform: uppercase;
          writing-mode: vertical-rl;
        }

        @media (max-width: 640px) {
          .wcc-hero-ghost {
            right: -18vw;
            top: 40%;
            font-size: 27vw;
          }

          .wcc-hero-mark {
            left: 4%;
            top: 16%;
            font-size: 7px;
          }

          .wcc-hero-content .wcc-countdown {
            padding-top: 0.55rem;
            padding-bottom: 0.55rem;
          }

          .wcc-hero-content .wcc-countdown div.text-2xl {
            font-size: 1.35rem;
          }

          .wcc-hero-register button {
            padding: 0.7rem 1.15rem;
            font-size: 0.78rem;
          }

          .wcc-hero-scroll {
            display: none;
          }
        }

        .wcc-guest-speakers {
          position: relative;
          width: 100%;
          overflow: hidden;
          border: 1px solid rgba(255, 240, 225, 0.28);
          background: linear-gradient(135deg, rgba(26, 9, 5, 0.78), rgba(116, 37, 13, 0.48));
          box-shadow: 0 18px 48px rgba(26, 9, 5, 0.28);
        }

        .wcc-guest-speakers::before,
        .wcc-guest-speakers::after {
          position: absolute;
          z-index: 2;
          width: 42px;
          height: 42px;
          border-color: rgba(245, 158, 11, 0.9);
          border-style: solid;
          content: '';
          pointer-events: none;
        }

        .wcc-guest-speakers::before {
          left: 12px;
          top: 12px;
          border-width: 2px 0 0 2px;
        }

        .wcc-guest-speakers::after {
          right: 12px;
          bottom: 12px;
          border-width: 0 2px 2px 0;
        }

        .wcc-guest-speakers img {
          display: block;
          width: 100%;
          max-height: 220px;
          object-fit: contain;
          object-position: center;
          opacity: 0.96;
        }

        .wcc-guest-speakers-hero {
          position: absolute;
          bottom: 0;
          left: 0;
          z-index: 4;
          display: grid;
          grid-template-columns: repeat(7, minmax(0, 1fr));
          align-items: end;
          width: 100%;
          padding: 0 clamp(8px, 2vw, 24px);
          pointer-events: none;
          filter: drop-shadow(0 -18px 30px rgba(17, 6, 2, 0.14));
        }

        .wcc-guest-speakers-hero img {
          display: block;
          filter: saturate(0.96) contrast(1.03);
        }

        .wcc-dress-editorial {
          background:
            radial-gradient(circle at 88% 12%, rgba(245, 158, 11, 0.12), transparent 26%),
            linear-gradient(135deg, #fffaf5 0%, #ffffff 58%, #fff0e1 100%);
        }

        .wcc-dress-editorial::after {
          position: absolute;
          left: 6%;
          top: 16%;
          width: min(18vw, 220px);
          height: 1px;
          background: linear-gradient(90deg, #c94e0a, transparent);
          content: '';
          opacity: 0.65;
        }

        .wcc-child-editorial {
          background:
            radial-gradient(circle at 18% 22%, rgba(245, 158, 11, 0.24), transparent 24%),
            radial-gradient(circle at 86% 76%, rgba(232, 111, 19, 0.22), transparent 30%),
            linear-gradient(135deg, #5c1f0b 0%, #74250d 52%, #35140b 100%);
        }

        .wcc-hero-register {
          z-index: 12;
        }

        .wcc-hero-register button {
          border: 1px solid rgba(255, 240, 225, 0.32);
          background: linear-gradient(135deg, #c2410c 0%, #9a3412 100%);
          box-shadow: 0 14px 30px rgba(31, 8, 2, 0.34), inset 0 1px 0 rgba(255, 240, 225, 0.2);
          letter-spacing: 0.02em;
        }

        .wcc-partner__number:active {
          transform: scale(0.985);
        }
      `}</style>
      {/* ========================= HERO ========================= */}
      <section
        className="relative flex min-h-[100svh] items-center overflow-hidden bg-[#3b160b] text-white [--wcc-speaker-strip:clamp(160px,28svh,300px)] max-[640px]:[--wcc-speaker-strip:clamp(200px,35svh,320px)] sm:[--wcc-speaker-strip:clamp(220px,32svh,360px)]"
        style={{
          fontFamily:
            "'Adero Trial Family', 'Adero', 'Trebuchet MS', ui-sans-serif, system-ui, sans-serif",
        }}
      >
        {/* Image-free recreation of the supplied poster background. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[#3b160b]"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at 52% 96%, rgba(232,111,19,0.48) 0%, rgba(116,37,13,0.24) 28%, transparent 56%), radial-gradient(ellipse at 72% 22%, rgba(201,78,10,0.36) 0%, transparent 48%), linear-gradient(145deg, #5c1f0b 0%, #74250d 46%, #1a0905 100%)",
          }}
        />
        <svg
          aria-hidden="true"
          className="absolute inset-0 h-full w-full opacity-35"
          viewBox="0 0 1440 1000"
          preserveAspectRatio="none"
          fill="none"
        >
          <g stroke="#e49a4b" strokeWidth="1.4" opacity="0.38">
            <path d="M-60 170C100 80 170 10 360-38c150-38 220 67 370 39 176-33 200-108 391-54 146 41 190 92 377 19" />
            <path d="M-80 224C86 125 165 45 350 2c147-34 226 66 366 39 175-34 210-112 393-58 142 42 203 102 391 20" />
            <path d="M-92 284C88 170 158 91 339 49c151-35 231 67 374 40 169-32 212-112 393-58 154 45 207 101 404 13" />
            <path d="M-130 602c206-74 286-139 473-93 173 42 202 143 372 122 155-19 224-129 404-113 141 12 192 75 367 36" />
            <path d="M-100 672c208-76 297-145 481-98 165 43 204 142 368 122 164-19 228-132 411-115 143 13 196 76 367 34" />
            <path d="M-96 744c208-79 302-150 487-103 159 41 199 139 364 121 169-19 237-135 416-117 145 14 194 76 366 32" />
            <path d="M-60 820c173-72 295-113 443-77 162 39 221 152 393 135 158-16 225-127 378-119 158 9 220 90 354 46" />
            <path d="M820-50c-15 132-127 165-115 286 12 124 166 103 178 215 13 123-128 172-111 287 19 128 191 137 180 270-8 92-102 131-129 223" />
            <path d="M900-55c-14 131-128 169-112 288 16 119 163 103 178 218 16 124-124 168-108 286 17 127 186 142 176 268-7 94-105 134-126 228" />
            <path d="M986-40c-13 124-118 165-103 278 15 116 153 103 168 211 16 117-117 161-101 274 17 121 173 138 166 256-5 97-99 141-121 232" />
          </g>
        </svg>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-[7%] top-24 hidden h-px w-24 bg-white/55 lg:block"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-[9%] top-28 hidden h-36 w-px bg-white/35 lg:block"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-[7%] top-[17rem] hidden h-px w-28 rotate-[28deg] bg-white/45 lg:block"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-24 left-[12%] hidden h-px w-32 bg-white/35 lg:block"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-5 top-[27%] h-px w-12 bg-white/45 sm:hidden"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-5 top-[39%] h-16 w-px bg-white/35 sm:hidden"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-[19%] left-[15%] h-px w-20 rotate-[-24deg] bg-white/40 sm:hidden"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-2/5 wcc-smooth-dark-fade"
        />
        <div
          aria-hidden="true"
          className="absolute -right-16 top-16 h-52 w-52 rounded-full border border-orange-200/15 bg-orange-300/5 blur-2xl"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-24 left-1/3 h-60 w-60 rounded-full border border-white/10 bg-white/5 blur-3xl"
        />

        {/* Guest speakers strip (unchanged) */}
        <div
          className="wcc-guest-speakers-hero absolute inset-x-0 bottom-0 z-[4] grid h-[var(--wcc-speaker-strip)] grid-cols-7 items-end gap-0 px-1 max-[640px]:px-0 sm:px-4"
          aria-hidden="true"
        >
          {GUEST_SPEAKER_IMAGES.map((imageUrl) => (
            <img
              key={imageUrl}
              src={imageUrl}
              alt=""
              loading="eager"
              decoding="async"
              className="
          h-[115%] w-[115%]
          min-w-0
          max-w-none
          object-center
          object-bottom
          scale-110
          origin-bottom
          max-[640px]:h-[55%]
          max-[640px]:w-[180%]
          max-[640px]:scale-110
          max-[640px]:max-w-none
          max-[640px]:justify-self-center
        "
            />
          ))}
        </div>

        {/* Content: bottom-anchored just above the images on mobile, centered from tablet up */}
        <div className="wcc-hero-content relative z-10 mx-auto flex min-h-[100svh] w-full max-w-6xl items-end px-4 pb-[calc(var(--wcc-speaker-strip)*0.62_+_1rem)] pt-16 sm:items-center sm:px-8 sm:pb-[var(--wcc-speaker-strip)] sm:pt-28 lg:px-12 lg:pb-[var(--wcc-speaker-strip)] lg:pt-20">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.12 } },
            }}
            className="flex w-full flex-col items-center gap-3 text-center sm:gap-5 lg:grid lg:grid-cols-2 lg:gap-x-16 lg:gap-y-6 lg:text-left"
          >
            {/* Title: one centered line on mobile, stacked on larger screens */}
            <motion.h1
              variants={fadeUp}
              className="wcc-hero-title max-w-xl text-center font-black leading-[0.78] tracking-[-0.09em] text-white max-[640px]:flex max-[640px]:items-baseline max-[640px]:justify-center max-[640px]:gap-[0.2em] max-[640px]:leading-[0.9] lg:col-start-1 lg:row-start-1 lg:justify-self-start lg:text-left"
            >
              <span className="block text-[clamp(3.25rem,14vw,5.8rem)] max-[640px]:text-[clamp(3rem,18vw,4.75rem)] lg:text-[7.2rem] xl:text-[8.2rem]">
                WCC
              </span>
              <span className="wcc-hero-year block text-[clamp(4rem,17vw,7rem)] max-[640px]:text-[clamp(3rem,18vw,4.75rem)] lg:text-[8.8rem] xl:text-[10rem]">
                2026
              </span>
            </motion.h1>

            {/* Logo: first on mobile (order-first), second on tablet, right column on desktop.
          SIZE CONTROL: change the w-[clamp(min,preferred,max)] values below. */}
            <motion.div
              variants={fadeUp}
              className="wcc-hero-theme w-64 max-[640px]:order-first max-[640px]:w-[clamp(9.5rem,52vw,13rem)] lg:col-start-2 lg:row-start-1 lg:w-full lg:max-w-[22rem] lg:justify-self-center [&_img]:!border-0"
            >
              <img
                src={WCC_LOGO_URL}
                alt="The Takeover Generation"
                loading="eager"
                decoding="async"
                className="mx-auto w-full object-contain object-center shadow-[0_12px_40px_rgba(67,20,7,0.38)]"
              />
            </motion.div>

            {/* Countdown: soft dark panel on mobile for readability */}
            <motion.div
              variants={fadeUp}
              className="wcc-hero-countdown w-full max-w-xl max-[640px]:max-w-[21rem] max-[640px]:rounded-2xl max-[640px]:bg-black/20 max-[640px]:px-3 max-[640px]:backdrop-blur-sm lg:col-start-2 lg:row-start-2 lg:justify-self-center"
            >
              <Countdown />
            </motion.div>

            <motion.p
              variants={fadeUp}
              className="wcc-hero-copy mx-auto max-w-md text-center text-xs leading-5 text-orange-50/80 max-[640px]:max-w-[18rem] max-[640px]:text-[0.8rem] max-[640px]:leading-[1.5] sm:text-sm lg:col-start-1 lg:row-start-2 lg:mx-0 lg:text-left lg:text-base lg:leading-6"
            >
              Join us this season. Complete the registration below and tell us a
              little about yourself.
            </motion.p>

            {/* Button: full width on mobile */}
            <motion.div
              variants={fadeUp}
              className="wcc-hero-register flex w-full justify-center max-[640px]:max-w-[21rem] lg:col-start-1 lg:row-start-3 lg:w-auto lg:justify-start"
            >
              <button
                onClick={scrollToRegistration}
                className="group inline-flex items-center justify-center gap-2 rounded-lg bg-[#b45309] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-950/40 transition-all hover:-translate-y-0.5 hover:bg-[#92400e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-200 focus-visible:ring-offset-2 focus-visible:ring-offset-[#3b160b] max-[640px]:w-full max-[640px]:py-3.5"
              >
                Register now
                <ArrowDown
                  size={18}
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ========================= INTRO + VIDEO ========================= */}
      <section
        aria-labelledby="wcc-video-title"
        className="relative overflow-hidden bg-white py-20 sm:py-28"
      >
        <div
          aria-hidden="true"
          className="absolute left-0 top-0 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#b45309]/5 blur-3xl"
        />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:px-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center lg:text-left"
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-orange-700">
              Registration
            </p>
            <h2
              id="wcc-video-title"
              className="mt-5 max-w-4xl text-5xl font-semibold leading-[0.9] tracking-[-0.07em] text-[#92400e] sm:text-6xl lg:text-8xl"
            >
              Let&apos;s get
              <br />
              <span className="text-[#c94e0a]">to know you.</span>
            </h2>
            <div className="mx-auto mt-7 flex items-center gap-4 lg:mx-0 lg:max-w-3xl">
              <span className="wcc-flag-line w-20" />
              <p className="max-w-2xl text-left leading-8 text-orange-900/75">
                Fill out the form below with your details. It helps us prepare
                for your visit and connect you with the right team.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="overflow-hidden rounded-2xl border border-orange-900/15 bg-black shadow-2xl shadow-orange-950/20"
          >
            <div className="aspect-video w-full">
              <iframe
                className="h-full w-full"
                src="https://www.youtube-nocookie.com/embed/yd6UcMqLx4w?autoplay=1&mute=1&playsinline=1&rel=0"
                title="WCC 2026 video"
                loading="eager"
                allow="autoplay; encrypted-media; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========================= REGISTRATION ========================= */}
      <section
        id="registration"
        className="relative overflow-hidden bg-orange-50 py-16 sm:py-24 lg:py-32"
      >
        <div className="absolute right-0 top-20 h-72 w-72 translate-x-1/3 rounded-full bg-orange-900/5 blur-3xl" />
        <div className="relative grid w-full lg:grid-cols-[36%_64%]">
          <aside className="relative flex min-h-[540px] flex-col justify-between overflow-hidden bg-[#7c2d12] px-6 py-14 text-white sm:px-10 lg:min-h-[780px] lg:px-16 lg:py-20">
            <div className="absolute right-0 top-0 h-full w-[2px] bg-[#b45309]" />
            <div className="absolute left-8 top-28 hidden h-44 w-px bg-white/25 lg:block" />
            <div className="absolute bottom-16 left-8 hidden h-20 w-px bg-[#b45309] lg:block" />
            <div className="relative pl-0 lg:pl-10">
              <div className="mb-8 flex items-center gap-4">
                <span className="wcc-flag-line w-14" />
                <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-orange-200">
                   WCC
                </span>
              </div>
              <h2 className="max-w-md text-5xl font-semibold leading-[0.92] tracking-[-0.06em] text-white sm:text-6xl lg:text-7xl">
                Make your
                <br />
                <span className="text-orange-300">next step.</span>
              </h2>
              <p className="mt-8 max-w-sm text-base leading-8 text-orange-50/80 sm:text-lg">
                A simple registration is the beginning of a meaningful
                connection. Tell us where you are coming from and what you are
                hoping to discover.
              </p>
              <div className="relative mt-10 overflow-hidden rounded-xl border border-orange-200/25 bg-orange-950/20 shadow-xl shadow-orange-950/30">
                <img
                  src={NEXT_STEP_IMAGE_URL}
                  alt="WCC 2026 invitation artwork"
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover object-center opacity-95 transition duration-500 hover:scale-105 sm:h-64 lg:h-72"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-orange-950/55 via-transparent to-white/5" />
                <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between gap-4">
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-orange-100">
                    Take your next step
                  </span>
                  <span className="h-2 w-2 shrink-0 rounded-full bg-orange-300 shadow-[0_0_18px_rgba(253,186,116,0.9)]" />
                </div>
              </div>
            </div>
            <div className="relative mt-14 grid max-w-md gap-5 pl-0 sm:grid-cols-3 lg:pl-10">
              {[
                ["01", "Connect"],
                ["02", "Grow"],
                ["03", "Serve"],
              ].map(([number, label]) => (
                <div key={number} className="border-t border-white/20 pt-3">
                  <span className="text-xs text-orange-300">{number}</span>
                  <p className="mt-2 text-sm font-semibold text-white">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </aside>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full overflow-hidden bg-white shadow-none"
          >
            <div className="relative overflow-hidden border-b border-orange-100 bg-white px-6 py-10 text-[#7c2d12] sm:px-10 lg:px-16 lg:py-14">
              <div className="absolute bottom-0 left-0 wcc-flag-line w-28" />
              <div className="relative">
                <div className="mb-5 flex items-center gap-4">
                  <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#92400e]">
                    Your details
                  </span>
                  
                </div>
                <h2 className="max-w-2xl text-4xl font-semibold leading-[0.95] tracking-[-0.06em] text-[#7c2d12] sm:text-5xl lg:text-6xl">
                  Register your details
                </h2>
                <p className="mt-5 max-w-lg text-sm leading-6 text-orange-900/65 sm:text-base">
                  Fields marked with an asterisk (
                  <span className="text-[#92400e]">*</span>) are required.
                </p>
              </div>
            </div>

            {submitted ? (
              <div
                id="checkin-result"
                role="status"
                className="px-6 py-16 text-center sm:px-10"
              >
                <p className="text-sm font-bold uppercase tracking-[0.24em] text-orange-700">
                  Your check-in number
                </p>
                <div
                  className="mt-4 text-7xl font-black tracking-[0.12em] text-[#92400e] sm:text-8xl"
                  aria-label={`Your check-in number is ${registrationId}`}
                >
                  {registrationId}
                </div>
                <div className="mx-auto mt-6 flex h-12 w-12 items-center justify-center rounded-full bg-orange-50">
                  <CheckCircle2 size={27} className="text-orange-700" />
                </div>
                <h3 className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-[#92400e]">
                  Registration successful
                </h3>
                <p className="mt-2 text-sm text-orange-900/65">
                  Save this number and bring it with you for check-in.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-8 rounded-xl bg-[#b45309] px-6 py-3.5 font-semibold text-white shadow-lg shadow-orange-950/20 transition-all hover:-translate-y-0.5 hover:bg-[#92400e]"
                >
                  Register someone else
                </button>
              </div>
            ) : (
              <form
                id="registration-form"
                onSubmit={handleSubmit}
                noValidate
                className="w-full px-6 py-8 sm:px-10 sm:py-10 lg:px-20"
              >
                {/* Personal Information */}
                <div className="mb-10">
                  <div className="mb-6 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-orange-800">
                      <User size={18} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#92400e]">
                        Personal information
                      </h3>
                      <p className="text-xs text-orange-900/65">
                        Tell us about yourself
                      </p>
                    </div>
                  </div>
                  <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <TextField
                        id="name"
                        label="Full name"
                        required
                        icon={User}
                        value={formData.name}
                        error={errors.name}
                        placeholder="Enter your full name"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <TextField
                        id="email"
                        label="Email address"
                        required
                        type="email"
                        icon={Mail}
                        value={formData.email}
                        error={errors.email}
                        placeholder="you@example.com"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <TextField
                        id="phone"
                        label="Phone number"
                        required
                        type="tel"
                        icon={Phone}
                        value={formData.phone}
                        error={errors.phone}
                        placeholder="Enter your phone number"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <SelectField
                        id="attendedWccBefore"
                        label="Have you attended WCC before?"
                        required
                        value={formData.attendedWccBefore}
                        error={errors.attendedWccBefore}
                        placeholder="Select an option"
                        options={YES_NO_OPTIONS}
                        onChange={handleChange}
                        isYesNo
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-2 border-t border-orange-100 pt-7">
                    <div className="mb-4 flex items-center gap-3">
                      <span className="wcc-flag-line w-10" />
                      <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#7c2d12]">
                        Church connection
                      </span>
                    </div>
                    <SelectField
                      id="isTrueLighter"
                      label="Are you a True Lighter (member of Truelight Glory House)?"
                      required
                      value={formData.isTrueLighter}
                      error={errors.isTrueLighter}
                      placeholder="Select an option"
                      options={YES_NO_OPTIONS}
                      onChange={handleChange}
                      isYesNo
                    />
                    <AnimatePresence mode="wait">
                      {formData.isTrueLighter === "yes" && (
                        <motion.div
                          key="member-branch"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25 }}
                          className="mt-5 space-y-6 overflow-hidden"
                        >
                          <SelectField
                            id="isWorker"
                            label="Are you a worker (do you serve in a unit)?"
                            required
                            value={formData.isWorker}
                            error={errors.isWorker}
                            placeholder="Select an option"
                            options={YES_NO_OPTIONS}
                            onChange={handleChange}
                            isYesNo
                          />
                          <AnimatePresence mode="wait">
                            {formData.isWorker === "yes" && (
                              <motion.div
                                key="unit"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.25 }}
                                className="overflow-hidden"
                              >
                                <SelectField
                                  id="unit"
                                  label="Which unit do you belong to?"
                                  required
                                  value={formData.unit}
                                  error={errors.unit}
                                  placeholder="Select your unit"
                                  options={UNIT_OPTIONS}
                                  onChange={handleChange}
                                />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      )}
                      {formData.isTrueLighter === "no" && (
                        <motion.div
                          key="visitor-branch"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25 }}
                          className="mt-5 space-y-6 overflow-hidden"
                        >
                          <TextField
                            id="church"
                            label="Which church do you attend?"
                            required
                            icon={Church}
                            value={formData.church}
                            error={errors.church}
                            placeholder="Enter your church name"
                            onChange={handleChange}
                          />
                          <SelectField
                            id="locationScope"
                            label="Are you coming from outside Owerri?"
                            required
                            value={formData.locationScope}
                            error={errors.locationScope}
                            placeholder="Select Yes or No"
                            options={YES_NO_OPTIONS}
                            onChange={handleChange}
                            isYesNo
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Standalone questions: shown for every registrant. */}
                  <div className="mt-8 grid gap-7 border-t border-orange-100 pt-8 sm:grid-cols-2">
                    <SelectField
                      id="isPastor"
                      label="Are you a pastor?"
                      required
                      value={formData.isPastor}
                      error={errors.isPastor}
                      placeholder="Select Yes or No"
                      options={YES_NO_OPTIONS}
                      onChange={handleChange}
                      isYesNo
                    />
                    <SelectField
                      id="needsAccommodation"
                      label="Do you need accommodation?"
                      required
                      value={formData.needsAccommodation}
                      error={errors.needsAccommodation}
                      placeholder="Select Yes or No"
                      options={YES_NO_OPTIONS}
                      onChange={handleChange}
                      isYesNo
                    />
                    <AnimatePresence initial={false}>
                      {formData.isPastor === "yes" && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden sm:col-span-2"
                        >
                          <TextField
                            id="pastorChurch"
                            label="Which church?"
                            required
                            icon={Church}
                            value={formData.pastorChurch}
                            error={errors.pastorChurch}
                            placeholder="Enter the church name"
                            onChange={handleChange}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <div className="mt-12 sm:mt-14 sm:col-span-2 border-l-2 border-orange-500/70 pl-4 sm:pl-5">
                    <TextAreaField
                      id="expectations"
                      label="What are your expectations from WCC?"
                      required
                      value={formData.expectations}
                      error={errors.expectations}
                      placeholder="Tell us what you hope to experience, learn, or receive..."
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Submit */}
                <div className="mt-8 border-t border-orange-100 pt-8">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#b45309] px-6 py-4 font-semibold text-white shadow-lg shadow-orange-950/20 transition-all hover:-translate-y-0.5 hover:bg-[#92400e] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={19} className="animate-spin" />{" "}
                        Submitting...
                      </>
                    ) : (
                      "Submit"
                    )}
                  </button>
                  <p className="mt-4 text-center text-xs leading-5 text-orange-900/65">
                    By submitting this form, you agree to provide your
                    information for registration and communication purposes.
                    You&apos;ll receive a check-in code by email — keep it for
                    the day of the events.
                  </p>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      {/* ========================= WCC DRESS ========================= */}
      <section className="wcc-dress-editorial relative overflow-hidden bg-orange-50 px-6 py-20 sm:px-10 lg:px-20 lg:py-28">
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-orange-300/20 blur-3xl" />
        <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-orange-900/10 blur-3xl" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-orange-700">
              Come dressed for the moment
            </p>
            <h2 className="mt-4 text-5xl font-black leading-[0.92] tracking-[-0.06em] text-[#7c2d12] sm:text-7xl">
              WCC
              <br />
              <span className="text-[#b45309]">Dress</span>
            </h2>
            <div className="mt-7 wcc-flag-line w-20" />
            <p className="mt-6 max-w-md text-base leading-8 text-orange-950/70 sm:text-lg">
              You can now preorder! Check the official WCC dress guide and show
              up with confidence for the Takeover Generation.
            </p>

            <a
              href="https://wa.me/2349030786640?text=Hello%20please%20i%20want%20to%20get%20the%20WCC%20T-shirt."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg bg-orange-700 px-6 py-3 font-semibold text-white transition hover:bg-orange-800"
            >
              Order Now
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="relative overflow-hidden rounded-xl border border-orange-200 bg-white p-2 shadow-[0_24px_70px_rgba(124,45,18,0.18)]"
          >
            <img
              src={WCC_DRESS_IMAGE_URL}
              alt="WCC 2026 dress guide"
              loading="lazy"
              decoding="async"
              className="h-auto max-h-[44rem] w-full rounded-xl object-contain"
            />
          </motion.div>
        </div>
      </section>

      {/* ========================= CHILD REGISTRATION ========================= */}
<section className="relative overflow-hidden bg-[#2b1008] px-4 py-16 text-white sm:px-8 sm:py-24 lg:px-12 lg:py-28">
  <div className="pointer-events-none absolute -left-28 top-10 h-72 w-72 rounded-full bg-orange-500/15 blur-3xl" />
  <div className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-amber-400/10 blur-3xl" />
  <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,237,213,0.45)_1px,transparent_1px),linear-gradient(90deg,rgba(255,237,213,0.45)_1px,transparent_1px)] [background-size:48px_48px]" />

  <div className="relative mx-auto grid max-w-6xl items-start gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
    <div className="lg:sticky lg:top-10">
      <div className="mb-6 flex items-center gap-3">
        <span className="h-px w-10 bg-orange-300" />
        <span className="text-[10px] font-black uppercase tracking-[0.32em] text-orange-200">
          Next generation
        </span>
      </div>

      <h2 className="max-w-md text-[clamp(3rem,8vw,5.75rem)] font-black leading-[0.88] tracking-[-0.07em] text-white">
        A place to
        <span className="block text-orange-300">belong.</span>
      </h2>

      <p className="mt-7 max-w-md text-base leading-8 text-orange-50/70 sm:text-lg">
        Give your child a place to connect, grow, and experience 
        WCC 2026.
      </p>

      <div className="mt-9 flex items-center gap-4 rounded-2xl border border-orange-200/15 bg-white/[0.06] p-4 sm:max-w-sm">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-300 text-orange-950">
          <span className="text-lg font-black">01</span>
        </div>

        <div>
          <p className="text-sm font-bold text-white">Simple registration</p>
          <p className="mt-0.5 text-xs leading-5 text-orange-100/55">
            Just a few details to help us prepare.
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => {
          setChildFormOpen((open) => !open);
          setChildSubmitted(false);
        }}
        className="mt-8 inline-flex items-center gap-3 rounded-xl bg-orange-300 px-6 py-3.5 text-sm font-black text-orange-950 shadow-xl shadow-black/20 transition hover:-translate-y-0.5 hover:bg-orange-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-200 focus-visible:ring-offset-2 focus-visible:ring-offset-[#2b1008]"
        aria-expanded={childFormOpen}
        aria-controls="child-registration-form"
      >
        {childFormOpen ? "Close form" : "Register a child"}
        <ArrowUpRight size={18} />
      </button>
    </div>

    <AnimatePresence initial={false}>
      {childFormOpen && (
        <motion.div
          id="child-registration-form"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          className="overflow-hidden rounded-[1.5rem] border border-orange-100/70 bg-orange-50 text-left shadow-2xl shadow-black/30"
        >
          <div className="border-b border-orange-900/10 px-6 py-6 sm:px-9 sm:py-7">
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.28em] text-orange-700/70">
                  Child registration
                </p>

                <h3 className="mt-2 text-2xl font-black tracking-tight text-orange-950 sm:text-3xl">
                  Tell us who is coming.
                </h3>

                <p className="mt-2 max-w-lg text-sm leading-6 text-orange-900/60">
                  Add the child&apos;s details and a parent or guardian contact.
                </p>
              </div>

              
            </div>
          </div>

          <div className="px-6 py-7 sm:px-9 sm:py-9">
            {childSubmitted ? (
              <div className="py-8 text-center sm:py-12">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-orange-100">
                  <CheckCircle2 className="text-orange-600" size={30} />
                </div>

                <h3 className="mt-5 text-2xl font-black text-orange-950">
                  Child registration received
                </h3>

                <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-orange-900/65">
                  We have captured the details for your child.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleChildSubmit}
                className="grid gap-x-5 gap-y-6 sm:grid-cols-2"
              >
                <TextField
                  id="childName"
                  label="Child&apos;s full name"
                  required
                  value={childFormData.childName}
                  placeholder="Enter the child&apos;s full name"
                  onChange={handleChildChange}
                />

                <TextField
                  id="childAge"
                  label="Child&apos;s age"
                  required
                  type="number"
                  value={childFormData.childAge}
                  placeholder="Enter age"
                  onChange={handleChildChange}
                />

                <TextField
                  id="guardianName"
                  label="Parent/guardian name"
                  required
                  value={childFormData.guardianName}
                  placeholder="Enter parent or guardian name"
                  onChange={handleChildChange}
                />

                <TextField
                  id="guardianPhone"
                  label="Parent/guardian phone"
                  required
                  type="tel"
                  value={childFormData.guardianPhone}
                  placeholder="Enter phone number"
                  onChange={handleChildChange}
                />

                <button
                  type="submit"
                  className="mt-1 inline-flex items-center justify-center gap-2 rounded-xl bg-[#b45309] px-6 py-3.5 text-sm font-black text-white shadow-lg shadow-orange-950/20 transition hover:-translate-y-0.5 hover:bg-[#92400e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300 sm:col-span-2"
                >
                  Submit child registration
                  <ArrowUpRight size={17} />
                </button>
              </form>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
</section>


      {/* ========================= PARTNER WITH US ========================= */}
      <PartnerSection onHandshakeClick={scrollToRegistration} />

      <Footer />
    </main>
  );
}
