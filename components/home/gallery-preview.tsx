"use client"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight, Camera } from "lucide-react"
import { cn } from "@/lib/utils"

interface GalleryImage {
  id: string | number
  category: string
  title: string
  description: string
  image: string
}

const areaClasses = [
  "grid-area-a",
  "grid-area-b",
  "grid-area-c",
  "grid-area-d",
  "grid-area-e",
  "grid-area-f",
]

export function GalleryPreview() {
  const [isVisible, setIsVisible] = useState(false)
  const [images, setImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.05 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    fetch("/api/gallery")
      .then(r => r.json())
      .then(data => {
        if (data.success && data.images?.length > 0) {
          setImages(data.images.slice(0, 6))
        }
      })
      .catch(() => setImages([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section ref={sectionRef} className="py-20 md:py-28 bg-[var(--ink)] overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">

        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className={cn(
              "text-[var(--gold)] text-xs font-bold tracking-[0.2em] uppercase mb-3 transition-all duration-700",
              isVisible ? "opacity-100" : "opacity-0"
            )}>
              Life at Sreenandanam
            </p>
            <h2 className={cn(
              "font-serif text-4xl md:text-5xl font-bold text-white leading-tight transition-all duration-700 delay-100",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}>
              Our
              <br />
              <em className="text-[var(--gold)]">Gallery</em>
            </h2>
          </div>
          <Link
            href="/gallery"
            className={cn(
              "hidden md:inline-flex items-center gap-2 text-sm font-semibold text-white/60 hover:text-white transition-all duration-300 link-underline after:bg-white/60",
              isVisible ? "opacity-100" : "opacity-0"
            )}
          >
            Browse all <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Loading skeleton */}
        {loading && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 animate-pulse">
            {[0, 1, 2, 3, 4, 5].map(i => (
              <div key={i} className={cn(
                "bg-white/5 rounded-sm aspect-[4/3] md:aspect-auto md:h-64",
                i === 0 ? "col-span-2 row-span-2" : ""
              )} />
            ))}
          </div>
        )}

        {/* Mosaic grid */}
        {!loading && images.length > 0 && (
          <div
            className={cn(
              "gallery-mosaic-grid transition-all duration-700 delay-200",
              isVisible ? "opacity-100" : "opacity-0"
            )}
          >
            {images.map((image, index) => (
              <Link
                key={image.id}
                href="/gallery"
                className={cn(
                  "group relative overflow-hidden rounded-sm bg-white/5 aspect-[4/3] lg:aspect-auto lg:h-full min-h-[200px] lg:min-h-0",
                  areaClasses[index]
                )}
              >
                <Image
                  src={image.image}
                  alt={image.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

                {/* Category badge */}
                <div className="absolute top-3 left-3 px-2.5 py-1 bg-black/60 backdrop-blur-sm rounded-sm text-[10px] font-bold text-white/80 uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {image.category}
                </div>

                {/* Caption */}
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-400">
                  <p className="text-white text-sm font-semibold leading-snug">{image.title}</p>
                </div>

                {/* Arrow icon */}
                <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowUpRight className="w-3.5 h-3.5 text-white" />
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* View Full Gallery UX-friendly CTA Button */}
        <div className="mt-12 text-center">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground hover:bg-primary/95 text-sm font-semibold rounded-sm transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
          >
            <Camera className="w-4.5 h-4.5" />
            <span>View Full Gallery</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
