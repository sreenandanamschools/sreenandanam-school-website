import { Metadata } from "next";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { PageHero } from "@/components/shared/page-hero";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Sree Nandanam Public School.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        <PageHero
          breadcrumb="Home / Privacy Policy"
          title="Privacy Policy"
          description="Last updated: May 2026"
          image="https://res.cloudinary.com/dsztu5qhz/image/upload/f_auto,q_auto/v1784834607/IMG_4737_njdz6h.jpg"
        />
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="bg-card border border-border shadow-sm rounded-2xl p-8 md:p-12 lg:p-16">
              <div className="space-y-12">
                {/* Section 1 */}
                <div className="group">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm shrink-0">1</span>
                    <h2 className="text-2xl font-serif font-bold text-foreground group-hover:text-primary transition-colors">Information We Collect</h2>
                  </div>
                  <div className="pl-12">
                    <p className="text-muted-foreground leading-relaxed">
                      At Sree Nandanam Public School, we collect personal information
                      that you provide to us directly, such as your name, contact
                      details, and information related to student admissions or
                      inquiries. We also collect non-personal information automatically
                      when you visit our website, such as your IP address, browser type,
                      and usage data.
                    </p>
                  </div>
                </div>

                {/* Section 2 */}
                <div className="group">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm shrink-0">2</span>
                    <h2 className="text-2xl font-serif font-bold text-foreground group-hover:text-primary transition-colors">How We Use Your Information</h2>
                  </div>
                  <div className="pl-12">
                    <p className="text-muted-foreground leading-relaxed mb-4">We use the collected information to:</p>
                    <ul className="space-y-3">
                      {[
                        "Process admissions and student enrollments.",
                        "Communicate with parents, students, and website visitors.",
                        "Improve our website, services, and educational programs.",
                        "Send important updates and school-related announcements."
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)] mt-2.5 shrink-0" />
                          <span className="text-muted-foreground leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Section 3 */}
                <div className="group">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm shrink-0">3</span>
                    <h2 className="text-2xl font-serif font-bold text-foreground group-hover:text-primary transition-colors">Information Sharing and Disclosure</h2>
                  </div>
                  <div className="pl-12">
                    <p className="text-muted-foreground leading-relaxed">
                      We do not sell, trade, or rent your personal information to third
                      parties. We may share information with trusted service providers
                      who assist us in operating our website and conducting school
                      business, as long as those parties agree to keep this information
                      confidential. We may also release information when required to
                      comply with the law or protect our or others' rights, property, or
                      safety.
                    </p>
                  </div>
                </div>

                {/* Section 4 */}
                <div className="group">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm shrink-0">4</span>
                    <h2 className="text-2xl font-serif font-bold text-foreground group-hover:text-primary transition-colors">Data Security</h2>
                  </div>
                  <div className="pl-12">
                    <p className="text-muted-foreground leading-relaxed">
                      We implement a variety of security measures to maintain the safety
                      of your personal information. However, no method of transmission
                      over the internet or method of electronic storage is 100% secure,
                      and we cannot guarantee its absolute security.
                    </p>
                  </div>
                </div>

                {/* Section 5 */}
                <div className="group">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm shrink-0">5</span>
                    <h2 className="text-2xl font-serif font-bold text-foreground group-hover:text-primary transition-colors">Your Rights</h2>
                  </div>
                  <div className="pl-12">
                    <p className="text-muted-foreground leading-relaxed">
                      You have the right to access, update, or request deletion of your
                      personal information. If you have any concerns about your data or
                      wish to exercise these rights, please contact us.
                    </p>
                  </div>
                </div>

                {/* Section 6 */}
                <div className="group">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm shrink-0">6</span>
                    <h2 className="text-2xl font-serif font-bold text-foreground group-hover:text-primary transition-colors">Changes to This Policy</h2>
                  </div>
                  <div className="pl-12">
                    <p className="text-muted-foreground leading-relaxed">
                      We may update our Privacy Policy from time to time. Any changes
                      will be posted on this page with an updated revision date.
                    </p>
                  </div>
                </div>

                {/* Section 7 */}
                <div className="group">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm shrink-0">7</span>
                    <h2 className="text-2xl font-serif font-bold text-foreground group-hover:text-primary transition-colors">Contact Us</h2>
                  </div>
                  <div className="pl-12">
                    <p className="text-muted-foreground leading-relaxed">
                      If you have any questions regarding this Privacy Policy, you may contact us at:
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
