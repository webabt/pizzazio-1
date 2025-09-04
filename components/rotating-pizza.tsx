"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"

interface RotatingPizzaProps {
  name: string
  description: string
  price: string
  image: string
  size: number
  delay: number
}

export function RotatingPizza({ name, description, price, image, size, delay }: RotatingPizzaProps) {
  const pizzaRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Ensure this only runs in the browser
    if (typeof window === "undefined" || !pizzaRef.current) return

    // Wait for GSAP to be available
    const checkGSAP = () => {
      if (window.gsap && window.ScrollTrigger) {
        initAnimation()
      } else {
        setTimeout(checkGSAP, 100)
      }
    }

    const initAnimation = () => {
      const gsap = window.gsap
      const ScrollTrigger = window.ScrollTrigger

      gsap.registerPlugin(ScrollTrigger)

      // Create rotation animation
      gsap.to(pizzaRef.current, {
        rotation: 360,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
          markers: true, // This helps with debugging
          onEnter: () => console.log("Pizza rotation started"),
          onLeave: () => console.log("Pizza rotation ended"),
        },
      })

      console.log("Pizza rotation animation initialized")
    }

    checkGSAP()

    return () => {
      // Cleanup ScrollTrigger when component unmounts
      if (window.ScrollTrigger) {
        window.ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
      }
    }
  }, [])

  return (
    <div ref={containerRef} className="flex flex-col items-center text-center">
      <div
        ref={pizzaRef}
        className="relative mb-4 rounded-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          maxWidth: "100%",
          margin: "0 auto",
        }}
      >
        <Image
          src={`/generic-placeholder-icon.png?height=${size}&width=${size}&query=whole+${image}+pizza+top+view+on+white+background`}
          alt={name}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
          <p className="text-white font-bold text-xl">{price}</p>
        </div>
      </div>
      <h3 className="text-xl font-semibold">{name}</h3>
      <p className="text-gray-600 mt-1 max-w-xs">{description}</p>
    </div>
  )
}

// Add TypeScript declarations for GSAP
declare global {
  interface Window {
    gsap: any
    ScrollTrigger: any
  }
}
