"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { Camera, X, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface GalleryImage {
  id: string | number
  category: string
  title: string
  description: string
  image: string
}



export function GalleryGrid() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeCategory, setActiveCategory] = useState("all")
  const [selectedImage, setSelectedImage] = useState<string | number | null>(null)
  const [images, setImages] = useState<GalleryImage[]>([])
  const [categories, setCategories] = useState<{ id: string; label: string }[]>([
    { id: "all", label: "All Photos" }
  ])
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
          setImages(data.images)

          // Build dynamic categories based on returned database images
          const uniqueCategories = data.images.map((img: any) => img.category)
          const uniqueExtras = Array.from(new Set(uniqueCategories))
          const mergedCategories = [
            { id: "all", label: "All Photos" },
            ...uniqueExtras.map((cat: any) => ({
              id: cat.toLowerCase(),
              label: cat.replace(/[-_]/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase())
            }))
          ]
          setCategories(mergedCategories)
        } else {
          setImages([])
        }
      } catch (error) {
        setImages([])
      } finally {
        setLoading(false)
      }
    }

    fetchImages()
  }, [])

  const filteredImages = activeCategory === "all"
    ? images
    : images.filter(img => img.category === activeCategory)

  const currentImageIndex = selectedImage !== null
    ? filteredImages.findIndex(img => img.id === selectedImage)
    : -1

  const handlePrevious = () => {
    if (currentImageIndex > 0) {
      setSelectedImage(filteredImages[currentImageIndex - 1].id)
    }
  }

  const handleNext = () => {
    if (currentImageIndex < filteredImages.length - 1) {
      setSelectedImage(filteredImages[currentImageIndex + 1].id)
    }
  }

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage === null) return
      if (e.key === "Escape") setSelectedImage(null)
      if (e.key === "ArrowLeft") handlePrevious()
      if (e.key === "ArrowRight") handleNext()
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [selectedImage, currentImageIndex])

  if (loading) {
    return (
      <section className="py-16 md:py-24 bg-card animate-pulse">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-9 w-24 bg-muted rounded-full" />
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="aspect-square bg-muted rounded-xl" />
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-card">
      <div className="container mx-auto px-4">
        {/* Category Filter */}
        <div
          className={cn(
            "flex flex-wrap items-center justify-center gap-2 mb-12 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all",
                activeCategory === category.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              )}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredImages.map((image, index) => (
            <button
              key={image.id}
              onClick={() => setSelectedImage(image.id)}
              className={cn(
                "group relative aspect-square bg-muted rounded-xl overflow-hidden transition-all duration-500 hover:shadow-xl",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              {/* Image */}
              <Image
                src={image.image}
                alt={image.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Category Badge */}
              <span className="absolute top-3 left-3 px-2 py-1 bg-background/90 backdrop-blur-sm rounded text-xs font-medium text-foreground capitalize opacity-0 group-hover:opacity-100 transition-opacity">
                {image.category}
              </span>

              {/* Title */}
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-background text-sm font-medium">{image.title}</p>
                <p className="text-background/70 text-xs">{image.description}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Empty State */}
        {filteredImages.length === 0 && (
          <div className="text-center py-16">
            <Camera className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground">No photos in this category yet.</p>
          </div>
        )}

        {/* Lightbox */}
        {selectedImage !== null && (
          <div
            className="fixed inset-0 z-50 bg-foreground/95 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 p-2 text-background/80 hover:text-background transition-colors"
              aria-label="Close"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Navigation - Previous */}
            {currentImageIndex > 0 && (
              <button
                onClick={(e) => { e.stopPropagation(); handlePrevious(); }}
                className="absolute left-4 p-2 text-background/80 hover:text-background transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-10 h-10" />
              </button>
            )}

            {/* Navigation - Next */}
            {currentImageIndex < filteredImages.length - 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); handleNext(); }}
                className="absolute right-4 p-2 text-background/80 hover:text-background transition-colors"
                aria-label="Next image"
              >
                <ChevronRight className="w-10 h-10" />
              </button>
            )}

            {/* Image Container */}
            <div
              className="max-w-4xl w-full bg-card rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="aspect-video bg-muted relative">
                <Image
                  src={filteredImages[currentImageIndex]?.image || ""}
                  alt={filteredImages[currentImageIndex]?.title || ""}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-serif text-xl font-bold text-foreground mb-2">
                  {filteredImages[currentImageIndex]?.title}
                </h3>
                <p className="text-muted-foreground">
                  {filteredImages[currentImageIndex]?.description}
                </p>
                <p className="text-sm text-primary mt-2 capitalize">
                  Category: {filteredImages[currentImageIndex]?.category}
                </p>
              </div>
            </div>

            {/* Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-background/60 text-sm">
              {currentImageIndex + 1} / {filteredImages.length}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
