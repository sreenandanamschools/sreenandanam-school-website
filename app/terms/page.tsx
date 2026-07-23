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
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-4xl prose prose-slate md:prose-lg">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using the website of Sree Nandanam Public School,
              you accept and agree to be bound by the terms and provision of this
              agreement. If you do not agree to abide by the above, please do
              not use this service.
            </p>

            <h2>2. Provision of Services</h2>
            <p>
              Sree Nandanam Public School is constantly innovating in order to
              provide the best possible experience for its users. You
              acknowledge and agree that the form and nature of the services
              which we provide may change from time to time without prior notice
              to you.
            </p>

            <h2>3. Use of Website</h2>
            <p>
              You agree to use the website only for lawful purposes, and in a
              way that does not infringe the rights of, restrict or inhibit
              anyone else's use and enjoyment of the website. Prohibited
              behavior includes harassing or causing distress or inconvenience
              to any person, transmitting obscene or offensive content or
              disrupting the normal flow of dialogue within our website.
            </p>

            <h2>4. Intellectual Property</h2>
            <p>
              All copyright, trademarks, design rights, patents, and other
              intellectual property rights (registered and unregistered) in and
              on our website and all content located on the site shall remain
              vested in Sree Nandanam Public School or its licensors. You may
              not copy, reproduce, republish, disassemble, decompile, reverse
              engineer, download, post, broadcast, transmit, make available to
              the public, or otherwise use website content in any way except for
              your own personal, non-commercial use.
            </p>

            <h2>5. Disclaimer of Warranties</h2>
            <p>
              The website and its content are provided "as is" and "as
              available" without any representations or any kind of warranty
              made (whether express or implied by law), including the implied
              warranties of satisfactory quality, fitness for a particular
              purpose, non-infringement, compatibility, security, and accuracy.
            </p>

            <h2>6. Limitation of Liability</h2>
            <p>
              Under no circumstances will Sree Nandanam Public School be liable
              for any of the following losses or damage (whether such losses
              where foreseen, foreseeable, known or otherwise): (a) loss of
              data; (b) loss of revenue or anticipated profits; (c) loss of
              business; (d) loss of opportunity; (e) loss of goodwill or injury
              to reputation; (f) losses suffered by third parties; or (g) any
              indirect, consequential, special or exemplary damages arising from
              the use of the website regardless of the form of action.
            </p>

            <h2>7. Governing Law</h2>
            <p>
              These terms and conditions shall be governed by and construed in
              accordance with the laws of India. Any dispute arising under these
              terms and conditions shall be subject to the exclusive
              jurisdiction of the courts of Kerala, India.
            </p>

            <h2>8. Contact Information</h2>
            <p>
              If you have any queries regarding any of our terms, please contact
              us at:
              <br />
              <strong>Email:</strong> sreenandadnamschools@gmail.com
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
