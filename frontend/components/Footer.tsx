"use client";

import Image from "next/image";
import { ArrowUp, PhoneCall, MapPin, Clock } from "lucide-react";

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Why Choose Us", href: "#why-us" },
  { label: "Gallery", href: "#gallery" },
];

const serviceLinks = [
  { label: "General Service", href: "#services" },
  { label: "Engine Diagnostics", href: "#services" },
  { label: "Oil Change", href: "#services" },
  { label: "Brake Repair", href: "#services" },
  { label: "AC Repair", href: "#services" },
];

export default function Footer() {
  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#050505] border-t border-white/10 relative overflow-hidden">
      
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[var(--accent-red)]/5 to-transparent opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10 relative z-10">
        
        {/* Top Section - 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Column 1: Brand Info */}
          <div className="flex flex-col">
            <div className="mb-8 relative w-24 h-24 overflow-hidden rounded-full border-2 border-[var(--accent-red)] bg-[#f5f5f5]">
              <Image 
                src="/logo.jpg" 
                alt="Shree Durga Car Care Clinic Logo" 
                fill 
                sizes="96px"
                className="object-cover scale-[1.35] origin-center" 
              />
            </div>
            <h3 className="text-2xl font-heading font-bold uppercase text-white mb-4 leading-tight">
              Shree Durga <br/>
              <span className="text-[var(--accent-red)]">Car Care</span>
            </h3>
            <p className="text-[var(--text-secondary)] text-sm font-light leading-relaxed mb-6">
              Precision engineering and professional car care, maintaining excellence since day one. Your trusted automotive partner.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col">
            <h4 className="text-sm font-heading font-bold tracking-[0.1em] uppercase text-white mb-6 flex items-center gap-2">
              <div className="w-2 h-2 bg-[var(--accent-red)] rounded-full" />
              Quick Links
            </h4>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-[var(--text-secondary)] hover:text-[var(--accent-red)] transition-colors duration-300 text-sm flex items-center gap-2 group"
                  >
                    <span className="w-4 h-[1px] bg-white/20 group-hover:bg-[var(--accent-red)] transition-colors" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="flex flex-col">
            <h4 className="text-sm font-heading font-bold tracking-[0.1em] uppercase text-white mb-6 flex items-center gap-2">
              <div className="w-2 h-2 bg-[var(--accent-red)] rounded-full" />
              Our Services
            </h4>
            <ul className="space-y-4">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-[var(--text-secondary)] hover:text-[var(--accent-red)] transition-colors duration-300 text-sm flex items-center gap-2 group"
                  >
                    <span className="w-4 h-[1px] bg-white/20 group-hover:bg-[var(--accent-red)] transition-colors" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div className="flex flex-col">
            <h4 className="text-sm font-heading font-bold tracking-[0.1em] uppercase text-white mb-6 flex items-center gap-2">
              <div className="w-2 h-2 bg-[var(--accent-red)] rounded-full" />
              Get In Touch
            </h4>
            <ul className="space-y-5">
              <li>
                <a href="tel:974145938" className="flex items-start gap-3 group">
                  <PhoneCall className="w-5 h-5 text-[var(--accent-red)] mt-0.5 group-hover:scale-110 transition-transform" />
                  <div>
                    <span className="block text-white text-sm font-medium group-hover:text-[var(--accent-red)] transition-colors">Call Us Directly</span>
                    <span className="text-[var(--text-secondary)] text-sm">974145938</span>
                  </div>
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[var(--accent-red)] mt-0.5" />
                <div>
                  <span className="block text-white text-sm font-medium">Location</span>
                  <span className="text-[var(--text-secondary)] text-sm">Our Workshop Facility</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[var(--accent-red)] mt-0.5" />
                <div>
                  <span className="block text-white text-sm font-medium">Opening Hours</span>
                  <span className="text-[var(--text-secondary)] text-sm">Mon - Sat: 9:00 AM - 7:00 PM</span>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xs text-[var(--text-muted)] tracking-wider">
            © {new Date().getFullYear()} SHREE DURGA CAR CARE CLINIC. ALL RIGHTS RESERVED.
          </p>
          
          <a
            href="#home"
            onClick={scrollToTop}
            className="group flex items-center justify-center w-12 h-12 rounded-full bg-white/5 border border-white/10 hover:border-[var(--accent-red)] hover:bg-[var(--accent-red)] transition-all duration-300"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5 text-white" />
          </a>
        </div>
      </div>
    </footer>
  );
}
