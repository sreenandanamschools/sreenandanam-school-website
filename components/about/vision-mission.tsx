"use client"

import { useEffect, useState, useRef } from "react"
import { cn } from "@/lib/utils"

export function VisionMission() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="grid lg:grid-cols-2 min-h-[70vh] overflow-hidden">

      {/* ── Vision — dark green panel ─────────────────── */}
      <div className="relative bg-primary flex flex-col justify-center px-8 sm:px-12 lg:px-14 py-20 overflow-hidden">

        {/* Giant decorative V */}
        <span className="absolute -left-4 top-1/2 -translate-y-1/2 font-serif font-bold text-white/5 leading-none select-none pointer-events-none"
          style={{ fontSize: "22vw" }}>
          V
        </span>

        {/* Diagonal stripe */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: "repeating-linear-gradient(135deg, white, white 1px, transparent 1px, transparent 20px)"
        }} />

        <div className="relative z-10">
          <span className={cn(
            "inline-flex items-center gap-2 mb-6 text-[var(--gold)] text-xs font-bold tracking-[0.2em] uppercase transition-all duration-700",
            isVisible ? "opacity-100" : "opacity-0"
          )}>
            <span className="h-px w-6 bg-[var(--gold)]" />
            Our Vision
          </span>

          <h2 className={cn(
            "font-serif text-4xl md:text-5xl font-bold text-white leading-tight mb-8 transition-all duration-700 delay-100",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}>
            A School That
            <br />
            <em className="text-[var(--gold)]">Shapes Futures</em>
          </h2>

          <p className={cn(
            "text-white/75 leading-relaxed text-lg max-w-md transition-all duration-700 delay-200",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}>
            To be a leading institution that nurtures young minds, instils strong values, and prepares students to become responsible citizens who contribute positively to society. We envision a learning environment where every child discovers their unique potential and develops a lifelong love for learning.
          </p>
        </div>
      </div>

      {/* ── Mission — light cream panel ───────────────── */}
      <div className="relative bg-[var(--cream)] flex flex-col justify-center px-8 sm:px-12 lg:px-14 py-20 overflow-hidden border-t lg:border-t-0 border-border">

        {/* Giant decorative M */}
        <span className="absolute -right-6 top-1/2 -translate-y-1/2 font-serif font-bold text-black/5 leading-none select-none pointer-events-none"
          style={{ fontSize: "22vw" }}>
          M
        </span>

        <div className="relative z-10">
          <span className={cn(
            "inline-flex items-center gap-2 mb-6 text-primary text-xs font-bold tracking-[0.2em] uppercase transition-all duration-700 delay-100",
            isVisible ? "opacity-100" : "opacity-0"
          )}>
            <span className="h-px w-6 bg-primary" />
            Our Mission
          </span>

          <h2 className={cn(
            "font-serif text-4xl md:text-5xl font-bold text-foreground leading-tight mb-8 transition-all duration-700 delay-200",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}>
            Excellence in
            <br />
            <em>Every Classroom</em>
          </h2>

          <p className={cn(
            "text-muted-foreground leading-relaxed text-lg max-w-md transition-all duration-700 delay-300",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}>
            To provide quality English medium education that fosters academic excellence, creativity, and holistic development. We are committed to creating a safe, supportive, and inclusive environment where students develop critical thinking skills, moral values, and the confidence to face future challenges.
          </p>
        </div>
      </div>
    </section>
  )
}
