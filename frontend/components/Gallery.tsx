"use client";

import { useEffect } from "react";
import Image from "next/image";
import { Camera, ShieldCheck } from "lucide-react";

const galleryImages = [
  { 
    src: "/real-garage.jpg", 
    alt: "Shree Durga Car Care Clinic Actual Workshop Facility", 
    caption: "Shree Durga Car Care Clinic - Main Workshop", 
    tag: "Real Garage Photo",
    featured: true 
  },
  { 
    src: "/gallery_workshop_1786943030543.jpg", 
    alt: "Professional automotive workshop interior", 
    caption: "Service Bay & Lift Facility", 
    tag: "Facility",
    featured: false 
  },
  { 
    src: "/gallery_diagnostics_1786942738256.jpg", 
    alt: "Expert mechanic performing engine inspection", 
    caption: "Computerized Engine Diagnostics", 
    tag: "Diagnostics",
    featured: false 
  },
  { 
    src: "/gallery_engine_1786942706963.jpg", 
    alt: "Engine service and maintenance", 
    caption: "Engine Repair & Overhaul", 
    tag: "Engine Care",
    featured: false 
  },
  { 
    src: "/gallery_brake_1786943009076.jpg", 
    alt: "Brake repair service", 
    caption: "Brake Disc & Pad Servicing", 
    tag: "Brake Safety",
    featured: false 
  },
];

export default function Gallery() {
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
    <section id="gallery" className="section-padding bg-[var(--bg-primary)] border-b border-[var(--border-color)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 lg:mb-16 reveal-on-scroll">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-[2px] bg-[var(--accent-red)]" />
              <span className="text-xs font-heading font-bold tracking-widest uppercase text-[var(--accent-red)]">
                Workshop & Facilities
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-heading font-bold tracking-tight text-white uppercase leading-[1.1]">
              Inside <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-[var(--accent-red)]">
                Shree Durga Clinic.
              </span>
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-[var(--text-secondary)] text-base max-w-md font-light">
            Explore our real workshop setup, precision diagnostic tools, and dedicated service bays in action.
          </p>
        </div>

        {/* Real Garage Spotlight Banner */}
        <div className="mb-12 reveal-on-scroll">
          <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full rounded-2xl overflow-hidden border-2 border-white/10 shadow-2xl group">
            <Image
              src={galleryImages[0].src}
              alt={galleryImages[0].alt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            
            <div className="absolute top-4 left-4 glass-card px-3 py-1.5 rounded-lg flex items-center gap-2 text-xs font-heading uppercase text-white border border-white/15">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Official Business Location</span>
            </div>

            <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-xs font-heading tracking-widest uppercase text-[var(--accent-red)] font-semibold">
                  {galleryImages[0].tag}
                </span>
                <h3 className="text-xl sm:text-3xl font-heading font-bold uppercase text-white mt-1">
                  {galleryImages[0].caption}
                </h3>
              </div>
              <div className="flex items-center gap-2 text-xs text-white/80 bg-black/60 px-3 py-1.5 rounded-lg backdrop-blur-md border border-white/10">
                <Camera className="w-4 h-4 text-[var(--accent-red)]" />
                <span>Actual Clinic Photo</span>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {galleryImages.slice(1).map((item, idx) => (
            <div 
              key={item.caption} 
              className="card-automotive rounded-xl overflow-hidden reveal-on-scroll group"
              style={{ animationDelay: `${(idx + 1) * 150}ms` }}
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
              </div>
              <div className="p-4 border-t border-white/5 bg-[var(--bg-tertiary)] flex flex-col">
                <span className="text-[0.65rem] font-heading font-semibold uppercase tracking-wider text-[var(--accent-red)]">
                  {item.tag}
                </span>
                <span className="text-sm font-heading font-bold uppercase text-white mt-1">
                  {item.caption}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

