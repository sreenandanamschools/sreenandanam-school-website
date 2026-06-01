"use client"

import { useEffect, useState, useRef } from "react"
import { Heart, BookOpen, Users, Shield, Lightbulb, Star } from "lucide-react"
import { cn } from "@/lib/utils"

const values = [
  {
    icon: Heart,
    title: "Compassion",
    description: "We foster kindness and empathy, teaching students to care for others and contribute positively to their community.",
    number: "01",
  },
  {
    icon: BookOpen,
    title: "Excellence",
    description: "We strive for excellence in all aspects of education, encouraging students to reach their highest potential.",
    number: "02",
  },
  {
    icon: Users,
    title: "Inclusivity",
    description: "We embrace diversity and create an inclusive environment where every student feels valued and respected.",
    number: "03",
  },
  {
    icon: Shield,
    title: "Integrity",
    description: "We uphold honesty and ethical behavior, instilling strong moral values in our students.",
    number: "04",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "We encourage creative thinking and embrace new approaches to learning and problem-solving.",
    number: "05",
  },
  {
    icon: Star,
    title: "Responsibility",
    description: "We teach students to be accountable for their actions and to take ownership of their learning journey.",
    number: "06",
  },
]

export function ValuesSection() {
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
    <section ref={sectionRef} id="values" className="py-20 md:py-28 bg-background overflow-hidden border-b border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-[1fr_2.5fr] gap-12 lg:gap-16 items-start">

          {/* Sticky label column */}
          <div className="lg:sticky lg:top-32">
            <p className={cn(
              "text-[var(--gold)] text-xs font-bold tracking-[0.2em] uppercase mb-4 transition-all duration-700",
              isVisible ? "opacity-100" : "opacity-0"
            )}>
              What We Stand For
            </p>
            <h2 className={cn(
              "font-serif text-4xl md:text-5xl font-bold text-foreground leading-tight mb-6 transition-all duration-700 delay-100",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}>
              Our Core
              <br />
              <em>Values</em>
            </h2>
            <p className={cn(
              "text-muted-foreground leading-relaxed text-sm transition-all duration-700 delay-200",
              isVisible ? "opacity-100" : "opacity-0"
            )}>
              These principles guide everything we do, shaping the way we teach, learn, and grow together.
            </p>
          </div>

          {/* Grid of cards */}
          <div className={cn(
            "grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6 transition-all duration-700 delay-300",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}>
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <div
                  key={value.title}
                  className="group relative p-6 rounded-lg border border-border bg-card hover:bg-secondary/10 hover:border-primary/20 hover:shadow-md transition-all duration-300 flex flex-col justify-between min-h-[190px]"
                  style={{ transitionDelay: `${(index + 3) * 60}ms` }}
                >
                  <div>
                    {/* Header: Icon + Number */}
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-sm bg-secondary text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary flex items-center justify-center transition-all duration-300">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="font-serif font-bold text-2xl text-muted-foreground/30 group-hover:text-primary/40 transition-colors duration-300 tabular-nums">
                        {value.number}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-serif text-xl font-bold text-foreground mt-5 mb-2 group-hover:text-primary transition-colors duration-300">
                      {value.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              )
            })}
          </div>

        </div>
      </div>
    </section>
  )
}
