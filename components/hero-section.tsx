"use client"

import type React from "react"
import { useRef, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface HeroSectionProps {
  scrollY: number
  curtainRef: React.RefObject<HTMLDivElement>
  heroRef: React.RefObject<HTMLDivElement>
  scrollToMenu: () => void
}

export function HeroSection({ scrollY, curtainRef, heroRef, scrollToMenu }: HeroSectionProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const introTitleRef = useRef<HTMLDivElement>(null)
  const finalTitleRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const backgroundImageRef = useRef<HTMLDivElement>(null)
  const animationCompleted = useRef(false)

  useEffect(() => {
    // Warten bis GSAP geladen ist
    const initAnimation = () => {
      if (!window.gsap) {
        setTimeout(initAnimation, 100)
        return
      }

      const gsap = window.gsap
      const overlay = overlayRef.current
      const introTitle = introTitleRef.current
      const finalTitle = finalTitleRef.current
      const content = contentRef.current
      const backgroundImage = backgroundImageRef.current

      if (!overlay || !introTitle || !finalTitle || !content || !backgroundImage) return

      // Get the PIZZA and ZIO elements
      const pizzaElement = introTitle.querySelector(".pizza-text")
      const zioElement = introTitle.querySelector(".zio-text")
      const spacerElement = introTitle.querySelector(".text-spacer")

      if (!pizzaElement || !zioElement || !spacerElement) return

      // Initial states setzen (GSAP überschreibt die CSS-Werte)
      gsap.set(overlay, {
        clipPath: "inset(0% 0% 0% 0%)",
        zIndex: 1000,
      })

      // Container sofort sichtbar machen
      gsap.set(introTitle, {
        opacity: 1,
        visibility: "visible",
      })

      // PIZZA startet von links (außerhalb des Bildschirms)
      gsap.set(pizzaElement, {
        x: "-100vw",
        opacity: 1,
      })

      // ZIO startet von rechts (außerhalb des Bildschirms)
      gsap.set(zioElement, {
        x: "100vw",
        opacity: 1,
      })

      // Spacer initial unsichtbar
      gsap.set(spacerElement, {
        width: "0px",
        opacity: 0,
      })

      gsap.set(finalTitle, {
        opacity: 0,
        scale: 0.8,
      })

      gsap.set(content, {
        opacity: 0,
        y: 30,
      })

      // Background image initial state - gezoomt
      gsap.set(backgroundImage, {
        scale: 1.2,
        opacity: 0.7,
      })

      // Timeline für die Eingangsanimation
      const tl = gsap.timeline({
        onComplete: () => {
          animationCompleted.current = true
        },
      })

      // 1. Kurze Pause am Anfang
      tl.to({}, { duration: 0.3 })

        // 2. PIZZA und ZIO bewegen sich gleichzeitig zur Mitte
        .to(pizzaElement, {
          x: 0,
          duration: 1.2,
          ease: "power2.out",
        })
        .to(
          zioElement,
          {
            x: 0,
            duration: 1.2,
            ease: "power2.out",
          },
          "<",
        ) // "<" bedeutet gleichzeitig mit der vorherigen Animation

        // 3. Spacer zwischen den Wörtern einblenden (kleinerer Abstand)
        .to(
          spacerElement,
          {
            width: "1rem", // Kleinerer Abstand (16px)
            opacity: 1,
            duration: 0.3,
            ease: "power2.out",
          },
          "-=0.6",
        )

        // 4. Kurzer Bounce-Effekt wenn sie sich treffen
        .to([pizzaElement, zioElement], {
          scale: 1.1,
          duration: 0.2,
          ease: "power2.out",
        })
        .to([pizzaElement, zioElement], {
          scale: 1,
          duration: 0.3,
          ease: "elastic.out(1, 0.5)",
        })

        // 5. Kurze Pause nach dem Treffen
        .to({}, { duration: 0.5 })

        // 6. Overlay nach oben bewegen
        .to(
          overlay,
          {
            clipPath: "inset(0% 0% 100% 0%)",
            duration: 1.2,
            ease: "power2.inOut",
          },
          "-=0.2",
        )

        // 7. Background image zoom-out und fade-in gleichzeitig mit overlay
        .to(
          backgroundImage,
          {
            scale: 1,
            opacity: 1,
            duration: 1.5,
            ease: "power2.out",
          },
          "-=1.2",
        )

        // 8. Final Titel einblenden
        .to(
          finalTitle,
          {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.6",
        )

        // 9. Content einblenden
        .to(
          content,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.3",
        )

        // 10. Overlay komplett entfernen
        .set(overlay, {
          display: "none",
        })

      console.log("Hero entrance animation with sliding text initialized")
    }

    initAnimation()
  }, [])

  return (
    <>
      {/* Alle CSS Styles in einem einzigen style jsx Tag */}
      <style jsx>{`
        .pizza-text {
          transform: translateX(-100vw);
          opacity: 1;
        }
        .zio-text {
          transform: translateX(100vw);
          opacity: 1;
        }
        .text-spacer {
          width: 0px;
          opacity: 0;
        }
        .responsive-content {
          top: calc(50vh - 166px); /* Default für unter 444px */
        }
        @media (min-width: 444px) {
          .responsive-content {
            top: calc(50vh - 152px);
          }
        }
        @media (min-width: 767px) {
          .responsive-content {
            top: calc(50vh - 170px);
          }
        }
        @media (min-width: 1023px) {
          .responsive-content {
            top: calc(50vh - 194.5px);
          }
        }
      `}</style>

      {/* Entrance Animation Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-[#DA3027] flex items-center justify-center overflow-hidden"
        style={{ zIndex: 1000 }}
      >
        {/* Intro Title - PIZZA von links, ZIO von rechts */}
        <div
          ref={introTitleRef}
          className="text-center flex items-center justify-center"
          style={{
            zIndex: 1001,
            opacity: 0,
            visibility: "hidden",
          }}
        >
          <h1 className="text-[20vw] md:text-[15vw] lg:text-[12vw] font-londrina-solid text-[#F7C8DD] leading-none flex items-center">
            <span className="pizza-text">PIZZA</span>
            <span className="text-spacer inline-block"></span>
            <span className="zio-text">ZIO</span>
          </h1>
        </div>
      </div>

 {/* Section 2 - Sticky Background (behind curtain) */}
 <section
        className="sticky top-0 h-[150vh] md:h-[250vh] relative overflow-hidden"
        style={{ zIndex: 1, backgroundColor: "#DA3027" }}
      >
        {/* Background Images with responsive sizes */}
        <div className="absolute inset-0">
          {/* oben-links - Responsive: 300x450px (Desktop) -> 200x300px (Tablet) -> 150x225px (Mobile) */}
          <div
            className="absolute"
            style={{
              top: "-1%",
              left: "5%",
              transform: `translateY(${scrollY * 0.3}px)`,
            }}
          >
            <div className="relative w-[155px] h-[250px] sm:w-[250px] sm:h-[375px] md:w-[250px] md:h-[375px] lg:w-[300px] lg:h-[450px]">
              <Image src="/images/oben-links.png" alt="Pizza Background 1" fill className="object-cover" />
            </div>
          </div>

          {/* oben-rechts - Responsive: 300x450px (Desktop) -> 180x270px (Tablet) -> 120x180px (Mobile) */}
          <div
            className="absolute"
            style={{
              bottom: window.innerWidth < 768 ? "15%" : "32%",
              right: "3%",
              transform: `translateY(${scrollY * -0.3}px)`,
            }}
          >
            <div className="relative w-[155px] h-[260px] sm:w-[180px] sm:h-[270px] md:w-[250px] md:h-[375px] lg:w-[300px] lg:h-[450px]">
              <Image src="/images/oben-rechts.png" alt="Pizza Background 2" fill className="object-cover" />
            </div>
          </div>

          {/* unten-links */}
          <div
            className="absolute"
            style={{
              top: "-30%",
              left: "8%",
              transform: `translateY(${scrollY * 0.25}px)`,
            }}
          >
            <div className="relative w-[150px] h-[245px] sm:w-[220px] sm:h-[330px] md:w-[280px] md:h-[420px] lg:w-[320px] lg:h-[480px]">
              <Image src="/images/unten-links.png" alt="Pizza Background 4" fill className="object-cover" />
            </div>
          </div>

          {/* unten-rechts */}
          <div
            className="absolute"
            style={{
              top: window.innerWidth < 768 ? "25%" : "14%",
              right: "5%",
              transform: `translateY(${scrollY * -0.35}px)`,
            }}
          >
            <div className="relative w-[150px] h-[210px] sm:w-[200px] sm:h-[300px] md:w-[260px] md:h-[390px] lg:w-[300px] lg:h-[450px]">
              <Image src="/images/unten-rechts.png" alt="Pizza Background 5" fill className="object-cover" />
            </div>
          </div>
        </div>


        {/* Content - Fixed position from top to match first section */}
        <div className="absolute top-0 left-0 right-0">
          <div className="container px-4 relative z-10 responsive-content absolute">
            <div className="text-center">
              <h1
                ref={finalTitleRef}
                className="text-5xl md:text-6xl lg:text-7xl font-londrina-solid tracking-tight mb-4 text-center"
                style={{ color: "#F7C8DD" }}
              >
                <span className="block">ES GIBT NUR EINE</span>
                <span className="block">UND DAS IST</span>
                <span className="block text-6xl md:text-7xl lg:text-8xl" style={{ color: "#F7C8DD" }}>
                  ZIO
                </span>
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Section 1 - Fixed Curtain (covers section 2 initially) */}
      <section
        ref={curtainRef}
        className="fixed top-0 left-0 w-full h-screen overflow-hidden"
        style={{
          zIndex: 2,
          clipPath: "inset(0% 0% 0% 0%)",
          backgroundColor: "#F9F1E4",
        }}
      >
        <div ref={heroRef} className="relative overflow-hidden h-screen">
          {/* Background Image */}
          <div ref={backgroundImageRef} className="absolute inset-0 z-0">
            <Image
              src="/images/hero-hintergrund.png"
              alt="Pizza Chef Background"
              fill
              className="object-cover"
              priority
            />
            {/* Overlay für bessere Textlesbarkeit */}
            <div className="absolute inset-0 bg-black/20"></div>
          </div>

          {/* Content container */}
          <div className="relative h-full flex flex-col z-10">
            {/* Hero content */}
            <div className="flex-1 flex items-center justify-center">
              <div className="container px-4 relative">
                <div className="grid grid-cols-1 gap-8 items-center">
                  {/* Text content */}
                  <div ref={contentRef} className="text-center">
                    <h1
                      className="text-5xl md:text-6xl lg:text-7xl font-londrina-solid tracking-tight mb-4 text-center drop-shadow-lg"
                      style={{ color: "#F9F1E4", textShadow: "2px 2px 4px rgba(0,0,0,0.5)" }}
                    >
                      <span className="block">ES GIBT NUR EINE</span>
                      <span className="block">UND DAS IST</span>
                      <span
                        className="block text-red-600 text-6xl md:text-7xl lg:text-8xl drop-shadow-lg"
                        style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.5)" }}
                      >
                        ZIO
                      </span>
                    </h1>
                    <p
                      className="mt-4 text-xl max-w-md text-center mx-auto drop-shadow-lg"
                      style={{
                        color: "#FAF1E4",
                        textShadow: "1px 1px 2px rgba(0,0,0,0.7)",
                      }}
                    >
                      Handcrafted with love using traditional recipes and the freshest ingredients from Italy
                    </p>
                    <div className="mt-8 flex flex-wrap gap-4 justify-center">
                      <Link href="/menu">
                        <Button
                          size="lg"
                          className="bg-[#DA3027] hover:bg-[#F7C8DD] text-[#F7C8DD] hover:text-[#DA3027] rounded-[40px] transition-all duration-300 hover:scale-110 hover:shadow-lg transform font-londrina-solid font-bold"
                        >
                          Order Now
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-0 right-0 flex justify-center animate-bounce">
              <button
                onClick={scrollToMenu}
                className="text-white hover:text-red-600 transition-colors focus:outline-none drop-shadow-lg"
                aria-label="Scroll down"
                style={{ filter: "drop-shadow(1px 1px 2px rgba(0,0,0,0.7))" }}
              ></button>
            </div>
          </div>
        </div>
      </section>

      {/* Spacer to allow scrolling */}
      <div className="h-screen"></div>
    </>
  )
}
