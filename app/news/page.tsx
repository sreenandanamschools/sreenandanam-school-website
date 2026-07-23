import { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { PageHero } from "@/components/shared/page-hero"
import { NewsList } from "@/components/news/news-list"
import { UpcomingEvents } from "@/components/news/upcoming-events"

export const metadata: Metadata = {
  title: "News & Announcements",
  description: "Stay updated with the latest news, announcements, and upcoming events at SREE NANDANAM PUBLIC SCHOOL.",
  alternates: {
    canonical: "/news",
  },
}

export default function NewsPage() {
  return (
    <>
      <Navigation />
      <main>
        <PageHero
          breadcrumb="Home / News"
          title="News & Announcements"
          description="Stay informed about the latest happenings, important announcements, and upcoming events at our school."
          image="https://res.cloudinary.com/dsztu5qhz/image/upload/f_auto,q_auto/v1784834607/IMG_4737_njdz6h.jpg"
        />
        <div className="py-16 md:py-24 bg-card">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <NewsList />
              </div>
              <div>
                <UpcomingEvents />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
