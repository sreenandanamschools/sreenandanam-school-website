import { Metadata } from "next";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { PageHero } from "@/components/shared/page-hero";
import { FacilitiesGrid } from "@/components/facilities/facilities-grid";

export const metadata: Metadata = {
  title: "Facilities",
  description:
    "Explore our modern facilities including computer lab, library, playground, and well-equipped classrooms designed for effective learning.",
  alternates: {
    canonical: "/facilities",
  },
};

export default function FacilitiesPage() {
  return (
    <>
      <Navigation />
      <main>
        <PageHero
          breadcrumb="Home / Facilities"
          title="Our Facilities"
          description="Modern infrastructure and learning resources designed to provide students with a comfortable and effective educational environment."
          image="https://res.cloudinary.com/dsztu5qhz/image/upload/f_auto,q_auto/v1784834609/IMG_4739_czppyi.jpg"
        />
        <FacilitiesGrid />
      </main>
      <Footer />
    </>
  );
}
