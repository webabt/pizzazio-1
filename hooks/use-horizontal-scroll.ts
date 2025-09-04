"use client"

import { useEffect, useState, type RefObject } from "react"

// Typen für die Dimensionen
export interface Dimensions {
  boxWidth: number
  boxHeight: number
  imageWidth: number
  imageHeight: number
  spacing: number
  fontSize: number
  textSize: number
  textWidth: number
  textFontSize: number
  lifestyleFontSize: number
  infoTitleSize: number
  infoTextSize: number
}

// Typen für die Sticker-Konfiguration
export interface StickerConfig {
  main: {
    src: string
    alt: string
    size: number
    position: { top?: string; left?: string; right?: string; bottom?: string }
    parallaxSpeed: number
    rotationMultiplier: number
  }
  additional: {
    src: string
    alt: string
    size: number
    position: { top?: string; left?: string; right?: string; bottom?: string }
    parallaxSpeed: number
    rotationMultiplier: number
  }
}

// Hook für die Berechnung der responsiven Dimensionen
export function useResponsiveDimensions(): Dimensions {
  const [dimensions, setDimensions] = useState<Dimensions>({
    boxWidth: 320,
    boxHeight: 450,
    imageWidth: 300,
    imageHeight: 350,
    spacing: 150,
    fontSize: 35,
    textSize: 16,
    textWidth: 500,
    textFontSize: 28,
    lifestyleFontSize: 120,
    infoTitleSize: 65,
    infoTextSize: 16,
  })

  // Calculate responsive dimensions
  const calculateDimensions = () => {
    if (typeof window === "undefined") return

    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight

    let newDimensions: Dimensions

    if (viewportWidth < 640) {
      // Mobile
      newDimensions = {
        boxWidth: Math.min(250, viewportWidth * 0.8),
        boxHeight: Math.min(380, viewportHeight * 0.6),
        imageWidth: Math.min(230, viewportWidth * 0.75),
        imageHeight: Math.min(280, viewportHeight * 0.45),
        spacing: 40,
        fontSize: 24,
        textSize: 12,
        textWidth: 350, // Geändert von 280
        textFontSize: 18,
        lifestyleFontSize: 60,
        infoTitleSize: 40,
        infoTextSize: 12,
      }
    } else if (viewportWidth < 768) {
      // Small tablets
      newDimensions = {
        boxWidth: 280,
        boxHeight: 400,
        imageWidth: 260,
        imageHeight: 300,
        spacing: 50,
        fontSize: 28,
        textSize: 13,
        textWidth: 600, // Geändert von 320
        textFontSize: 20,
        lifestyleFontSize: 70,
        infoTitleSize: 45,
        infoTextSize: 13,
      }
    } else if (viewportWidth < 1024) {
      // Tablets
      newDimensions = {
        boxWidth: 300,
        boxHeight: 420,
        imageWidth: 280,
        imageHeight: 320,
        spacing: 60,
        fontSize: 30,
        textSize: 14,
        textWidth: 700, // Geändert von 380
        textFontSize: 22,
        lifestyleFontSize: 80,
        infoTitleSize: 50,
        infoTextSize: 14,
      }
    } else if (viewportWidth < 1280) {
      // Small desktops
      newDimensions = {
        boxWidth: 310,
        boxHeight: 430,
        imageWidth: 290,
        imageHeight: 330,
        spacing: 70,
        fontSize: 32,
        textSize: 15,
        textWidth: 940, // Geändert von 420
        textFontSize: 24,
        lifestyleFontSize: 90,
        infoTitleSize: 55,
        infoTextSize: 15,
      }
    } else if (viewportWidth < 1440) {
      // Medium desktops
      newDimensions = {
        boxWidth: 315,
        boxHeight: 440,
        imageWidth: 295,
        imageHeight: 340,
        spacing: 80,
        fontSize: 34,
        textSize: 16,
        textWidth: 1000, // Geändert von 460
        textFontSize: 26,
        lifestyleFontSize: 100,
        infoTitleSize: 60,
        infoTextSize: 16,
      }
    } else {
      // Large desktops
      newDimensions = {
        boxWidth: 320,
        boxHeight: 450,
        imageWidth: 300,
        imageHeight: 350,
        spacing: 90,
        fontSize: 35,
        textSize: 16,
        textWidth: 1100, // Geändert von 500
        textFontSize: 28,
        lifestyleFontSize: 120,
        infoTitleSize: 65,
        infoTextSize: 16,
      }
    }

    setDimensions(newDimensions)
  }

  // Update dimensions on mount and resize
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    calculateDimensions()

    const handleResize = () => {
      calculateDimensions()
      // Refresh ScrollTrigger after resize
      if (window.ScrollTrigger) {
        setTimeout(() => {
          window.ScrollTrigger.refresh()
        }, 100)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return dimensions
}

// Hook für das Laden von GSAP und Lenis
export function useScrollLibraries() {
  const [gsapLoaded, setGsapLoaded] = useState(false)
  const [lenisLoaded, setLenisLoaded] = useState(false)

  // Load Lenis for smooth scrolling
  useEffect(() => {
    const loadLenis = async () => {
      try {
        if (typeof window !== "undefined") {
          // Load Lenis from CDN
          if (!window.Lenis) {
            const lenisScript = document.createElement("script")
            lenisScript.src = "https://cdn.jsdelivr.net/npm/@studio-freight/lenis@1.0.42/dist/lenis.min.js"
            lenisScript.async = true
            document.head.appendChild(lenisScript)

            await new Promise((resolve) => {
              lenisScript.onload = resolve
            })
          }

          setLenisLoaded(true)
        }
      } catch (error) {
        console.error("Failed to load Lenis:", error)
      }
    }

    loadLenis()
  }, [])

  // Load GSAP dynamically
  useEffect(() => {
    const loadGSAP = async () => {
      try {
        if (typeof window !== "undefined") {
          // Load GSAP from CDN
          if (!window.gsap) {
            const gsapScript = document.createElement("script")
            gsapScript.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"
            gsapScript.async = true
            document.head.appendChild(gsapScript)

            await new Promise((resolve) => {
              gsapScript.onload = resolve
            })
          }

          // Load ScrollTrigger
          if (!window.ScrollTrigger) {
            const scrollTriggerScript = document.createElement("script")
            scrollTriggerScript.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"
            scrollTriggerScript.async = true
            document.head.appendChild(scrollTriggerScript)

            await new Promise((resolve) => {
              scrollTriggerScript.onload = resolve
            })
          }

          setGsapLoaded(true)
        }
      } catch (error) {
        console.error("Failed to load GSAP:", error)
      }
    }

    loadGSAP()
  }, [])

  // Initialize Lenis smooth scrolling
  useEffect(() => {
    let lenis: any

    const initLenis = () => {
      if (!window.Lenis) {
        console.log("Lenis still not available")
        return
      }

      // Initialize Lenis with optimized settings for horizontal scroll
      lenis = new window.Lenis({
        duration: 1.2, // Smooth scroll duration
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing
        direction: "vertical", // Vertical scrolling
        gestureDirection: "vertical",
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false, // Disable on touch devices for better performance
        touchMultiplier: 2,
        infinite: false,
      })

      // Animation frame loop
      function raf(time: number) {
        lenis.raf(time)
        requestAnimationFrame(raf)
      }

      requestAnimationFrame(raf)

      console.log("Lenis smooth scrolling initialized")
    }

    // Initialize with delay to ensure DOM is ready
    const timer = setTimeout(initLenis, 100)

    return () => {
      clearTimeout(timer)
      if (lenis) {
        lenis.destroy()
      }
    }
  }, [lenisLoaded])

  return { gsapLoaded, lenisLoaded }
}

// Hook für die horizontale Scroll-Animation
export function useHorizontalScroll(
  gsapLoaded: boolean,
  dimensions: Dimensions,
  sectionRef: RefObject<HTMLDivElement>,
  containerRef: RefObject<HTMLDivElement>,
  imageRefs: RefObject<(HTMLDivElement | null)[]>,
  stickerRefs: RefObject<(HTMLDivElement | null)[]>,
  additionalStickerRefs: RefObject<(HTMLDivElement | null)[]>,
  lifestyleImageRef: RefObject<HTMLDivElement>,
  stickerConfigurations: StickerConfig[],
) {
  useEffect(() => {
    if (!gsapLoaded) return

    let ctx: any
    let animationFrameId: number
    let lastProgress = -1
    let resizeTimeout: NodeJS.Timeout

    const initScrollTrigger = () => {
      if (!window.gsap || !window.ScrollTrigger) {
        console.log("GSAP still not available")
        return
      }

      const gsap = window.gsap
      const ScrollTrigger = window.ScrollTrigger

      gsap.registerPlugin(ScrollTrigger)

      const section = sectionRef.current
      const container = containerRef.current
      const lifestyleImage = lifestyleImageRef.current

      if (!section || !container) {
        console.log("Refs not available")
        return
      }

      // Clear any existing ScrollTriggers on this element
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === section) {
          trigger.kill()
        }
      })

      // Reset container transform before calculating new dimensions
      gsap.set(container, { x: 0 })

      // Force a layout recalculation
      container.offsetHeight

      ctx = gsap.context(() => {
        // Get container width after reset
        const containerWidth = container.scrollWidth
        const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1920
        const scrollDistance = containerWidth - viewportWidth

        console.log("Container width:", containerWidth)
        console.log("Viewport width:", viewportWidth)
        console.log("Scroll distance:", scrollDistance)

        if (scrollDistance <= 0) {
          console.log("No horizontal scroll needed")
          return
        }

        // Optimized function to update lifestyle image mask
        const updateLifestyleMask = (progress: number) => {
          if (!lifestyleImage) return

          const maskElement = lifestyleImage.querySelector(".lifestyle-mask") as HTMLElement
          if (!maskElement) return

          // Calculate when the lifestyle image becomes visible (last 15% of scroll instead of 10%)
          const lifestyleStartProgress = 0.85
          const lifestyleProgress = Math.max(0, (progress - lifestyleStartProgress) / (1 - lifestyleStartProgress))

          if (lifestyleProgress <= 0) {
            // Hide completely when not in range
            maskElement.style.clipPath = `inset(50% 50% 50% 50% round 50px)`
            return
          }

          // Use GSAP's easing for smoother animation
          const easedProgress = gsap.utils.interpolate(0, 1, lifestyleProgress)
          // Slower start easing - cubic ease-in-out with delayed start
          const smoothProgress =
            easedProgress < 0.3
              ? (easedProgress / 0.3) * (easedProgress / 0.3) * 0.1
              : 0.1 + ((easedProgress - 0.3) / 0.7) * 0.9

          // Simplified calculations
          const initialSize = Math.max(150, dimensions.lifestyleFontSize * 2)
          const finalWidth = typeof window !== 'undefined' ? window.innerWidth : 1920
          const finalHeight = typeof window !== 'undefined' ? window.innerHeight : 1080

          // Interpolate mask size with optimized calculations
          const maskWidth = gsap.utils.interpolate(initialSize, finalWidth, smoothProgress)
          const maskHeight = gsap.utils.interpolate(initialSize, finalHeight, smoothProgress)

          // Simplified border radius calculation
          const borderRadius = gsap.utils.interpolate(initialSize / 2, 0, smoothProgress)

          // Calculate inset values
          const insetTop = (100 - (maskHeight / finalHeight) * 100) / 2
          const insetRight = (100 - (maskWidth / finalWidth) * 100) / 2

          // Apply mask with requestAnimationFrame for smoother updates
          requestAnimationFrame(() => {
            maskElement.style.clipPath = `inset(${insetTop}% ${insetRight}% ${insetTop}% ${insetRight}% round ${borderRadius}px)`

            // Optimized scale effect
            const image = maskElement.querySelector("img")
            if (image) {
              const scale = gsap.utils.interpolate(1.15, 1.0, smoothProgress)
              image.style.transform = `scale(${scale})`
            }
          })
        }

        // Optimized function to update image colors and sticker parallax
        const updateImageColors = (progress: number) => {
          // Throttle updates to improve performance
          if (Math.abs(progress - lastProgress) < 0.001) return
          lastProgress = progress

          const viewportCenter = viewportWidth / 2
          const currentX = -progress * scrollDistance

          // Update image colors with optimized calculations
          if (imageRefs.current) {
            imageRefs.current.forEach((imageRef, index) => {
              if (!imageRef) return

              const imageRect = imageRef.getBoundingClientRect()
              const imageCenter = imageRect.left + imageRect.width / 2
              const distanceFromCenter = Math.abs(imageCenter - viewportCenter)
              const maxDistance = viewportWidth / 2 + imageRect.width / 2

              let colorIntensity = Math.max(0, Math.min(1, 1 - distanceFromCenter / maxDistance))

              if (colorIntensity < 0.2) {
                colorIntensity = 0
              } else {
                colorIntensity = (colorIntensity - 0.2) / 0.8
                colorIntensity = colorIntensity * colorIntensity * (3 - 2 * colorIntensity)
              }

              const image = imageRef.querySelector("img")
              if (image) {
                const grayscaleValue = (1 - colorIntensity) * 100
                const brightnessValue = 0.7 + colorIntensity * 0.3
                const contrastValue = 85 + colorIntensity * 15

                requestAnimationFrame(() => {
                  image.style.filter = `grayscale(${grayscaleValue}%) brightness(${brightnessValue}) contrast(${contrastValue}%)`
                })
              }
            })
          }

          // Optimized parallax effects for stickers
          if (stickerRefs.current) {
            stickerRefs.current.forEach((stickerRef, index) => {
              if (!stickerRef || !stickerConfigurations[index]) return

              const config = stickerConfigurations[index].main
              const parallaxOffset = progress * scrollDistance * config.parallaxSpeed
              const rotation = progress * 720 * (config.parallaxSpeed * config.rotationMultiplier)

              requestAnimationFrame(() => {
                stickerRef.style.transform = `translateX(${parallaxOffset}px) rotate(${rotation}deg)`
              })
            })
          }

          if (additionalStickerRefs.current) {
            additionalStickerRefs.current.forEach((stickerRef, index) => {
              if (!stickerRef || !stickerConfigurations[index]) return

              const config = stickerConfigurations[index].additional
              const parallaxOffset = progress * scrollDistance * config.parallaxSpeed
              const rotation = progress * 540 * (config.parallaxSpeed * config.rotationMultiplier)

              requestAnimationFrame(() => {
                stickerRef.style.transform = `translateX(${parallaxOffset}px) rotate(${rotation}deg)`
              })
            })
          }
        }

        // Create horizontal scroll animation with optimized settings
        const horizontalTween = gsap.to(container, {
          x: -scrollDistance,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${scrollDistance}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            refreshPriority: -1,
            onUpdate: (self) => {
              // Cancel previous animation frame
              if (animationFrameId) {
                cancelAnimationFrame(animationFrameId)
              }

              // Schedule updates with requestAnimationFrame for smoother performance
              animationFrameId = requestAnimationFrame(() => {
                updateImageColors(self.progress)
                updateLifestyleMask(self.progress)
              })
            },
          },
        })

        console.log("Horizontal scroll animation created successfully")
      }, section)
    }

    // Handle resize with debouncing
    const handleResize = () => {
      console.log("Resize detected, reinitializing horizontal scroll")

      // Clear existing timeout
      if (resizeTimeout) {
        clearTimeout(resizeTimeout)
      }

      // Cancel any pending animation frames
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }

      // Kill existing context
      if (ctx) {
        ctx.revert()
      }

      // Reset progress tracking
      lastProgress = -1

      // Debounce the reinitialization
      resizeTimeout = setTimeout(() => {
        // Force ScrollTrigger refresh
        if (window.ScrollTrigger) {
          window.ScrollTrigger.refresh()
        }

        // Reinitialize after a short delay
        setTimeout(initScrollTrigger, 100)
      }, 150)
    }

    // Initialize with delay to ensure DOM is ready
    const timer = setTimeout(initScrollTrigger, 500)

    // Add resize listener
    if (typeof window !== 'undefined') {
      window.addEventListener("resize", handleResize)
    }

    return () => {
      clearTimeout(timer)
      if (resizeTimeout) {
        clearTimeout(resizeTimeout)
      }
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
      if (ctx) {
        ctx.revert()
      }
      if (typeof window !== 'undefined') {
        window.removeEventListener("resize", handleResize)
      }
    }
  }, [gsapLoaded, dimensions, stickerConfigurations])
}

// Globale Typen für die Bibliotheken
declare global {
  interface Window {
    gsap: any
    ScrollTrigger: any
    Lenis: any
  }
}
