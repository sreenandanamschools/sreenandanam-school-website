"use client"

import { useEffect, useState, useRef } from "react"
import {
  Users,
  Lightbulb,
  Target,
  Heart,
  Monitor,
  MessageCircle
} from "lucide-react"
import { cn } from "@/lib/utils"

const methodologies = [
  {
    icon: Users,
    title: "Interactive Learning",
    description: "Engaging classroom discussions and group activities that encourage active participation and collaborative learning.",
    number: "01",
  },
  {
    icon: Lightbulb,
    title: "Experiential Education",
    description: "Hands-on activities and practical experiments that make learning meaningful and memorable.",
    number: "02",
  },
  {
    icon: Target,
    title: "Individual Attention",
    description: "Small class sizes ensure personalized guidance and support for each student's unique learning needs.",
    number: "03",
  },
  {
    icon: Heart,
    title: "Value-Based Teaching",
    description: "Integration of moral values and character development into everyday learning experiences.",
    number: "04",
  },
  {
    icon: Monitor,
    title: "Technology Integration",
    description: "Computer-aided learning and digital resources to enhance understanding and prepare students for the future.",
    number: "05",
  },
  {
    icon: MessageCircle,
    title: "Continuous Assessment",
    description: "Regular feedback and assessment to track progress and identify areas for improvement.",
    number: "06",
  },
]

export function TeachingMethodology() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.05 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="methodology" className="py-20 md:py-28 bg-[var(--ink)] overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">

        {/* Header */}
        <div className="flex items-end justify-between mb-14 md:mb-20">
          <div>
            <p className={cn(
              "text-[var(--gold)] text-xs font-bold tracking-[0.2em] uppercase mb-4 transition-all duration-700",
              isVisible ? "opacity-100" : "opacity-0"
            )}>
              How We Teach
            </p>
            <h2 className={cn(
              "font-serif text-4xl md:text-5xl font-bold text-white leading-tight transition-all duration-700 delay-100",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}>
              Teaching
              <br />
              <em className="text-[var(--gold)]">Methodology</em>
            </h2>
          </div>
          <p className={cn(
            "hidden lg:block text-white/40 max-w-xs text-sm leading-relaxed text-right transition-all duration-700 delay-200",
            isVisible ? "opacity-100" : "opacity-0"
          )}>
            A blend of traditional values and modern techniques for effective learning.
          </p>
        </div>

        {/* Step-based horizontal layout (desktop) + grid (mobile) */}
        {/* Connecting line (desktop only) */}
        <div className="relative">
          <div className="hidden lg:block absolute top-5 left-0 right-0 h-px bg-white/10 z-0" />

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-0 relative z-10">
            {methodologies.map((method, index) => (
              <div
                key={method.title}
                className={cn(
                  "group flex flex-col items-start lg:items-center lg:text-center px-0 lg:px-4 transition-all duration-700",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                )}
                style={{ transitionDelay: `${(index + 2) * 80}ms` }}
              >
                {/* Icon with step dot */}
                <div className="relative mb-5">
                  <div className={cn(
                    "w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-400 group-hover:scale-110",
                    "border-white/20 bg-[var(--ink)] group-hover:border-[var(--gold)] group-hover:bg-[var(--gold)]/10"
                  )}>
                    <method.icon className="w-4.5 h-4.5 text-white/50 group-hover:text-[var(--gold)] transition-colors" />
                  </div>
                  {/* Connecting dot (mobile) */}
                  <span className="lg:hidden absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-1 bg-white/20 rounded-full" />
                </div>

                {/* Number */}
                <span className="text-xs font-mono text-white/25 mb-1.5">{method.number}</span>

                {/* Title */}
                <h3 className="font-serif text-sm font-bold text-white mb-2 leading-snug group-hover:text-[var(--gold)] transition-colors">
                  {method.title}
                </h3>

                {/* Description — visible on hover desktop, always visible mobile */}
                <p className="text-white/40 text-xs leading-relaxed lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-400">
                  {method.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
