"use client";

import { useEffect } from "react";
import { PhoneCall, MapPin, Clock, User, ArrowRight } from "lucide-react";

export default function Contact() {
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
    <section id="contact" className="section-padding bg-[var(--bg-primary)] border-b border-[var(--border-color)]">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-12 lg:mb-16 reveal-on-scroll">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-[2px] bg-[var(--accent-red)]" />
            <span className="text-xs font-heading font-bold tracking-widest uppercase text-[var(--accent-red)]">
              Contact & Location
            </span>
            <div className="w-10 h-[2px] bg-[var(--accent-red)]" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-bold tracking-tight text-white uppercase leading-[1.1] mb-6">
            Visit Our <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-[var(--accent-red)]">
              Workshop Facility.
            </span>
          </h2>
          <p className="text-base text-[var(--text-secondary)] font-light max-w-2xl">
            We are always ready to assist you. Call us directly for immediate support or drop by our workshop during operating hours.
          </p>
        </div>

        {/* Contact Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          
          {/* Direct Contact Card */}
          <div className="card-automotive p-8 reveal-on-scroll delay-100 flex flex-col items-center text-center group">
            <div className="w-14 h-14 rounded-full bg-[var(--accent-red)]/10 border border-[var(--accent-red)]/30 text-[var(--accent-red)] flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[var(--accent-red)] group-hover:text-white transition-all duration-300">
              <PhoneCall className="w-6 h-6" />
            </div>
            <h3 className="text-xs font-heading tracking-[0.2em] uppercase text-[var(--text-muted)] mb-2">
              Direct Contact
            </h3>
            <p className="text-xl font-heading font-bold text-white mb-1 group-hover:text-[var(--accent-red)] transition-colors">Sathish Karkera</p>
            <p className="text-[var(--text-secondary)] text-sm mb-6">Owner & Lead Mechanic</p>
            <a href="tel:974145938" className="btn-secondary-auto w-full justify-center">
              <span>Call 974145938</span>
            </a>
          </div>

          {/* Operating Hours Card */}
          <div className="card-automotive p-8 reveal-on-scroll delay-200 flex flex-col items-center text-center group">
            <div className="w-14 h-14 rounded-full bg-[var(--accent-red)]/10 border border-[var(--accent-red)]/30 text-[var(--accent-red)] flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[var(--accent-red)] group-hover:text-white transition-all duration-300">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-xs font-heading tracking-[0.2em] uppercase text-[var(--text-muted)] mb-2">
              Operating Hours
            </h3>
            <div className="flex flex-col gap-2 w-full mt-4">
              <div className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                <span className="text-[var(--text-secondary)]">Mon - Sat</span>
                <span className="text-white font-medium">9:00 AM - 7:00 PM</span>
              </div>
              <div className="flex justify-between items-center text-sm pt-2">
                <span className="text-[var(--text-secondary)]">Sunday</span>
                <span className="text-[var(--accent-red)] font-medium">Closed</span>
              </div>
            </div>
          </div>

          {/* Location Card */}
          <div className="card-automotive p-8 reveal-on-scroll delay-300 flex flex-col items-center text-center group">
            <div className="w-14 h-14 rounded-full bg-[var(--accent-red)]/10 border border-[var(--accent-red)]/30 text-[var(--accent-red)] flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[var(--accent-red)] group-hover:text-white transition-all duration-300">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="text-xs font-heading tracking-[0.2em] uppercase text-[var(--text-muted)] mb-2">
              Location
            </h3>
            <p className="text-lg font-heading font-bold text-white mb-2">Shree Durga Car Care Clinic</p>
            <p className="text-[var(--text-secondary)] text-sm mb-6">Drive-in for diagnostics and expert vehicle servicing.</p>
            <a 
              href="https://maps.google.com/?q=Shree+Durga+Car+Care+Clinic" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-secondary-auto w-full justify-center"
            >
              <span>Get Directions</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </a>
          </div>
          
        </div>
      </div>
    </section>
  );
}

