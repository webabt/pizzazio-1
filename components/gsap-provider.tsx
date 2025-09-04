"use client"

import type React from "react"

import { useState } from "react"
import Script from "next/script"

export function GSAPProvider({ children }: { children: React.ReactNode }) {
  const [gsapLoaded, setGsapLoaded] = useState(false)
  const [scrollTriggerLoaded, setScrollTriggerLoaded] = useState(false)

  return (
    <>
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"
        strategy="beforeInteractive"
        onLoad={() => {
          console.log("GSAP loaded successfully")
          setGsapLoaded(true)
        }}
        onError={() => {
          console.error("Failed to load GSAP")
        }}
      />
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"
        strategy="beforeInteractive"
        onLoad={() => {
          console.log("ScrollTrigger loaded successfully")
          setScrollTriggerLoaded(true)
          if (typeof window !== 'undefined' && window.gsap && window.ScrollTrigger) {
            window.gsap.registerPlugin(window.ScrollTrigger)
            console.log("ScrollTrigger registered with GSAP")
          }
        }}
        onError={() => {
          console.error("Failed to load ScrollTrigger")
        }}
      />
      {children}
    </>
  )
}
