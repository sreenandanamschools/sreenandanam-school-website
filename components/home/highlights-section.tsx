"use client"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import {
  GraduationCap,
  Users,
  Monitor,
  BookOpen,
  TreePine,
  Heart,
  ArrowUpRight,
} from "lucide-react"
import { cn } from "@/lib/utils"

const highlights = [
  {
    icon: GraduationCap,
    title: "Quality Education",
    description: "Comprehensive curriculum from Class 1 to Class 7 with English as the medium of instruction.",
    href: "/academics",
    label: "01",
    accent: "bg-primary text-primary-foreground",
    size: "large", // double-wide
  },
  {
    icon: Users,
    title: "Dedicated Faculty",
    description: "11 qualified and caring teachers committed to nurturing every student's potential.",
    href: "/about",
    label: "02",
    accent: "bg-[var(--gold)] text-[var(--gold-foreground)]",
    size: "tall", // double-height
  },
  {
    icon: Monitor,
    title: "Computer Lab",
    description: "5 functional systems for digital literacy and computer-aided learning.",
    href: "/facilities#computer-lab",
    label: "03",
    accent: "bg-foreground text-background",
    size: "standard",
  },
  {
    icon: BookOpen,
    title: "Library",
    description: "A rich reading resource to encourage curiosity and a love for learning.",
    href: "/facilities#library",
    label: "04",
    accent: "bg-secondary text-secondary-foreground",
    size: "standard",
  },
  {
    icon: TreePine,
    title: "Playground",
    description: "Spacious outdoor area for sports and healthy physical development.",
    href: "/facilities#playground",
    label: "05",
    accent: "bg-primary/10 text-primary",
    size: "standard",
  },
  {
    icon: Heart,
    title: "Holistic Development",
    description: "Academic excellence alongside character building and creative growth.",
    href: "/about#values",
    label: "06",
    accent: "bg-[var(--gold)]/10 text-[var(--gold-foreground)]",
    size: "wide", // double-wide
  },
]

export function HighlightsSection() {
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
    <section ref={sectionRef} className="py-20 md:py-28 bg-background overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">

        {/* Bento grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">

          {/* Cell 1 — Large (spans 2 cols) */}
          {(() => { const Icon0 = highlights[0].icon; return (
          <Link
            href={highlights[0].href}
            className={cn(
              "group col-span-2 row-span-1 rounded-lg p-6 md:p-8 bg-card border border-border text-card-foreground flex flex-col justify-between min-h-40 md:min-h-48 overflow-hidden relative transition-all duration-700 hover:border-primary/50",
              isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95"
            )}
            style={{ transitionDelay: "100ms" }}
          >
            <div className="absolute top-0 right-0 text-8xl font-serif font-bold text-muted/10 leading-none select-none -translate-y-4 translate-x-4">
              {highlights[0].label}
            </div>
            <Icon0 className="w-8 h-8 text-primary mb-4" />
            <div>
              <h3 className="font-serif text-2xl md:text-3xl font-bold mb-2">{highlights[0].title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">{highlights[0].description}</p>
            </div>
            <ArrowUpRight className="absolute bottom-5 right-5 w-5 h-5 text-muted-foreground/40 group-hover:text-primary transition-colors duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 transform" />
          </Link>
          ); })()}

          {/* Cell 2 — Tall (spans 2 rows) */}
          {(() => { const Icon1 = highlights[1].icon; return (
          <Link
            href={highlights[1].href}
            className={cn(
              "group col-span-1 row-span-2 rounded-lg p-6 bg-card border border-border text-card-foreground flex flex-col justify-between min-h-64 overflow-hidden relative transition-all duration-700 hover:border-primary/50",
              isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95"
            )}
            style={{ transitionDelay: "200ms" }}
          >
            <div className="absolute bottom-0 right-0 text-9xl font-serif font-bold text-muted/10 leading-none select-none translate-y-6 translate-x-2">
              {highlights[1].label}
            </div>
            <Icon1 className="w-7 h-7 text-primary mb-3" />
            <div>
              <h3 className="font-serif text-xl font-bold mb-2">{highlights[1].title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{highlights[1].description}</p>
            </div>
          </Link>
          ); })()}

          {/* Cell 3 */}
          {(() => { const Icon2 = highlights[2].icon; return (
          <Link
            href={highlights[2].href}
            className={cn(
              "group col-span-1 row-span-1 rounded-lg p-5 bg-card border border-border text-card-foreground flex flex-col justify-between overflow-hidden relative transition-all duration-700 hover:border-primary/50",
              isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95"
            )}
            style={{ transitionDelay: "300ms" }}
          >
            <Icon2 className="w-6 h-6 text-primary mb-3" />
            <div>
              <h3 className="font-semibold text-base mb-1 group-hover:text-primary transition-colors">{highlights[2].title}</h3>
              <p className="text-muted-foreground text-xs leading-relaxed">{highlights[2].description}</p>
            </div>
          </Link>
          ); })()}

          {/* Cell 4 — standard */}
          {(() => { const Icon3 = highlights[3].icon; return (
          <Link
            href={highlights[3].href}
            className={cn(
              "group col-span-1 row-span-1 rounded-lg p-5 bg-card border border-border text-card-foreground flex flex-col justify-between overflow-hidden relative transition-all duration-700 hover:border-primary/50",
              isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95"
            )}
            style={{ transitionDelay: "350ms" }}
          >
            <Icon3 className="w-6 h-6 text-primary mb-3" />
            <div>
              <h3 className="font-semibold text-sm mb-1 group-hover:text-primary transition-colors">{highlights[3].title}</h3>
              <p className="text-muted-foreground text-xs leading-relaxed">{highlights[3].description}</p>
            </div>
          </Link>
          ); })()}

          {/* Cell 5 — standard */}
          {(() => { const Icon4 = highlights[4].icon; return (
          <Link
            href={highlights[4].href}
            className={cn(
              "group col-span-1 row-span-1 rounded-lg p-5 bg-card border border-border text-card-foreground flex flex-col justify-between overflow-hidden relative transition-all duration-700 hover:border-primary/50",
              isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95"
            )}
            style={{ transitionDelay: "400ms" }}
          >
            <Icon4 className="w-6 h-6 text-primary mb-3" />
            <div>
              <h3 className="font-semibold text-sm mb-1 group-hover:text-primary transition-colors">{highlights[4].title}</h3>
              <p className="text-muted-foreground text-xs leading-relaxed">{highlights[4].description}</p>
            </div>
          </Link>
          ); })()}

          {/* Cell 6 — standard */}
          {(() => { const Icon5 = highlights[5].icon; return (
          <Link
            href={highlights[5].href}
            className={cn(
              "group col-span-1 row-span-1 rounded-lg p-5 bg-card border border-border text-card-foreground flex flex-col justify-between overflow-hidden relative transition-all duration-700 hover:border-primary/50",
              isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95"
            )}
            style={{ transitionDelay: "450ms" }}
          >
            <Icon5 className="w-6 h-6 text-primary mb-3" />
            <div>
              <h3 className="font-semibold text-sm mb-1 group-hover:text-primary transition-colors">{highlights[5].title}</h3>
              <p className="text-muted-foreground text-xs leading-relaxed">{highlights[5].description}</p>
            </div>
          </Link>
          ); })()}
        </div>
      </div>
    </section>
  )
}
