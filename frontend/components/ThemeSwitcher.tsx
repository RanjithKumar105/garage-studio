"use client";

import { useState, useRef, useEffect } from "react";
import { Palette, Check } from "lucide-react";
import { useTheme, Theme } from "./ThemeProvider";

const themes: { id: Theme; name: string; bg: string; accent: string; type: "dark" | "light" }[] = [
  { id: "midnight", name: "Midnight", bg: "#050505", accent: "#e62222", type: "dark" },
  { id: "performance", name: "Performance", bg: "#121212", accent: "#ff4500", type: "dark" },
  { id: "carbon", name: "Carbon", bg: "#0a0d14", accent: "#3b82f6", type: "dark" },
  { id: "classic", name: "Classic", bg: "#0d0c0b", accent: "#d4af37", type: "dark" },
  { id: "light", name: "Light", bg: "#f8fafc", accent: "#e62222", type: "light" },
];

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative z-50 flex items-center" ref={dropdownRef}>
      {/* Real Clickable Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 h-11 px-5 rounded-md border border-[var(--border-color)] bg-transparent hover:border-[var(--accent-red)] hover:bg-[var(--bg-tertiary)] hover:-translate-y-[2px] transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-[var(--accent-red)]"
        aria-label="Select Theme"
        aria-expanded={isOpen}
      >
        <Palette className="w-[1.1rem] h-[1.1rem] text-white group-hover:text-[var(--accent-red)] transition-colors duration-300" />
        <span className="font-heading tracking-widest uppercase text-[0.95rem] font-medium text-white group-hover:text-white transition-colors">THEME</span>
      </button>

      {/* Floating Panel containing REAL CLICKABLE BUTTONS */}
      <div
        className={`absolute right-0 top-full mt-2 w-64 rounded-lg border border-[var(--border-color)] bg-[var(--bg-secondary)] shadow-xl overflow-hidden transition-all duration-300 origin-top-right ${
          isOpen ? "opacity-100 scale-100 visible translate-y-0" : "opacity-0 scale-95 invisible -translate-y-2"
        }`}
      >
        <div className="p-4 border-b border-[var(--border-color)]">
          <span className="text-[0.75rem] font-heading font-bold tracking-[0.2em] uppercase text-[var(--text-muted)] block text-center">
            CHOOSE THEME
          </span>
        </div>
        
        <div className="p-3 flex flex-col gap-2">
          {themes.map((t) => {
            const isSelected = theme === t.id;
            return (
              <button
                key={t.id}
                onClick={() => {
                  setTheme(t.id);
                  setIsOpen(false);
                }}
                className={`relative flex items-center justify-between w-full p-3 rounded border transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-[var(--accent-red)] ${
                  isSelected 
                    ? "border-[var(--accent-red)] bg-[var(--bg-tertiary)]"
                    : "border-[var(--border-color)] bg-transparent hover:border-[var(--border-hover)] hover:bg-[var(--bg-tertiary)] hover:-translate-y-[1px]"
                }`}
                role="menuitem"
                aria-pressed={isSelected}
              >
                <div className="flex items-center gap-3">
                  {/* Theme Color Preview */}
                  <div className="flex-shrink-0 relative flex items-center justify-center">
                    <div
                      className="w-4 h-4 rounded-full border border-white/20 flex items-center justify-center overflow-hidden"
                      style={{ backgroundColor: t.bg }}
                    >
                      <div
                        className="absolute bottom-0 right-0 w-2 h-2 rounded-tl-full"
                        style={{ backgroundColor: t.accent }}
                      />
                    </div>
                  </div>
                  
                  {/* Theme Name */}
                  <span className={`text-[0.85rem] font-heading uppercase tracking-widest font-semibold transition-colors ${
                    isSelected ? "text-[var(--accent-red)]" : "text-[var(--text-primary)] group-hover:text-[var(--text-primary)]"
                  }`}>
                    {t.name}
                  </span>
                </div>

                {/* Status Indicator */}
                {isSelected && (
                  <Check className="w-4 h-4 text-[var(--accent-red)]" strokeWidth={3} />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
