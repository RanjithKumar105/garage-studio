"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Search, Car, Calendar, Clock, ArrowRight, CheckCircle2, Check } from "lucide-react";
import { useToast } from "@/components/ToastProvider";

const trackingSteps = [
  { id: "booked", label: "BOOKED", description: "Your service request has been received." },
  { id: "confirmed", label: "CONFIRMED", description: "Service appointment is confirmed." },
  { id: "received", label: "VEHICLE RECEIVED", description: "We have received your vehicle at the garage." },
  { id: "inspection", label: "INSPECTION", description: "Our technicians are inspecting your vehicle." },
  { id: "in_service", label: "SERVICE IN PROGRESS", description: "Your vehicle is currently being serviced." },
  { id: "quality_check", label: "QUALITY CHECK", description: "Final testing and quality assurance." },
  { id: "ready", label: "READY FOR DELIVERY", description: "Service complete! Your vehicle is ready." },
  { id: "completed", label: "COMPLETED", description: "Vehicle has been delivered back to you." },
];

export default function TrackService() {
  const [trackingId, setTrackingId] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [result, setResult] = useState<any>(null);
  const { showToast } = useToast();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingId.trim()) return;

    setIsSearching(true);
    
    // Mock API Call Simulation
    setTimeout(() => {
      setIsSearching(false);
      
      if (trackingId.toUpperCase() === "BKG-001") {
        setResult({
          id: "BKG-001",
          customer: "Rahul Sharma",
          vehicle: "Maruti Swift",
          service: "General Service",
          date: "Oct 15, 2026",
          currentStepIndex: 4, // 0-indexed (SERVICE IN PROGRESS)
          estimatedCompletion: "Today, 5:00 PM"
        });
        showToast({ type: "success", title: "Booking Found", message: "Here is your vehicle's current status." });
      } else {
        setResult(null);
        showToast({ type: "error", title: "Not Found", message: "No active booking found with this ID or phone number." });
      }
    }, 1200);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen pt-24 pb-20 bg-[var(--bg-primary)]">
        
        {/* Header Section */}
        <section className="pt-16 pb-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-secondary)] to-transparent pointer-events-none"></div>
          <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-white uppercase tracking-tight mb-4">
              Track Your <span className="text-[var(--accent-red)]">Service</span>
            </h1>
            <p className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto font-light">
              Enter your Booking ID or registered phone number to get real-time updates on your vehicle's service progress.
            </p>
          </div>
        </section>

        {/* Search Bar Section */}
        <section className="max-w-2xl mx-auto px-4 mb-16 relative z-20">
          <form onSubmit={handleSearch} className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent-red)]/20 to-[var(--accent-red)]/5 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-50"></div>
            <div className="relative glass border border-[var(--border-color)] p-2 rounded-2xl flex items-center bg-[var(--bg-secondary)]/80 backdrop-blur-md">
              <div className="pl-4 pr-2 text-[var(--text-muted)]">
                <Search className="w-6 h-6" />
              </div>
              <input 
                type="text"
                placeholder="Enter Booking ID (e.g. BKG-001) or Phone Number..."
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-white placeholder-[var(--text-muted)] py-3 px-2 text-sm sm:text-base"
              />
              <button 
                type="submit"
                disabled={isSearching || !trackingId.trim()}
                className="btn-primary rounded-xl px-6 py-3 flex items-center gap-2 group/btn disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="hidden sm:inline">{isSearching ? "Searching..." : "Track Now"}</span>
                {isSearching ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                )}
              </button>
            </div>
          </form>
          <p className="text-center mt-4 text-xs text-[var(--text-muted)]">
            Try searching for <span className="font-mono text-white bg-white/10 px-2 py-0.5 rounded cursor-pointer hover:bg-white/20 transition-colors" onClick={() => setTrackingId("BKG-001")}>BKG-001</span> to see a live demo.
          </p>
        </section>

        {/* Results Section */}
        {result && (
          <section className="max-w-4xl mx-auto px-4 animate-slide-up">
            
            {/* Vehicle Card Summary */}
            <div className="glass border border-[var(--border-color)] rounded-2xl p-6 sm:p-8 mb-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--accent-red)]/5 rounded-full blur-3xl pointer-events-none"></div>
              
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 relative z-10">
                <div>
                  <p className="text-xs font-heading font-bold uppercase tracking-widest text-[var(--accent-red)] mb-1">Booking #{result.id}</p>
                  <h2 className="text-2xl font-bold text-white mb-2">{result.vehicle}</h2>
                  <p className="text-[var(--text-secondary)]">{result.customer} &bull; {result.service}</p>
                </div>
                
                <div className="flex flex-col sm:items-end gap-3 w-full sm:w-auto">
                  <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)] bg-white/5 px-4 py-2 rounded-lg border border-white/5 w-full sm:w-auto justify-center sm:justify-start">
                    <Calendar className="w-4 h-4 text-[var(--text-muted)]" />
                    <span>Received: <strong className="text-white font-medium">{result.date}</strong></span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)] bg-[var(--accent-red)]/10 px-4 py-2 rounded-lg border border-[var(--accent-red)]/20 w-full sm:w-auto justify-center sm:justify-start">
                    <Clock className="w-4 h-4 text-[var(--accent-red)]" />
                    <span>Est. Completion: <strong className="text-white font-medium">{result.estimatedCompletion}</strong></span>
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Timeline */}
            <div className="card-automotive p-6 sm:p-10 relative overflow-hidden">
              <h3 className="text-xl font-heading font-bold text-white uppercase tracking-wider mb-10 text-center">Service Progress</h3>
              
              <div className="relative">
                {/* Vertical Line Connector (Mobile) / Horizontal Line (Desktop) */}
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-[var(--border-color)] sm:hidden"></div>
                
                <div className="flex flex-col sm:flex-row sm:flex-wrap gap-8 sm:gap-y-12 sm:justify-between relative z-10">
                  {trackingSteps.map((step, index) => {
                    const isCompleted = index < result.currentStepIndex;
                    const isActive = index === result.currentStepIndex;
                    const isPending = index > result.currentStepIndex;

                    return (
                      <div key={step.id} className="relative flex items-start sm:flex-col sm:items-center gap-4 sm:w-[22%] group z-10">
                        
                        {/* Status Icon Indicator */}
                        <div className={`relative shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 z-10 border-4 border-[var(--bg-secondary)] ${
                          isCompleted ? "bg-emerald-500 text-white" : 
                          isActive ? "bg-[var(--accent-red)] text-white shadow-[0_0_20px_rgba(220,38,38,0.5)]" : 
                          "bg-[var(--bg-tertiary)] border-[var(--border-color)] text-[var(--text-muted)]"
                        }`}>
                          {isCompleted ? <Check className="w-5 h-5" /> : 
                           isActive ? <Car className="w-5 h-5 animate-pulse" /> : 
                           <span className="text-xs font-bold font-mono">{index + 1}</span>}
                           
                          {/* Active pulsing ring */}
                          {isActive && (
                            <div className="absolute inset-0 rounded-full border border-[var(--accent-red)] animate-ping opacity-75"></div>
                          )}
                        </div>

                        {/* Horizontal Line Connector (Desktop) */}
                        {index !== trackingSteps.length - 1 && (
                          <div className={`hidden sm:block absolute top-6 left-1/2 w-[calc(100%+2rem)] h-0.5 -z-10 transition-colors duration-500 ${
                            isCompleted ? "bg-emerald-500" : "bg-[var(--border-color)]"
                          }`}></div>
                        )}

                        {/* Step Details */}
                        <div className="flex-1 sm:text-center mt-1 sm:mt-2">
                          <h4 className={`text-sm font-heading font-bold uppercase tracking-wider mb-1 transition-colors duration-300 ${
                            isCompleted ? "text-emerald-400" :
                            isActive ? "text-[var(--accent-red)]" :
                            "text-[var(--text-muted)]"
                          }`}>
                            {step.label}
                          </h4>
                          <p className={`text-xs transition-colors duration-300 ${
                            isActive ? "text-white" : "text-[var(--text-muted)]"
                          }`}>
                            {step.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
