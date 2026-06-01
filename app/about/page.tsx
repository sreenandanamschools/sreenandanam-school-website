import { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { AboutHero } from "@/components/about/about-hero"
import { HistorySection } from "@/components/about/history-section"
import { VisionMission } from "@/components/about/vision-mission"
import { HeadTeacherMessage } from "@/components/about/head-teacher-message"
import { ValuesSection } from "@/components/about/values-section"
import { MentalHealthSection } from "@/components/about/mental-health-section"

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about SREE NANDANAM PUBLIC SCHOOL's history, vision, mission, and values. Established in 2003, we provide quality education in Parassala, Kerala.",
  alternates: {
    canonical: "/about",
  },
}

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <main>
        <AboutHero />
        <HistorySection />
        <VisionMission />
        <HeadTeacherMessage />
        <MentalHealthSection />
        <ValuesSection />
      </main>
      <Footer />
    </>
  )
}
