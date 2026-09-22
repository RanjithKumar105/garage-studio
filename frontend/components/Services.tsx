"use client";

import { useEffect } from "react";
import { 
  Wrench, 
  Cpu, 
  Gauge, 
  Disc, 
  Sparkles, 
  Zap, 
  CircleDot, 
  Snowflake, 
  ShieldAlert, 
  ArrowRight 
} from "lucide-react";

const services = [
  { 
    title: "General Service", 
    desc: "Complete periodic maintenance, multi-point safety inspection, engine oil & filter replacement.",
    icon: Wrench,
    badge: "Popular"
  },
  { 
    title: "Engine Repair", 
    desc: "Comprehensive engine diagnostics, overhaul, head gasket repair, and performance tuning.",
    icon: Cpu,
    badge: "Expertise"
  },
  { 
    title: "Car Diagnostics", 
    desc: "Advanced OBD-II computer scanning to identify engine fault codes and electrical glitches accurately.",
    icon: Gauge,
    badge: "Advanced"
  },
  { 
    title: "Brake Service", 
    desc: "Brake pad & shoe replacement, disc rotor resurfacing, brake fluid flush, and ABS checks.",
    icon: Disc,
    badge: "Safety First"
  },
  { 
    title: "Wash & Detailing", 
    desc: "Deep foam exterior wash, interior vacuuming & sanitization, wax polishing, and ceramic coating.",
    icon: Sparkles,
    badge: "Care"
  },
  { 
    title: "Electrical Repair", 
    desc: "Wiring harness repair, alternator servicing, starter motor fix, and battery health diagnostics.",
    icon: Zap,
    badge: "Precision"
  },
  { 
    title: "Suspension & Steering", 
    desc: "Shock absorber replacement, strut mounts, wheel alignment & balancing, and power steering fix.",
    icon: CircleDot,
    badge: "Comfort"
  },
  { 
    title: "AC Service", 
    desc: "AC gas refilling, compressor overhaul, cooling coil cleaning, and leak detection.",
    icon: Snowflake,
    badge: "Cooling"
  },
  { 
    title: "Body & Dent Repair", 
    desc: "Precision dent removal, scratch touchups, collision repair, and full body painting.",
    icon: ShieldAlert,
    badge: "Restoration"
  },
];

export default function Services() {
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
    <section id="services" className="section-padding bg-[var(--bg-primary)] border-b border-[var(--border-color)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 lg:mb-16 reveal-on-scroll">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-[2px] bg-[var(--accent-red)]" />
              <span className="text-xs font-heading font-bold tracking-widest uppercase text-[var(--accent-red)]">
                Our Specialized Services
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-heading font-bold tracking-tight text-white uppercase leading-[1.1]">
              Comprehensive <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-[var(--accent-red)]">
                Car Care Solutions.
              </span>
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-[var(--text-secondary)] text-base max-w-md font-light">
            We deliver complete automotive repair and routine servicing using diagnostic equipment and genuine spare parts.
          </p>
        </div>

        {/* Services Grid (Modern Cards with Rounded Corners) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div 
                key={service.title} 
                className="card-automotive p-6 sm:p-8 flex flex-col justify-between reveal-on-scroll group"
                style={{ animationDelay: `${(index % 3) * 150}ms` }}
              >
                <div>
                  {/* Card Header: Icon + Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-[var(--accent-red)]/10 border border-[var(--accent-red)]/30 text-[var(--accent-red)] flex items-center justify-center group-hover:scale-110 group-hover:bg-[var(--accent-red)] group-hover:text-white transition-all duration-300">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-[0.65rem] font-heading font-semibold uppercase tracking-wider text-[var(--text-muted)] bg-white/5 border border-white/10 px-2.5 py-1 rounded-full">
                      {service.badge}
                    </span>
                  </div>

                  {/* Service Title */}
                  <h3 className="text-xl sm:text-2xl font-heading font-bold uppercase text-white mb-3 group-hover:text-[var(--accent-red)] transition-colors">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-[var(--text-secondary)] font-light leading-relaxed mb-6">
                    {service.desc}
                  </p>
                </div>

                {/* Card Action Link */}
                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <a 
                    href="#booking" 
                    className="inline-flex items-center gap-2 text-xs font-heading font-bold uppercase tracking-wider text-white group-hover:text-[var(--accent-red)] transition-colors"
                  >
                    <span>Book This Service</span>
                    <ArrowRight className="w-4 h-4 text-[var(--accent-red)] group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

