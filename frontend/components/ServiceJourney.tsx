"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";
import {
  CalendarCheck,
  ClipboardCheck,
  Wrench,
  ShieldCheck,
  KeyRound,
  ArrowRight,
  Activity,
  CheckCircle2,
  Sparkles,
  Radio,
} from "lucide-react";

/* ─────────────────────── TYPES ─────────────────────── */

export interface JourneyStep {
  id: string;
  stepNumber: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ElementType;
  /** Backend status code for live tracking integration */
  statusCode: string;
  estimatedTime: string;
  keyActions: string[];
}

/* ─────────────────────── STEP DATA ─────────────────────── */

const steps: JourneyStep[] = [
  {
    id: "booking",
    stepNumber: "01",
    title: "Book Your Service",
    subtitle: "Slot Reservation & Intake",
    description:
      "Schedule your preferred service time online or via phone. Receive instant confirmation and a dedicated booking tracking ID.",
    icon: CalendarCheck,
    statusCode: "STATUS_BOOKED",
    estimatedTime: "2–5 Mins",
    keyActions: [
      "Service Selection",
      "Preferred Date & Time",
      "Instant Booking ID",
      "Vehicle Bay Reservation",
    ],
  },
  {
    id: "inspection",
    stepNumber: "02",
    title: "Vehicle Inspection",
    subtitle: "40-Point Digital Checkup",
    description:
      "Our certified technicians perform comprehensive computerized diagnostics, engine checks, and visual safety audits.",
    icon: ClipboardCheck,
    statusCode: "STATUS_INSPECTION",
    estimatedTime: "15–30 Mins",
    keyActions: [
      "OBD-II Computer Diagnostics",
      "Under-Hood & Brake Check",
      "Fluid Level Assessment",
      "Transparent Digital Health Report",
    ],
  },
  {
    id: "repair",
    stepNumber: "03",
    title: "Service & Repair",
    subtitle: "OEM Precision Engineering",
    description:
      "Expert mechanical, electrical, and detailing service carried out using genuine OEM components and precision equipment.",
    icon: Wrench,
    statusCode: "STATUS_IN_SERVICE",
    estimatedTime: "1–3 Hours",
    keyActions: [
      "Engine Oil & Filter Refresh",
      "Brake & Suspension Service",
      "AC & Electrical Maintenance",
      "Genuine Parts Guarantee",
    ],
  },
  {
    id: "quality",
    stepNumber: "04",
    title: "Quality Check",
    subtitle: "Zero-Defect Verification",
    description:
      "Rigorous final inspection, road performance test, and multi-point quality assurance to ensure factory-grade reliability.",
    icon: ShieldCheck,
    statusCode: "STATUS_QUALITY_CHECK",
    estimatedTime: "20–30 Mins",
    keyActions: [
      "Dynamic Road Test",
      "Safety System Audit",
      "Multi-Point Final Review",
      "Master Tech Sign-off",
    ],
  },
  {
    id: "delivery",
    stepNumber: "05",
    title: "Ready for Delivery",
    subtitle: "Cleaned, Sanitized & Ready",
    description:
      "Complimentary vehicle wash, interior sanitization, and seamless delivery back to you with complete service logs.",
    icon: KeyRound,
    statusCode: "STATUS_READY",
    estimatedTime: "Immediate",
    keyActions: [
      "Foam Wash & Detail",
      "Interior Sanitization",
      "Transparent Invoice Breakdown",
      "Key Handover & Drive Off",
    ],
  },
];

/* ─────────────────────── PROPS ─────────────────────── */

interface ServiceJourneyProps {
  /** Optional initial active step for live backend integration */
  initialStepIndex?: number;
  /** Optional current vehicle status code from backend tracking */
  activeStatusCode?: string;
}

/* ─────────────────────── COMPONENT ─────────────────────── */

export default function ServiceJourney({
  initialStepIndex = 0,
  activeStatusCode,
}: ServiceJourneyProps) {
  const [activeStep, setActiveStep] = useState(initialStepIndex);
  const [visibleSteps, setVisibleSteps] = useState<Set<number>>(new Set());
  const [sectionVisible, setSectionVisible] = useState(false);
  const [lineProgress, setLineProgress] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  /* ── Sync backend status ── */
  useEffect(() => {
    if (activeStatusCode) {
      const idx = steps.findIndex((s) => s.statusCode === activeStatusCode);
      if (idx !== -1) setActiveStep(idx);
    }
  }, [activeStatusCode]);

  /* ── Section-level IntersectionObserver ── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setSectionVisible(true);
      },
      { threshold: 0.08 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  /* ── Per-step staggered reveal ── */
  useEffect(() => {
    if (!sectionVisible) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    steps.forEach((_, i) => {
      timers.push(
        setTimeout(() => {
          setVisibleSteps((prev) => new Set(prev).add(i));
        }, 250 + i * 180)
      );
    });
    return () => timers.forEach(clearTimeout);
  }, [sectionVisible]);

  /* ── Scroll-driven progress & active step ── */
  const handleScroll = useCallback(() => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const vh = window.innerHeight;

    if (rect.top < vh && rect.bottom > 0) {
      const visibleTop = vh - rect.top;
      const progress = Math.min(
        Math.max(visibleTop / (rect.height + vh * 0.25), 0),
        1
      );
      setLineProgress(progress);

      const target = Math.min(
        Math.floor(progress * steps.length),
        steps.length - 1
      );
      if (target >= 0) setActiveStep(target);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const activeData = steps[activeStep];
  const ActiveIcon = activeData.icon;

  /* ── Helper: per-step animation classes ── */
  const stepAnimClass = (i: number) =>
    visibleSteps.has(i)
      ? "opacity-100 translate-y-0"
      : "opacity-0 translate-y-8";

  /* ── Animated line width (desktop) / height (mobile) ── */
  const filledPercent = (activeStep / (steps.length - 1)) * 100;

  return (
    <section
      ref={sectionRef}
      id="journey"
      className="section-padding bg-[var(--bg-primary)] border-b border-[var(--border-color)] relative overflow-hidden"
      /* data-* hooks for future backend binding */
      data-journey-active-step={activeData.id}
      data-journey-status={activeData.statusCode}
    >
      {/* ─── Background atmosphere ─── */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[var(--accent-red)]/8 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ───────── Section Header ───────── */}
        <div
          className={`flex flex-col items-center text-center mb-14 lg:mb-20 transition-all duration-[900ms] ease-[cubic-bezier(0.19,1,0.22,1)] ${
            sectionVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-[2px] bg-[var(--accent-red)]" />
            <span className="text-xs font-heading font-bold tracking-widest uppercase text-[var(--accent-red)] flex items-center gap-2">
              <Radio className="w-3.5 h-3.5 animate-pulse text-[var(--accent-red)]" />
              Garage Workflow
            </span>
            <div className="w-10 h-[2px] bg-[var(--accent-red)]" />
          </div>

          <h2 className="text-3xl sm:text-5xl font-heading font-bold tracking-tight text-white uppercase leading-[1.1] mb-6">
            Your Car&rsquo;s <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-[var(--accent-red)]">
              Service Journey.
            </span>
          </h2>

          <p className="text-base text-[var(--text-secondary)] font-light max-w-2xl">
            Experience complete transparency at Shree Durga Car Care Clinic.
            Track every milestone of your vehicle&rsquo;s service — from booking
            to key handover.
          </p>
        </div>

        {/* ═══════════ DESKTOP TIMELINE (lg+) ═══════════ */}
        <div className="hidden lg:block relative mb-16">
          {/* Connecting line track */}
          <div className="absolute top-10 left-[8%] right-[8%] h-[3px] bg-white/10 rounded-full z-0">
            <div
              className="h-full bg-gradient-to-r from-[var(--accent-red)] via-[var(--accent-red)] to-red-400 rounded-full transition-all duration-700 ease-out"
              style={{
                width: `${filledPercent}%`,
                boxShadow: "0 0 14px rgba(230,57,70,0.7)",
              }}
            />
          </div>

          {/* 5-step row */}
          <div className="grid grid-cols-5 gap-4 relative z-10">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const passed = i <= activeStep;
              const current = i === activeStep;

              return (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(i)}
                  className={`flex flex-col items-center group text-center focus:outline-none transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] ${stepAnimClass(i)}`}
                  aria-label={`Step ${step.stepNumber}: ${step.title}`}
                  data-step-id={step.id}
                  data-step-status={step.statusCode}
                >
                  {/* Icon node */}
                  <div className="relative mb-5">
                    <div
                      className={`w-20 h-20 rounded-2xl border-2 flex items-center justify-center transition-all duration-500 bg-[var(--bg-secondary)] ${
                        current
                          ? "border-[var(--accent-red)] text-white bg-gradient-to-b from-[#220a0c] to-[var(--bg-secondary)] shadow-[0_0_30px_rgba(230,57,70,0.45)] scale-110 -translate-y-1"
                          : passed
                          ? "border-[var(--accent-red)]/60 text-[var(--accent-red)] bg-white/5"
                          : "border-white/15 text-[var(--text-muted)] hover:border-white/30 hover:text-white/80"
                      }`}
                    >
                      <Icon
                        className={`w-8 h-8 transition-transform duration-300 ${
                          current ? "scale-110" : "group-hover:scale-105"
                        }`}
                      />
                    </div>

                    {/* Step number badge */}
                    <span
                      className={`absolute -top-3 -right-2 text-[10px] font-heading font-bold px-2 py-0.5 rounded-full border transition-colors duration-300 ${
                        current
                          ? "bg-[var(--accent-red)] text-white border-[var(--accent-red)]"
                          : passed
                          ? "bg-white/10 text-[var(--accent-red)] border-[var(--accent-red)]/30"
                          : "bg-black/60 text-[var(--text-muted)] border-white/10"
                      }`}
                    >
                      {step.stepNumber}
                    </span>
                  </div>

                  {/* Step title & subtitle */}
                  <div className="px-2">
                    <h3
                      className={`text-base font-heading font-bold uppercase tracking-wider mb-1 transition-colors duration-300 ${
                        current
                          ? "text-white"
                          : passed
                          ? "text-white/90"
                          : "text-[var(--text-muted)] group-hover:text-white/70"
                      }`}
                    >
                      {step.title}
                    </h3>
                    <p className="text-xs text-[var(--text-muted)] font-light line-clamp-1">
                      {step.subtitle}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ═══════════ MOBILE / TABLET TIMELINE (< lg) ═══════════ */}
        <div className="lg:hidden relative mb-10 space-y-5">
          {/* Vertical connecting line */}
          <div className="absolute left-[31px] top-6 bottom-6 w-[2px] bg-white/10 z-0">
            <div
              className="w-full bg-[var(--accent-red)] transition-all duration-700 ease-out"
              style={{
                height: `${filledPercent}%`,
                boxShadow: "0 0 10px rgba(230,57,70,0.8)",
              }}
            />
          </div>

          {steps.map((step, i) => {
            const Icon = step.icon;
            const passed = i <= activeStep;
            const current = i === activeStep;

            return (
              <div
                key={step.id}
                onClick={() => setActiveStep(i)}
                className={`flex gap-5 p-4 sm:p-5 rounded-2xl border cursor-pointer relative z-10 transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] ${stepAnimClass(i)} ${
                  current
                    ? "bg-gradient-to-r from-white/[0.07] to-white/[0.02] border-[var(--accent-red)]/60 shadow-[0_0_20px_rgba(230,57,70,0.2)]"
                    : passed
                    ? "bg-white/[0.02] border-white/10"
                    : "bg-white/[0.01] border-white/5 opacity-70"
                }`}
                data-step-id={step.id}
                data-step-status={step.statusCode}
              >
                <div
                  className={`w-14 h-14 shrink-0 rounded-xl border-2 flex items-center justify-center transition-all duration-300 ${
                    current
                      ? "border-[var(--accent-red)] bg-[var(--accent-red)]/20 text-white shadow-[0_0_15px_rgba(230,57,70,0.4)]"
                      : passed
                      ? "border-[var(--accent-red)]/50 bg-white/5 text-[var(--accent-red)]"
                      : "border-white/10 bg-black/40 text-[var(--text-muted)]"
                  }`}
                >
                  <Icon className="w-6 h-6" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[10px] font-heading font-bold tracking-widest uppercase text-[var(--accent-red)]">
                      STAGE {step.stepNumber}
                    </span>
                    <span className="text-[10px] font-mono text-[var(--text-muted)] bg-white/5 px-2 py-0.5 rounded border border-white/5">
                      {step.estimatedTime}
                    </span>
                  </div>

                  <h3
                    className={`text-base font-heading font-bold uppercase transition-colors duration-300 ${
                      current ? "text-white" : "text-white/80"
                    }`}
                  >
                    {step.title}
                  </h3>

                  <p className="text-xs text-[var(--text-secondary)] font-light mt-1 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* ═══════════ SELECTED STEP DETAIL CARD ═══════════ */}
        <div
          className={`bg-gradient-to-b from-[#18181b] to-[#0c0c0e] border border-white/10 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] ${
            sectionVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-12"
          }`}
          data-active-detail={activeData.id}
        >
          {/* Ambient glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[var(--accent-red)]/10 blur-[100px] rounded-full pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left — info column */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xs font-heading font-bold tracking-widest uppercase bg-[var(--accent-red)]/15 text-[var(--accent-red)] border border-[var(--accent-red)]/30 px-3 py-1 rounded-full">
                  STAGE {activeData.stepNumber} OF 05
                </span>

                <span className="text-xs font-mono text-[var(--text-muted)] bg-white/5 border border-white/10 px-3 py-1 rounded-full flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-emerald-400" />
                  {activeData.statusCode}
                </span>

                <span className="text-xs font-mono text-[var(--text-muted)] bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                  Est. {activeData.estimatedTime}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-heading font-bold text-white uppercase tracking-tight flex items-center gap-3">
                <ActiveIcon className="w-7 h-7 text-[var(--accent-red)] shrink-0" />
                <span>{activeData.title}</span>
              </h3>

              <p className="text-sm sm:text-base text-[var(--text-secondary)] font-light leading-relaxed">
                {activeData.description}
              </p>

              {/* Key operations */}
              <div className="pt-2">
                <h4 className="text-xs font-heading font-bold uppercase tracking-wider text-white/90 mb-3 flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-[var(--accent-red)]" />
                  Key Process Highlights
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeData.keyActions.map((action, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2.5 text-xs sm:text-sm text-[var(--text-secondary)] bg-white/[0.03] border border-white/5 px-3 py-2 rounded-lg hover:border-white/15 hover:bg-white/[0.06] transition-all duration-300"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[var(--accent-red)] shrink-0" />
                      <span>{action}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — live integration / CTA card */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full bg-black/50 border border-white/10 rounded-xl p-6 relative overflow-hidden group">
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-heading font-semibold uppercase tracking-widest text-[var(--text-muted)]">
                    Live Status System
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Tracking Ready
                  </span>
                </div>

                <div className="border-t border-white/10 pt-4">
                  <p className="text-xs text-[var(--text-muted)] uppercase font-mono mb-1">
                    System Node Identifier
                  </p>
                  <p className="text-sm font-heading font-bold text-white tracking-wider font-mono">
                    SDCCC::{activeData.statusCode}
                  </p>
                </div>

                <p className="text-xs text-[var(--text-secondary)] font-light leading-relaxed">
                  Have an active service booking? Enter your Booking ID or
                  registered phone number in our live tracking portal to check
                  real-time progress.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <Link
                  href="/track"
                  className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-lg bg-[var(--accent-red)] text-white font-heading text-xs uppercase tracking-[0.18em] font-bold hover:bg-white hover:text-black transition-all duration-300 shadow-[0_0_20px_rgba(230,57,70,0.3)]"
                >
                  <span>Track Your Vehicle Live</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href="#booking"
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-5 rounded-lg bg-white/5 text-white/80 font-heading text-xs uppercase tracking-wider font-semibold hover:bg-white/10 hover:text-white border border-white/10 transition-all duration-300"
                >
                  <span>Book Appointment Now</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
