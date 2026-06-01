"use client";

import { Users, BookOpen, Monitor, Calendar } from "lucide-react";

const stats = [
  { icon: Calendar, value: "18+", label: "Years of Excellence", detail: "Since 2008" },
  { icon: Users, value: "11", label: "Qualified Teachers", detail: "All Female Staff" },
  { icon: BookOpen, value: "7", label: "Grade Levels", detail: "Class 1 to 7" },
  { icon: Monitor, value: "5", label: "Computer Systems", detail: "Dedicated Lab" },
  { icon: Users, value: "100%", label: "English Medium", detail: "Instruction" },
  { icon: BookOpen, value: "6", label: "Classrooms", detail: "Well-Ventilated" },
];

export function StatsSection() {
  return (
    <section className="relative bg-[var(--ink)] py-16 md:py-24 overflow-hidden grain-overlay border-y border-white/10">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column - Editorial Text */}
          <div className="lg:col-span-4 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[var(--gold)] text-xs font-semibold tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)] animate-pulse" />
              At A Glance
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white leading-tight">
              Sree Nandanam By the Numbers
            </h2>
            <p className="text-white/60 text-sm leading-relaxed max-w-md">
              Our infrastructure and dedicated female educators create a safe, supportive, and stimulating English medium environment where every child thrives from Class 1 to Class 7.
            </p>
          </div>

          {/* Right Column - Stats Grid */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-6">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div 
                  key={i} 
                  className="group relative p-5 md:p-6 rounded-lg border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-[var(--gold)]/30 transition-all duration-300 flex flex-col justify-between min-h-[140px]"
                >
                  <div className="flex justify-between items-start">
                    <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[var(--gold)]/50 transition-colors duration-300">
                      <Icon className="w-4 h-4 text-white/50 group-hover:text-[var(--gold)] transition-colors duration-300" />
                    </div>
                    <span className="text-[10px] font-bold text-white/20 uppercase tracking-wider group-hover:text-[var(--gold)]/40 transition-colors duration-300">
                      {stat.detail}
                    </span>
                  </div>
                  
                  <div className="mt-4">
                    <span className="block font-serif text-3xl md:text-4xl font-bold text-white group-hover:text-[var(--gold)] transition-colors duration-300 tabular-nums">
                      {stat.value}
                    </span>
                    <span className="block text-white/60 text-xs mt-1 font-medium group-hover:text-white/80 transition-colors duration-300">
                      {stat.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
