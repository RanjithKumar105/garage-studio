"use client";

import { useEffect } from "react";
import { UserCheck, ShieldCheck, Banknote, Clock, ThumbsUp, HeartHandshake } from "lucide-react";

const reasons = [
  { 
    title: "Expert Technicians", 
    desc: "Supervised by Sathish Karkera with over 10+ years of hands-on mechanical experience across all multi-brand car models.",
    icon: UserCheck
  },
  { 
    title: "100% Genuine Parts", 
    desc: "We source and install only authentic OEM/OES spare parts, fluids, and filters to maintain factory warranty and performance.",
    icon: ShieldCheck
  },
  { 
    title: "Transparent & Fair Pricing", 
    desc: "No inflated bills or unexpected surprises. You receive an upfront estimate before any servicing work begins.",
    icon: Banknote
  },
  { 
    title: "Quick Service Turnaround", 
    desc: "We respect your busy schedule. Periodic maintenance and minor repairs are completed within committed timelines.",
    icon: Clock
  },
  { 
    title: "Complete Customer Trust", 
    desc: "Over 5000+ satisfied vehicle owners trust us for honest advice, quality workmanship, and reliable post-service support.",
    icon: ThumbsUp
  },
  { 
    title: "Personalized Car Care", 
    desc: "Every car receives individual care and thorough inspection. We listen carefully to your issues and resolve them.",
    icon: HeartHandshake
  },
];

export default function WhyChooseUs() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll(".reveal-on-scroll");
    elements.forEach((el) => observer.observe(el));

    return () => elements.forEach((el) => observer.unobserve(el));
  }, []);

  return (
    <section id="why-us" className="section-padding bg-[var(--bg-secondary)] border-b border-[var(--border-color)] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12 lg:mb-16 reveal-on-scroll">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-[2px] bg-[var(--accent-red)]" />
            <span className="text-xs font-heading font-bold tracking-widest uppercase text-[var(--accent-red)]">
              The Shree Durga Difference
            </span>
            <div className="w-8 h-[2px] bg-[var(--accent-red)]" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-bold tracking-tight text-white uppercase leading-[1.1] max-w-3xl">
            Why Car Owners Trust <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-[var(--accent-red)]">
              Shree Durga Car Care Clinic
            </span>
          </h2>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {reasons.map((reason, index) => {
            const IconComponent = reason.icon;
            return (
              <div 
                key={reason.title} 
                className="card-automotive p-6 sm:p-8 reveal-on-scroll group"
                style={{ animationDelay: `${(index % 3) * 150}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-[var(--accent-red)]/10 border border-[var(--accent-red)]/30 text-[var(--accent-red)] flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[var(--accent-red)] group-hover:text-white transition-all duration-300">
                  <IconComponent className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-heading font-bold uppercase text-white mb-3 group-hover:text-[var(--accent-red)] transition-colors">
                  {reason.title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] font-light leading-relaxed">
                  {reason.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

