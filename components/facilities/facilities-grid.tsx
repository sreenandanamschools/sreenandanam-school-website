"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import {
  Monitor,
  BookOpen,
  TreePine,
  School,
  Droplets,
  Zap,
  Building,
  Users
} from "lucide-react"
import { cn } from "@/lib/utils"

const featured = [
  {
    id: "computer-lab",
    icon: Monitor,
    title: "Computer Lab",
    description: "A dedicated computer-aided learning lab equipped with 5 functional systems. Students learn digital literacy, explore educational software, and build foundational tech skills.",
    features: ["5 functional computers", "Computer-aided learning", "Digital literacy programs", "Educational software"],
    image: "/images/computer-lab.jpg",
  },
  {
    id: "library",
    icon: BookOpen,
    title: "Library",
    description: "Our library provides students with access to books and reading materials that encourage curiosity, enhance knowledge, and develop a lifelong love for reading.",
    features: ["Diverse reading materials", "Reference books", "Story books", "Quiet reading space"],
    image: "/images/library.jpg",
  },
  {
    id: "playground",
    icon: TreePine,
    title: "Playground",
    description: "A spacious outdoor playground where students engage in physical activities, sports, and games essential for healthy physical and social development.",
    features: ["Outdoor games area", "Physical activities", "Sports equipment", "Safe play environment"],
    image: "/images/playground.jpg",
  },
]

const secondary = [
  { id: "classrooms", icon: School, title: "Classrooms", description: "6 well-equipped classrooms with proper ventilation and learning aids.", features: ["6 spacious classrooms", "Good lighting", "Learning aids"] },
  { id: "activity-rooms", icon: Users, title: "Activity Rooms", description: "2 dedicated rooms for art, craft, and creative learning activities.", features: ["2 activity rooms", "Art supplies", "Creative space"] },
  { id: "drinking-water", icon: Droplets, title: "Drinking Water", description: "Clean tap water facility ensuring safe drinking water throughout the day.", features: ["Clean tap water", "Multiple access points"] },
  { id: "sanitation", icon: Building, title: "Sanitation", description: "Separate toilet facilities for boys and girls, hygiene standards maintained.", features: ["2 toilets for boys", "2 toilets for girls"] },
  { id: "electricity", icon: Zap, title: "Electricity", description: "Reliable electricity ensuring uninterrupted learning and computer operations.", features: ["Consistent power supply", "Well-lit classrooms"] },
]

export function FacilitiesGrid() {
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
    <section ref={sectionRef} className="overflow-hidden">

      {/* ── Featured facilities — alternating bands ─── */}
      {featured.map((facility, index) => (
        <div
          key={facility.id}
          id={facility.id}
          className={cn(
            "grid lg:grid-cols-2 min-h-[420px] transition-all duration-700",
            index % 2 === 0 ? "bg-background" : "bg-[var(--cream)]",
            isVisible ? "opacity-100" : "opacity-0"
          )}
          style={{ transitionDelay: `${index * 120}ms` }}
        >
          {/* Image — alternates left/right */}
          <div className={cn(
            "relative min-h-56 overflow-hidden",
            index % 2 !== 0 && "lg:order-last"
          )}>
            <Image
              src={facility.image}
              alt={facility.title}
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* Gradient overlay */}
            <div className={cn(
              "absolute inset-0",
              index % 2 === 0
                ? "bg-gradient-to-r from-transparent to-background/20"
                : "bg-gradient-to-l from-transparent to-[var(--cream)]/20"
            )} />
            {/* Icon badge */}
            <div className="absolute top-5 left-5 w-11 h-11 bg-primary rounded-sm flex items-center justify-center">
              <facility.icon className="w-5 h-5 text-primary-foreground" />
            </div>
          </div>

          {/* Content */}
          <div className={cn(
            "flex flex-col justify-center px-8 sm:px-12 lg:px-14 py-14",
            index % 2 !== 0 && "lg:order-first"
          )}>
            <span className="text-[var(--gold)] text-xs font-bold tracking-[0.2em] uppercase mb-5">
              {String(index + 1).padStart(2, "0")} · Facility
            </span>
            <h3 className="font-serif text-3xl md:text-4xl font-bold text-foreground leading-tight mb-5">
              {facility.title}
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-7 max-w-md">
              {facility.description}
            </p>
            <ul className="space-y-2.5">
              {facility.features.map(feature => (
                <li key={feature} className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  <span className="text-sm font-medium text-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}

      {/* ── Secondary facilities compact band ────────── */}
      <div className="bg-[var(--ink)] py-16 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <p className={cn(
            "text-[var(--gold)] text-xs font-bold tracking-[0.2em] uppercase mb-10 transition-all duration-700",
            isVisible ? "opacity-100" : "opacity-0"
          )}>
            Additional Facilities
          </p>
          <div className={cn(
            "grid sm:grid-cols-2 lg:grid-cols-5 gap-px bg-white/5 rounded-sm overflow-hidden transition-all duration-700 delay-300",
            isVisible ? "opacity-100" : "opacity-0"
          )}>
            {secondary.map((facility, index) => (
              <div
                key={facility.id}
                id={facility.id}
                className="group bg-[var(--ink)] p-6 hover:bg-white/5 transition-colors duration-300"
              >
                <div className="w-10 h-10 rounded-sm border border-white/15 flex items-center justify-center mb-4 group-hover:border-[var(--gold)]/50 transition-colors">
                  <facility.icon className="w-5 h-5 text-white/40 group-hover:text-[var(--gold)] transition-colors" />
                </div>
                <h4 className="font-serif font-bold text-white text-base mb-2 group-hover:text-[var(--gold)] transition-colors">
                  {facility.title}
                </h4>
                <p className="text-white/40 text-xs leading-relaxed">{facility.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
