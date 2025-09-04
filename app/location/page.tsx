"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { FooterSection } from "@/components/footer-section"
import { PageTransition } from "@/components/page-transition"
import Image from "next/image"

export default function LocationPage() {
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
      {!showContent && <PageTransition title="LOCATION" onComplete={handleTransitionComplete} />}

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
                LOCATION
              </h1>
            </div>
          </div>
        </div>

        {/* Main content */}
        <main className="py-20">
          <div className="container px-4 max-w-6xl mx-auto">
            {/* Location Images Section */}
            <div className="mt-20">
              <div className="space-y-32">
                {/* Kreuzberg */}
                <div className="relative">
                  <h3 className="text-4xl md:text-5xl font-londrina-solid mb-8 text-[#DA3027] text-center">
                    KREUZBERG
                  </h3>
                  <div className="relative flex justify-center items-center">
                    {/* Number Button - Desktop */}
                    <div className="hidden lg:flex absolute left-12 -top-6 z-10 w-40 h-32 bg-[#F7C8DD] rounded-full items-center justify-center shadow-lg transform -rotate-[25deg]">
                      <span className="text-[#DA3027] font-londrina-solid text-4xl font-bold transform rotate-[25deg]">
                        #1
                      </span>
                    </div>

                    {/* Image */}
                    <div className="relative w-full max-w-2xl">
                      <Image
                        src="/images/kreuzberg.png"
                        alt="Pizza Zio Kreuzberg Location"
                        width={600}
                        height={450}
                        className="w-full h-auto rounded-[20px] shadow-lg"
                        style={{ minHeight: "300px" }}
                      />

                      {/* Number Button - Mobile/Tablet */}
                      <div
                        className="lg:hidden absolute top-0 left-0 z-10 w-16 h-12 sm:w-20 sm:h-16 bg-[#F7C8DD] flex items-center justify-center shadow-lg"
                        style={{
                          borderTopLeftRadius: "25px",
                          borderTopRightRadius: "100px",
                          borderBottomRightRadius: "100px",
                          borderBottomLeftRadius: "0px",
                        }}
                      >
                        <span className="text-[#DA3027] font-londrina-solid font-bold" style={{ fontSize: "24px" }}>
                          #1
                        </span>
                      </div>
                    </div>

                    {/* Info Button - Desktop */}
                    <div className="hidden lg:flex absolute right-8 -bottom-4 z-10 w-96 h-80 bg-[#F7C8DD] rounded-[110px] flex-col justify-center items-center shadow-lg transform rotate-[8deg] p-8 translate-x-8">
                      <div className="transform -rotate-[8deg] space-y-2 text-center">
                        <div>
                          <h4 className="text-[#DA3027] font-londrina-solid text-xl font-bold mb-0">ADRESSE</h4>
                          <p className="text-[#252019] text-base">Spichern Straße 10780 Berlin</p>
                        </div>
                        <div>
                          <h4 className="text-[#DA3027] font-londrina-solid text-xl font-bold mb-0">OPENING</h4>
                          <p className="text-[#252019] text-base">Montag - Sonntag: 11:00 - 22:00</p>
                          <p className="text-[#252019] text-base">Freitag - Samstag: 11:00 - 23:00</p>
                        </div>
                        <div>
                          <h4 className="text-[#DA3027] font-londrina-solid text-xl font-bold mb-0">PHONE</h4>
                          <p className="text-[#252019] text-base">+49 30 123 456 789</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Info Button - Mobile/Tablet */}
                  <div className="lg:hidden -mt-4 ml-auto mr-4 bg-[#F7C8DD] rounded-[130px] p-8 shadow-lg transform -rotate-[8deg] max-w-[375px] flex items-center justify-center">
                    <div className="transform rotate-[8deg] space-y-2 text-center">
                      <div>
                        <h4 className="text-[#DA3027] font-londrina-solid text-lg font-bold mb-0">ADRESSE</h4>
                        <p className="text-[#252019] text-base">Spichern Straße 10780 Berlin</p>
                      </div>
                      <div>
                        <h4 className="text-[#DA3027] font-londrina-solid text-lg font-bold mb-0">OPENING</h4>
                        <p className="text-[#252019] text-base">Montag - Sonntag: 11:00 - 22:00</p>
                        <p className="text-[#252019] text-base">Freitag - Samstag: 11:00 - 23:00</p>
                      </div>
                      <div>
                        <h4 className="text-[#DA3027] font-londrina-solid text-lg font-bold mb-0">PHONE</h4>
                        <p className="text-[#252019] text-base">+49 30 123 456 789</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Schöneberg */}
                <div className="relative">
                  <h3 className="text-4xl md:text-5xl font-londrina-solid mb-8 text-[#DA3027] text-center">
                    SCHÖNEBERG
                  </h3>
                  <div className="relative flex justify-center items-center">
                    {/* Number Button - Desktop */}
                    <div className="hidden lg:flex absolute left-12 -top-6 z-10 w-40 h-32 bg-[#F7C8DD] rounded-full items-center justify-center shadow-lg transform -rotate-[25deg]">
                      <span className="text-[#DA3027] font-londrina-solid text-4xl font-bold transform rotate-[25deg]">
                        #2
                      </span>
                    </div>

                    {/* Image */}
                    <div className="relative w-full max-w-2xl">
                      <Image
                        src="/images/schoeneberg.png"
                        alt="Pizza Zio Schöneberg Location"
                        width={600}
                        height={450}
                        className="w-full h-auto rounded-[20px] shadow-lg"
                        style={{ minHeight: "300px" }}
                      />

                      {/* Number Button - Mobile/Tablet */}
                      <div
                        className="lg:hidden absolute top-0 left-0 z-10 w-16 h-12 sm:w-20 sm:h-16 bg-[#F7C8DD] flex items-center justify-center shadow-lg"
                        style={{
                          borderTopLeftRadius: "25px",
                          borderTopRightRadius: "100px",
                          borderBottomRightRadius: "100px",
                          borderBottomLeftRadius: "0px",
                        }}
                      >
                        <span className="text-[#DA3027] font-londrina-solid font-bold" style={{ fontSize: "24px" }}>
                          #2
                        </span>
                      </div>
                    </div>

                    {/* Info Button - Desktop */}
                    <div className="hidden lg:flex absolute right-8 -bottom-4 z-10 w-96 h-80 bg-[#F7C8DD] rounded-[110px] flex-col justify-center items-center shadow-lg transform rotate-[8deg] p-8 translate-x-8">
                      <div className="transform -rotate-[8deg] space-y-2 text-center">
                        <div>
                          <h4 className="text-[#DA3027] font-londrina-solid text-xl font-bold mb-0">ADRESSE</h4>
                          <p className="text-[#252019] text-base">Spichern Straße 10780 Berlin</p>
                        </div>
                        <div>
                          <h4 className="text-[#DA3027] font-londrina-solid text-xl font-bold mb-0">OPENING</h4>
                          <p className="text-[#252019] text-base">Montag - Sonntag: 11:00 - 22:00</p>
                          <p className="text-[#252019] text-base">Freitag - Samstag: 11:00 - 23:00</p>
                        </div>
                        <div>
                          <h4 className="text-[#DA3027] font-londrina-solid text-xl font-bold mb-0">PHONE</h4>
                          <p className="text-[#252019] text-base">+49 30 123 456 789</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Info Button - Mobile/Tablet */}
                  <div className="lg:hidden -mt-4 ml-auto mr-4 bg-[#F7C8DD] rounded-[130px] p-8 shadow-lg transform -rotate-[8deg] max-w-[375px] flex items-center justify-center">
                    <div className="transform rotate-[8deg] space-y-2 text-center">
                      <div>
                        <h4 className="text-[#DA3027] font-londrina-solid text-lg font-bold mb-2">ADRESSE</h4>
                        <p className="text-[#252019] text-base">Spichern Straße 10780 Berlin</p>
                      </div>
                      <div>
                        <h4 className="text-[#DA3027] font-londrina-solid text-lg font-bold mb-2">OPENING</h4>
                        <p className="text-[#252019] text-base">Montag - Sonntag: 11:00 - 22:00</p>
                        <p className="text-[#252019] text-base">Freitag - Samstag: 11:00 - 23:00</p>
                      </div>
                      <div>
                        <h4 className="text-[#DA3027] font-londrina-solid text-lg font-bold mb-2">PHONE</h4>
                        <p className="text-[#252019] text-base">+49 30 123 456 789</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Footer */}
      {showContent && <FooterSection />}
    </>
  )
}
