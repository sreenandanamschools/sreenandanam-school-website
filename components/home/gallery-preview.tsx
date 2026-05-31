"use client"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
interface GalleryImage {
  id: string | number
  category: string
  title: string
  description: string
  image: string
}

export function GalleryPreview() {
  const [isVisible, setIsVisible] = useState(false)
  const [images, setImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [loading])

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("/api/gallery")
        const data = await response.json()
        if (data.success && data.images && data.images.length > 0) {
          // Display the 6 most recent images in the preview grid
          setImages(data.images.slice(0, 6))
        }
      } catch (error) {
        setImages([])
      } finally {
        setLoading(false)
      }
    }

    fetchImages()
  }, [])

  if (loading) {
    return (
      <section className="py-16 md:py-24 bg-background animate-pulse">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <div>
              <div className="h-4 w-24 bg-muted rounded mb-2" />
              <div className="h-8 w-48 bg-muted rounded" />
            </div>
            <div className="h-10 w-36 bg-muted rounded" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <div
                key={index}
                className={cn(
                  "bg-muted rounded-xl aspect-[4/3]",
                  index === 0 && "md:col-span-2 md:row-span-2 md:aspect-square"
                )}
              />
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>

            <h2
              className={cn(
                "font-serif text-3xl md:text-4xl font-bold text-foreground transition-all duration-700 delay-100",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
            >
              Photo Gallery
            </h2>
          </div>
          <Button
            asChild
            variant="outline"
            className={cn(
              "transition-all duration-700 delay-200",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
          >
            <Link href="/gallery">
              View Full Gallery
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {images.map((image, index) => (
            <Link
              key={image.id}
              href="/gallery"
              className={cn(
                "group relative aspect-[4/3] bg-muted rounded-xl overflow-hidden transition-all duration-500",
                index === 0 && "md:col-span-2 md:row-span-2 md:aspect-square",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
              style={{ transitionDelay: `${(index + 3) * 100}ms` }}
            >
              {/* Image */}
              <Image
                src={image.image}
                alt={image.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes={index === 0 ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 50vw, 33vw"}
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Category Badge */}
              <div className="absolute top-3 left-3 px-3 py-1 bg-background/90 backdrop-blur-sm rounded-full text-xs font-medium text-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {image.category}
              </div>

              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-background text-sm font-medium">{image.title}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
