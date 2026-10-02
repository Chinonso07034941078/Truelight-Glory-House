import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";

const LOGO =
  "https://res.cloudinary.com/dnvgl9k4i/image/upload/v1767270378/truelight-logo_ta57tl.png";

// Same stack the WCC page uses, so the navbar matches the rest of the site.
const FONT = "'Adero Trial Family', 'Adero', 'Trebuchet MS', ui-sans-serif, system-ui, sans-serif";

const NAV_ITEMS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/units", label: "Units" },
  { to: "/sermons", label: "Sermons" },
  { to: "/events", label: "Events" },
  { to: "/support", label: "Support" },
  { to: "/wcc", label: "WCC" },
  { to: "/contact", label: "Contact" },
];
const LEFT = NAV_ITEMS.slice(0, 4);
const RIGHT = NAV_ITEMS.slice(4);

// All colors live here, so the JSX has no repeated ternaries.
const THEMES = {
  default: {
    barSolid: "bg-blue-950/95 shadow-[0_10px_30px_rgba(8,16,48,0.35)]",
    barClear: "bg-gradient-to-b from-black/50 to-transparent",
    rule: "border-white/15",
    hairTo: "to-white/30",
    idle: "text-white/75 hover:text-white",
    active: "text-white",
    line: "bg-sky-300",
    accentText: "text-sky-300",
    track: "bg-white/10",
    progress: "from-sky-300 to-blue-400",
    cta: "bg-white text-blue-950 hover:bg-sky-100",
    tab: "bg-white text-blue-950 hover:bg-sky-100",
    drawer: "bg-blue-950",
    activeRow: "bg-white/[0.06]",
    ring: "focus-visible:ring-sky-300",
  },
  wcc: {
    barSolid: "bg-[#2b0d05]/95 shadow-[0_10px_30px_rgba(43,13,5,0.5)]",
    barClear: "bg-gradient-to-b from-black/50 to-transparent",
    rule: "border-orange-200/20",
    hairTo: "to-orange-200/35",
    idle: "text-orange-50/75 hover:text-orange-100",
    active: "text-orange-100",
    line: "bg-orange-400",
    accentText: "text-orange-300",
    track: "bg-orange-100/10",
    progress: "from-amber-400 to-orange-500",
    cta: "bg-orange-400 text-orange-950 hover:bg-orange-300",
    tab: "bg-orange-400 text-orange-950 hover:bg-orange-300",
    drawer: "bg-[#2b0d05]",
    activeRow: "bg-orange-400/10",
    ring: "focus-visible:ring-orange-300",
  },
};

// One side of the desktop split navigation. The top-edge marker slides between links via layoutId.
function SideLinks({ items, t, isActive, markerTo, setHovered, reduceMotion }) {
  return (
    <ul className="flex items-stretch" onMouseLeave={() => setHovered(null)}>
      {items.map((item) => {
        const active = isActive(item.to);
        return (
          <li key={item.to} className="relative flex">
            <Link
              to={item.to}
              onMouseEnter={() => setHovered(item.to)}
              onFocus={() => setHovered(item.to)}
              onBlur={() => setHovered(null)}
              aria-current={active ? "page" : undefined}
              className={`flex items-center px-2.5 text-[12px] uppercase tracking-[0.1em] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset xl:px-4 xl:text-[13px] ${t.ring} ${
                active ? t.active : t.idle
              }`}
            >
              {item.label}
            </Link>
            {markerTo === item.to && (
              <motion.span
                layoutId="nav-marker"
                aria-hidden="true"
                className={`absolute inset-x-2.5 top-0 h-[3px] xl:inset-x-4 ${t.line}`}
                transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 500, damping: 38 }}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [hovered, setHovered] = useState(null);
  const { pathname } = useLocation();
  const reduceMotion = useReducedMotion();

  const isWcc = pathname === "/wcc" || pathname.startsWith("/wcc/");
  const t = isWcc ? THEMES.wcc : THEMES.default;

  const isActive = (to) =>
    to === "/" ? pathname === "/" : pathname === to || pathname.startsWith(`${to}/`);
  const activeTo = NAV_ITEMS.find((item) => isActive(item.to))?.to;
  const markerTo = hovered ?? activeTo;
  const closeMenu = () => setIsOpen(false);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => setHasScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setIsOpen(false), [pathname]);

  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && setIsOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen]);

  const sideProps = { t, isActive, markerTo, setHovered, reduceMotion };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50" style={{ fontFamily: FONT }}>
        {/* Accent line across the top that fills as you scroll */}
        <div className={`h-[3px] w-full ${t.track}`} aria-hidden="true">
          <motion.div style={{ scaleX: progress }} className={`h-full origin-left bg-gradient-to-r ${t.progress}`} />
        </div>

        <div
          className={`border-b backdrop-blur-md transition-all duration-500 lg:border-b-0 ${t.rule} ${
            hasScrolled ? t.barSolid : t.barClear
          }`}
        >
          {/* ---------- MOBILE BAR: bigger logo left, menu icon right (bar height unchanged) ---------- */}
          <nav
            aria-label="Main"
            className={`mx-auto flex items-center justify-between px-5 transition-all duration-300 sm:px-7 lg:hidden ${
              hasScrolled ? "h-14" : "h-16"
            }`}
          >
            <Link to="/" aria-label="Truelight Home" className="flex min-w-0 items-center">
              <img
                src={LOGO}
                alt="Truelight Logo"
                className={`w-auto max-w-[62vw] object-contain object-left transition-all duration-300 ${
                  hasScrolled ? "h-12" : "h-14"
                }`}
              />
            </Link>

            <button
              type="button"
              onClick={() => setIsOpen(true)}
              aria-label="Open menu"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              className={`-mr-2 flex h-11 w-11 items-center justify-center text-white focus-visible:outline-none focus-visible:ring-2 ${t.ring}`}
            >
              <span className="flex flex-col items-end gap-[7px]" aria-hidden="true">
                <span className="h-[2px] w-7 bg-current" />
                <span className="h-[2px] w-[18px] bg-current" />
              </span>
            </button>
          </nav>

          {/* ---------- DESKTOP BAR: centered logo with split links ---------- */}
          <nav
            aria-label="Main"
            className={`mx-auto hidden max-w-[84rem] grid-cols-[1fr_auto_1fr] items-stretch px-8 transition-all duration-500 lg:grid ${
              hasScrolled ? "h-16" : "h-20"
            }`}
          >
            <div className="relative flex items-stretch justify-end">
              <SideLinks items={LEFT} {...sideProps} />
              <span aria-hidden="true" className={`pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent ${t.hairTo}`} />
              <span aria-hidden="true" className={`pointer-events-none absolute bottom-0 right-0 h-[3px] w-12 ${t.line}`} />
            </div>

            <Link to="/" aria-label="Truelight Home" className="flex items-center justify-center px-7">
              <img
                src={LOGO}
                alt="Truelight Logo"
                className={`w-auto transition-all duration-500 ${hasScrolled ? "h-10" : "h-12"}`}
              />
            </Link>

            <div className="relative flex items-stretch justify-start">
              <SideLinks items={RIGHT} {...sideProps} />
              <span aria-hidden="true" className={`pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-l from-transparent ${t.hairTo}`} />
              <span aria-hidden="true" className={`pointer-events-none absolute bottom-0 left-0 h-[3px] w-12 ${t.line}`} />
            </div>
          </nav>
        </div>
      </header>

      {/* Desktop: GIVE is a tab docked to the right edge of the screen */}
      <Link
        to="/support"
        aria-label="Support Truelight"
        style={{ fontFamily: FONT }}
        className={`fixed right-0 top-1/2 z-40 hidden w-9 -translate-y-1/2 items-center justify-center rounded-l-md py-5 text-[12px] uppercase leading-none tracking-[0.2em] shadow-[0_8px_30px_rgba(0,0,0,0.3)] transition-all duration-300 [writing-mode:vertical-rl] hover:w-11 focus-visible:outline-none focus-visible:ring-2 lg:flex ${t.ring} ${t.tab}`}
      >
        Give
      </Link>

      {/* ========================= MOBILE MENU ========================= */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            style={{ fontFamily: FONT }}
            className={`fixed inset-0 z-[60] flex flex-col lg:hidden ${t.drawer}`}
            initial={{ opacity: 0, y: reduceMotion ? 0 : -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduceMotion ? 0 : -16 }}
            transition={{ duration: reduceMotion ? 0.12 : 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={`h-[3px] w-full shrink-0 bg-gradient-to-r ${t.progress}`} aria-hidden="true" />

            {/* Header lines up with the bar: logo left, close button where the menu icon was */}
            <div className={`flex h-16 shrink-0 items-center justify-between border-b px-5 sm:px-7 ${t.rule}`}>
              <Link to="/" onClick={closeMenu} aria-label="Truelight Home" className="flex min-w-0 items-center">
                <img src={LOGO} alt="Truelight Logo" className="h-14 w-auto max-w-[62vw] object-contain object-left" />
              </Link>
              <button
                type="button"
                onClick={closeMenu}
                aria-label="Close menu"
                className={`-mr-2 flex h-11 w-11 shrink-0 items-center justify-center text-white focus-visible:outline-none focus-visible:ring-2 ${t.ring}`}
              >
                <X size={26} strokeWidth={1.6} />
              </button>
            </div>

            {/* Links in Adero, uppercase, separated by hairlines */}
            <motion.ul
              className="min-h-0 flex-1 overflow-y-auto overscroll-contain"
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.04, delayChildren: 0.1 } } }}
            >
              {NAV_ITEMS.map((item) => {
                const active = isActive(item.to);
                return (
                  <motion.li
                    key={item.to}
                    className={`border-b ${t.rule}`}
                    variants={{
                      hidden: { opacity: 0, x: reduceMotion ? 0 : -14 },
                      show: { opacity: 1, x: 0, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
                    }}
                  >
                    <Link
                      to={item.to}
                      onClick={closeMenu}
                      aria-current={active ? "page" : undefined}
                      className={`relative flex items-center px-6 py-3.5 text-[1.35rem] uppercase leading-none tracking-[0.06em] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset sm:px-8 ${t.ring} ${
                        active ? `${t.activeRow} ${t.accentText}` : "text-white/90 active:bg-white/5"
                      }`}
                    >
                      {active && (
                        <span aria-hidden="true" className={`absolute inset-y-0 left-0 w-[3px] ${t.line}`} />
                      )}
                      {item.label}
                    </Link>
                  </motion.li>
                );
              })}
            </motion.ul>

            {/* GIVE NOW pinned to the bottom, clear of the iPhone home bar */}
            <div
              className="shrink-0 px-5 pt-4 sm:px-7"
              style={{ paddingBottom: "max(1.25rem, env(safe-area-inset-bottom))" }}
            >
              <Link
                to="/support"
                onClick={closeMenu}
                aria-label="Support Truelight"
                className={`flex h-14 w-full items-center justify-between rounded-sm px-5 text-[15px] uppercase tracking-[0.12em] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 ${t.ring} ${t.cta}`}
              >
                Give Now
                <ArrowUpRight size={20} strokeWidth={2.2} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}