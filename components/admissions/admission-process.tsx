"use client";

import { useEffect, useState, useRef } from "react";
import {
  ClipboardList,
  FileSearch,
  UserCheck,
  CheckCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  {
    icon: ClipboardList,
    step: "01",
    title: "Collect Application Form",
    description:
      "Visit the school office during working hours to collect the admission application form. A nominal fee is applicable for the form.",
    details: ["Available at school office", "Monday to Saturday, 9 AM - 3 PM"],
  },
  {
    icon: FileSearch,
    step: "02",
    title: "Submit Documents",
    description:
      "Complete the application form carefully and submit it along with all required documents to the school office for verification.",
    details: ["Fill form completely", "Attach all documents", "Submit at school office"],
  },
  {
    icon: UserCheck,
    step: "03",
    title: "Interaction Session",
    description:
      "Parents and students will be invited for an informal interaction session with the school administration to understand expectations.",
    details: ["Meet with Head Teacher", "School orientation", "Address queries"],
  },
  {
    icon: CheckCircle,
    step: "04",
    title: "Admission Confirmation",
    description:
      "Upon successful review, admission will be confirmed. Complete the fee payment and collect the admission acknowledgment.",
    details: ["Confirmation notification", "Fee payment", "Receive admission kit"],
  },
];

export function AdmissionProcess() {
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
    <section ref={sectionRef} className="py-20 md:py-28 bg-background overflow-hidden border-b border-border">
      <div className="container mx-auto px-4 lg:px-8">

        {/* Header */}
        <div className="flex items-end justify-between mb-16 md:mb-20">
          <div>
            <p className={cn(
              "text-[var(--gold)] text-xs font-bold tracking-[0.2em] uppercase mb-4 transition-all duration-700",
              isVisible ? "opacity-100" : "opacity-0"
            )}>
              Step by Step
            </p>
            <h2 className={cn(
              "font-serif text-4xl md:text-5xl font-bold text-foreground leading-tight transition-all duration-700 delay-100",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}>
              Admission
              <br />
              <em>Process</em>
            </h2>
          </div>
          <p className={cn(
            "hidden md:block text-muted-foreground max-w-xs text-sm text-right leading-relaxed transition-all duration-700 delay-200",
            isVisible ? "opacity-100" : "opacity-0"
          )}>
            Follow these simple steps to secure your child's place at Sree Nandanam Public School.
          </p>
        </div>

        {/* Desktop timeline layout */}
        <div className="hidden lg:block relative py-6">
          {/* Horizontal line */}
          <div className="absolute top-[26px] left-[12.5%] right-[12.5%] h-[2px] bg-border z-0" />
          
          <div className="grid grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.step}
                  className={cn(
                    "group flex flex-col items-center text-center transition-all duration-700",
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                  )}
                  style={{ transitionDelay: `${(index + 2) * 100}ms` }}
                >
                  {/* Step dot / Icon */}
                  <div className="w-11 h-11 rounded-full border-2 bg-background flex items-center justify-center relative z-10 border-border group-hover:border-primary group-hover:bg-primary/5 transition-all duration-300">
                    <Icon className="w-4.5 h-4.5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>

                  {/* Step number */}
                  <span className="text-xs font-semibold text-muted-foreground/60 group-hover:text-primary transition-colors mt-4">
                    Step {step.step}
                  </span>

                  {/* Title */}
                  <h3 className="font-serif text-lg font-bold text-foreground mt-2 mb-2 group-hover:text-primary transition-colors duration-300">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground text-xs leading-relaxed max-w-[220px]">
                    {step.description}
                  </p>

                  {/* Details */}
                  <ul className="mt-4 space-y-1.5 text-[11px] text-muted-foreground/80">
                    {step.details.map((detail) => (
                      <li key={detail} className="flex items-center gap-1.5 justify-center">
                        <span className="w-1 h-1 rounded-full bg-primary/40 group-hover:bg-primary shrink-0 transition-colors" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile timeline layout */}
        <div className="lg:hidden relative pl-6 border-l-2 border-border ml-4 space-y-10">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.step}
                className={cn(
                  "group relative flex flex-col items-start transition-all duration-700",
                  isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                )}
                style={{ transitionDelay: `${(index + 2) * 100}ms` }}
              >
                {/* Dot / Icon */}
                <div className="absolute -left-[45px] top-0 w-9 h-9 rounded-full border-2 bg-background flex items-center justify-center z-10 border-border group-hover:border-primary group-hover:bg-primary/5 transition-all duration-300">
                  <Icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>

                {/* Step number */}
                <span className="text-xs font-semibold text-primary mb-1">
                  Step {step.step}
                </span>

                {/* Title */}
                <h3 className="font-serif text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors duration-300">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground text-xs leading-relaxed max-w-md mb-3">
                  {step.description}
                </p>

                {/* Details */}
                <ul className="space-y-1.5 text-[11px] text-muted-foreground/80">
                  {step.details.map((detail) => (
                    <li key={detail} className="flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-primary/40 group-hover:bg-primary shrink-0 transition-colors" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
