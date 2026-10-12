import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import { TextField, TextAreaField, SelectField } from "../components/wcc/FormFields";
import { INITIAL_FORM_DATA, CHILD_INITIAL_DATA, YES_NO_OPTIONS, UNIT_OPTIONS,
  HERO_IMAGE_URL, NEXT_STEP_IMAGE_URL, getCountdown } from "../lib/wcc/config";
import { buildAdultRegistration, buildChildRegistration, validateAdultRegistration } from "../lib/wcc/forms";
import { sendRegistration } from "../lib/wcc/registration";
import { AnimatePresence, motion as Motion } from "framer-motion";
import {
  ArrowUpRight,
  CheckCircle2,
  Loader2,
  Mail,
  MapPin,
  Phone,
  User,
  Church,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function WCC() {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState("");
  const [isChildSubmitting, setIsChildSubmitting] = useState(false);
  const [childSubmissionError, setChildSubmissionError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [registrationId, setRegistrationId] = useState("");
  const [checkInCode, setCheckInCode] = useState("");
  const [countdown, setCountdown] = useState(getCountdown);
  const [childFormOpen, setChildFormOpen] = useState(false);
  const [childFormData, setChildFormData] = useState(CHILD_INITIAL_DATA);
  const [childSubmitted, setChildSubmitted] = useState(false);
  const [childEmailSent, setChildEmailSent] = useState(null);
  const [emailSent, setEmailSent] = useState(null);
  const [alreadyRegistered, setAlreadyRegistered] = useState(false);
  const [childRegistration, setChildRegistration] = useState(null);

  useEffect(() => {
    const interval = window.setInterval(
      () => setCountdown(getCountdown()),
      1000,
    );
    return () => window.clearInterval(interval);
  }, []);

  const handleChildChange = (e) => {
    const { name, value } = e.target;
    setChildFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleChildSubmit = async (e) => {
    e.preventDefault();
    setChildSubmissionError("");
    const childName = childFormData.childName.trim();
    const childAge = childFormData.childAge.trim();
    const guardianName = childFormData.guardianName.trim();
    const guardianPhone = childFormData.guardianPhone.trim();
    const guardianEmail = childFormData.guardianEmail.trim();
    if (!childName || !childAge || !guardianName || !guardianPhone) {
      setChildSubmissionError("Please complete the child and parent/guardian details.");
      return;
    }
    if (!Number.isFinite(Number(childAge)) || Number(childAge) < 0 || Number(childAge) > 17) {
      setChildSubmissionError("Please enter a valid age from 0 to 17.");
      return;
    }
    if (guardianEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(guardianEmail)) {
      setChildSubmissionError("Please enter a valid parent/guardian email address.");
      return;
    }
    setIsChildSubmitting(true);
    const payload = buildChildRegistration({ childName, childAge, guardianName, guardianPhone, guardianEmail });
    try {
      const result = await sendRegistration(payload);
      setChildEmailSent(result.emailSent ?? null);
      setChildRegistration(result);
      setChildSubmitted(true);
      setChildFormData(CHILD_INITIAL_DATA);
    } catch (error) {
      console.error("Child registration failed:", error);
      setChildSubmissionError(error?.message || "Child registration failed. Please try again.");
    } finally {
      setIsChildSubmitting(false);
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
        } else if (value === "no") {
          updated.isWorker = "";
          updated.unit = "";
        }
      }
      if (key === "isWorker" && value === "no") updated.unit = "";
      if (key === "locationScope" && value === "no") {
        updated.locationDetail = "";
      }
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
      }
      if (key === "isWorker") delete next.unit;
      if (key === "locationScope") delete next.locationDetail;
      return next;
    });
  };

  const validateForm = () => {
    const newErrors = validateAdultRegistration(formData);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmissionError("");
    if (!validateForm()) return;
    setIsSubmitting(true);
    const payload = buildAdultRegistration(formData);

    try {
      const result = await sendRegistration(payload);
      setEmailSent(result.emailSent ?? null);
      setRegistrationId(result.registrationId);
      setCheckInCode(result.checkInCode);
      setAlreadyRegistered(Boolean(result.duplicate));
      setSubmitted(true);
      setFormData(INITIAL_FORM_DATA);
      document.getElementById("registration")?.scrollIntoView({ behavior: "smooth" });
    } catch (err) {
      console.error("Registration submission failed:", err);
      setSubmissionError(err?.message || "Registration could not be confirmed. Please try again.");
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
      className="min-h-screen bg-white font-sans text-orange-950 antialiased selection:bg-orange-200 selection:text-orange-950"
      style={{
        fontFamily:
          "'Aderio Trial Family', 'Aderio', 'Trebuchet MS', ui-sans-serif, system-ui, sans-serif",
      }}
    >
      {/* ========================= HERO ========================= */}
      <section className="relative flex min-h-[94vh] items-center overflow-hidden bg-[#7c2d12] text-white lg:min-h-[760px]">
        <img
          src={HERO_IMAGE_URL}
          alt="The Takeover Generation 2026 convention artwork"
          className="absolute inset-0 h-full w-full object-cover object-center brightness-[0.62] saturate-[1.15]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(67,20,7,0.92)_0%,rgba(124,45,18,0.72)_48%,rgba(194,65,12,0.38)_100%)]" />
        <div className="absolute -right-24 top-20 h-72 w-72 rounded-full border border-orange-200/15 bg-orange-300/5 blur-2xl" />
        <div className="absolute -bottom-36 left-1/3 h-80 w-80 rounded-full border border-white/10 bg-white/5 blur-3xl" />

        <div className="relative z-10 mx-auto grid w-full max-w-none items-center gap-14 px-6 py-28 sm:px-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:px-20 lg:py-32">
          <Motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.12 } },
            }}
            className="max-w-3xl"
          >
            <Motion.div
              variants={fadeUp}
              className="mb-7 inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-orange-100 backdrop-blur-md"
            >
              <span className="h-2 w-2 rounded-full bg-orange-400 shadow-[0_0_16px_rgba(251,146,60,0.9)]" />
              Truelight Glory House
            </Motion.div>

            <Motion.h1
              variants={fadeUp}
              className="max-w-xl text-6xl font-semibold leading-[0.92] tracking-[-0.07em] text-white sm:text-8xl lg:text-[8.5rem]"
            >
              WCC <span className="text-orange-400">2026</span>
            </Motion.h1>

            <Motion.p
              variants={fadeUp}
              className="mt-7 max-w-xl text-2xl font-medium leading-tight text-orange-50 sm:text-3xl"
            >
              The Takeover Generation
            </Motion.p>
            <Motion.div variants={fadeUp} className="mt-8 max-w-2xl">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-orange-200">
                Countdown to 11 November 2026
              </p>
              <div className="grid grid-cols-4 gap-2 sm:max-w-xl sm:gap-3">
                {[
                  [countdown.days, "Days"],
                  [countdown.hours, "Hours"],
                  [countdown.minutes, "Minutes"],
                  [countdown.seconds, "Seconds"],
                ].map(([value, label]) => (
                  <div
                    key={label}
                    className="rounded-2xl border border-white/25 bg-[#7c2d12]/60 px-2 py-3 text-center shadow-lg shadow-orange-950/20 backdrop-blur-md sm:px-4 sm:py-4"
                  >
                    <div className="text-2xl font-black tabular-nums text-white sm:text-4xl">
                      {String(value).padStart(2, "0")}
                    </div>
                    <div className="mt-1 text-[9px] font-bold uppercase tracking-[0.16em] text-orange-200 sm:text-[10px]">
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </Motion.div>
            <Motion.p
              variants={fadeUp}
              className="mt-5 max-w-lg font-sans text-base leading-8 text-orange-50/80 sm:text-lg"
            >
              Join us this season. Complete the registration below and tell us a
              little about yourself.
            </Motion.p>

            <Motion.div
              variants={fadeUp}
              className="mt-10 flex flex-col gap-4 sm:flex-row"
            >
              <button
                onClick={scrollToRegistration}
                className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-[#c2410c] px-7 py-4 font-semibold text-white shadow-xl shadow-orange-950/40 transition-all hover:-translate-y-0.5 hover:bg-[#9a3412]"
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
            </Motion.div>
          </Motion.div>

          <Motion.aside
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.45, duration: 0.7 }}
            className="hidden lg:block"
          >
            <div className="relative overflow-hidden rounded-[2rem] border border-white/20 bg-white/[0.11] p-6 shadow-2xl shadow-black/20 ">
              <div className="absolute left-0 top-0 h-full w-1 bg-[#c2410c]" />
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
                      <p className="mt-1 text-sm leading-6 text-orange-50/70">
                        {copy}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 h-px w-20 bg-[#c2410c]" />
            </div>
          </Motion.aside>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60">
          <Motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-xs tracking-wide">Scroll to register</span>
            <ChevronDown size={18} />
          </Motion.div>
        </div>
      </section>

      {/* ========================= INTRO ========================= */}
      <section className="relative overflow-hidden bg-white py-20 sm:py-28">
        <div className="absolute left-0 top-0 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c2410c]/5 blur-3xl" />
        <div className="relative mx-auto max-w-none px-6 text-center lg:px-20 lg:text-left">
          <Motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="font-mono text-sm font-bold uppercase tracking-[0.2em] text-orange-700">
              Registration
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-[#9a3412] sm:text-5xl">
              Let&apos;s get to know you
            </h2>
            <div className="mt-7 flex items-center gap-4 lg:max-w-3xl">
              <span className="h-[3px] w-20 bg-[#c2410c]" />
              <p className="max-w-2xl font-sans leading-8 text-orange-900/75">
                Fill out the form below with your details. It helps us prepare
                for your visit and connect you with the right team.
              </p>
            </div>
          </Motion.div>
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
            <div className="absolute right-0 top-0 h-full w-2 bg-[#c2410c]" />
            <div className="absolute left-8 top-28 hidden h-44 w-px bg-white/25 lg:block" />
            <div className="absolute bottom-16 left-8 hidden h-20 w-px bg-[#c2410c] lg:block" />
            <div className="relative pl-0 lg:pl-10">
              <div className="mb-8 flex items-center gap-4">
                <span className="h-[3px] w-14 bg-[#c2410c]" />
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-orange-200">
                  02 / WCC
                </span>
              </div>
              <h2 className="max-w-md text-5xl font-semibold leading-[0.92] tracking-[-0.06em] text-white sm:text-6xl lg:text-7xl">
                Make your
                <br />
                <span className="text-orange-300">next step.</span>
              </h2>
              <p className="mt-8 max-w-sm font-sans text-base leading-8 text-orange-50/80 sm:text-lg">
                A simple registration is the beginning of a meaningful
                connection. Tell us where you are coming from and what you are
                hoping to discover.
              </p>
              <div className="relative mt-10 overflow-hidden rounded-[2rem] border border-orange-200/25 bg-orange-950/20 shadow-2xl shadow-orange-950/30">
                <img
                  src={NEXT_STEP_IMAGE_URL}
                  alt="WCC 2026 invitation artwork"
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

          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full overflow-hidden bg-white shadow-none"
          >
            <div className="relative overflow-hidden border-b border-orange-100 bg-white px-6 py-10 text-[#7c2d12] sm:px-10 lg:px-16 lg:py-14">
              <div className="absolute bottom-0 left-0 h-2 w-28 bg-[#c2410c]" />
              <div className="relative">
                <div className="mb-5 flex items-center gap-4">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-[#9a3f12]">
                    Your details
                  </span>
                  <span className="h-px w-16 bg-[#c2410c]" />
                </div>
                <h2 className="max-w-2xl text-4xl font-semibold leading-[0.95] tracking-[-0.06em] text-[#7c2d12] sm:text-5xl lg:text-6xl">
                  Register your details
                </h2>
                <p className="mt-5 max-w-lg font-sans text-sm leading-6 text-orange-900/65 sm:text-base">
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
                  className="mt-4 text-7xl font-black tracking-[0.12em] text-[#9a3412] sm:text-8xl"
                  aria-label={`Your check-in number is ${checkInCode}`}
                >
                  {checkInCode}
                </div>
                <div className="mx-auto mt-6 flex h-12 w-12 items-center justify-center rounded-full bg-orange-50">
                  <CheckCircle2 size={27} className="text-orange-700" />
                </div>
                <h3 className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-[#9a3412]">
                  {alreadyRegistered ? "You are already registered" : "Registration successful"}
                </h3>
                <p className="mt-2 font-sans text-sm text-orange-900/65">
                  {alreadyRegistered
                    ? "This is your original registration code. No new registration was created. Save it and bring it for check-in."
                    : "Save this number and bring it with you for check-in."}
                  {emailSent === true
                    ? " Your confirmation email has been sent."
                    : emailSent === false
                      ? " Your registration is saved, but the confirmation email could not be sent. Please contact the organisers with your registration reference."
                      : ""}
                </p>
                <p className="mt-3 font-mono text-xs font-semibold tracking-wide text-orange-800/70">
                  Registration reference: {registrationId}
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-8 rounded-2xl bg-[#c2410c] px-6 py-3.5 font-semibold text-white shadow-lg shadow-orange-950/20 transition-all hover:-translate-y-0.5 hover:bg-[#9a3412]"
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
                    <div className="flex h-15 w-10 items-center justify-center rounded-2xl bg-orange-100 text-orange-800">
                      <User size={18} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#9a3412]">
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
                      <span className="h-[3px] w-10 bg-[#c2410c]" />
                      <span className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#7c2d12]">
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
                        <Motion.div
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
                              <Motion.div
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
                              </Motion.div>
                            )}
                          </AnimatePresence>
                        </Motion.div>
                      )}
                      {formData.isTrueLighter === "no" && (
                        <Motion.div
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
                        </Motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Required questions for every attendee, including True Lighters and visitors. */}
                  <section className="mt-8 border-t border-orange-100 pt-7">
                    <div className="mb-5">
                      <h4 className="text-base font-semibold text-[#9a3412]">
                        Travel, accommodation & ministry
                      </h4>
                      <p className="mt-1 text-sm leading-6 text-orange-900/65">
                        Please answer all three questions below.
                      </p>
                    </div>
                    <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
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
                        <Motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <TextField
                            id="pastorChurch"
                            label="Which church do you pastor?"
                            required
                            icon={Church}
                            value={formData.pastorChurch}
                            error={errors.pastorChurch}
                            placeholder="Enter the church name"
                            onChange={handleChange}
                          />
                        </Motion.div>
                      )}
                    </AnimatePresence>
                    <AnimatePresence mode="wait">
                      {formData.locationScope === "yes" && (
                        <Motion.div
                          key="location-detail"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden sm:col-span-2"
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
                        </Motion.div>
                      )}
                    </AnimatePresence>
                    </div>
                  </section>
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
                  {submissionError && (
                    <p role="alert" className="mb-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-800">
                      {submissionError}
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#c2410c] px-6 py-4 font-semibold text-white shadow-lg shadow-orange-950/20 transition-all hover:-translate-y-0.5 hover:bg-[#9a3412] disabled:cursor-not-allowed disabled:opacity-70"
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
          </Motion.div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#7c2d12] px-6 py-20 text-white sm:px-10 lg:px-20">
        <div className="absolute -right-20 top-0 h-72 w-72 rounded-full bg-orange-400/20 blur-3xl" />
        <div className="relative mx-auto max-w-5xl text-center">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-orange-200">
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
              setChildEmailSent(null);
              setChildSubmissionError("");
            }}
            className="mt-8 inline-flex items-center gap-3 rounded-2xl bg-orange-400 px-8 py-4 font-black text-orange-950 shadow-xl shadow-orange-950/30 transition hover:-translate-y-1 hover:bg-orange-300"
            aria-expanded={childFormOpen}
            aria-controls="child-registration-form"
          >
            {childFormOpen ? "Close form" : "Register"}
            <ArrowUpRight size={18} />
          </button>

          <AnimatePresence initial={false}>
            {childFormOpen && (
              <Motion.div
                id="child-registration-form"
                initial={{ opacity: 0, height: 0, y: -12 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0, y: -12 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="mx-auto mt-10 max-w-3xl overflow-hidden rounded-[2rem] border border-orange-200/30 bg-white p-6 text-left shadow-2xl shadow-orange-950/30 sm:p-10"
              >
                {childSubmitted ? (
                  <div className="py-8 text-center">
                    <CheckCircle2
                      className="mx-auto text-orange-600"
                      size={42}
                    />
                    <h3 className="mt-4 text-2xl font-black text-orange-950">
                      {childRegistration?.duplicate ? "This child is already registered." : "Child registration received."}
                    </h3>
                    <p className="mt-2 text-orange-900/70">
                      {childRegistration?.duplicate
                        ? "No new registration was created. Use the original code below for check-in."
                        : "We have captured the details for your child."}
                      {!childRegistration?.duplicate && (childEmailSent === true
                        ? " A confirmation email has been sent to the parent/guardian."
                        : childEmailSent === false
                          ? " The registration is saved, but the confirmation email could not be sent."
                          : " Add a parent/guardian email next time if you want an email confirmation.")}
                    </p>
                    <p className="mt-4 text-4xl font-black tracking-[0.12em] text-orange-700">
                      {childRegistration?.checkInCode}
                    </p>
                    <p className="mt-3 font-mono text-xs text-orange-800/70">
                      Registration reference: {childRegistration?.registrationId}
                    </p>
                  </div>
                ) : (
                  <form
                    onSubmit={handleChildSubmit}
                    className="grid gap-6 sm:grid-cols-2"
                    noValidate
                  >
                    {childSubmissionError && (
                      <p role="alert" className="sm:col-span-2 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-800">
                        {childSubmissionError}
                      </p>
                    )}
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
                    <TextField
                      id="guardianEmail"
                      label="Parent/guardian email (for confirmation)"
                      type="email"
                      value={childFormData.guardianEmail}
                      placeholder="parent@example.com"
                      onChange={handleChildChange}
                    />
                    <button
                      type="submit"
                      disabled={isChildSubmitting}
                      className="sm:col-span-2 rounded-2xl bg-[#c2410c] px-6 py-4 font-black text-white shadow-lg shadow-orange-950/20 transition hover:-translate-y-0.5 hover:bg-[#9a3412] disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {isChildSubmitting ? "Submitting child registration..." : "Submit child registration"}
                    </button>
                  </form>
                )}
              </Motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <Footer />
    </main>
  );
}
