"use client";

import { useEffect, useState } from "react";
import { Phone, MessageCircle, MapPin } from "lucide-react";

export default function FloatingActions() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show buttons after scrolling down 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div 
      className={`fixed bottom-6 right-6 z-50 flex flex-col gap-3 transition-all duration-500 md:hidden ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0 pointer-events-none"
      }`}
    >
      {/* WhatsApp Button */}
      <a 
        href="https://wa.me/91974145938?text=Hello,%20I%20would%20like%20to%20book%20a%20service."
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 rounded-full bg-[#25D366] text-white shadow-lg flex items-center justify-center hover:scale-110 active:scale-95 transition-transform"
        aria-label="WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
      </a>

      {/* Map Directions Button */}
      <a 
        href="#contact"
        className="w-12 h-12 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-color)] text-white shadow-lg flex items-center justify-center hover:scale-110 active:scale-95 transition-transform"
        aria-label="Directions"
      >
        <MapPin className="w-6 h-6" />
      </a>

      {/* Call Button */}
      <a 
        href="tel:974145938"
        className="w-12 h-12 rounded-full bg-[var(--accent-red)] text-white shadow-[0_0_15px_rgba(230,57,70,0.5)] flex items-center justify-center hover:scale-110 active:scale-95 transition-transform"
        aria-label="Call Now"
      >
        <Phone className="w-5 h-5 fill-current" />
      </a>
    </div>
  );
}
