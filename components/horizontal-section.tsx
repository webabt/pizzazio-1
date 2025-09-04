"use client"

import { useRef } from "react"
import Image from "next/image"
import {
  useResponsiveDimensions,
  useScrollLibraries,
  useHorizontalScroll,
  type StickerConfig,
} from "@/hooks/use-horizontal-scroll"
import { boxes, infoElements, stickerConfigurations } from "@/data/horizontal-section-data"

export function HorizontalSection() {
  // Refs für DOM-Elemente
  const sectionRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRefs = useRef<(HTMLDivElement | null)[]>([])
  const stickerRefs = useRef<(HTMLDivElement | null)[]>([])
  const additionalStickerRefs = useRef<(HTMLDivElement | null)[]>([])
  const lifestyleImageRef = useRef<HTMLDivElement>(null)

  // Custom Hooks für Funktionalität
  const dimensions = useResponsiveDimensions()
  const { gsapLoaded, lenisLoaded } = useScrollLibraries()

  // Hook für horizontales Scrollen
  useHorizontalScroll(
    gsapLoaded,
    dimensions,
    sectionRef,
    containerRef,
    imageRefs,
    stickerRefs,
    additionalStickerRefs,
    lifestyleImageRef,
    stickerConfigurations as StickerConfig[],
  )

  // Funktion zum Berechnen der vertikalen Verschiebung für jede Box
  const getVerticalOffset = (index: number) => {
    // Abwechselnd nach oben und unten versetzen
    // Box 0: -60px (nach oben)
    // Box 1: +60px (nach unten)
    // Box 2: -60px (nach oben)
    // Box 3: +60px (nach unten)
    const baseOffset = 60 // Basis-Versatz in Pixeln
    return index % 2 === 0 ? -baseOffset : baseOffset
  }

  return (
    <div ref={sectionRef} className="relative w-full h-screen overflow-hidden" style={{ backgroundColor: "#DA3027" }}>
      {/* Horizontal scrolling container */}
      <div
        ref={containerRef}
        className="flex items-center h-full"
        style={{
          width: "max-content",
          paddingLeft: "10vw",
          paddingRight: "0",
        }}
      >
        {/* Text section that moves with horizontal scroll */}
        <div
          className="flex-shrink-0 flex items-center justify-start"
          style={{
            width: `${dimensions.textWidth}px`,
            height: `${dimensions.boxHeight}px`,
            marginRight: "50px",
          }}
        >
          <div className="w-full">
            <p
              className="leading-relaxed font-bold text-left"
              style={{
                color: "#5C0606",
                fontSize: `${dimensions.textFontSize}px`,
              }}
            >
              Hier bist du nicht einfach ein Gast – du bist Teil unserer Familie. Wir machen Pizza mit Herz, Seele und
              richtig guten Zutaten. Kein Schnickschnack, kein Kompromiss – nur ehrliche, frische Produkte, handverlesen
              und mit Liebe zubereitet. Unsere Küche ist modern, aber unsere Werte sind klassisch: Qualität,
              Leidenschaft und Zusammenhalt. Ob vegan, klassisch oder kreativ – bei uns findest du deine Pizza, die
              nicht nur schmeckt, sondern gut tut.
            </p>
          </div>
        </div>

        {boxes.map((box, index) => (
          <div
            key={index}
            className="flex items-center"
            style={{
              transform: `translateY(${getVerticalOffset(index)}px)`,
              transition: "transform 0.5s ease-out",
              marginLeft: index === 0 ? "25vw" : "0",
            }}
          >
            {/* Box Container - kleiner mit Hintergrund */}
            <div
              className="box-container flex-shrink-0 flex flex-col items-center justify-start text-center p-4"
              style={{
                width: `${dimensions.boxWidth}px`,
                height: `${dimensions.boxHeight}px`,
                backgroundColor: "#EF99C1",
                borderRadius: "6px",
              }}
            >
              {/* Image with title and color effect */}
              <div
                ref={(el) => (imageRefs.current[index] = el)}
                className="relative"
                style={{ width: `${dimensions.imageWidth}px`, height: `${dimensions.imageHeight}px` }}
              >
                <Image
                  src={box.image || "/placeholder.svg"}
                  alt={box.title}
                  fill
                  className="object-cover"
                  style={{
                    filter: "grayscale(100%) brightness(0.8)",
                    transition: "filter 0.4s ease-out",
                    borderRadius: "4px",
                  }}
                />
                <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                  <h3
                    className="font-londrina-solid text-center drop-shadow-lg px-2"
                    style={{
                      fontSize: `${dimensions.fontSize}px`,
                      color: "#FFD9F5",
                    }}
                  >
                    {box.title}
                  </h3>
                </div>
              </div>

              {/* Ingredients */}
              <p
                className="mt-3 px-2 leading-relaxed font-extralight"
                style={{
                  color: "#5C0606",
                  fontSize: `${dimensions.textSize}px`,
                }}
              >
                {box.ingredients}
              </p>
            </div>

            {/* Info element with stickers between boxes (except after last box) */}
            {index < boxes.length - 1 && (
              <div className="flex items-center">
                {/* Info section with stickers */}
                <div
                  className="flex-shrink-0 flex flex-col items-center justify-center text-center relative"
                  style={{
                    width: `${dimensions.boxWidth}px`,
                    height: `${dimensions.boxHeight}px`,
                    backgroundColor: "transparent",
                    marginLeft: `${dimensions.spacing}px`,
                    marginRight: `${dimensions.spacing}px`,
                  }}
                >
                  {/* Obere Sticker mit Parallax-Effekt */}
                  <div
                    ref={(el) => (stickerRefs.current[index] = el)}
                    className="absolute"
                    style={{
                      ...(stickerConfigurations[index]?.main.position.top && {
                        top: stickerConfigurations[index].main.position.top,
                      }),
                      ...(stickerConfigurations[index]?.main.position.left && {
                        left: stickerConfigurations[index].main.position.left,
                      }),
                      ...(stickerConfigurations[index]?.main.position.bottom && {
                        bottom: stickerConfigurations[index].main.position.bottom,
                      }),
                      ...(stickerConfigurations[index]?.main.position.right && {
                        right: stickerConfigurations[index].main.position.right,
                      }),
                      zIndex: 1,
                    }}
                  >
                    <Image
                      src={stickerConfigurations[index]?.main.src || "/images/frame-1.svg"}
                      alt={stickerConfigurations[index]?.main.alt || "Sticker"}
                      width={stickerConfigurations[index]?.main.size || 120}
                      height={stickerConfigurations[index]?.main.size || 120}
                      className="transition-transform duration-300 hover:scale-110"
                    />
                  </div>

                  {/* Untere Sticker für Abwechslung */}
                  <div
                    ref={(el) => (additionalStickerRefs.current[index] = el)}
                    className="absolute"
                    style={{
                      ...(stickerConfigurations[index]?.additional.position.top && {
                        top: stickerConfigurations[index].additional.position.top,
                      }),
                      ...(stickerConfigurations[index]?.additional.position.left && {
                        left: stickerConfigurations[index].additional.position.left,
                      }),
                      ...(stickerConfigurations[index]?.additional.position.bottom && {
                        bottom: stickerConfigurations[index].additional.position.bottom,
                      }),
                      ...(stickerConfigurations[index]?.additional.position.right && {
                        right: stickerConfigurations[index].additional.position.right,
                      }),
                      zIndex: 1,
                    }}
                  >
                    <Image
                      src={stickerConfigurations[index]?.additional.src || "/images/frame-2-1.svg"}
                      alt={stickerConfigurations[index]?.additional.alt || "Zusatz Sticker"}
                      width={stickerConfigurations[index]?.additional.size || 100}
                      height={stickerConfigurations[index]?.additional.size || 100}
                      className="transition-transform duration-300 hover:scale-110"
                      style={{
                        transform: `rotate(${index * 45}deg)`,
                      }}
                    />
                  </div>

                  {/* Jahr-Titel */}
                  <h2
                    className="font-bold mb-4 relative z-10"
                    style={{
                      fontSize: `${dimensions.infoTitleSize}px`,
                      color: "#FBA5A5",
                      lineHeight: "1",
                    }}
                  >
                    {infoElements[index].title}
                  </h2>

                  {/* Jahr-Text */}
                  <p
                    className="px-6 font-normal leading-relaxed text-center relative z-10"
                    style={{
                      color: "#5C0606",
                      fontSize: `${dimensions.infoTextSize}px`,
                    }}
                  >
                    {infoElements[index].text}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Abstand zwischen letzter Box und Vollbild */}
        <div className="flex-shrink-0" style={{ width: `${dimensions.spacing * 2}px` }}></div>

        {/* Lifestyle image with mask effect */}
        <div
          ref={lifestyleImageRef}
          className="flex-shrink-0 relative"
          style={{
            width: "100vw",
            height: "100vh",
          }}
        >
          {/* Background mask */}
          <div
            className="absolute inset-0 z-10"
            style={{
              backgroundColor: "#FFCBDF",
            }}
          ></div>

          {/* Masked image container */}
          <div
            className="lifestyle-mask absolute inset-0 z-20"
            style={{
              clipPath: "inset(45% 40% round 20px)",
              transition: "clip-path 0.1s ease-out",
            }}
          >
            <Image src="/images/lifestyle.png" alt="Pizza und Wein" fill className="object-cover" priority />
          </div>

          {/* Lifestyle text overlay */}
          <div className="absolute inset-0 z-30 flex items-center justify-center">
            <h2
              className="font-bold text-center"
              style={{
                color: "#FFCBDF",
                fontSize: `${dimensions.lifestyleFontSize}px`,
              }}
            >
              Lifestyle
            </h2>
          </div>
        </div>
      </div>

      {/* Loading indicators */}
      {(!gsapLoaded || !lenisLoaded) && (
        <div className="absolute top-4 right-4 text-white text-sm">
          Loading scroll effects... {gsapLoaded ? "✓ GSAP" : "⏳ GSAP"} {lenisLoaded ? "✓ Lenis" : "⏳ Lenis"}
        </div>
      )}
    </div>
  )
}
