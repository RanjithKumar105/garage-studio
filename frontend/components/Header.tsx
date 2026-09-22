"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Menu,
  X,
  PhoneCall,
  CalendarCheck,
} from "lucide-react";
import ThemeSwitcher from "./ThemeSwitcher";

const navLinks = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Why Us", href: "/#why-us" },
  { label: "Gallery", href: "/#gallery" },
  { label: "Book Service", href: "/#booking" },
  { label: "Track Status", href: "/track" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.4 }
    );

    // Observe all sections that have IDs matching our nav links
    navLinks.forEach((link) => {
      const id = link.href.replace("#", "");
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => {
      navLinks.forEach((link) => {
        const id = link.href.replace("#", "");
        const element = document.getElementById(id);
        if (element) observer.unobserve(element);
      });
    };
  }, []);

  const handleNavClick = () => {
    setIsOpen(false);
  };

  return (
    <header
      id="header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        scrolled
          ? "glass shadow-xl shadow-black/50 py-3"
          : "bg-gradient-to-b from-black/90 via-black/50 to-transparent py-4 sm:py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Clinic Name */}
          <Link href="/#home" className="flex items-center gap-3.5 group relative z-50">
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-[var(--accent-red)] bg-black shadow-[0_0_15px_rgba(230,34,34,0.3)] transition-all duration-300 group-hover:scale-105 overflow-hidden flex items-center justify-center">
              <Image 
                src="/logo.jpg" 
                alt="Shree Durga Car Care Clinic Logo" 
                fill 
                priority
                sizes="56px"
                className="object-cover scale-125" 
              />
            </div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-heading font-bold tracking-tight text-white uppercase group-hover:text-[var(--accent-red)] transition-colors">
                Shree Durga
              </span>
              <span className="text-[0.65rem] sm:text-[0.7rem] font-heading tracking-[0.18em] uppercase text-[var(--accent-red)] font-semibold">
                Car Care Clinic
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 px-4">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace("/#", "").replace("/", "");
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`py-1 text-sm font-heading font-medium tracking-wider transition-all duration-300 relative group uppercase ${
                    isActive ? "text-white font-semibold" : "text-white/70 hover:text-white"
                  }`}
                >
                  {link.label}
                  <span className={`absolute -bottom-1 left-0 h-[2px] bg-[var(--accent-red)] transition-all duration-300 ease-out ${
                    isActive ? "w-full opacity-100" : "w-0 opacity-0 group-hover:w-full group-hover:opacity-100"
                  }`} />
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right (Call & Book CTAs + ThemeSwitcher) */}
          <div className="hidden lg:flex items-center gap-4">
            <ThemeSwitcher />
            
            <a
              href="tel:974145938"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-xs font-heading font-semibold tracking-wider text-white hover:bg-white/10 hover:border-white/20 transition-all uppercase"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[var(--accent-red)]" />
              <span>974145938</span>
            </a>

            <a
              href="#booking"
              className="btn-editorial !px-5 !py-2.5 !text-xs"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>Book Service</span>
            </a>
          </div>

          {/* Mobile Actions */}
          <div className="flex lg:hidden items-center gap-3 relative z-50">
            <ThemeSwitcher />
            <a
              href="tel:974145938"
              className="p-2 rounded-lg bg-[var(--accent-red)] text-white"
              aria-label="Call Shree Durga Car Care Clinic"
            >
              <PhoneCall className="w-5 h-5" />
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-white bg-white/10 rounded-lg"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ease-in-out ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="absolute inset-0 bg-black/85 backdrop-blur-md" onClick={handleNavClick} />
        
        <div className={`absolute top-0 right-0 w-4/5 sm:w-80 h-full bg-[var(--bg-secondary)] border-l border-[var(--border-color)] shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}>
          <div className="flex flex-col h-full pt-28 px-6 pb-8 overflow-y-auto">
            <div className="space-y-4 mb-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={handleNavClick}
                  className="block py-2.5 text-xl font-heading font-semibold uppercase tracking-wider text-white/80 hover:text-[var(--accent-red)] transition-colors border-b border-white/5"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            
            <div className="mt-auto flex flex-col gap-3">
              <a
                href="tel:974145938"
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-white/5 border border-white/10 text-white font-heading font-semibold tracking-wider uppercase text-sm"
              >
                <PhoneCall className="w-4 h-4 text-[var(--accent-red)]" />
                <span>Call 974145938</span>
              </a>
              <a
                href="#booking"
                onClick={handleNavClick}
                className="btn-editorial w-full justify-center !py-3 !text-sm"
              >
                <CalendarCheck className="w-4 h-4" />
                <span>Book Service Now</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
