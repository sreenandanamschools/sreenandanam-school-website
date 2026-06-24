"use client";

import { useEffect, useState, useRef } from "react";
import { UserCircle2 } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const milestones = [
  {
    year: "2008",
    title: "School Founded",
    description: "Established with a vision to provide quality English medium education in rural Parassala.",
  },
  {
    year: "2012",
    title: "Pre-Primary Added",
    description: "Expanded offerings to include early childhood education for pre-primary students.",
  },
  {
    year: "2015",
    title: "Computer Lab",
    description: "Introduced digital learning with a dedicated computer-aided lab.",
  },
  {
    year: "2018",
    title: "Infrastructure Expansion",
    description: "Added new classrooms and activity rooms to meet growing enrollment.",
  },
  {
    year: "2023",
    title: "15+ Years of Excellence",
    description: "Celebrated fifteen years of commitment to education and community.",
  },
];

interface FamousVisitor {
  id: string;
  name: string;
  designation: string;
  description: string;
  image_url: string | null;
  visited_at: string;
}

export function HistorySection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [visitors, setVisitors] = useState<FamousVisitor[]>([]);
  const [visitorsLoading, setVisitorsLoading] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.05 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    fetch("/api/honorary-guests")
      .then(r => r.json())
      .then(json => { if (json.success) setVisitors(json.data); })
      .catch(() => {})
      .finally(() => setVisitorsLoading(false));
  }, []);

  return (
    <section ref={sectionRef} className="bg-[var(--ink)] overflow-hidden">

      {/* ── History intro split ──────────────────────── */}
      <div className="grid lg:grid-cols-2 min-h-[50vh]">
        {/* Text side */}
        <div className="flex flex-col justify-center px-8 sm:px-12 lg:px-14 xl:px-20 py-20">
          <span className={cn(
            "inline-flex items-center gap-2 mb-6 text-[var(--gold)] text-xs font-bold tracking-[0.2em] uppercase transition-all duration-700",
            isVisible ? "opacity-100" : "opacity-0"
          )}>
            <span className="h-px w-6 bg-[var(--gold)]" />
            Our History
          </span>
          <h2 className={cn(
            "font-serif text-4xl md:text-5xl font-bold text-white leading-tight mb-8 transition-all duration-700 delay-100",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}>
            Rooted in
            <br />
            <em className="text-[var(--gold)]">Community</em>
          </h2>
          <div className={cn(
            "space-y-4 text-white/65 leading-relaxed max-w-md transition-all duration-700 delay-200",
            isVisible ? "opacity-100" : "opacity-0"
          )}>
            <p>
              Sree Nandanam Public School was established in 2008 in the rural area of
              Parassala block in Thiruvananthapuram district, Kerala. Founded with a vision
              to provide accessible, quality education to children in the community, our
              school has grown to become a trusted institution for Kindergarten and primary education.
            </p>
            <p>
              Over the years, we have continuously improved our facilities and teaching
              methodologies to ensure that every student receives the best possible foundation.
            </p>
          </div>
        </div>

        {/* Decorative year column */}
        <div className={cn(
          "hidden lg:flex items-center justify-center relative overflow-hidden border-l border-white/5 transition-all duration-1000 delay-300",
          isVisible ? "opacity-100" : "opacity-0"
        )}>
          {/* Quick facts */}
          <div className="grid grid-cols-2 gap-px bg-white/5 w-full h-full">
            {[
              { label: "Founded", value: "2008" },
              { label: "Location", value: "Parassala" },
              { label: "Type", value: "Co-Ed" },
              { label: "Medium", value: "English" },
            ].map(fact => (
              <div key={fact.label} className="flex flex-col justify-center p-8 bg-[var(--ink)] hover:bg-white/5 transition-colors duration-300">
                <span className="font-serif text-3xl font-bold text-[var(--gold)] mb-1">{fact.value}</span>
                <span className="text-white/40 text-xs uppercase tracking-widest">{fact.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Horizontal Timeline ──────────────────────── */}
      <div className="border-t border-white/10 px-4 lg:px-0">
        <div className={cn(
          "snap-x-scroll flex items-stretch transition-all duration-700 delay-400",
          isVisible ? "opacity-100" : "opacity-0"
        )}>
          {milestones.map((milestone, index) => (
            <div
              key={milestone.year}
              className="snap-child shrink-0 flex flex-col border-r border-white/10 last:border-r-0 p-8 lg:p-10 w-64 lg:w-auto lg:flex-1"
            >
              {/* Year stamp */}
              <div className="font-serif text-4xl lg:text-5xl font-bold text-white/10 mb-4 leading-none">
                {milestone.year}
              </div>

              {/* Dot + line */}
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-[var(--gold)] shrink-0" />
                <div className="h-px flex-1 bg-white/15" />
              </div>

              <h3 className="font-serif text-lg font-bold text-white mb-2 leading-snug">
                {milestone.title}
              </h3>
              <p className="text-white/50 text-sm leading-relaxed">
                {milestone.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Honorary Guests horizontal strip ─────────── */}
      {(visitorsLoading || visitors.length > 0) && (
        <div className="border-t border-white/10 py-16 lg:py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex items-end justify-between mb-10">
              <div>
                <span className={cn(
                  "inline-flex items-center gap-2 mb-4 text-[var(--gold)] text-xs font-bold tracking-[0.2em] uppercase transition-all duration-700",
                  isVisible ? "opacity-100" : "opacity-0"
                )}>
                  <span className="h-px w-6 bg-[var(--gold)]" />
                  Distinguished Visitors
                </span>
                <h2 className={cn(
                  "font-serif text-3xl md:text-4xl font-bold text-white leading-tight transition-all duration-700 delay-100",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}>
                  Honorary <em className="text-[var(--gold)]">Guests</em>
                </h2>
              </div>
            </div>

            {/* Skeletons */}
            {visitorsLoading && (
              <div className="flex gap-4 overflow-x-auto pb-2 animate-pulse">
                {[1, 2, 3].map(i => (
                  <div key={i} className="shrink-0 w-64 h-80 bg-white/5 rounded-sm" />
                ))}
              </div>
            )}

            {/* Horizontal scroll cards */}
            {!visitorsLoading && visitors.length > 0 && (
              <div className={cn(
                "snap-x-scroll flex gap-4 pb-2 transition-all duration-700 delay-300",
                isVisible ? "opacity-100" : "opacity-0"
              )}>
                {visitors.map((visitor) => (
                  <div
                    key={visitor.id}
                    className="snap-child group shrink-0 w-60 md:w-64 bg-white/5 hover:bg-white/10 transition-all duration-500 rounded-sm overflow-hidden border border-white/10 hover:border-white/20"
                  >
                    {/* Image */}
                    <div className="relative h-56 bg-white/5 overflow-hidden">
                      {visitor.image_url ? (
                        <Image
                          src={visitor.image_url}
                          alt={visitor.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="256px"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <UserCircle2 className="w-16 h-16 text-white/20" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>
                    {/* Info */}
                    <div className="p-5">
                      <h3 className="font-serif text-base font-bold text-white mb-0.5 leading-snug">{visitor.name}</h3>
                      <p className="text-[var(--gold)] text-xs font-semibold mb-2">{visitor.designation}</p>
                      <p className="text-white/50 text-xs leading-relaxed line-clamp-3">{visitor.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

    </section>
  );
}
