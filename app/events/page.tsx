import { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { PageHero } from "@/components/shared/page-hero"
import { EventsList } from "@/components/events/events-list"

export const metadata: Metadata = {
  title: "Events",
  description: "View all upcoming and past events at SREE NANDANAM PUBLIC SCHOOL. Stay informed about school activities, celebrations, and important dates.",
  alternates: {
    canonical: "/events",
  },
}

export default function EventsPage() {
  return (
    <>
      <Navigation />
      <main>
        <PageHero
          breadcrumb="Home / Events"
          title="School Events"
          description="Stay up to date with all our school events, celebrations, and important activities throughout the academic year."
          image="/images/cultural.jpg"
        />
        <div className="py-16 md:py-24 bg-card">
          <div className="container mx-auto px-4">
            <EventsList />
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
