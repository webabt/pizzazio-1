"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { FooterSection } from "@/components/footer-section"
import { PageTransition } from "@/components/page-transition"

export default function KontaktPage() {
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleTransitionComplete = () => {
    setShowContent(true)
  }

  return (
    <>
      {/* Page Transition */}
      {!showContent && <PageTransition title="KONTAKT" onComplete={handleTransitionComplete} />}

      {/* Main Content */}
      <div
        className={`min-h-screen bg-[#F9F1E4] transition-opacity duration-300 ${
          showContent ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Curved Header Section */}
        <div className="relative">
          {/* Pink curved background */}
          <div
            className="h-[300px] bg-[#F7C8DD] relative overflow-hidden"
            style={{
              clipPath: "ellipse(100% 100% at 50% 0%)",
            }}
          >
            {/* PIZZA ZIO text in top left */}
            <div className="absolute top-6 left-6 z-50">
              <Link
                href="/"
                className="text-[#DA3027] font-londrina-solid text-xl font-bold cursor-pointer block"
                style={{ pointerEvents: "auto" }}
              >
                PIZZA ZIO
              </Link>
            </div>

            {/* Main heading */}
            <div className="absolute inset-0 flex items-center justify-center pt-8">
              <h1 className="text-[#DA3027] font-londrina-solid text-6xl md:text-7xl lg:text-8xl font-bold tracking-wider">
                KONTAKT
              </h1>
            </div>
          </div>
        </div>

        {/* Main content */}
        <main className="py-32">
          <div className="container px-4 max-w-6xl mx-auto text-center mt-32">
            {/* GET IN TOUCH WITH US Text */}
            <h2
              className="font-londrina-solid font-bold text-[#DA3027] mb-16"
              style={{
                fontSize: "clamp(28px, 5vw, 45px)",
              }}
            >
              GET IN TOUCH WITH US
            </h2>

            {/* Button Shape with Email on top */}
            <div className="flex justify-center relative mt-32">
              {/* Button Shape */}
              <div
                className="bg-[#F7C8DD] transform rotate-[-7.5deg] shadow-lg"
                style={{
                  width: "min(680px, 90vw)",
                  height: "min(260px, 35vw)",
                  borderRadius: "min(180px, 22.5vw)",
                }}
              ></div>

              {/* Email on top of the shape - stays straight */}
              <div className="absolute inset-0 flex items-center justify-center mt-16">
                <a
                  href="mailto:pizzazio@gmail.com"
                  className="font-londrina-solid font-bold leading-none transition-transform duration-300 hover:scale-105 cursor-pointer"
                  style={{
                    color: "#FFF6EA",
                    letterSpacing: "0.04em",
                    textShadow: `
                      -2px -2px 0 #DA3027,
                      2px -2px 0 #DA3027,
                      -2px 2px 0 #DA3027,
                      2px 2px 0 #DA3027,
                      -3px 0 0 #DA3027,
                      3px 0 0 #DA3027,
                      0 -3px 0 #DA3027,
                      0 3px 0 #DA3027
                    `,
                    fontSize: "clamp(24px, 8vw, 90px)",
                  }}
                >
                  PIZZAZIO@GMAIL.COM
                </a>
              </div>
            </div>

            {/* Extra spacing to make page longer */}
            <div className="mt-32 mb-32"></div>
          </div>
        </main>
      </div>

      {/* Footer */}
      {showContent && <FooterSection />}
    </>
  )
}
