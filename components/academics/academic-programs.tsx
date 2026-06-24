"use client";

import { useEffect, useState, useRef } from "react";
import { Baby, BookOpen } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const programs = [
  {
    id: "cuddle-care",
    icon: Baby,
    title: "Cuddle Care",
    grades: "Day Care",
    ageGroup: "9 months to 3 years",
    description:
      "A safe, nurturing haven for your little ones aged 9 months to 3 years. Our Cuddle Care program provides a warm, stimulating environment where children feel secure and happy while being looked after by trained caregivers.",
    highlights: [
      "Safe, supervised play areas",
      "Healthy meal options",
      "Nap and rest facilities",
      "Basic hygiene and care",
      "Trained and caring staff",
    ],
    number: "01",
    dark: true,
  },
  {
    id: "pre-primary",
    icon: Baby,
    title: "Pre-Primary Section",
    grades: "Nursery to UKG",
    ageGroup: "Ages 3–5",
    description:
      "A nurturing environment where young learners begin their educational journey through play-based learning, creative activities, and foundational skill development.",
    highlights: [
      "Play-based learning approach",
      "Basic literacy and numeracy",
      "Creative arts and crafts",
      "Social skill development",
      "Physical activities and games",
    ],
    number: "02",
    dark: false,
  },
  {
    id: "primary",
    icon: BookOpen,
    title: "Primary Education",
    grades: "Class 1 to Class 7",
    ageGroup: "Ages 6–12",
    description:
      "Building strong foundations in core subjects while fostering curiosity, creativity, and a love for learning through interactive teaching methods.",
    highlights: [
      "English, Mathematics, Science",
      "Social Studies and Languages",
      "Computer education",
      "Art and physical education",
      "Value education",
    ],
    number: "03",
    dark: true,
  },
];

export function AcademicPrograms() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.05 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="overflow-hidden">

      {/* Section intro */}
      <div className="container mx-auto px-4 lg:px-8 py-16 md:py-20">
        <div className="flex items-end justify-between">
          <div>
            <p className={cn(
              "text-[var(--gold)] text-xs font-bold tracking-[0.2em] uppercase mb-4 transition-all duration-700",
              isVisible ? "opacity-100" : "opacity-0"
            )}>
              Our Programs
            </p>
            <h2 className={cn(
              "font-serif text-4xl md:text-5xl font-bold text-foreground leading-tight transition-all duration-700 delay-100",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}>
              Academic
              <br />
              <em>Levels</em>
            </h2>
          </div>
          <p className={cn(
            "hidden md:block text-muted-foreground max-w-xs text-right text-sm leading-relaxed transition-all duration-700 delay-200",
            isVisible ? "opacity-100" : "opacity-0"
          )}>
            From early childhood to upper primary, each program is tailored to the developmental needs of every age group.
          </p>
        </div>
      </div>

      {/* Alternating full-width panels */}
      {programs.map((program, index) => (
        <div
          key={program.id}
          id={program.id}
          className={cn(
            "grid lg:grid-cols-[1fr_1fr] min-h-[400px] transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
            program.dark ? "bg-[var(--ink)]" : "bg-[var(--cream)]",
            index === programs.length - 1 && "border-b border-white/10"
          )}
          style={{ transitionDelay: `${(index + 2) * 150}ms` }}
        >
          {/* Number + Title panel — alternates side */}
          <div className={cn(
            "relative flex flex-col justify-center px-8 sm:px-12 lg:px-16 py-16 overflow-hidden",
            index % 2 !== 0 && "lg:order-last"
          )}>
            {/* Large decorative number */}
            <span className={cn(
              "absolute top-8 right-8 lg:right-12 font-serif font-bold leading-none select-none pointer-events-none",
              "text-8xl md:text-9xl",
              program.dark ? "text-white/[0.12]" : "text-black/[0.08]"
            )}>
              {program.number}
            </span>

            {/* Tag */}
            <div className={cn(
              "inline-flex items-center gap-2 mb-6",
            )}>
              <span className={cn(
                "text-xs font-bold tracking-[0.2em] uppercase",
                program.dark ? "text-[var(--gold)]" : "text-primary"
              )}>
                {program.grades}
              </span>
              <span className={cn(
                "text-xs px-2 py-0.5 rounded-sm font-medium",
                program.dark ? "bg-white/10 text-white/60" : "bg-black/5 text-muted-foreground"
              )}>
                {program.ageGroup}
              </span>
            </div>

            <h3 className={cn(
              "font-serif text-3xl md:text-4xl font-bold leading-tight mb-6",
              program.dark ? "text-white" : "text-foreground"
            )}>
              {program.title}
            </h3>

            <p className={cn(
              "leading-relaxed max-w-sm",
              program.dark ? "text-white/60" : "text-muted-foreground"
            )}>
              {program.description}
            </p>
          </div>

          {/* Highlights panel */}
          <div className={cn(
            "flex flex-col justify-center px-8 sm:px-12 lg:px-14 py-16 border-t lg:border-t-0",
            program.dark ? "border-white/10 lg:border-l lg:border-l-white/10" : "border-border lg:border-l lg:border-l-border",
            index % 2 !== 0 && "lg:order-first"
          )}>
            <p className={cn(
              "text-xs font-bold tracking-[0.15em] uppercase mb-6",
              program.dark ? "text-white/30" : "text-muted-foreground"
            )}>
              Key Features
            </p>
            <ul className="space-y-4">
              {program.highlights.map((item, i) => (
                <li key={item} className="flex items-center gap-4 group">
                  <span className={cn(
                    "font-serif font-bold text-lg tabular-nums shrink-0 w-6 text-right",
                    program.dark ? "text-white/45" : "text-black/35"
                  )}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className={cn(
                    "font-medium",
                    program.dark ? "text-white/80" : "text-foreground"
                  )}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </section>
  );
}
