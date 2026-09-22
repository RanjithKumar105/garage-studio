"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowRight, CheckCircle, ChevronDown } from "lucide-react";
import { useToast } from "@/components/ToastProvider";

const vehicleTypes = [
  "Sedan",
  "SUV",
  "Hatchback",
  "MUV / MPV",
  "Luxury Car",
  "Sports Car",
  "Other",
];

const serviceOptions = [
  "General Service",
  "Engine Repair",
  "Car Diagnostics",
  "Brake Service",
  "Car Wash & Detailing",
  "Electrical Repair",
  "Suspension & Steering",
  "AC Service & Repair",
  "Body & Dent Repair",
  "Car Painting",
  "Battery Service",
  "Exhaust System",
  "Other",
];

interface FormData {
  name: string;
  phone: string;
  vehicleType: string;
  vehicleModel: string;
  service: string;
  preferredDate: string;
  message: string;
}

interface FormErrors {
  [key: string]: string;
}

// Custom Dropdown Component
function CustomSelect({
  label,
  options,
  value,
  onChange,
  error,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (val: string) => void;
  error?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <label className="block text-xs font-heading font-bold tracking-wider uppercase text-[var(--text-secondary)] mb-2">
        {label}
      </label>
      
      <div 
        className={`w-full flex items-center justify-between bg-[var(--bg-primary)] border ${
          error ? "border-[var(--accent-red)]" : "border-[var(--border-color)]"
        } ${isOpen ? "!border-[var(--accent-red)]" : ""} rounded-lg px-4 py-3 text-sm cursor-pointer transition-colors select-none`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={value ? "text-white" : "text-white/30"}>
          {value || "Select an option"}
        </span>
        <ChevronDown className={`w-4 h-4 text-[var(--text-muted)] transition-transform duration-300 ${isOpen ? "rotate-180 text-white" : ""}`} />
      </div>
      
      {error && (
        <p className="mt-1 text-[0.65rem] font-mono text-[var(--accent-red)] uppercase tracking-wider">{error}</p>
      )}

      {/* Dropdown Menu */}
      <div 
        className={`absolute top-full left-0 w-full mt-2 bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-xl shadow-2xl z-50 transition-all duration-200 origin-top ${
          isOpen ? "opacity-100 scale-y-100 visible" : "opacity-0 scale-y-0 invisible"
        } max-h-60 overflow-y-auto`}
      >
        {options.map((opt) => (
          <div
            key={opt}
            className={`px-4 py-2.5 text-xs font-heading tracking-wider uppercase hover:bg-[var(--accent-red)] hover:text-white cursor-pointer transition-colors ${
              value === opt ? "text-[var(--accent-red)] bg-white/5 font-bold" : "text-[var(--text-secondary)]"
            }`}
            onClick={() => {
              onChange(opt);
              setIsOpen(false);
            }}
          >
            {opt}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function BookingForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    vehicleType: "",
    vehicleModel: "",
    service: "",
    preferredDate: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const { showToast } = useToast();

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

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Required";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Required";
    } else if (!/^[0-9]{7,15}$/.test(formData.phone.replace(/[+\-\s]/g, ""))) {
      newErrors.phone = "Invalid format";
    }

    if (!formData.vehicleType) {
      newErrors.vehicleType = "Required";
    }

    if (!formData.vehicleModel.trim()) {
      newErrors.vehicleModel = "Required";
    }

    if (!formData.service) {
      newErrors.service = "Required";
    }

    if (!formData.preferredDate) {
      newErrors.preferredDate = "Required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const handleDropdownChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      showToast({
        type: "success",
        title: "Booking Request Sent!",
        message: `Thank you, ${formData.name}. We will contact you shortly at ${formData.phone} to confirm your slot.`,
        duration: 6000,
      });
      setFormData({
        name: "",
        phone: "",
        vehicleType: "",
        vehicleModel: "",
        service: "",
        preferredDate: "",
        message: "",
      });
    } else {
      showToast({
        type: "error",
        title: "Validation Error",
        message: "Please fill out all required fields correctly.",
      });
    }
  };

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  return (
    <section id="booking" className="section-padding bg-[var(--bg-secondary)] border-b border-[var(--border-color)] relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Header Side */}
          <div className="lg:col-span-4 reveal-on-scroll">
            <div className="lg:sticky lg:top-32">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-[2px] bg-[var(--accent-red)]" />
                <span className="text-xs font-heading font-bold tracking-widest uppercase text-[var(--accent-red)]">
                  Service Appointment
                </span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-heading font-bold tracking-tight text-white uppercase mb-6 leading-[1.1]">
                Book Your <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-[var(--accent-red)]">
                  Car Service.
                </span>
              </h2>
              <p className="text-base text-[var(--text-secondary)] font-light leading-relaxed mb-8">
                Fill out the quick appointment form to schedule your car service or repair. Our team will verify slot availability and contact you promptly.
              </p>

              {/* Direct Call Card */}
              <div className="p-5 rounded-xl bg-white/5 border border-white/10 flex flex-col gap-3">
                <span className="text-xs font-heading font-bold tracking-widest uppercase text-[var(--accent-red)]">
                  Prefer Direct Phone Booking?
                </span>
                <p className="text-xs text-[var(--text-secondary)]">Call Sathish Karkera directly for urgent vehicle breakdown or immediate slot confirmation.</p>
                <a href="tel:974145938" className="btn-secondary-auto !py-2 !px-4 !text-xs justify-center mt-1">
                  <span>Call 974145938 Now</span>
                </a>
              </div>
            </div>
          </div>

          {/* Form Card Side */}
          <div className="lg:col-span-8 reveal-on-scroll delay-200">
            <div className="card-automotive p-6 sm:p-10">
              <form onSubmit={handleSubmit} noValidate className="w-full">
                
                <div className="grid sm:grid-cols-2 gap-6 mb-6">
                  
                  {/* Name Input */}
                  <div>
                    <label htmlFor="booking-name" className="block text-xs font-heading font-bold tracking-wider uppercase text-[var(--text-secondary)] mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="booking-name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Rahul Sharma"
                      className={`w-full bg-[var(--bg-primary)] border ${
                        errors.name ? "border-[var(--accent-red)]" : "border-[var(--border-color)] focus:border-[var(--accent-red)]"
                      } rounded-lg px-4 py-3 text-sm text-white outline-none transition-colors placeholder-white/20`}
                    />
                    {errors.name && (
                      <p className="mt-1 text-[0.65rem] font-mono text-[var(--accent-red)] uppercase tracking-wider">{errors.name}</p>
                    )}
                  </div>

                  {/* Phone Input */}
                  <div>
                    <label htmlFor="booking-phone" className="block text-xs font-heading font-bold tracking-wider uppercase text-[var(--text-secondary)] mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="booking-phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. 974145938"
                      className={`w-full bg-[var(--bg-primary)] border ${
                        errors.phone ? "border-[var(--accent-red)]" : "border-[var(--border-color)] focus:border-[var(--accent-red)]"
                      } rounded-lg px-4 py-3 text-sm text-white outline-none transition-colors placeholder-white/20`}
                    />
                    {errors.phone && (
                      <p className="mt-1 text-[0.65rem] font-mono text-[var(--accent-red)] uppercase tracking-wider">{errors.phone}</p>
                    )}
                  </div>

                  {/* Vehicle Type Dropdown */}
                  <CustomSelect 
                    label="Vehicle Type *"
                    options={vehicleTypes}
                    value={formData.vehicleType}
                    onChange={(val) => handleDropdownChange("vehicleType", val)}
                    error={errors.vehicleType}
                  />

                  {/* Vehicle Model Input */}
                  <div>
                    <label htmlFor="booking-vehicle-model" className="block text-xs font-heading font-bold tracking-wider uppercase text-[var(--text-secondary)] mb-2">
                      Car Make & Model *
                    </label>
                    <input
                      type="text"
                      id="booking-vehicle-model"
                      name="vehicleModel"
                      value={formData.vehicleModel}
                      onChange={handleChange}
                      placeholder="e.g. Maruti Swift / Hyundai i20"
                      className={`w-full bg-[var(--bg-primary)] border ${
                        errors.vehicleModel ? "border-[var(--accent-red)]" : "border-[var(--border-color)] focus:border-[var(--accent-red)]"
                      } rounded-lg px-4 py-3 text-sm text-white outline-none transition-colors placeholder-white/20`}
                    />
                    {errors.vehicleModel && (
                      <p className="mt-1 text-[0.65rem] font-mono text-[var(--accent-red)] uppercase tracking-wider">{errors.vehicleModel}</p>
                    )}
                  </div>

                  {/* Service Option Dropdown */}
                  <CustomSelect 
                    label="Service Required *"
                    options={serviceOptions}
                    value={formData.service}
                    onChange={(val) => handleDropdownChange("service", val)}
                    error={errors.service}
                  />

                  {/* Date Input */}
                  <div>
                    <label htmlFor="booking-date" className="block text-xs font-heading font-bold tracking-wider uppercase text-[var(--text-secondary)] mb-2">
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      id="booking-date"
                      name="preferredDate"
                      value={formData.preferredDate}
                      onChange={handleChange}
                      min={minDate}
                      className={`w-full bg-[var(--bg-primary)] border ${
                        errors.preferredDate ? "border-[var(--accent-red)]" : "border-[var(--border-color)] focus:border-[var(--accent-red)]"
                      } rounded-lg px-4 py-3 text-sm text-white outline-none transition-colors cursor-pointer`}
                      style={{ colorScheme: 'dark' }}
                    />
                    {errors.preferredDate && (
                      <p className="mt-1 text-[0.65rem] font-mono text-[var(--accent-red)] uppercase tracking-wider">{errors.preferredDate}</p>
                    )}
                  </div>

                </div>

                {/* Additional Notes Textarea */}
                <div className="mb-8">
                  <label htmlFor="booking-message" className="block text-xs font-heading font-bold tracking-wider uppercase text-[var(--text-secondary)] mb-2">
                    Additional Notes / Issues Experienced
                  </label>
                  <textarea
                    id="booking-message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Mention any specific noise, oil leak, or issue you'd like us to inspect..."
                    className="w-full bg-[var(--bg-primary)] border border-[var(--border-color)] focus:border-[var(--accent-red)] rounded-lg px-4 py-3 text-sm text-white outline-none transition-colors resize-none placeholder-white/20"
                  />
                </div>

                {/* Submit Button */}
                <button type="submit" className="btn-editorial w-full justify-center !py-3.5">
                  <span>Confirm & Request Booking</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

