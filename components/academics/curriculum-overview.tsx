"use client"

import { useEffect, useState, useRef } from "react"
import { cn } from "@/lib/utils"

const subjectGroups = [
  {
    category: "Languages",
    items: ["English", "Hindi", "Malayalam"],
    bg: "bg-primary text-primary-foreground",
    itemStyle: "border-primary-foreground/20 text-primary-foreground/90",
  },
  {
    category: "Core Subjects",
    items: ["Mathematics", "Science", "Social Studies"],
    bg: "bg-[var(--gold)] text-[var(--gold-foreground)]",
    itemStyle: "border-[var(--gold-foreground)]/20 text-[var(--gold-foreground)]/90",
  },
  {
    category: "Co-Curricular",
    items: ["Computer Science", "Art & Craft", "Physical Education"],
    bg: "bg-foreground text-background",
    itemStyle: "border-background/20 text-background/80",
  },
  {
    category: "Value Education",
    items: ["Moral Science", "Environmental Studies", "Life Skills"],
    bg: "bg-secondary text-foreground",
    itemStyle: "border-border text-muted-foreground",
  },
]

export function CurriculumOverview() {
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
    <section ref={sectionRef} className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-16 items-start">

          {/* Left sticky label */}
          <div className="lg:sticky lg:top-32">
            <p className={cn(
              "text-[var(--gold)] text-xs font-bold tracking-[0.2em] uppercase mb-4 transition-all duration-700",
              isVisible ? "opacity-100" : "opacity-0"
            )}>
              What We Teach
            </p>
            <h2 className={cn(
              "font-serif text-4xl md:text-5xl font-bold text-foreground leading-tight mb-6 transition-all duration-700 delay-100",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}>
              Curriculum
              <br />
              <em>Overview</em>
            </h2>
            <div className={cn(
              "space-y-4 text-muted-foreground text-sm leading-relaxed transition-all duration-700 delay-200",
              isVisible ? "opacity-100" : "opacity-0"
            )}>
              <p>
                Our curriculum provides a well-rounded education that prepares students
                for future success while nurturing overall development.
              </p>
              <p>
                Special emphasis is placed on English proficiency and practical learning
                experiences across all subject areas.
              </p>
            </div>

            {/* Academic year info */}
            <div className={cn(
              "mt-8 border-t border-border pt-6 transition-all duration-700 delay-300",
              isVisible ? "opacity-100" : "opacity-0"
            )}>
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Academic Year</p>
              <p className="text-sm text-foreground">
                Starts in <strong>April</strong> each year. Mon–Sat with regular assessments.
              </p>
            </div>
          </div>

          {/* Subject grid */}
          <div className={cn(
            "grid grid-cols-1 sm:grid-cols-2 gap-4 transition-all duration-700 delay-200",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}>
            {subjectGroups.map((group, index) => (
              <div
                key={group.category}
                className={cn(
                  "rounded-sm p-6 transition-all duration-700",
                  group.bg,
                )}
                style={{ transitionDelay: `${(index + 3) * 80}ms` }}
              >
                <h3 className="font-bold text-sm uppercase tracking-widest mb-5 opacity-70">
                  {group.category}
                </h3>
                <ul className="space-y-2.5">
                  {group.items.map(item => (
                    <li
                      key={item}
                      className={cn(
                        "text-base font-medium border-b pb-2.5 last:border-b-0 last:pb-0",
                        group.itemStyle
                      )}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
