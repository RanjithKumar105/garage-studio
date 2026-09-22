import Image from "next/image";
import { ArrowRight, ShieldCheck, Wrench, PhoneCall, Award, MapPin } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[92vh] flex items-center overflow-hidden bg-[var(--bg-primary)] pt-28 pb-16 lg:pt-36 lg:pb-24 border-b border-[var(--border-color)]"
    >
      {/* Subtle Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--accent-red)]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Text Content Area (Left 7 Cols) */}
          <div className="lg:col-span-7 flex flex-col items-start">
            
            {/* Top Quality Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-heading tracking-widest uppercase text-[var(--accent-red)] mb-6 animate-slide-up">
              <Award className="w-4 h-4 text-[var(--accent-red)]" />
              <span>Multi-Brand Expert Car Care Clinic</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-heading font-bold tracking-tight uppercase text-white leading-[1.05] mb-6 animate-slide-up delay-100">
              Shree Durga <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-[var(--accent-red)]">
                Car Care Clinic
              </span>
            </h1>

            {/* Sub-tagline */}
            <p className="text-base sm:text-xl text-[var(--text-secondary)] font-light leading-relaxed max-w-2xl mb-8 animate-slide-up delay-200">
              Professional car servicing, engine diagnostics, oil changes, brake repair, and complete vehicle maintenance led by experienced master mechanic <strong className="text-white font-medium">Sathish Karkera</strong>.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-10 animate-slide-up delay-300">
              <a href="#booking" className="btn-editorial">
                <span>Book a Service</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a href="tel:974145938" className="btn-secondary-auto">
                <PhoneCall className="w-4 h-4 text-[var(--accent-red)]" />
                <span>Call Now</span>
              </a>

              <a href="#contact" className="btn-secondary-auto">
                <MapPin className="w-4 h-4 text-[var(--accent-red)]" />
                <span>Get Directions</span>
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="w-full grid grid-cols-2 gap-y-3 gap-x-4 animate-slide-up delay-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[var(--accent-red)]" />
                <span className="text-sm font-medium text-[var(--text-secondary)]">Experienced Technicians</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[var(--accent-red)]" />
                <span className="text-sm font-medium text-[var(--text-secondary)]">Quality Service</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[var(--accent-red)]" />
                <span className="text-sm font-medium text-[var(--text-secondary)]">Genuine Parts</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[var(--accent-red)]" />
                <span className="text-sm font-medium text-[var(--text-secondary)]">Customer Satisfaction</span>
              </div>
            </div>

          </div>

          {/* Real Garage Image Frame (Right 5 Cols) */}
          <div className="lg:col-span-5 relative animate-fade-scale delay-300">
            <div className="relative aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3] w-full rounded-2xl overflow-hidden border-2 border-white/10 shadow-2xl shadow-black/80 group">
              <Image
                src="/real-garage.jpg"
                alt="Shree Durga Car Care Clinic Actual Workshop"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Natural Subtle Gradient Edge Overlay for Text Contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

              {/* Floating Verified Workshop Badge */}
              <div className="absolute top-4 left-4 glass-card px-3.5 py-2 rounded-lg flex items-center gap-2 text-xs font-heading tracking-wider text-white shadow-lg border border-white/15">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Verified Workshop Facility</span>
              </div>

              {/* Floating Bottom Info Pill */}
              <div className="absolute bottom-4 left-4 right-4 glass-card p-3.5 rounded-xl border border-white/15 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[var(--accent-red)]/20 border border-[var(--accent-red)] flex items-center justify-center text-[var(--accent-red)]">
                    <Wrench className="w-4.5 h-4.5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-heading font-semibold uppercase text-white">Shree Durga Clinic</span>
                    <span className="text-[0.65rem] text-[var(--text-secondary)]">Lead Mechanic: Sathish Karkera</span>
                  </div>
                </div>
                <div className="hidden sm:flex items-center gap-1 text-[0.65rem] text-emerald-400 font-mono font-medium uppercase tracking-wider bg-emerald-950/60 px-2.5 py-1 rounded-md border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Open Now
                </div>
              </div>
            </div>

            {/* Background Glow Ring */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[var(--accent-red)] to-transparent rounded-2xl blur-xl opacity-20 -z-10 group-hover:opacity-40 transition-opacity" />
          </div>

        </div>
      </div>
    </section>
  );
}

