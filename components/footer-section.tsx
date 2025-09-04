"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"

export function FooterSection() {
  const [overlayHeight, setOverlayHeight] = useState(0)
  const [stickerPosition, setStickerPosition] = useState({ bottom: "240px", right: "80px" })
  const [stickerSize, setStickerSize] = useState(160)

  // Get responsive size for olive oil sticker
  const getOliveOilSize = () => {
    if (typeof window !== "undefined") {
      const width = window.innerWidth
      if (width <= 380) {
        return 80 // Kleine Handys
      } else if (width <= 480) {
        return 90 // Große Handys
      } else if (width <= 767) {
        return 110 // Kleine Tablets
      } else if (width <= 1023) {
        return 130 // Tablets
      } else if (width <= 1280) {
        return 140 // Small desktop
      } else if (width <= 1440) {
        return 160 // Medium desktop
      } else {
        return 180 // Large desktop
      }
    }
    return 160 // Default
  }

  // Get responsive position for olive oil sticker
  const getOliveOilPosition = () => {
    if (typeof window !== "undefined") {
      const width = window.innerWidth
      if (width <= 380) {
        // Kleine Handys
        return { bottom: "315px", right: "12px" }
      } else if (width <= 480) {
        // Große Handys
        return { bottom: "340px", right: "16px" }
      } else if (width <= 767) {
        // Kleine Tablets
        return { bottom: "380px", right: "24px" }
      } else if (width <= 1023) {
        // Tablets
        return { bottom: "300px", right: "40px" }
      } else if (width <= 1280) {
        // Small desktop
        return { bottom: "390px", right: "60px" }
      } else if (width <= 1440) {
        // Medium desktop
        return { bottom: "380px", right: "80px" }
      } else {
        // Large desktop
        return { bottom: "400px", right: "100px" }
      }
    }
    return { bottom: "380px", right: "80px" } // Default
  }

  // Calculate overlay height based on screen height
  useEffect(() => {
    const calculateResponsiveValues = () => {
      const screenHeight = window.innerHeight
      let height = 0

      // Mobile breakpoint (up to 767px width)
      if (window.innerWidth <= 380) {
        // Kleine Handys
        if (screenHeight >= 800) height = 600
        else if (screenHeight >= 600) height = 500
        else height = 400
      } else if (window.innerWidth <= 480) {
        // Große Handys
        if (screenHeight >= 900) height = 650
        else if (screenHeight >= 700) height = 550
        else height = 450
      } else if (window.innerWidth <= 767) {
        // Kleine Tablets
        if (screenHeight >= 1000) height = 780
        else if (screenHeight >= 800) height = 680
        else if (screenHeight >= 600) height = 600
        else height = 450
      }
      // Tablet breakpoint (768px to 1023px width)
      else if (window.innerWidth <= 1023) {
        if (screenHeight >= 1200) height = 950
        else if (screenHeight >= 1000) height = 750
        else if (screenHeight >= 800) height = 600
        else if (screenHeight >= 600) height = 550
        else height = 550 // Minimum height
      }
      // Desktop breakpoint (1024px and above)
      else {
        if (screenHeight >= 1024) height = 950
        else if (screenHeight >= 800) height = 800
        else if (screenHeight >= 600) height = 650
        else height = 600 // Minimum height
      }

      setOverlayHeight(height)
      setStickerPosition(getOliveOilPosition())
      setStickerSize(getOliveOilSize())
    }

    // Calculate on mount and window resize
    calculateResponsiveValues()
    window.addEventListener("resize", calculateResponsiveValues)

    return () => {
      window.removeEventListener("resize", calculateResponsiveValues)
    }
  }, [])

  // Determine which overlay image to use based on screen width
  const getOverlayImage = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth <= 767) {
        return "/images/overlay-mobile.png"
      } else if (window.innerWidth <= 1023) {
        return "/images/overlay-tablet.png"
      } else {
        return "/images/overlay-desktop.png"
      }
    }
    return "/images/overlay-desktop.png" // Default
  }

  return (
    <div className="relative h-[100vh]" style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}>
      <div className="fixed bottom-0 h-[100vh] w-full">
        <footer className="h-full bg-[#48001A] text-white relative overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src="/images/restaurant-interior.png"
              alt="Pizza Zio Restaurant Interior"
              fill
              className="object-cover opacity-100"
              priority
            />
          </div>

          {/* Olive Oil Sticker - positioned between background and overlay */}
          <div
            className="absolute"
            style={{
              zIndex: 20,
              ...stickerPosition,
            }}
          >
            <Image src="/images/olivenöl.svg" alt="Olivenöl" width={stickerSize} height={stickerSize} />
          </div>

          {/* Overlay Image */}
          <div
            className="absolute bottom-0 left-0 right-0 w-full pointer-events-none"
            style={{
              height: `${overlayHeight}px`,
              maxHeight: "100vh",
              zIndex: 15,
            }}
          >
            <Image
              src={getOverlayImage() || "/placeholder.svg"}
              alt="Footer Overlay"
              fill
              className="object-fill w-full"
              priority
              style={{
                objectPosition: "bottom",
              }}
            />
          </div>

          {/* Content */}
          <div className="relative z-20 container px-4 py-12 flex flex-col h-full">
            {/* Push content towards bottom - more space */}
            <div className="flex-grow"></div>

            {/* Main content area - positioned even lower */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-24">
              {/* Left column - Quick Links */}
              <div className="mb-8 md:mb-0 relative z-30">
                <div className="mb-8">
                  <div className="space-y-3">
                    <div>
                      <Link
                        href="/location"
                        className="text-lg md:text-xl font-medium hover:scale-110 transition-all duration-300 relative z-40 inline-block"
                        style={{
                          color: "#FFF6EA",
                          textShadow: "-1px -1px 0 #DA3027, 1px -1px 0 #DA3027, -1px 1px 0 #DA3027, 1px 1px 0 #DA3027",
                        }}
                      >
                        Location
                      </Link>
                    </div>
                    <div>
                      <Link
                        href="/kontakt"
                        className="text-lg md:text-xl font-medium hover:scale-110 transition-all duration-300 relative z-40 inline-block"
                        style={{
                          color: "#FFF6EA",
                          textShadow: "-1px -1px 0 #DA3027, 1px -1px 0 #DA3027, -1px 1px 0 #DA3027, 1px 1px 0 #DA3027",
                        }}
                      >
                        Kontakten
                      </Link>
                    </div>
                    <div>
                      <Link
                        href="/menu"
                        className="text-lg md:text-xl font-medium hover:scale-110 transition-all duration-300 relative z-40 inline-block"
                        style={{
                          color: "#FFF6EA",
                          textShadow: "-1px -1px 0 #DA3027, 1px -1px 0 #DA3027, -1px 1px 0 #DA3027, 1px 1px 0 #DA3027",
                        }}
                      >
                        Menu
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right column - Social media */}
              <div className="text-right w-full md:w-auto relative z-40">
                <div className="space-y-2 flex flex-col items-end">
                  <Link
                    href="https://instagram.com/pizzazio"
                    target="_blank"
                    className="flex items-center justify-end space-x-2 hover:scale-110 transition-all duration-300 group relative z-50"
                    style={{ pointerEvents: "auto" }}
                  >
                    <span className="font-medium text-[#DA3027] transition-colors duration-300">Instagram</span>
                    <Image
                      src="/images/instagram-2.svg"
                      alt="Instagram"
                      width={20}
                      height={20}
                      className="group-hover:scale-110 transition-transform duration-300"
                    />
                  </Link>
                  <Link
                    href="https://tiktok.com/@pizzazio"
                    target="_blank"
                    className="flex items-center justify-end space-x-2 hover:scale-110 transition-all duration-300 group relative z-50"
                    style={{ pointerEvents: "auto" }}
                  >
                    <span className="font-medium text-[#DA3027] transition-colors duration-300">TikTok</span>
                    <Image
                      src="/images/tiktok-2.svg"
                      alt="TikTok"
                      width={20}
                      height={20}
                      className="group-hover:scale-110 transition-transform duration-300"
                    />
                  </Link>
                </div>
              </div>
            </div>

            {/* Copyright and Legal Links - positioned at bottom with 21px margin */}
            <div
              className="absolute bottom-0 left-0 right-0 flex justify-center md:justify-between items-center px-4"
              style={{ marginBottom: "21px" }}
            >
              {/* Copyright and Legal Links - centered on mobile, split on desktop */}
              <div className="flex items-center space-x-2 md:space-x-0 md:w-full md:justify-between">
                {/* Copyright - left side on desktop, part of center group on mobile */}
                <p className="text-[#DA3027] font-medium text-[10px] md:text-[13px]">
                  © 2025 Pizza Zio. Alle Rechte vorbehalten.
                </p>

                {/* Separator for mobile */}
                <span className="text-[#DA3027] text-[10px] md:hidden">|</span>

                {/* Legal Links - right side on desktop, part of center group on mobile */}
                <div className="flex items-center space-x-2 md:space-x-4">
                  <Link
                    href="/impressum"
                    className="text-[#DA3027] hover:scale-110 hover:text-[#FFF6EA] transition-all duration-300 font-medium text-[10px] md:text-[13px]"
                  >
                    Impressum
                  </Link>
                  <span className="text-[#DA3027] text-[10px] md:hidden">|</span>
                  <Link
                    href="/datenschutz"
                    className="text-[#DA3027] hover:scale-110 hover:text-[#FFF6EA] transition-all duration-300 font-medium text-[10px] md:text-[13px]"
                  >
                    Datenschutz
                  </Link>
                </div>
              </div>
            </div>

            {/* Pizza Zio text - centered with 50px from bottom - NOW CLICKABLE */}
            <div className="absolute bottom-0 left-0 right-0 text-center" style={{ marginBottom: "50px" }}>
              <Link href="/" className="cursor-pointer block" style={{ pointerEvents: "auto" }}>
                <h2 className="text-[#DA3027] font-bold text-[65px] xs:text-[75px] sm:text-[80px] md:text-[100px] lg:text-[120px] xl:text-[160px] leading-none">
                  Pizza Zio
                </h2>
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
