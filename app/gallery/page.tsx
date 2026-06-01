import { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { PageHero } from "@/components/shared/page-hero"
import { GalleryGrid } from "@/components/gallery/gallery-grid"

export const metadata: Metadata = {
  title: "Photo Gallery",
  description: "Explore photos from school events, activities, and daily life at SREE NANDANAM PUBLIC SCHOOL. See our students in action.",
  alternates: {
    canonical: "/gallery",
  },
}

export default function GalleryPage() {
  return (
    <>
      <Navigation />
      <main>
        <PageHero
          breadcrumb="Home / Gallery"
          title="Photo Gallery"
          description="A glimpse into the vibrant life at Sree Nandanam Public School through our collection of memorable moments."
          image="/images/art-class.jpg"
        />
        <GalleryGrid />
      </main>
      <Footer />
    </>
  )
}
