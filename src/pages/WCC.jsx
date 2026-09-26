import { useState } from "react";
import Footer from "../components/Footer";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  Loader2,
  Mail,
  MapPin,
  Phone,
  User,
  Church,
} from "lucide-react";

// TODO (Google Sheets + email): paste the Google Apps Script Web App URL here.
const GOOGLE_SHEETS_ENDPOINT = "PASTE_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE";

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
  locationDetail: "",
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
  return `w-full rounded-2xl border bg-white/90 py-3.5 text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 focus:bg-white focus:ring-4 ${
    withIcon ? "pl-12 pr-4" : "px-4"
  } ${
    hasError
      ? "border-red-400 focus:border-red-400 focus:ring-red-100"
      : "border-slate-200 focus:border-orange-700 focus:ring-orange-100/80 hover:border-slate-300"
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
        className="mb-2.5 block text-sm font-semibold tracking-[-0.01em] text-slate-700"
      >
        {label} {required && <span className="text-orange-700">*</span>}
      </label>
      <div className="relative">
        {Icon && (
          <Icon
            size={18}
            strokeWidth={1.8}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
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
        <p id={errorId} className="mt-1.5 text-xs font-medium text-red-500">
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
        className="mb-2.5 block text-sm font-semibold tracking-[-0.01em] text-slate-700"
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
        <p id={errorId} className="mt-1.5 text-xs font-medium text-red-500">
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
}) {
  const errorId = `${id}-error`;
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2.5 block text-sm font-semibold tracking-[-0.01em] text-slate-700"
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
          className={`${fieldClasses(!!error, false)} appearance-none pr-11`}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown
          size={18}
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
        />
      </div>
      {error && (
        <p id={errorId} className="mt-1.5 text-xs font-medium text-red-500">
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

const LOCATION_OPTIONS = [
  { value: "owerri", label: "Owerri" },
  { value: "outside", label: "Outside Owerri" },
];

const UNIT_OPTIONS = UNITS.map((unit) => ({ value: unit, label: unit }));

export default function WCC() {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [registrationId, setRegistrationId] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    const key = name;

    setFormData((prev) => {
      const updated = { ...prev, [key]: value };
      if (key === "isTrueLighter") {
        if (value === "yes") {
          updated.church = "";
          updated.locationScope = "";
          updated.locationDetail = "";
        } else if (value === "no") {
          updated.isWorker = "";
          updated.unit = "";
        }
      }
      if (key === "isWorker" && value === "no") updated.unit = "";
      if (key === "locationScope" && value === "owerri")
        updated.locationDetail = "";
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
        delete next.locationDetail;
      }
      if (key === "isWorker") delete next.unit;
      if (key === "locationScope") delete next.locationDetail;
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
          "Please let us know where you are coming from.";
      else if (
        formData.locationScope === "outside" &&
        !formData.locationDetail.trim()
      ) {
        newErrors.locationDetail =
          "Please tell us which state or country you are coming from.";
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

    try {
      if (!GOOGLE_SHEETS_ENDPOINT.startsWith("PASTE_")) {
        await fetch(GOOGLE_SHEETS_ENDPOINT, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify({
            ...formData,
            registrationId: id,
            checkInCode: id,
            submittedAt: new Date().toISOString(),
          }),
        });
      } else {
        await new Promise((resolve) => setTimeout(resolve, 1200));
      }
      setRegistrationId(id);
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
      className="min-h-screen bg-white font-sans text-slate-900 antialiased selection:bg-orange-200 selection:text-orange-950"
      style={{
        fontFamily:
          "'Aderio Trial Family', 'Aderio', 'Trebuchet MS', ui-sans-serif, system-ui, sans-serif",
      }}
    >
      {/* ========================= HERO ========================= */}
      <section className="relative flex min-h-[94vh] items-center overflow-hidden bg-[#1746a2] text-white lg:min-h-[760px]">
        <img
          src="/wcc.jpg"
          alt="Truelight Glory House WCC"
          className="absolute inset-0 h-full w-full scale-105 object-cover blur-[2px] brightness-[0.58] saturate-[0.8]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(118deg,rgba(23,70,162,0.88)_0%,rgba(36,89,189,0.82)_48%,rgba(63,112,214,0.68)_78%,rgba(154,63,18,0.30)_100%)]" />
        <div className="absolute -right-24 top-20 h-72 w-72 rounded-full border border-orange-200/15 bg-orange-300/5 blur-2xl" />
        <div className="absolute -bottom-36 left-1/3 h-80 w-80 rounded-full border border-white/10 bg-white/5 blur-3xl" />

        <div className="relative z-10 mx-auto grid w-full max-w-none items-center gap-14 px-6 py-28 sm:px-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:px-20 lg:py-32">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.12 } },
            }}
            className="max-w-3xl"
          >
            <motion.div
              variants={fadeUp}
              className="mb-7 inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-orange-100 backdrop-blur-md"
            >
              <span className="h-2 w-2 rounded-full bg-orange-400 shadow-[0_0_16px_rgba(251,146,60,0.9)]" />
              Truelight Glory House
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="max-w-xl text-6xl font-semibold leading-[0.92] tracking-[-0.07em] text-white sm:text-8xl lg:text-[8.5rem]"
            >
              WCC<span className="text-orange-400">.</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-7 max-w-xl text-2xl font-medium leading-tight text-orange-50 sm:text-3xl"
            >
              A place of connection, growth, and purpose.
            </motion.p>
            <motion.p
              variants={fadeUp}
              className="mt-5 max-w-lg font-sans text-base leading-8 text-blue-50/75 sm:text-lg"
            >
              Join us this season. Complete the registration below and tell us a
              little about yourself.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-10 flex flex-col gap-4 sm:flex-row"
            >
              <button
                onClick={scrollToRegistration}
                className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-[#9a3f12] px-7 py-4 font-semibold text-white shadow-xl shadow-orange-950/30 transition-all hover:-translate-y-0.5 hover:bg-[#7d310d]"
              >
                Register now
                <ArrowUpRight
                  size={18}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </button>
              <button
                onClick={scrollToRegistration}
                className="inline-flex items-center justify-center rounded-2xl border border-white/30 bg-white/5 px-7 py-4 font-semibold text-white backdrop-blur-sm transition-all hover:border-orange-300/70 hover:bg-white/10"
              >
                Learn more
              </button>
            </motion.div>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.45, duration: 0.7 }}
            className="hidden lg:block"
          >
            <div className="relative overflow-hidden rounded-[2rem] border border-white/20 bg-white/[0.11] p-6 shadow-2xl shadow-black/20 ">
              <div className="absolute left-0 top-0 h-full w-1 bg-[#9a3f12]" />
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-orange-200">
                The WCC experience
              </p>
              <div className="mt-8 space-y-6">
                {[
                  ["01", "Connect", "Find people who feel like home."],
                  ["02", "Grow", "Build faith, courage, and purpose."],
                  ["03", "Serve", "Bring your gifts into the room."],
                ].map(([number, title, copy]) => (
                  <div
                    key={number}
                    className="flex gap-4 border-b border-white/10 pb-5 last:border-0 last:pb-0"
                  >
                    <span className="font-mono text-xs text-orange-300">
                      {number}
                    </span>
                    <div>
                      <h3 className="text-xl text-white">{title}</h3>
                      <p className="mt-1 text-sm leading-6 text-blue-50/65">
                        {copy}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 h-px w-20 bg-[#9a3f12]" />
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
        <div className="absolute left-0 top-0 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#9a3f12]/5 blur-3xl" />
        <div className="relative mx-auto max-w-none px-6 text-center lg:px-20 lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="font-mono text-sm font-bold uppercase tracking-[0.2em] text-orange-700">
              Registration
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-[#123b8f] sm:text-5xl">
              Let&apos;s get to know you
            </h2>
            <div className="mt-7 flex items-center gap-4 lg:max-w-3xl">
              <span className="h-[3px] w-20 bg-[#9a3f12]" />
              <p className="max-w-2xl font-sans leading-8 text-slate-600">
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
        className="relative overflow-hidden bg-slate-50 py-16 sm:py-24 lg:py-32"
      >
        <div className="absolute right-0 top-20 h-72 w-72 translate-x-1/3 rounded-full bg-orange-900/5 blur-3xl" />
        <div className="relative grid w-full lg:grid-cols-[36%_64%]">
          <aside className="relative flex min-h-[540px] flex-col justify-between overflow-hidden bg-[#1746a2] px-6 py-14 text-white sm:px-10 lg:min-h-[780px] lg:px-16 lg:py-20">
            <div className="absolute right-0 top-0 h-full w-2 bg-[#9a3f12]" />
            <div className="absolute left-8 top-28 hidden h-44 w-px bg-white/25 lg:block" />
            <div className="absolute bottom-16 left-8 hidden h-20 w-px bg-[#9a3f12] lg:block" />
            <div className="relative pl-0 lg:pl-10">
              <div className="mb-8 flex items-center gap-4">
                <span className="h-[3px] w-14 bg-[#9a3f12]" />
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-orange-200">
                  02 / WCC
                </span>
              </div>
              <h2 className="max-w-md text-5xl font-semibold leading-[0.92] tracking-[-0.06em] text-white sm:text-6xl lg:text-7xl">
                Make your
                <br />
                <span className="text-orange-300">next step.</span>
              </h2>
              <p className="mt-8 max-w-sm font-sans text-base leading-8 text-blue-50/70 sm:text-lg">
                A simple registration is the beginning of a meaningful
                connection. Tell us where you are coming from and what you are
                hoping to discover.
              </p>
            </div>
            <div className="relative mt-14 grid max-w-md gap-5 pl-0 sm:grid-cols-3 lg:pl-10">
              {[
                ["01", "Connect"],
                ["02", "Grow"],
                ["03", "Serve"],
              ].map(([number, label]) => (
                <div key={number} className="border-t-2 border-white/20 pt-3">
                  <span className="font-mono text-xs text-orange-300">
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
            <div className="relative overflow-hidden border-b border-slate-200 bg-white px-6 py-10 text-[#1746a2] sm:px-10 lg:px-16 lg:py-14">
              <div className="absolute bottom-0 left-0 h-2 w-28 bg-[#9a3f12]" />
              <div className="relative">
                <div className="mb-5 flex items-center gap-4">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-[#9a3f12]">
                    Your details
                  </span>
                  <span className="h-px w-16 bg-[#9a3f12]" />
                </div>
                <h2 className="max-w-2xl text-4xl font-semibold leading-[0.95] tracking-[-0.06em] text-[#1746a2] sm:text-5xl lg:text-6xl">
                  Register your details
                </h2>
                <p className="mt-5 max-w-lg font-sans text-sm leading-6 text-slate-500 sm:text-base">
                  Fields marked with an asterisk (
                  <span className="text-[#9a3f12]">*</span>) are required.
                </p>
              </div>
            </div>

            {submitted ? (
              <div role="status" className="px-6 py-16 text-center sm:px-10">
                <p className="text-sm font-bold uppercase tracking-[0.24em] text-orange-700">
                  Your check-in number
                </p>
                <div
                  className="mt-4 text-7xl font-black tracking-[0.12em] text-[#123b8f] sm:text-8xl"
                  aria-label={`Your check-in number is ${registrationId}`}
                >
                  {registrationId}
                </div>
                <div className="mx-auto mt-6 flex h-12 w-12 items-center justify-center rounded-full bg-orange-50">
                  <CheckCircle2 size={27} className="text-orange-700" />
                </div>
                <h3 className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-[#123b8f]">
                  Registration successful
                </h3>
                <p className="mt-2 font-sans text-sm text-slate-500">
                  Save this number and bring it with you for check-in.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-8 rounded-2xl bg-[#9a3f12] px-6 py-3.5 font-semibold text-white shadow-lg shadow-orange-950/20 transition-all hover:-translate-y-0.5 hover:bg-[#7d310d]"
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
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-orange-100 text-orange-800">
                      <User size={18} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#123b8f]">
                        Personal information
                      </h3>
                      <p className="text-xs text-slate-500">
                        Tell us about yourself
                      </p>
                    </div>
                  </div>
                  <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
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
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-2 border-t border-slate-200 pt-7">
                    <div className="mb-4 flex items-center gap-3">
                      <span className="h-[3px] w-10 bg-[#9a3f12]" />
                      <span className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#1746a2]">
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
                    />
                    <AnimatePresence mode="wait">
                      {formData.isTrueLighter === "yes" && (
                        <motion.div
                          key="member-branch"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25 }}
                          className="mt-5 space-y-5 overflow-hidden"
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
                          className="mt-5 space-y-5 overflow-hidden"
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
                            label="Are you coming from Owerri or outside Owerri?"
                            required
                            value={formData.locationScope}
                            error={errors.locationScope}
                            placeholder="Select an option"
                            options={LOCATION_OPTIONS}
                            onChange={handleChange}
                          />
                          <AnimatePresence mode="wait">
                            {formData.locationScope === "outside" && (
                              <motion.div
                                key="location-detail"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.25 }}
                                className="overflow-hidden"
                              >
                                <TextField
                                  id="locationDetail"
                                  label="Which state or country are you coming from?"
                                  required
                                  icon={MapPin}
                                  value={formData.locationDetail}
                                  error={errors.locationDetail}
                                  placeholder="e.g. Lagos, or United Kingdom"
                                  onChange={handleChange}
                                />
                              </motion.div>
                            )}
                          </AnimatePresence>
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
                <div className="mt-8 border-t border-slate-100 pt-8">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#9a3f12] px-6 py-4 font-semibold text-white shadow-lg shadow-orange-950/20 transition-all hover:-translate-y-0.5 hover:bg-[#7d310d] disabled:cursor-not-allowed disabled:opacity-70"
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
                  <p className="mt-4 text-center text-xs leading-5 text-slate-500">
                    By submitting this form, you agree to provide your
                    information for registration and communication purposes.
                    You&apos;ll receive a check-in code by email — keep it for
                    the day of the event.
                  </p>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
