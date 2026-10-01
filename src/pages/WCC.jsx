import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  Loader2,
  Mail,
  Phone,
  User,
  Church,
} from "lucide-react";

// Paste the deployed Google Apps Script Web App URL here.
const GOOGLE_SHEETS_ENDPOINT = "https://script.google.com/macros/s/AKfycbwbWyC76YVzj4_uktbiR2683dmpLSiBXmC-deICx26nmX5lMJiRTYuA_Hk4rf_9HTdX/exec";

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
    <div className="grid grid-cols-4 gap-2 sm:max-w-xl sm:gap-3">
      {[
        [countdown.days, "Days"],
        [countdown.hours, "Hours"],
        [countdown.minutes, "Minutes"],
        [countdown.seconds, "Seconds"],
      ].map(([value, label]) => (
        <div
          key={label}
          className="rounded-lg border border-white/25 bg-[#7c2d12]/60 px-2 py-2 text-center shadow-lg shadow-orange-950/20 backdrop-blur-md sm:px-3 sm:py-3"
        >
          <div className="text-xl font-black tabular-nums text-white sm:text-3xl">
            {String(value).padStart(2, "0")}
          </div>
          <div className="mt-1 text-[8px] font-bold uppercase tracking-[0.14em] text-orange-200 sm:text-[9px]">
            {label}
          </div>
        </div>
      ))}
    </div>
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

  const handleChildSubmit = (e) => {
    e.preventDefault();
    setChildSubmitted(true);
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
          updated.needsAccommodation = "";
          updated.isPastor = "";
          updated.pastorChurch = "";
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
        delete next.needsAccommodation;
        delete next.isPastor;
        delete next.pastorChurch;
      }
      if (key === "isWorker") delete next.unit;
      if (key === "locationScope") {
        delete next.needsAccommodation;
        delete next.isPastor;
        delete next.pastorChurch;
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
      document
        .getElementById("registration")
        ?.scrollIntoView({ behavior: "smooth" });
    } catch (err) {
      console.error("Submission failed", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToRegistration = () => {
    document
      .getElementById("registration")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main
      className="min-h-screen bg-white text-orange-950 antialiased selection:bg-orange-200 selection:text-orange-950"
      style={{
        fontFamily:
          "'Adero Trial Family', 'Adero', 'Trebuchet MS', ui-sans-serif, system-ui, sans-serif",
        fontSize: "15px",
      }}
    >
      {/* ========================= HERO ========================= */}
      <section
        className="relative flex min-h-[100svh] items-center overflow-hidden bg-[#3b160b] text-white"
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
              "radial-gradient(ellipse at 50% 98%, rgba(245,122,20,0.42) 0%, rgba(151,58,12,0.22) 25%, transparent 52%), radial-gradient(ellipse at 50% 35%, rgba(160,62,12,0.58) 0%, transparent 62%), linear-gradient(145deg, #7a2b0b 0%, #54200c 48%, #2b1209 100%)",
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
        <div aria-hidden="true" className="pointer-events-none absolute left-[7%] top-24 hidden h-px w-24 bg-white/55 lg:block" />
        <div aria-hidden="true" className="pointer-events-none absolute right-[9%] top-28 hidden h-36 w-px bg-white/35 lg:block" />
        <div aria-hidden="true" className="pointer-events-none absolute right-[7%] top-[17rem] hidden h-px w-28 rotate-[28deg] bg-white/45 lg:block" />
        <div aria-hidden="true" className="pointer-events-none absolute bottom-24 left-[12%] hidden h-px w-32 bg-white/35 lg:block" />
        <div aria-hidden="true" className="pointer-events-none absolute left-5 top-[27%] h-px w-12 bg-white/45 sm:hidden" />
        <div aria-hidden="true" className="pointer-events-none absolute right-5 top-[39%] h-16 w-px bg-white/35 sm:hidden" />
        <div aria-hidden="true" className="pointer-events-none absolute bottom-[19%] left-[15%] h-px w-20 rotate-[-24deg] bg-white/40 sm:hidden" />
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-[#170b06] via-[#4a1c0a]/60 to-transparent" />
        <div aria-hidden="true" className="absolute -right-16 top-16 h-52 w-52 rounded-full border border-orange-200/15 bg-orange-300/5 blur-2xl" />
        <div aria-hidden="true" className="absolute -bottom-24 left-1/3 h-60 w-60 rounded-full border border-white/10 bg-white/5 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-24 sm:h-32">
          <div className="absolute bottom-0 left-[-4%] h-20 w-14 rounded-[48%_48%_12%_12%] bg-[#16070a] shadow-[0_0_24px_rgba(255,119,25,0.28)] sm:h-28 sm:w-20" />
          <div className="absolute bottom-0 left-[18%] h-16 w-10 rounded-[45%_45%_10%_10%] bg-[#1b080a] sm:h-24 sm:w-14" />
          <div className="absolute bottom-0 left-[42%] h-24 w-16 rounded-[48%_48%_10%_10%] bg-[#16070a] shadow-[0_0_24px_rgba(255,119,25,0.25)] sm:h-32 sm:w-20" />
          <div className="absolute bottom-0 right-[18%] h-16 w-10 rounded-[45%_45%_10%_10%] bg-[#1b080a] sm:h-24 sm:w-14" />
          <div className="absolute bottom-0 right-[-3%] h-20 w-14 rounded-[48%_48%_12%_12%] bg-[#16070a] shadow-[0_0_24px_rgba(255,119,25,0.28)] sm:h-28 sm:w-20" />
          <div className="absolute bottom-16 left-[2%] h-5 w-2 rounded-full bg-orange-300 shadow-[0_0_14px_6px_rgba(255,117,15,0.72)] sm:bottom-20 sm:h-6" />
          <div className="absolute bottom-12 left-[45%] h-5 w-2 rounded-full bg-orange-300 shadow-[0_0_14px_6px_rgba(255,117,15,0.72)] sm:bottom-28 sm:h-6" />
          <div className="absolute bottom-16 right-[2%] h-5 w-2 rounded-full bg-orange-300 shadow-[0_0_14px_6px_rgba(255,117,15,0.72)] sm:bottom-20 sm:h-6" />
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-[980px] flex-col items-center gap-5 px-5 py-10 text-center sm:px-8 sm:py-12 lg:gap-6 lg:px-12 lg:py-14">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.12 } },
            }}
            className="flex w-full max-w-3xl flex-col items-center lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-14 lg:gap-y-3"
          >
            <motion.h1
              variants={fadeUp}
              className="relative -left-3 max-w-xl text-center text-4xl font-black leading-[0.92] tracking-[-0.07em] text-white sm:left-0 sm:text-6xl lg:col-start-1 lg:row-start-1 lg:justify-self-start lg:text-left lg:text-[5.25rem] xl:text-[5.75rem]"
            >
              WCC <span className="text-[#d97706]">2026</span>
            </motion.h1>

            <motion.div
              variants={fadeUp}
              className="relative left-3 mx-auto mt-4 max-w-md sm:left-0 lg:col-start-2 lg:row-start-1 lg:ml-8 lg:mt-2 lg:justify-self-start"
            >
              <img
                src={WCC_LOGO_URL}
                alt="The Takeover Generation"
                loading="eager"
                decoding="async"
                className="mx-auto w-full max-w-[16rem] rounded-xl object-contain object-center shadow-[0_12px_40px_rgba(67,20,7,0.38)] sm:max-w-[20rem] lg:max-w-[24rem] lg:object-left"
              />
            </motion.div>
            <motion.div variants={fadeUp} className="relative -left-2 mt-5 w-full max-w-xl sm:left-0 lg:col-start-2 lg:row-start-2 lg:ml-16 lg:justify-self-start">
              <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.22em] text-orange-200">
                Countdown to 11 November 2026
              </p>
              <div className="mx-auto max-w-xl text-left">
                <Countdown />
              </div>
            </motion.div>
            <motion.p
              variants={fadeUp}
              className="relative left-2 mx-auto mt-3 max-w-md text-center text-sm leading-6 text-orange-50/80 sm:left-0 sm:text-base lg:col-start-1 lg:row-start-2 lg:ml-6 lg:justify-self-start lg:text-left"
            >
              Join us this season. Complete the registration below and tell us a
              little about yourself.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="relative -left-1 mt-6 flex flex-col justify-center gap-3 sm:left-0 sm:flex-row lg:col-start-1 lg:row-start-3 lg:ml-6 lg:justify-self-start"
            >
              <button
                onClick={scrollToRegistration}
                className="group inline-flex items-center justify-center gap-2 rounded-lg bg-[#b45309] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-950/40 transition-all hover:-translate-y-0.5 hover:bg-[#92400e]"
              >
                Register now
                <ArrowUpRight
                  size={18}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </button>
              <button
                onClick={scrollToRegistration}
                className="inline-flex items-center justify-center rounded-lg border border-white/30 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-orange-300/70 hover:bg-white/10"
              >
                Learn more
              </button>
            </motion.div>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.45, duration: 0.7 }}
            className="hidden"
          >
            <div className="relative overflow-hidden rounded-xl border border-white/20 bg-white/[0.11] p-5 text-left shadow-xl shadow-black/20 backdrop-blur-sm">
              <div className="absolute left-0 top-0 h-full w-[2px] bg-[#b45309]" />
              <p className="text-[10px] uppercase tracking-[0.24em] text-orange-200">
                The WCC experience
              </p>
              <div className="mt-6 space-y-5">
                {[
                  ["01", "Connect", "Find people who feel like home."],
                  ["02", "Grow", "Build faith, courage, and purpose."],
                  ["03", "Serve", "Bring your gifts into the room."],
                ].map(([number, title, copy]) => (
                  <div
                    key={number}
                    className="flex gap-3 border-b border-white/10 pb-4 last:border-0 last:pb-0"
                  >
                    <span className="text-xs text-orange-300">
                      {number}
                    </span>
                    <div>
                      <h3 className="text-lg text-white">{title}</h3>
                      <p className="mt-1 text-xs leading-5 text-orange-50/70">
                        {copy}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-5 h-px w-16 bg-[#b45309]" />
            </div>
          </motion.aside>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60">
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-xs tracking-wide">Scroll to register</span>
            <ChevronDown size={18} />
          </motion.div>
        </div>
      </section>

      {/* ========================= INTRO ========================= */}
      <section className="relative overflow-hidden bg-white py-20 sm:py-28">
        <div className="absolute left-0 top-0 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#b45309]/5 blur-3xl" />
        <div className="relative mx-auto max-w-none px-6 text-center lg:px-20 lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-700">
              Registration
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-[#92400e] sm:text-5xl">
              Let&apos;s get to know you
            </h2>
            <div className="mt-7 flex items-center gap-4 lg:max-w-3xl">
              <span className="h-[2px] w-20 bg-[#b45309]" />
              <p className="max-w-2xl leading-8 text-orange-900/75">
                Fill out the form below with your details. It helps us prepare
                for your visit and connect you with the right team.
              </p>
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
                <span className="h-[2px] w-14 bg-[#b45309]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-orange-200">
                  02 / WCC
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
                  <span className="text-xs text-orange-300">
                    {number}
                  </span>
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
              <div className="absolute bottom-0 left-0 h-[2px] w-28 bg-[#b45309]" />
              <div className="relative">
                <div className="mb-5 flex items-center gap-4">
                  <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#92400e]">
                    Your details
                  </span>
                  <span className="h-px w-16 bg-[#b45309]" />
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
              <div role="status" className="px-6 py-16 text-center sm:px-10">
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
                      <span className="h-[2px] w-10 bg-[#b45309]" />
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
                          <AnimatePresence initial={false}>
                            {formData.isPastor === "yes" && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.25 }}
                                className="overflow-hidden"
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
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <div className="sm:col-span-2 border-l-2 border-orange-500/70 pl-4 sm:pl-5">
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
      <section className="relative overflow-hidden bg-orange-50 px-6 py-20 sm:px-10 lg:px-20 lg:py-28">
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
            <div className="mt-7 h-1 w-20 bg-[#b45309]" />
            <p className="mt-6 max-w-md text-base leading-8 text-orange-950/70 sm:text-lg">
              Check the official WCC dress guide and prepare to show up with
              confidence for the Takeover Generation.
            </p>
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

      <section className="relative overflow-hidden bg-[#7c2d12] px-6 py-20 text-white sm:px-10 lg:px-20">
        <div className="absolute -right-20 top-0 h-72 w-72 rounded-full bg-orange-400/20 blur-3xl" />
        <div className="relative mx-auto max-w-5xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-orange-200">
            For the next generation
          </p>
          <h2 className="mt-4 text-5xl font-black tracking-[-0.06em] text-white sm:text-7xl">
            Register your child
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-orange-50/80">
            Give your child a place to connect, grow, and experience the joy of
            WCC 2026.
          </p>
          <button
            type="button"
            onClick={() => {
              setChildFormOpen((open) => !open);
              setChildSubmitted(false);
            }}
            className="mt-8 inline-flex items-center gap-3 rounded-xl bg-orange-400 px-8 py-4 font-black text-orange-950 shadow-xl shadow-orange-950/30 transition hover:-translate-y-1 hover:bg-orange-300"
            aria-expanded={childFormOpen}
            aria-controls="child-registration-form"
          >
            {childFormOpen ? "Close form" : "Register"}
            <ArrowUpRight size={18} />
          </button>

          <AnimatePresence initial={false}>
            {childFormOpen && (
              <motion.div
                id="child-registration-form"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="mx-auto mt-10 max-w-3xl rounded-xl border border-orange-200/30 bg-white p-6 text-left shadow-xl shadow-orange-950/30 sm:p-10"
              >
                {childSubmitted ? (
                  <div className="py-8 text-center">
                    <CheckCircle2
                      className="mx-auto text-orange-600"
                      size={42}
                    />
                    <h3 className="mt-4 text-2xl font-black text-orange-950">
                      Child registration received
                    </h3>
                    <p className="mt-2 text-orange-900/70">
                      We have captured the details for your child.
                    </p>
                  </div>
                ) : (
                  <form
                    onSubmit={handleChildSubmit}
                    className="grid gap-6 sm:grid-cols-2"
                  >
                    <div className="sm:col-span-2">
                      <h3 className="text-2xl font-black text-orange-950">
                        Child details
                      </h3>
                      <p className="mt-1 text-sm text-orange-900/65">
                        Please provide the child&apos;s details and a parent or
                        guardian contact.
                      </p>
                    </div>
                    <TextField
                      id="childName"
                      label="Child's full name"
                      required
                      value={childFormData.childName}
                      placeholder="Enter the child's full name"
                      onChange={handleChildChange}
                    />
                    <TextField
                      id="childAge"
                      label="Child's age"
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
                      className="sm:col-span-2 rounded-xl bg-[#b45309] px-6 py-4 font-black text-white shadow-lg shadow-orange-950/20 transition hover:-translate-y-0.5 hover:bg-[#92400e]"
                    >
                      Submit child registration
                    </button>
                  </form>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <Footer />
    </main>
  );
}
