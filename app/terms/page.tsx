import { Metadata } from "next";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { PageHero } from "@/components/shared/page-hero";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms and Conditions for Sree Nandanam Public School.",
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsOfServicePage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        <PageHero
          breadcrumb="Home / Terms of Service"
          title="Terms of Service"
          description="Last updated: May 2026"
          image="https://res.cloudinary.com/dsztu5qhz/image/upload/f_auto,q_auto/v1784834609/IMG_4739_czppyi.jpg"
        />
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="bg-card border border-border shadow-sm rounded-2xl p-8 md:p-12 lg:p-16">
              <div className="space-y-12">
                {/* Section 1 */}
                <div className="group">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm shrink-0">1</span>
                    <h2 className="text-2xl font-serif font-bold text-foreground group-hover:text-primary transition-colors">Acceptance of Terms</h2>
                  </div>
                  <div className="pl-12">
                    <p className="text-muted-foreground leading-relaxed">
                      By accessing the Sree Nandanam Public School website, interacting with our administration, or enrolling a student, you accept and agree to be bound by these Terms and Conditions. These terms ensure a safe, structured, and enriching environment for all our students and staff.
                    </p>
                  </div>
                </div>

                {/* Section 2 */}
                <div className="group">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm shrink-0">2</span>
                    <h2 className="text-2xl font-serif font-bold text-foreground group-hover:text-primary transition-colors">Admissions and Enrollment</h2>
                  </div>
                  <div className="pl-12">
                    <p className="text-muted-foreground leading-relaxed">
                      Admission to Sree Nandanam Public School is granted based on seat availability, academic readiness, and fulfillment of our admission criteria. The school management reserves the absolute right to grant or deny admission without assigning any reason. All submitted documents must be authentic and accurate.
                    </p>
                  </div>
                </div>

                {/* Section 3 */}
                <div className="group">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm shrink-0">3</span>
                    <h2 className="text-2xl font-serif font-bold text-foreground group-hover:text-primary transition-colors">Fee Payment Policies</h2>
                  </div>
                  <div className="pl-12">
                    <p className="text-muted-foreground leading-relaxed">
                      Parents/Guardians are responsible for the timely payment of all tuition, transportation, and extracurricular fees as per the school's fee schedule. Late payments may attract penalties. Fees once paid are strictly non-refundable and non-transferable, except in accordance with our specific withdrawal and refund policy.
                    </p>
                  </div>
                </div>

                {/* Section 4 */}
                <div className="group">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm shrink-0">4</span>
                    <h2 className="text-2xl font-serif font-bold text-foreground group-hover:text-primary transition-colors">Student Conduct and Discipline</h2>
                  </div>
                  <div className="pl-12">
                    <p className="text-muted-foreground leading-relaxed">
                      Students are expected to maintain high standards of discipline, respect for peers and faculty, and academic integrity. The school enforces a strict code of conduct. Any violation, including bullying, damage to school property, or severe disciplinary infractions, may result in suspension or expulsion.
                    </p>
                  </div>
                </div>

                {/* Section 5 */}
                <div className="group">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm shrink-0">5</span>
                    <h2 className="text-2xl font-serif font-bold text-foreground group-hover:text-primary transition-colors">Parent and Guardian Responsibilities</h2>
                  </div>
                  <div className="pl-12">
                    <p className="text-muted-foreground leading-relaxed">
                      Education is a collaborative effort. Parents are expected to ensure their child's regular attendance, assist with academic progress at home, and actively participate in parent-teacher meetings. Any concerns should be raised directly with the school administration through official channels.
                    </p>
                  </div>
                </div>

                {/* Section 6 */}
                <div className="group">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm shrink-0">6</span>
                    <h2 className="text-2xl font-serif font-bold text-foreground group-hover:text-primary transition-colors">Website Use and Intellectual Property</h2>
                  </div>
                  <div className="pl-12">
                    <p className="text-muted-foreground leading-relaxed">
                      The content on our website is provided for general information and is subject to change. All materials, including the school logo, curriculum details, and photography, are the intellectual property of Sree Nandanam Public School. You may not reproduce or distribute these materials without explicit permission.
                    </p>
                  </div>
                </div>

                {/* Section 7 */}
                <div className="group">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm shrink-0">7</span>
                    <h2 className="text-2xl font-serif font-bold text-foreground group-hover:text-primary transition-colors">Governing Law</h2>
                  </div>
                  <div className="pl-12">
                    <p className="text-muted-foreground leading-relaxed">
                      These terms and conditions shall be governed by and construed in
                      accordance with the laws of India. Any dispute arising in connection with the school or these terms shall be subject to the exclusive jurisdiction of the courts of Kerala, India.
                    </p>
                  </div>
                </div>

                {/* Section 8 */}
                <div className="group">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm shrink-0">8</span>
                    <h2 className="text-2xl font-serif font-bold text-foreground group-hover:text-primary transition-colors">Contact Information</h2>
                  </div>
                  <div className="pl-12">
                    <p className="text-muted-foreground leading-relaxed">
                      If you have any queries regarding our policies, admissions, or these terms, please contact us at:
                    </p>
                    <div className="mt-4 p-4 rounded-lg bg-primary/5 inline-block border border-primary/10">
                      <p className="text-foreground font-medium">Email: <a href="mailto:sreenandadnamschools@gmail.com" className="text-primary hover:underline">sreenandadnamschools@gmail.com</a></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
