import { Metadata } from "next";
import { PageHero } from "@/components/shared/page-hero";
import { Briefcase, Heart, BookOpen, Users, Trophy } from "lucide-react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { CareerForm } from "@/components/careers/career-form";

export const metadata: Metadata = {
  title: "Careers - Sree Nandanam Public School",
  description: "Build your career at SREE NANDANAM PUBLIC SCHOOL. Explore our available job openings and opportunities to join our team of passionate educators.",
  alternates: {
    canonical: "/careers",
  },
};

const benefits = [
  {
    icon: <Heart className="w-6 h-6 text-primary" />,
    title: "Supportive Community",
    description: "Join a family of educators who support each other in personal and professional growth."
  },
  {
    icon: <BookOpen className="w-6 h-6 text-primary" />,
    title: "Continuous Learning",
    description: "We invest in our staff with regular professional development workshops and training sessions."
  },
  {
    icon: <Users className="w-6 h-6 text-primary" />,
    title: "Collaborative Environment",
    description: "Work in an inclusive environment that values teamwork and open communication."
  },
  {
    icon: <Trophy className="w-6 h-6 text-primary" />,
    title: "Rewarding Career",
    description: "Make a lasting impact on students' lives while achieving your own career milestones."
  }
];

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <PageHero
          breadcrumb="Home / Careers"
          title="Join Our Team"
          description="Empower the next generation. We are always looking for passionate educators and staff to join our vibrant learning community."
          image="/images/cultural.jpg"
        />
        
        {/* Why Join Us Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
                Why Work With Us?
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                At Sree Nandanam Public School, we believe that our teachers and staff are our greatest assets. 
                We foster a culture of excellence, innovation, and mutual respect.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {benefits.map((benefit, index) => (
                <div key={index} className="bg-card border border-border p-8 rounded-2xl shadow-sm hover:shadow-md transition-all group">
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    {benefit.icon}
                  </div>
                  <h3 className="font-serif text-xl font-bold text-foreground mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              
              {/* Left Column: Current Openings */}
              <div className="lg:col-span-5 space-y-8">
                <div>
                  <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
                    Current Openings
                  </h2>
                  <p className="text-muted-foreground text-lg">
                    Discover opportunities to make a difference at our institution.
                  </p>
                </div>

                <div className="bg-muted/30 border border-border rounded-2xl p-8 md:p-10 text-center relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-5">
                    <Briefcase className="w-32 h-32" />
                  </div>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 relative z-10">
                    <Briefcase className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-foreground mb-3 relative z-10">
                    No Current Openings
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed relative z-10">
                    We currently don't have any specific openings. However, we are always eager to connect with talented and passionate educators. 
                    Drop your resume, and our HR team will reach out to you when a suitable position becomes available.
                  </p>
                </div>
              </div>

              {/* Right Column: Application Form */}
              <div className="lg:col-span-7">
                <div className="bg-card border border-border rounded-2xl p-6 md:p-10 shadow-lg shadow-black/5">
                  <div className="mb-8">
                    <h2 className="font-serif text-2xl font-bold text-foreground mb-2">
                      Submit Your Application
                    </h2>
                    <p className="text-muted-foreground text-sm">
                      Interested in teaching or working at Sree Nandanam? Submit your details and resume below for future consideration.
                    </p>
                  </div>
                  <CareerForm />
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
