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
          image="/images/hero-school.jpg"
        />
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-4xl prose prose-slate md:prose-lg">
            <h2>1. Information We Collect</h2>
            <p>
              At Sree Nandanam Public School, we collect personal information
              that you provide to us directly, such as your name, contact
              details, and information related to student admissions or
              inquiries. We also collect non-personal information automatically
              when you visit our website, such as your IP address, browser
              type, and usage data.
            </p>

            <h2>2. How We Use Your Information</h2>
            <p>
              We use the collected information to:
            </p>
            <ul>
              <li>Process admissions and student enrollments.</li>
              <li>Communicate with parents, students, and website visitors.</li>
              <li>Improve our website, services, and educational programs.</li>
              <li>Send important updates and school-related announcements.</li>
            </ul>

            <h2>3. Information Sharing and Disclosure</h2>
            <p>
              We do not sell, trade, or rent your personal information to third
              parties. We may share information with trusted service providers
              who assist us in operating our website and conducting school
              business, as long as those parties agree to keep this information
              confidential. We may also release information when required to
              comply with the law or protect our or others' rights, property, or
              safety.
            </p>

            <h2>4. Data Security</h2>
            <p>
              We implement a variety of security measures to maintain the safety
              of your personal information. However, no method of transmission
              over the internet or method of electronic storage is 100% secure,
              and we cannot guarantee its absolute security.
            </p>

            <h2>5. Your Rights</h2>
            <p>
              You have the right to access, update, or request deletion of your
              personal information. If you have any concerns about your data or
              wish to exercise these rights, please contact us.
            </p>

            <h2>6. Changes to This Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. Any changes
              will be posted on this page with an updated revision date.
            </p>

            <h2>7. Contact Us</h2>
            <p>
              If you have any questions regarding this Privacy Policy, you may
              contact us at:
              <br />
              <strong>Email:</strong> info@sreenandanamschools.com
              <br />
              <strong>Phone:</strong> +91 XXXXX XXXXX
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
