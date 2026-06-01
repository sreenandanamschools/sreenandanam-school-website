import { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { PageHero } from "@/components/shared/page-hero"
import { AcademicPrograms } from "@/components/academics/academic-programs"
import { TeachingMethodology } from "@/components/academics/teaching-methodology"
import { CurriculumOverview } from "@/components/academics/curriculum-overview"

export const metadata: Metadata = {
  title: "Academics",
  description: "Explore our comprehensive academic programs from Class 1 to Class 7. English medium education with modern teaching methodologies and computer-aided learning.",
  alternates: {
    canonical: "/academics",
  },
}

export default function AcademicsPage() {
  return (
    <>
      <Navigation />
      <main>
        <PageHero
          breadcrumb="Home / Academics"
          title="Academic Programs"
          description="Comprehensive education from pre-primary to upper primary, designed to build strong foundations and nurture curious minds."
          image="/images/classroom.jpg"
        />
        <AcademicPrograms />
        <TeachingMethodology />
        <CurriculumOverview />
      </main>
      <Footer />
    </>
  )
}
