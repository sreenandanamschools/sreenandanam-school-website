"use client";

import { useEffect, useState, useRef } from "react";
import { Quote, User } from "lucide-react";
import { cn } from "@/lib/utils";

export function HeadTeacherMessage() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-4 flex flex-col gap-16">
        {/* Leadership Row - MD and Principal */}
        <div className="grid lg:grid-cols-2 gap-10">
          {/* Managing Director */}
          <div className="flex flex-col h-full">
            <div className="text-center mb-8 min-h-[4rem] md:min-h-[5rem] lg:min-h-[6rem] flex items-end justify-center pb-2">
              <h2
                className={cn(
                  "font-serif text-3xl md:text-4xl font-bold text-foreground transition-all duration-700",
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4",
                )}
              >
                Message from the Managing Director
              </h2>
            </div>
            <div
              className={cn(
                "bg-card rounded-2xl p-8 xl:p-10 border border-border relative flex-1 transition-all duration-700 delay-100",
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4",
              )}
            >
              <div className="absolute -top-6 left-8 w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-lg">
                <Quote className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="flex flex-col xl:flex-row gap-8 items-start mt-2">
                <div className="shrink-0 text-center xl:text-left w-full xl:w-40">
                  <img
                    src="/images/md.jpeg"
                    alt="Managing Director"
                    className="w-32 h-32 object-cover bg-muted rounded-2xl flex items-center justify-center mx-auto xl:mx-0 mb-4 shadow-md"
                  />
                  <h3 className="font-serif text-xl font-semibold text-foreground">
                    SAJITH M
                  </h3>
                  <p className="text-sm text-muted-foreground">M.A L.L.B</p>
                  <p className="text-primary font-medium mt-1">
                    Managing Director
                  </p>
                </div>
                <div className="flex-1">
                  <blockquote className="text-muted-foreground leading-relaxed space-y-4 text-sm md:text-base">
                    <p>Dear Parents and Students,</p>
                    <p>
                      Welcome to Sreenandanam Schools. We believe that education
                      goes beyond simply acquiring knowledge—it is the vital
                      foundation for building strong character, true confidence,
                      creativity, and deep compassion.
                    </p>
                    <p>
                      Our mission is to nurture young minds in a safe and
                      inspiring environment, combining modern learning methods
                      with essential moral values. Together with our dedicated
                      teachers, we help every child discover their true
                      potential and shape responsible future citizens.
                    </p>
                    <p>Thank you for being part of our family.</p>
                    <p className="font-medium text-foreground">
                      With warm regards,
                      <br />
                      SAJITH M
                    </p>
                  </blockquote>
                </div>
              </div>
            </div>
          </div>

          {/* Principal */}
          <div className="flex flex-col h-full">
            <div className="text-center mb-8 min-h-[4rem] md:min-h-[5rem] lg:min-h-[6rem] flex items-end justify-center pb-2">
              <h2
                className={cn(
                  "font-serif text-3xl md:text-4xl font-bold text-foreground transition-all duration-700",
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4",
                )}
              >
                Message from the Principal
              </h2>
            </div>
            <div
              className={cn(
                "bg-card rounded-2xl p-8 xl:p-10 border border-border relative flex-1 transition-all duration-700 delay-200",
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4",
              )}
            >
              <div className="absolute -top-6 left-8 w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-lg">
                <Quote className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="flex flex-col xl:flex-row gap-8 items-start mt-2">
                <div className="shrink-0 text-center xl:text-left w-full xl:w-40">
                  <img
                    src="/images/principal.jpeg"
                    alt="Principal"
                    className="w-32 h-32 object-cover bg-muted rounded-2xl flex items-center justify-center mx-auto xl:mx-0 mb-4 shadow-md"
                  />
                  <h3 className="font-serif text-xl font-semibold text-foreground">
                    SWAPNA RAJ R
                  </h3>
                  <p className="text-sm text-muted-foreground">B.A B.Ed</p>
                  <p className="text-primary font-medium mt-1">Principal</p>
                </div>
                <div className="flex-1">
                  <blockquote className="text-muted-foreground leading-relaxed space-y-4 text-sm md:text-base">
                    <p>Dear Parents and Students,</p>
                    <p>
                      Welcome to Sreenandanam Schools. We believe that every
                      child is wonderfully unique—each possessing limitless
                      potential and the profound ability to make a positive,
                      lasting impact on the world.
                    </p>
                    <p>
                      Our goal is to ignite that spark in a vibrant and
                      stimulating environment, seamlessly blending modern
                      teaching with traditional values. Together with your vital
                      support, we ensure holistic development and shape
                      compassionate global citizens ready for tomorrow's
                      challenges.
                    </p>
                    <p>Thank you for your continued partnership.</p>
                    <p className="font-medium text-foreground">
                      With warm regards,
                      <br />
                      SWAPNA RAJ R
                    </p>
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Head Teachers Section */}
        <div className="mt-12">
          <div className="text-center mb-10">
            <h2
              className={cn(
                "font-serif text-3xl md:text-4xl font-bold text-foreground transition-all duration-700",
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4",
              )}
            >
              Our Head Teachers
            </h2>
          </div>

          <div className="grid md:grid-cols-2 max-w-4xl mx-auto gap-8">
            {/* Head Teacher 1 */}
            <div
              className={cn(
                "bg-card rounded-2xl p-8 border border-border flex flex-col items-center text-center transition-all duration-700 delay-300 hover:shadow-lg hover:border-primary/30",
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4",
              )}
            >
              <div className="w-32 h-32 bg-muted rounded-full overflow-hidden flex items-center justify-center mb-6 shadow-md border-4 border-background">
                <User className="w-12 h-12 text-muted-foreground/30" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-foreground mb-1">
                BINU PRABHA.P.T
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                Upper Primary
              </p>
              <div className="px-4 py-1.5 bg-primary/10 rounded-full">
                <p className="text-primary font-medium text-sm">Head Teacher</p>
              </div>
            </div>

            {/* Head Teacher 2 */}
            <div
              className={cn(
                "bg-card rounded-2xl p-8 border border-border flex flex-col items-center text-center transition-all duration-700 delay-400 hover:shadow-lg hover:border-primary/30",
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4",
              )}
            >
              <div className="w-32 h-32 bg-muted rounded-full overflow-hidden flex items-center justify-center mb-6 shadow-md border-4 border-background">
                <User className="w-12 h-12 text-muted-foreground/30" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-foreground mb-1">
                SUJITHA JIGIN
              </h3>
              <p className="text-sm text-muted-foreground mb-3">Kindergarten</p>
              <div className="px-4 py-1.5 bg-primary/10 rounded-full">
                <p className="text-primary font-medium text-sm">Head Teacher</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
