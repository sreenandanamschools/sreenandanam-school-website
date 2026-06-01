import { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { PageHero } from "@/components/shared/page-hero"
import { ContactInfo } from "@/components/contact/contact-info"
import { ContactForm } from "@/components/contact/contact-form"
import { LocationMap } from "@/components/contact/location-map"

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with SREE NANDANAM PUBLIC SCHOOL in Parassala, Kerala. Find our phone numbers, email address, school location map, and contact form.",
  alternates: {
    canonical: "/contact",
  },
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <PageHero
          breadcrumb="Home / Contact Us"
          title="Contact Us"
          description="We'd love to hear from you. Get in touch with us for admissions, inquiries, or feedback."
          image="/images/sports.jpg"
        />
        <ContactInfo />
        <ContactForm />
        <LocationMap />
      </main>
      <Footer />
    </div>
  )
}
