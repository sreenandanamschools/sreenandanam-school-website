"use client";

import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";

export function MentalHealthSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content Side */}
          <div>
            <p
              className={cn(
                "text-primary font-medium mb-2 transition-all duration-700",
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4",
              )}
            >
              Student Wellbeing
            </p>
            <h2
              className={cn(
                "font-serif text-3xl md:text-4xl font-bold text-foreground mb-6 transition-all duration-700 delay-100",
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4",
              )}
            >
              Mental Health &amp; Counselling
            </h2>
            <div
              className={cn(
                "space-y-4 text-muted-foreground leading-relaxed transition-all duration-700 delay-200",
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4",
              )}
            >
              <p>
                At Sree Nandanam Public School, we believe that a child&apos;s
                mental health is just as important as their academic success. We
                have partnered with a professional child psychologist to provide
                dedicated mental health support for our students, ensuring they
                grow into emotionally resilient and well-rounded individuals.
              </p>
              <p>
                Our consulting psychologist conducts regular sessions focused on
                building emotional intelligence, self-awareness, and healthy
                coping mechanisms. Through one-on-one and group counselling,
                students learn to navigate challenges, build resilience, and
                maintain emotional balance — all within a safe, stigma-free
                environment where they feel comfortable expressing their
                feelings and seeking support.
              </p>
              <p>
                In addition to student sessions, we organise workshops for
                teachers and parents on stress management, mindfulness, and
                fostering positive relationships. This holistic approach ensures
                that every child is supported not just within the classroom, but
                across their entire learning ecosystem — nurturing cognitive
                development, emotional wellbeing, and positive growth at every
                stage.
              </p>
            </div>
          </div>

          {/* Doctor Profiles Grid */}
          <div
            className={cn(
              "transition-all duration-700 delay-300",
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-8",
            )}
          >
            <div className="grid grid-cols-2 gap-4">
              {/* Doctor 1 */}
              <div className="bg-card rounded-xl border border-border overflow-hidden shadow-md">
                <div className="aspect-square bg-muted relative overflow-hidden">
                  <img
                    src="https://scontent.ftrv3-1.fna.fbcdn.net/v/t39.30808-6/310930077_480203270789521_15624560554593539_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=WWTNJWRwbsIQ7kNvwEkzYko&_nc_oc=AdpQ6tvW9P1BUD6aSV4j41LAghNlSfRWO1M6snn4jHO3WkfHD-blPDgq_OCr3u8K1HQ&_nc_zt=23&_nc_ht=scontent.ftrv3-1.fna&_nc_gid=ZnP_Rkl0hnArsWLnGcbGAg&_nc_ss=7b289&oh=00_Af9v-Zyupc85CmjbQyrGljYIL_Zn0m48K1pcr2PiyzT4eA&oe=6A232D28"
                    alt="Dr. Vanidevi P T"
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />
                </div>
                <div className="p-3">
                  <h3 className="font-serif text-sm font-bold text-foreground leading-tight">
                    Dr. Vanidevi P T
                  </h3>
                  <p className="text-xs text-primary font-medium mb-2">
                    Clinical &amp; Child Psychologist
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Director,{" "}
                    <span className="text-foreground font-medium">
                      Enlight Centre for Holistic Development
                    </span>
                    . Counsellor at Southern Air Command &amp; SP Fort Hospital.
                    M.Phil in Learning Disabilities &amp; M.A. in Applied
                    Psychology, University of Kerala.
                  </p>
                  <div className="mt-2 pt-2 border-t border-border flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                    <span className="text-xs text-muted-foreground">
                      Regular school sessions
                    </span>
                  </div>
                </div>
              </div>

              {/* Doctor 2 — update with real details */}
              <div className="bg-card rounded-xl border border-border overflow-hidden shadow-md">
                <div className="aspect-square bg-muted relative overflow-hidden">
                  <img
                    src="https://scontent.ftrv3-1.fna.fbcdn.net/v/t39.30808-1/705276992_3239844396404443_6051730992708745274_n.jpg?stp=dst-jpg_s480x480_tt6&_nc_cat=108&ccb=1-7&_nc_sid=1d2534&_nc_ohc=GNMoD1YsGREQ7kNvwFUXQJ7&_nc_oc=AdrriDnu_skNobUUmzgr4VnVgnLqici4m2yiVqUz1CYXHVY9zRu2vt2QXhN-LkHoZmc&_nc_zt=24&_nc_ht=scontent.ftrv3-1.fna&_nc_gid=cxuSl6e4X3G7uPWh028UGw&_nc_ss=7b289&oh=00_Af9d9ERF8zhe0vH9XtuzhRc9C_0kPh1jjQRDzxFrsf7hrA&oe=6A231851"
                    alt="Siddeek Abdul Khader"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="p-3">
                  <h3 className="font-serif text-sm font-bold text-foreground leading-tight">
                    Siddeek Abdul Khader
                  </h3>
                  <p className="text-xs text-primary font-medium mb-2">
                    Psychological &amp; Family Counsellor
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Clinical hypnotherapist &amp; motivational speaker,
                    Navaikulam, Kerala. Specialises in special needs training
                    for children with learning disabilities. Affiliated with{" "}
                    <span className="text-foreground font-medium">
                      DME Kerala, University of Calicut &amp; KUHS
                    </span>
                    .
                  </p>
                  <div className="mt-2 pt-2 border-t border-border flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                    <span className="text-xs text-muted-foreground">
                      Regular school sessions
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
