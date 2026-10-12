import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import { TextField, TextAreaField, SelectField } from "../components/wcc/FormFields";
import { INITIAL_FORM_DATA, CHILD_INITIAL_DATA, YES_NO_OPTIONS, UNIT_OPTIONS,
  NEXT_STEP_IMAGE_URL, getCountdown } from "../lib/wcc/config";
import { buildAdultRegistration, buildChildRegistration, validateAdultRegistration } from "../lib/wcc/forms";
import { sendRegistration } from "../lib/wcc/registration";
import { AnimatePresence, motion as Motion } from "framer-motion";
import {
  ArrowUpRight,
  ArrowDown,
  CheckCircle2,
  Loader2,
  Mail,
  MapPin,
  Phone,
  User,
  Church,
} from "lucide-react";

const WCC_LOGO_URL =
  "https://res.cloudinary.com/dnvgl9k4i/image/upload/v1790827899/The_Takeover_Generation_Logo_2_zcvm8n.png";
const GUEST_SPEAKER_IMAGES = [
  "https://res.cloudinary.com/dnvgl9k4i/image/upload/v1790877657/PKU_PASTOR_KACHI_1_cjniyi.png",
  "https://res.cloudinary.com/dnvgl9k4i/image/upload/v1790877652/PIU2_ndy79o.png",
  "https://res.cloudinary.com/dnvgl9k4i/image/upload/v1790877656/PYD_ny5rk3.png",
  "https://res.cloudinary.com/dnvgl9k4i/image/upload/v1790877653/PVO_ypbfe8.png",
  "https://res.cloudinary.com/dnvgl9k4i/image/upload/v1790877654/PDO_ujiv6v.png",
  "https://res.cloudinary.com/dnvgl9k4i/image/upload/v1790877652/MDO_cyqopq.png",
  "https://res.cloudinary.com/dnvgl9k4i/image/upload/v1790877652/MEB_kvbeps.png",
];

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
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700;800&display=swap');
        .wcc-restored-hero .wcc-countdown {
          font-family: 'Montserrat', ui-sans-serif, system-ui, sans-serif;
        }

        .wcc-restored-hero .wcc-hero-content {
          isolation: isolate;
        }

        /* Lower the complete hero content group on desktop only. */
        @media (min-width: 1024px) {
          .wcc-restored-hero .wcc-hero-content {
            top: 3rem;
          }
        }

        .wcc-restored-hero .wcc-hero-lockup {
          position: relative;
          z-index: 7;
        }

        .wcc-restored-hero .wcc-hero-theme {
          z-index: 3;
          transform: translateY(0.35rem);
        }

        .wcc-restored-hero .wcc-hero-theme img {
          border: 1px solid rgba(255, 240, 225, 0.3);
          background: rgba(20, 7, 3, 0.18);
          box-shadow: 0 20px 55px rgba(14, 5, 2, 0.42), 0 0 0 8px rgba(245, 158, 11, 0.04);
        }

        .wcc-restored-hero .wcc-hero-title {
          position: relative;
          z-index: 1;
          font-family: 'Adero Trial Family', 'Adero', 'Trebuchet MS', sans-serif;
          filter: drop-shadow(0 18px 28px rgba(20, 7, 3, 0.24));
        }

        .wcc-restored-hero .wcc-hero-title::after {
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

        .wcc-restored-hero .wcc-hero-year {
          color: transparent;
          -webkit-text-stroke: 1px rgba(255, 240, 225, 0.72);
          text-shadow: 0 0 36px rgba(232, 111, 19, 0.22);
        }

        .wcc-restored-hero .wcc-hero-ghost {
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

        .wcc-restored-hero .wcc-hero-mark {
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
          .wcc-restored-hero .wcc-hero-ghost {
            right: -18vw;
            top: 40%;
            font-size: 27vw;
          }

          .wcc-restored-hero .wcc-hero-mark {
            left: 4%;
            top: 16%;
            font-size: 7px;
          }

          .wcc-restored-hero .wcc-hero-content .wcc-countdown {
            padding-top: 0.55rem;
            padding-bottom: 0.55rem;
          }

          .wcc-restored-hero .wcc-hero-content .wcc-countdown div.text-2xl {
            font-size: 1.35rem;
          }

          .wcc-restored-hero .wcc-hero-register button {
            padding: 0.7rem 1.15rem;
            font-size: 0.78rem;
          }

          .wcc-restored-hero .wcc-hero-scroll {
            display: none;
          }
        }

        .wcc-restored-hero .wcc-guest-speakers-hero {
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

        .wcc-restored-hero .wcc-guest-speakers-hero img {
          display: block;
          filter: saturate(0.96) contrast(1.03);
        }

        .wcc-restored-hero .wcc-hero-register {
          z-index: 12;
        }

        .wcc-restored-hero .wcc-hero-register button {
          border: 1px solid rgba(255, 240, 225, 0.32);
          background: linear-gradient(135deg, #c2410c 0%, #9a3412 100%);
          box-shadow: 0 14px 30px rgba(31, 8, 2, 0.34), inset 0 1px 0 rgba(255, 240, 225, 0.2);
          letter-spacing: 0.02em;
        }


        .wcc-restored-hero .wcc-smooth-dark-fade {
          background: linear-gradient(180deg, rgba(23, 11, 6, 0) 0%, rgba(74, 28, 10, 0.56) 54%, #170b06 100%) !important;
        }
        .wcc-restored-hero h1, .wcc-restored-hero button {
          font-family: 'Adero Trial Family', 'Adero', 'Trebuchet MS', ui-sans-serif, system-ui, sans-serif;
        }
        .wcc-restored-hero p {
          font-family: 'Montserrat', ui-sans-serif, system-ui, sans-serif;
        }
        .wcc-restored-hero img { border-radius: 18px; }
        .wcc-restored-hero button { border-radius: 14px; }
      `}</style>
      {/* ========================= HERO ========================= */}
      <section
        className="wcc-restored-hero relative flex min-h-[100svh] items-center overflow-hidden bg-[#3b160b] text-white [--wcc-speaker-strip:clamp(160px,28svh,300px)] max-[640px]:[--wcc-speaker-strip:clamp(200px,35svh,320px)] sm:[--wcc-speaker-strip:clamp(220px,32svh,360px)]"
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
          <Motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.12 } },
            }}
            className="flex w-full flex-col items-center gap-3 text-center sm:gap-5 lg:grid lg:grid-cols-2 lg:gap-x-16 lg:gap-y-6 lg:text-left"
          >
            {/* Title: one centered line on mobile, stacked on larger screens */}
            <Motion.h1
              variants={fadeUp}
              className="wcc-hero-title max-w-xl text-center font-black leading-[0.78] tracking-[-0.09em] text-white max-[640px]:flex max-[640px]:items-baseline max-[640px]:justify-center max-[640px]:gap-[0.2em] max-[640px]:leading-[0.9] lg:col-start-1 lg:row-start-1 lg:justify-self-start lg:text-left"
            >
              <span className="block text-[clamp(3.25rem,14vw,5.8rem)] max-[640px]:text-[clamp(3rem,18vw,4.75rem)] lg:text-[7.2rem] xl:text-[8.2rem]">
                WCC
              </span>
              <span className="wcc-hero-year block text-[clamp(4rem,17vw,7rem)] max-[640px]:text-[clamp(3rem,18vw,4.75rem)] lg:text-[8.8rem] xl:text-[10rem]">
                2026
              </span>
            </Motion.h1>

            {/* Logo: first on mobile (order-first), second on tablet, right column on desktop.
          SIZE CONTROL: change the w-[clamp(min,preferred,max)] values below. */}
            <Motion.div
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
            </Motion.div>

            {/* Countdown: soft dark panel on mobile for readability */}
            <Motion.div
              variants={fadeUp}
              className="wcc-hero-countdown w-full max-w-xl max-[640px]:max-w-[21rem] max-[640px]:rounded-2xl max-[640px]:bg-black/20 max-[640px]:px-3 max-[640px]:backdrop-blur-sm lg:col-start-2 lg:row-start-2 lg:justify-self-center"
            >
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
            </Motion.div>

            <Motion.p
              variants={fadeUp}
              className="wcc-hero-copy mx-auto max-w-md text-center text-xs leading-5 text-orange-50/80 max-[640px]:max-w-[18rem] max-[640px]:text-[0.8rem] max-[640px]:leading-[1.5] sm:text-sm lg:col-start-1 lg:row-start-2 lg:mx-0 lg:text-left lg:text-base lg:leading-6"
            >
              Join us this season. Complete the registration below and tell us a
              little about yourself.
            </Motion.p>

            {/* Button: full width on mobile */}
            <Motion.div
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
            </Motion.div>
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
