"use client";

import { useState, useEffect } from "react";
import { Plus, Minus, MessageCircleQuestion } from "lucide-react";

const faqs = [
  {
    id: 1,
    question: "What services do you provide?",
    answer: "We offer a comprehensive range of automotive services including general maintenance, engine diagnostics, oil changes, brake repairs, AC servicing, wheel alignment, and premium car detailing."
  },
  {
    id: 2,
    question: "Do I need an appointment for a service?",
    answer: "While we do accept walk-ins based on availability, we highly recommend booking an appointment in advance. This allows us to dedicate the proper time and resources to your vehicle without making you wait."
  },
  {
    id: 3,
    question: "How long does a general service take?",
    answer: "A standard periodic maintenance service typically takes 2 to 4 hours depending on the vehicle condition and the specific package chosen. We will provide a more accurate time estimate after the initial inspection."
  },
  {
    id: 4,
    question: "Do you use genuine spare parts?",
    answer: "Yes, absolutely. We source our parts directly from authorized distributors and OEMs (Original Equipment Manufacturers). We never compromise on quality and always use genuine or OEM-equivalent premium parts."
  },
  {
    id: 5,
    question: "Do you provide a warranty on your repairs?",
    answer: "Yes, we stand behind our work. We offer a standard warranty on all labor, and the spare parts carry their respective manufacturer warranties. Specific terms will be discussed before the repair begins."
  },
  {
    id: 6,
    question: "How can I get an estimate for my car repair?",
    answer: "You can get a preliminary estimate by calling us or filling out the booking form with your vehicle details and the issue you're facing. For a precise quote, we recommend bringing your car in for a physical diagnostic check."
  }
];

export default function FAQ() {
  const [openId, setOpenId] = useState<number | null>(1);

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

    const elements = document.querySelectorAll(".reveal-faq");
    elements.forEach((el) => observer.observe(el));

    return () => elements.forEach((el) => observer.unobserve(el));
  }, []);

  const toggleFAQ = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="section-padding bg-[var(--bg-primary)] border-b border-[var(--border-color)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16 reveal-faq opacity-0 translate-y-8 transition-all duration-700">
          <div className="w-16 h-16 rounded-full bg-[var(--accent-red)]/10 border border-[var(--accent-red)]/30 text-[var(--accent-red)] flex items-center justify-center mb-6">
            <MessageCircleQuestion className="w-8 h-8" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold tracking-tight text-white uppercase mb-4">
            Frequently Asked <span className="text-[var(--accent-red)]">Questions</span>
          </h2>
          <p className="text-base text-[var(--text-secondary)] font-light">
            Find answers to common questions about our services, booking process, and policies.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openId === faq.id;
            return (
              <div 
                key={faq.id}
                className={`reveal-faq opacity-0 translate-y-8 transition-all duration-700 bg-white/5 border rounded-lg overflow-hidden ${
                  isOpen ? "border-[var(--accent-red)]/50" : "border-white/10 hover:border-white/20"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className={`font-heading font-bold text-lg pr-8 transition-colors ${isOpen ? "text-[var(--accent-red)]" : "text-white"}`}>
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 ${
                    isOpen ? "border-[var(--accent-red)] bg-[var(--accent-red)] text-white rotate-180" : "border-white/20 text-white/50"
                  }`}>
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>
                
                <div 
                  className="grid transition-all duration-300 ease-in-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <div className="p-6 pt-0 text-[var(--text-secondary)] font-light leading-relaxed border-t border-white/5 mt-2">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Still have questions? */}
        <div className="mt-12 text-center reveal-faq opacity-0 transition-all duration-700 delay-500">
          <p className="text-[var(--text-secondary)]">
            Still have questions? <a href="#contact" className="text-[var(--accent-red)] hover:text-white transition-colors underline underline-offset-4">Contact our team</a>
          </p>
        </div>

      </div>
    </section>
  );
}
