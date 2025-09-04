"use client"

import { useEffect, useState, useRef } from "react"
import Lenis from "@studio-freight/lenis"

import { HeroSection } from "@/components/hero-section"
import { PizzaRotation } from "@/components/pizza-rotation"
import { HorizontalScrollSection } from "@/components/horizontal-scroll-section"
import { ParallaxCards } from "@/components/cards-parallax"
import { HorizontalSection } from "@/components/horizontal-section"
import { FooterSection } from "@/components/footer-section"

export default function Home() {
  const [scrollY, setScrollY] = useState(0)
  const heroRef = useRef<HTMLDivElement>(null)
  const curtainRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
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

    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis()

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Remove event listener on cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const scrollToMenu = () => {
    const menuSection = document.getElementById("menu")
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: "smooth" })
    }
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
