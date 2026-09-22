"use client";

import { useEffect } from "react";
import Image from "next/image";
import { ArrowRight, CheckCircle2, UserCheck, ShieldCheck, Wrench } from "lucide-react";

export default function About() {
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
    <section id="about" className="section-padding pb-20 lg:pb-[8rem] bg-[var(--bg-secondary)] relative overflow-hidden border-b border-[var(--border-color)]">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Content Block (Left 6 cols) */}
          <div className="lg:col-span-6">
            <div className="flex items-center gap-3 mb-4 reveal-on-scroll">
              <div className="w-10 h-[2px] bg-[var(--accent-red)]" />
              <span className="text-xs font-heading font-bold tracking-widest uppercase text-[var(--accent-red)]">
                About Our Clinic
              </span>
            </div>
            
            <h2 className="text-3xl sm:text-5xl font-heading font-bold tracking-tight text-white uppercase mb-6 leading-[1.1] reveal-on-scroll delay-100">
              Reliable & Honest <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-[var(--accent-red)]">
                Car Care You Can Trust.
              </span>
            </h2>

            <div className="space-y-4 text-[var(--text-secondary)] text-base sm:text-lg font-light leading-relaxed mb-8 reveal-on-scroll delay-200">
              <p>
                Founded by <strong className="text-white font-medium">Sathish Karkera</strong>, 
                <strong className="text-white font-medium"> Shree Durga Car Care Clinic</strong> was established with a clear mission: deliver transparent, reliable, and affordable automotive servicing without hidden fees or unnecessary part replacements.
              </p>
              <p>
                Whether it&apos;s routine periodic servicing, complex engine diagnostics, suspension overhaul, or brake maintenance, our workshop combines years of hands-on expertise with computer diagnostic tools to keep your vehicle running smoothly and safely.
              </p>
            </div>

            {/* Feature Cards Grid */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8 reveal-on-scroll delay-300">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-[var(--accent-red)]/10 text-[var(--accent-red)] shrink-0">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-heading font-bold uppercase text-white">Lead Mechanic Led</h4>
                  <p className="text-xs text-[var(--text-secondary)]">Direct supervision by Sathish Karkera on every car.</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-[var(--accent-red)]/10 text-[var(--accent-red)] shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-heading font-bold uppercase text-white">Genuine Parts</h4>
                  <p className="text-xs text-[var(--text-secondary)]">Only OEM/OES certified spare parts used.</p>
                </div>
              </div>
            </div>

            <div className="reveal-on-scroll delay-400">
              <a href="#services" className="link-underline">
                <span>View Full Service Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Image Block (Right 6 cols) */}
          <div className="lg:col-span-6 relative reveal-on-scroll delay-300">
            <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden border-2 border-white/10 shadow-2xl group">
              <Image
                src="/about.jpg"
                alt="Shree Durga Car Care Clinic Workshop Mechanic"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            </div>

            {/* Experience Floating Badge */}
            <div className="absolute -bottom-6 left-6 sm:left-8 glass-card p-5 sm:p-6 rounded-xl border border-white/15 shadow-2xl flex items-center gap-4 z-20">
              <div className="text-4xl sm:text-5xl font-heading font-bold text-[var(--accent-red)]">
                10+
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-heading tracking-widest uppercase text-white font-bold">Years of Excellence</span>
                <span className="text-[0.7rem] text-[var(--text-secondary)] uppercase">In Automobile Repair</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

