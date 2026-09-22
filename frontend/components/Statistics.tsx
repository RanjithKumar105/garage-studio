"use client";

import { useEffect, useState, useRef } from "react";
import { Car, Wrench, Users, Star } from "lucide-react";

const stats = [
  {
    id: 1,
    value: 5000,
    suffix: "+",
    label: "Cars Serviced",
    icon: Car,
  },
  {
    id: 2,
    value: 15,
    suffix: "+",
    label: "Years Experience",
    icon: Wrench,
  },
  {
    id: 3,
    value: 10000,
    suffix: "+",
    label: "Happy Customers",
    icon: Users,
  },
  {
    id: 4,
    value: 4.9,
    suffix: "",
    label: "Average Rating",
    icon: Star,
    isFloat: true,
  },
];

const Counter = ({ end, suffix, isFloat }: { end: number, suffix: string, isFloat?: boolean }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let startTime: number | null = null;
    const duration = 2000; // 2 seconds
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      // Easing function (easeOutQuart)
      const easeProgress = 1 - Math.pow(1 - percentage, 4);
      
      const currentVal = end * easeProgress;
      setCount(isFloat ? Number(currentVal.toFixed(1)) : Math.floor(currentVal));

      if (progress < duration) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          animationFrameId = requestAnimationFrame(animate);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, [end, isFloat]);

  return (
    <div ref={ref} className="text-4xl sm:text-5xl font-heading font-bold text-white mb-2">
      {count}{suffix}
    </div>
  );
};

export default function Statistics() {
  return (
    <section className="py-20 bg-[#050505] border-y border-[var(--border-color)] relative overflow-hidden">
      
      {/* Background styling */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5 mix-blend-overlay pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg-primary)] via-transparent to-[var(--bg-primary)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div 
                key={stat.id} 
                className="flex flex-col items-center text-center p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[var(--accent-red)]/50 hover:bg-white/10 transition-all duration-500 group"
              >
                <div className="w-12 h-12 rounded-full bg-[var(--accent-red)]/10 text-[var(--accent-red)] flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[var(--accent-red)] group-hover:text-white transition-all duration-300">
                  <Icon className="w-6 h-6" />
                </div>
                <Counter end={stat.value} suffix={stat.suffix} isFloat={stat.isFloat} />
                <p className="text-sm font-heading tracking-widest uppercase text-[var(--text-secondary)]">
                  {stat.label}
                </p>
              </div>
            );
          })}
          
        </div>
      </div>
    </section>
  );
}
