"use client";

import { useEffect, useState } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Rajesh Kumar",
    vehicle: "Hyundai Creta",
    rating: 5,
    text: "Exceptional service! The team at Shree Durga properly diagnosed the AC issue that three other garages couldn't fix. The waiting area is clean, and the staff is highly professional. Highly recommended for any car repair needs in the area.",
    date: "2 weeks ago"
  },
  {
    id: 2,
    name: "Priya Sharma",
    vehicle: "Maruti Suzuki Swift",
    rating: 5,
    text: "I've been getting my car serviced here for the past 2 years. They are always transparent about the pricing and never suggest unnecessary repairs. The recent Teflon coating they did made my 5-year-old car look brand new again.",
    date: "1 month ago"
  },
  {
    id: 3,
    name: "Vikram Singh",
    vehicle: "Honda City",
    rating: 4,
    text: "Great experience with their general service package. The pickup and drop facility was very convenient. The only reason for 4 stars is that it took a bit longer than promised, but the quality of work was excellent.",
    date: "3 months ago"
  },
  {
    id: 4,
    name: "Anjali Desai",
    vehicle: "Tata Nexon",
    rating: 5,
    text: "Sathish and his team are magicians! I had a nasty dent on my bumper and they fixed it flawlessly. You can't even tell it was ever damaged. Very reasonable pricing for the premium quality of work they deliver.",
    date: "4 months ago"
  }
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

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

    const elements = document.querySelectorAll(".reveal-testimonial");
    elements.forEach((el) => observer.observe(el));

    return () => elements.forEach((el) => observer.unobserve(el));
  }, []);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  return (
    <section id="reviews" className="section-padding bg-[var(--bg-secondary)] border-b border-[var(--border-color)] relative overflow-hidden">
      
      {/* Background Element */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[var(--bg-primary)] to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Header Column */}
          <div className="lg:col-span-5 flex flex-col reveal-testimonial opacity-0 translate-x-[-30px] transition-all duration-700">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-[2px] bg-[var(--accent-red)]" />
              <span className="text-xs font-heading font-bold tracking-widest uppercase text-[var(--accent-red)]">
                Client Reviews
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-heading font-bold tracking-tight text-white uppercase leading-[1.1] mb-6">
              What Our <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-[var(--accent-red)]">
                Customers Say.
              </span>
            </h2>
            <p className="text-base text-[var(--text-secondary)] font-light mb-8 max-w-md">
              Don&apos;t just take our word for it. Read honest feedback from our satisfied customers who trust us with their vehicles.
            </p>
            
            <div className="flex gap-4">
              <button 
                onClick={prevTestimonial}
                className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-[var(--accent-red)] hover:border-[var(--accent-red)] transition-all duration-300"
                aria-label="Previous review"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={nextTestimonial}
                className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-[var(--accent-red)] hover:border-[var(--accent-red)] transition-all duration-300"
                aria-label="Next review"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Testimonial Slider Column */}
          <div className="lg:col-span-7 lg:col-start-6 relative reveal-testimonial opacity-0 translate-x-[30px] transition-all duration-700 delay-200">
            
            <div className="relative h-[350px] sm:h-[300px]">
              {testimonials.map((testimonial, index) => {
                const isActive = index === activeIndex;
                const isPrev = index === (activeIndex === 0 ? testimonials.length - 1 : activeIndex - 1);
                const isNext = index === (activeIndex + 1) % testimonials.length;
                
                let transformClass = "opacity-0 translate-x-[100px] pointer-events-none z-0";
                if (isActive) transformClass = "opacity-100 translate-x-0 z-20 shadow-[0_20px_50px_rgba(0,0,0,0.5)]";
                else if (isPrev) transformClass = "opacity-0 -translate-x-[100px] pointer-events-none z-0";
                
                return (
                  <div 
                    key={testimonial.id}
                    className={`absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${transformClass}`}
                  >
                    <div className="w-full h-full bg-[#111] border border-white/10 p-8 sm:p-10 flex flex-col justify-between">
                      <div>
                        <Quote className="w-10 h-10 text-[var(--accent-red)]/30 mb-6" />
                        <div className="flex gap-1 mb-6">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-4 h-4 ${i < testimonial.rating ? "text-[var(--accent-red)] fill-[var(--accent-red)]" : "text-white/20"}`} 
                            />
                          ))}
                        </div>
                        <p className="text-lg sm:text-xl text-white font-light italic leading-relaxed mb-6">
                          &quot;{testimonial.text}&quot;
                        </p>
                      </div>
                      
                      <div className="flex justify-between items-end border-t border-white/10 pt-6">
                        <div>
                          <h4 className="text-white font-heading font-bold uppercase tracking-wider text-sm mb-1">
                            {testimonial.name}
                          </h4>
                          <span className="text-[var(--text-secondary)] text-xs uppercase tracking-widest">
                            {testimonial.vehicle}
                          </span>
                        </div>
                        <span className="text-[var(--text-muted)] text-xs">
                          {testimonial.date}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`h-1 transition-all duration-300 ${
                    index === activeIndex ? "w-8 bg-[var(--accent-red)]" : "w-2 bg-white/20 hover:bg-white/40"
                  }`}
                  aria-label={`Go to review ${index + 1}`}
                />
              ))}
            </div>

          </div>
          
        </div>
      </div>
    </section>
  );
}
