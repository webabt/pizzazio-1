"use client"

import { useEffect, useRef } from "react"

interface PageTransitionProps {
  title: string
  onComplete?: () => void
}

export function PageTransition({ title, onComplete }: PageTransitionProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const initAnimation = () => {
      if (!window.gsap) {
        setTimeout(initAnimation, 100)
        return
      }

      const gsap = window.gsap
      const overlay = overlayRef.current
      const titleElement = titleRef.current

      if (!overlay || !titleElement) return

      // Initial states
      gsap.set(overlay, {
        y: "-100%", // Start from top (hidden)
        zIndex: 1000,
      })

      gsap.set(titleElement, {
        opacity: 1,
        scale: 1,
        zIndex: 1001,
      })

      // Animation timeline - exactly like your example
      const tl = gsap.timeline({
        onComplete: () => {
          if (onComplete) onComplete()
        },
      })

      tl.to(overlay, {
        y: 0,
        duration: 0.7,
        ease: "power2.inOut",
      })
        .to({}, { duration: 0.7 }) // kurze Pause
        .to(overlay, {
          y: "-100%",
          borderBottomLeftRadius: 300,
          borderBottomRightRadius: 300,
          duration: 1.1,
          ease: "power2.inOut",
        })
        .set(overlay, { display: "none" })
    }

    initAnimation()
  }, [onComplete])

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 bg-[#DA3027] flex items-center justify-center"
      style={{
        zIndex: 1000,
        transform: "translateY(-100%)",
      }}
    >
      <div ref={titleRef} className="text-center" style={{ zIndex: 1001 }}>
        <h1 className="text-[15vw] md:text-[12vw] lg:text-[10vw] font-londrina-solid text-[#F7C8DD] leading-none font-bold tracking-wider">
          {title}
        </h1>
      </div>
    </div>
  )
}
