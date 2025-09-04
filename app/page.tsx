"use client"

import dynamic from "next/dynamic"
import { useEffect, useState, useRef } from "react"

// Dynamically import components that use window
const HeroSection = dynamic(() => import("@/components/hero-section").then(mod => ({ default: mod.HeroSection })), { ssr: false })
const PizzaRotation = dynamic(() => import("@/components/pizza-rotation").then(mod => ({ default: mod.PizzaRotation })), { ssr: false })
const HorizontalScrollSection = dynamic(() => import("@/components/horizontal-scroll-section").then(mod => ({ default: mod.HorizontalScrollSection })), { ssr: false })
const ParallaxCards = dynamic(() => import("@/components/cards-parallax").then(mod => ({ default: mod.ParallaxCards })), { ssr: false })
const HorizontalSection = dynamic(() => import("@/components/horizontal-section").then(mod => ({ default: mod.HorizontalSection })), { ssr: false })
const FooterSection = dynamic(() => import("@/components/footer-section").then(mod => ({ default: mod.FooterSection })), { ssr: false })

export default function Home() {
  const [scrollY, setScrollY] = useState(0)
  const [isClient, setIsClient] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)
  const curtainRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    // Check if we're on the client side
    if (typeof window === 'undefined') return

    const handleScroll = () => {
      const scrollTop = window.pageYOffset
      setScrollY(scrollTop)

      // Curtain effect calculation
      const windowHeight = window.innerHeight
      const progress = Math.min(scrollTop / windowHeight, 1)
      const clipPercent = progress * 100

      // Apply clip-path to curtain section
      if (curtainRef.current) {
        curtainRef.current.style.clipPath = `inset(0% 0% ${clipPercent}% 0%)`
      }
    }

    // Add event listener
    window.addEventListener("scroll", handleScroll, { passive: true })

    // Call handler right away to update initial position
    handleScroll()

    // Remove event listener on cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const scrollToMenu = () => {
    if (typeof window === 'undefined') return
    const menuSection = document.getElementById("menu")
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Show loading state during hydration
  if (!isClient) {
    return (
      <div className="flex min-h-screen flex-col">
        <main className="flex-1 bg-[#F9F1E4]">
          <div className="flex items-center justify-center h-screen">
            <div className="text-center">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#5C0606] mx-auto"></div>
              <p className="mt-4 text-[#5C0606] text-lg">Lade Pizzeria...</p>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Hero Section with Curtain Effect */}
        <HeroSection scrollY={scrollY} curtainRef={curtainRef} heroRef={heroRef} scrollToMenu={scrollToMenu} />

        {/* Rest of the content */}
        <div className="relative z-10 bg-[#F9F1E4]">
          {/* Pizza Menu Section */}
          <PizzaRotation />

          {/* Horizontal Scroll Section */}
          <HorizontalScrollSection />

          {/* Cards Parallax Section */}
          <ParallaxCards />

          {/* Horizontaler Abschnitt */}
          <HorizontalSection />
        </div>
      </main>

      {/* Footer */}
      <FooterSection />
    </div>
  )
}
