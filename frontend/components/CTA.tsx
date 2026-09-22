"use client";

import { useEffect } from "react";
import { ArrowDownRight } from "lucide-react";

export default function CTA() {
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
    <section className="relative overflow-hidden section-padding bg-black">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 bg-cover bg-center bg-fixed" style={{ backgroundImage: 'url("/cta-bg.jpg")' }} />
      <div className="absolute inset-0 bg-black/80" />

      {/* Massive Typography Bleed Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15rem] sm:text-[25rem] font-heading font-bold text-white/[0.03] tracking-tighter uppercase whitespace-nowrap pointer-events-none select-none z-0">
        DRIVE
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center flex flex-col items-center">
        
        <div className="reveal-on-scroll">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-12 h-[1px] bg-[var(--accent-red)]" />
            <span className="text-xs font-heading font-medium tracking-[0.2em] uppercase text-[var(--accent-red)]">
              Next Steps
            </span>
            <div className="w-12 h-[1px] bg-[var(--accent-red)]" />
          </div>
          
          <h2 className="text-5xl sm:text-6xl lg:text-8xl font-heading font-bold text-white uppercase tracking-tight leading-[1] mb-12">
            Ready to Give Your Car <br className="hidden sm:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-[var(--text-muted)]">
              The Best Care?
            </span>
          </h2>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-8 sm:gap-16 reveal-on-scroll delay-200">
          <a href="#booking" className="btn-editorial">
            <span>Schedule Service</span>
            <ArrowDownRight className="w-5 h-5" />
          </a>
          
          <a href="tel:974145938" className="link-underline text-lg">
            Or Call 974145938
          </a>
        </div>
      </div>
    </section>
  );
}
