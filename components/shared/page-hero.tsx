"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface PageHeroProps {
  breadcrumb: string
  title: string
  description: string
  image?: string
}

export function PageHero({ breadcrumb, title, description, image = "https://res.cloudinary.com/dsztu5qhz/image/upload/f_auto,q_auto/v1784834655/IMG_5553_hgls4k.jpg" }: PageHeroProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative overflow-hidden bg-[var(--ink)]" style={{ minHeight: "52vh" }}>
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
      />

      {/* Layered overlay — gradient from left */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/30" />

      {/* Diagonal bottom cut */}
      <div
        className="absolute bottom-0 left-0 right-0 h-16 bg-background"
        style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 0)" }}
      />

      <div className="relative z-10 container mx-auto px-4 lg:px-8 pt-36 pb-24 md:pt-44 md:pb-28">
        {/* Breadcrumb label */}
        <div className={cn(
          "flex items-center gap-3 mb-6 transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}>
          <span className="h-px w-8 bg-[var(--gold)]" />
          <p className="text-[var(--gold)] text-xs font-bold tracking-[0.2em] uppercase">
            {breadcrumb}
          </p>
        </div>

        {/* Title */}
        <h1 className={cn(
          "font-serif font-bold text-white leading-tight mb-5 text-balance max-w-2xl transition-all duration-700 delay-100",
          "text-4xl sm:text-5xl md:text-6xl",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}>
          {title}
        </h1>

        {/* Description */}
        <p className={cn(
          "text-white/70 leading-relaxed max-w-xl transition-all duration-700 delay-200",
          "text-base md:text-lg",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}>
          {description}
        </p>
      </div>
    </section>
  )
}
