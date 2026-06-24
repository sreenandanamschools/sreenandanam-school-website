import { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { PageHero } from "@/components/shared/page-hero"
import { AdmissionOverview } from "@/components/admissions/admission-overview"
import { AdmissionProcess } from "@/components/admissions/admission-process"
import { AdmissionCTA } from "@/components/admissions/admission-cta"

export const metadata: Metadata = {
  title: "Admissions",
  description: "Apply for admission to SREE NANDANAM PUBLIC SCHOOL. Learn about eligibility criteria, required documents, and the admission process for Class 1 to Class 7.",
  alternates: {
    canonical: "/admissions",
  },
}

export default function AdmissionsPage() {
  return (
    <>
      <Navigation />
      <main>
        <PageHero
          breadcrumb="Home / Admissions"
          title="Admissions"
          description="Join the Sree Nandanam family. We welcome applications for students from Class 1 to Class 7 for the upcoming academic year."
          image="/images/library.jpg"
        />
        <AdmissionOverview />
        <AdmissionProcess />
        <AdmissionCTA />
      </main>
      <Footer />
    </>
  )
}
