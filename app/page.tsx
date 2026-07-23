import { Metadata } from "next";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/home/hero-section";
import { StatsSection } from "@/components/home/stats-section";
import { HighlightsSection } from "@/components/home/highlights-section";
import { AnnouncementsSection } from "@/components/home/announcements-section";
import { GalleryPreview } from "@/components/home/gallery-preview";
import { CTASection } from "@/components/home/cta-section";
import { EventPromoPopup } from "@/components/home/event-promo-popup";

export const metadata: Metadata = {
  title: "SREE NANDANAM PUBLIC SCHOOL | Quality Education in Parassala",
  description:
    "Welcome to SREE NANDANAM PUBLIC SCHOOL, offering quality primary and upper primary education in Parassala, Kerala. English medium curriculum with modern facilities.",
  openGraph: {
    title: "SREE NANDANAM PUBLIC SCHOOL | Parassala",
    description:
      "Empowering students through quality education since 2008 in Parassala, Kerala.",
    url: "https://sreenandanamschools.com",
    siteName: "Sree Nandanam Public School",
    locale: "en_IN",
    type: "website",
  },
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  return (
    <>
      <Navigation />
      <EventPromoPopup />
      <main>
        <HeroSection />
        <StatsSection />
        <HighlightsSection />
        <AnnouncementsSection />
        <GalleryPreview />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
