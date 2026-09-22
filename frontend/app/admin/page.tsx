"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  CalendarDays, 
  CheckCircle2, 
  Clock, 
  Search, 
  Wrench, 
  LogOut,
  CarFront,
  Filter,
  Check,
  X
} from "lucide-react";
import { useToast } from "@/components/ToastProvider";

// Mock data for the dashboard UI
const stats = [
  { label: "Total Bookings", value: "128", icon: CalendarDays, color: "text-blue-400" },
  { label: "New Requests", value: "12", icon: Clock, color: "text-amber-400" },
  { label: "In Service", value: "6", icon: Wrench, color: "text-[var(--accent-red)]" },
  { label: "Completed (This Month)", value: "45", icon: CheckCircle2, color: "text-emerald-400" },
];

const mockBookings = [
  { id: "BKG-001", customer: "Rahul Sharma", phone: "9876543210", vehicle: "Maruti Swift", service: "General Service", date: "2026-10-15", time: "10:00 AM", status: "Pending" },
  { id: "BKG-002", customer: "Priya Patel", phone: "9876543211", vehicle: "Hyundai i20", service: "AC Service & Repair", date: "2026-10-15", time: "11:30 AM", status: "Confirmed" },
  { id: "BKG-003", customer: "Amit Kumar", phone: "9876543212", vehicle: "Honda City", service: "Brake Service", date: "2026-10-14", time: "09:00 AM", status: "In Service" },
  { id: "BKG-004", customer: "Sneha Reddy", phone: "9876543213", vehicle: "Toyota Innova", service: "Car Wash & Detailing", date: "2026-10-14", time: "02:00 PM", status: "Completed" },
  { id: "BKG-005", customer: "Vikram Singh", phone: "9876543214", vehicle: "Mahindra Thar", service: "Engine Repair", date: "2026-10-13", time: "10:30 AM", status: "Cancelled" },
];

export default function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const { showToast } = useToast();

  const handleStatusChange = (id: string, newStatus: string) => {
    // In a real app, this would make an API call
    showToast({
      type: "success",
      title: "Status Updated",
      message: `Booking ${id} is now marked as ${newStatus}.`,
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Pending":
        return <span className="px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wider rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20">Pending</span>;
      case "Confirmed":
        return <span className="px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wider rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20">Confirmed</span>;
      case "In Service":
        return <span className="px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wider rounded-md bg-[var(--accent-red)]/10 text-[var(--accent-red)] border border-[var(--accent-red)]/20">In Service</span>;
      case "Completed":
        return <span className="px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wider rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Completed</span>;
      case "Cancelled":
        return <span className="px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wider rounded-md bg-zinc-500/10 text-zinc-400 border border-zinc-500/20">Cancelled</span>;
      default:
        return <span>{status}</span>;
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] pb-12">
      
      {/* Admin Header */}
      <header className="sticky top-0 z-40 bg-[var(--bg-secondary)] border-b border-[var(--border-color)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[var(--accent-red)] flex items-center justify-center">
                <Wrench className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="text-sm font-heading font-bold uppercase tracking-wider text-white">Shree Durga Admin</h1>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Link href="/" className="text-xs text-[var(--text-secondary)] hover:text-white transition-colors uppercase tracking-wider font-semibold flex items-center gap-2">
                <CarFront className="w-4 h-4" />
                View Site
              </Link>
              <div className="w-px h-4 bg-[var(--border-color)]"></div>
              <button 
                className="text-xs text-[var(--text-secondary)] hover:text-[var(--accent-red)] transition-colors uppercase tracking-wider font-semibold flex items-center gap-2"
                onClick={() => showToast({ type: "info", title: "Auth Required", message: "Backend authentication not yet implemented." })}
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Page Title & Actions */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-heading font-bold text-white uppercase tracking-tight mb-2">Dashboard Overview</h2>
            <p className="text-sm text-[var(--text-secondary)]">Manage your service bookings and track garage performance.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-lg text-xs font-semibold uppercase tracking-wider hover:bg-white/5 transition-colors">
              <CalendarDays className="w-4 h-4" />
              <span>Today</span>
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {stats.map((stat, i) => (
            <div key={i} className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl p-5 flex items-start justify-between">
              <div>
                <p className="text-xs text-[var(--text-muted)] font-heading font-bold uppercase tracking-widest mb-2">{stat.label}</p>
                <p className="text-3xl font-heading font-bold text-white">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg bg-[var(--bg-tertiary)] ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
          ))}
        </div>

        {/* Bookings Section */}
        <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl overflow-hidden shadow-xl">
          
          {/* Table Header Controls */}
          <div className="p-5 border-b border-[var(--border-color)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h3 className="text-lg font-heading font-bold text-white uppercase tracking-wider">Recent Service Requests</h3>
            
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-3 top-1/2 -translate-y-1/2" />
                <input 
                  type="text" 
                  placeholder="Search customer or vehicle..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 pr-4 py-2 bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-lg text-xs text-white placeholder:text-[var(--text-muted)] outline-none focus:border-[var(--accent-red)] transition-colors w-full sm:w-64"
                />
              </div>
              <button className="p-2 bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-lg text-[var(--text-secondary)] hover:text-white transition-colors">
                <Filter className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Data Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-[var(--bg-tertiary)] text-[var(--text-muted)] text-[0.65rem] font-heading font-bold uppercase tracking-widest border-b border-[var(--border-color)]">
                <tr>
                  <th className="px-6 py-4">ID</th>
                  <th className="px-6 py-4">Customer Details</th>
                  <th className="px-6 py-4">Vehicle & Service</th>
                  <th className="px-6 py-4">Schedule</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-color)] text-[var(--text-secondary)]">
                {mockBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-6 py-4 font-mono text-xs text-[var(--text-muted)]">{booking.id}</td>
                    
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-semibold text-white">{booking.customer}</span>
                        <span className="text-xs">{booking.phone}</span>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-semibold text-white">{booking.vehicle}</span>
                        <span className="text-xs">{booking.service}</span>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-white">{booking.date}</span>
                        <span className="text-xs">{booking.time}</span>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4">
                      {getStatusBadge(booking.status)}
                    </td>
                    
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => handleStatusChange(booking.id, "Confirmed")}
                          className="p-1.5 rounded-md bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors tooltip"
                          title="Confirm Booking"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleStatusChange(booking.id, "In Service")}
                          className="p-1.5 rounded-md bg-[var(--accent-red)]/10 text-[var(--accent-red)] hover:bg-[var(--accent-red)]/20 transition-colors"
                          title="Mark In-Service"
                        >
                          <Wrench className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleStatusChange(booking.id, "Completed")}
                          className="p-1.5 rounded-md bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition-colors"
                          title="Mark Completed"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleStatusChange(booking.id, "Cancelled")}
                          className="p-1.5 rounded-md bg-zinc-500/10 text-zinc-400 hover:bg-zinc-500/20 transition-colors"
                          title="Cancel Booking"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination (Mock) */}
          <div className="p-4 border-t border-[var(--border-color)] flex items-center justify-between text-xs text-[var(--text-muted)]">
            <span>Showing 1 to 5 of 12 entries</span>
            <div className="flex items-center gap-1">
              <button className="px-3 py-1 rounded bg-[var(--bg-tertiary)] border border-[var(--border-color)] disabled:opacity-50">Prev</button>
              <button className="px-3 py-1 rounded bg-[var(--accent-red)] text-white">1</button>
              <button className="px-3 py-1 rounded bg-[var(--bg-tertiary)] border border-[var(--border-color)] hover:bg-white/5">2</button>
              <button className="px-3 py-1 rounded bg-[var(--bg-tertiary)] border border-[var(--border-color)] hover:bg-white/5">3</button>
              <button className="px-3 py-1 rounded bg-[var(--bg-tertiary)] border border-[var(--border-color)] hover:bg-white/5">Next</button>
            </div>
          </div>
          
        </div>
      </main>
    </div>
  );
}
