"use client";

import { useState, useRef, useEffect } from "react";
import { GripVertical } from "lucide-react";
import Image from "next/image";

export default function BeforeAfter() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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

    const elements = document.querySelectorAll(".reveal-ba");
    elements.forEach((el) => observer.observe(el));

    return () => elements.forEach((el) => observer.unobserve(el));
  }, []);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(position);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchend", handleMouseUp);
    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, []);

  return (
    <section className="section-padding bg-[var(--bg-primary)] border-b border-[var(--border-color)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16 reveal-ba opacity-0 translate-y-8 transition-all duration-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-[2px] bg-[var(--accent-red)]" />
            <span className="text-xs font-heading font-bold tracking-widest uppercase text-[var(--accent-red)]">
              Quality Guaranteed
            </span>
            <div className="w-10 h-[2px] bg-[var(--accent-red)]" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-bold tracking-tight text-white uppercase leading-[1.1] mb-6">
            The Transformation <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-[var(--accent-red)]">
              You Can See.
            </span>
          </h2>
          <p className="text-base text-[var(--text-secondary)] font-light max-w-2xl">
            Slide to see the incredible difference our premium detailing and repair services can make to your vehicle.
          </p>
        </div>

        {/* Slider Container */}
        <div 
          className="relative w-full max-w-5xl mx-auto aspect-[16/9] sm:aspect-[21/9] bg-black border border-white/10 overflow-hidden group reveal-ba opacity-0 translate-y-12 transition-all duration-1000 select-none cursor-ew-resize"
          ref={containerRef}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onTouchStart={() => setIsDragging(true)}
          onTouchMove={handleTouchMove}
        >
          {/* After Image (Background) */}
          <div className="absolute inset-0">
            {/* Using a placeholder for now, replace with actual image */}
            <div className="w-full h-full bg-[#111] flex items-center justify-center relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 to-cyan-900/40 mix-blend-overlay" />
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
              <span className="text-white/20 font-heading text-4xl uppercase font-bold tracking-widest z-10">AFTER</span>
            </div>
          </div>

          {/* Before Image (Foreground, Clipped) */}
          <div 
            className="absolute inset-0 border-r-2 border-[var(--accent-red)]"
            style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
          >
            <div className="w-full h-full bg-[#1a1a1a] flex items-center justify-center relative">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-900/40 to-red-900/40 mix-blend-overlay" />
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/grunge-wall.png')] opacity-30" />
              <span className="text-white/20 font-heading text-4xl uppercase font-bold tracking-widest z-10">BEFORE</span>
            </div>
          </div>

          {/* Slider Handle */}
          <div 
            className="absolute top-0 bottom-0 w-[2px] bg-[var(--accent-red)] flex items-center justify-center shadow-[0_0_15px_rgba(230,57,70,0.8)]"
            style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
          >
            <div className={`w-10 h-10 rounded-full bg-[var(--bg-primary)] border-2 border-[var(--accent-red)] flex items-center justify-center text-white transition-transform duration-200 ${isDragging ? 'scale-110 shadow-[0_0_20px_rgba(230,57,70,0.6)]' : 'shadow-lg'}`}>
              <GripVertical className="w-5 h-5" />
            </div>
          </div>

          {/* Labels */}
          <div className="absolute bottom-6 left-6 px-4 py-2 bg-black/60 backdrop-blur-md border border-white/10 text-white font-heading text-xs font-bold uppercase tracking-widest rounded pointer-events-none">
            Before
          </div>
          <div className="absolute bottom-6 right-6 px-4 py-2 bg-[var(--accent-red)]/80 backdrop-blur-md border border-[var(--accent-red)] text-white font-heading text-xs font-bold uppercase tracking-widest rounded pointer-events-none">
            After
          </div>
        </div>

      </div>
    </section>
  );
}
