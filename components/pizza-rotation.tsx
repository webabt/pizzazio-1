"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { useBackgroundColor } from "@/hooks/use-background-color"

interface PizzaProps {
  name: string
  price: string
  image: string
  baseSize: number
  tags: string[]
}

export function PizzaRotation() {
  const pizzasRef = useRef<(HTMLDivElement | null)[]>([])
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200)
  const containerRef = useRef<HTMLDivElement>(null)

  // Verwende den zentralen Hook für Hintergrundfarbe
  const bgColor = useBackgroundColor()

  const pizzas = [
    {
      name: "Margherita",
      price: "€8.90",
      image: "/images/pizza-bild2.png", // Using the margherita-style pizza
      baseSize: 400,
      tags: [],
    },
    {
      name: "Pepperoni",
      price: "€10.90",
      image: "/images/pizza-bild1.png", // Using the pepperoni pizza
      baseSize: 350,
      tags: [],
    },
    {
      name: "Quattro Formaggi",
      price: "€11.90",
      image: "/images/pizza-bild2.png", // Using the cheese pizza
      baseSize: 250,
      tags: [],
    },
    {
      name: "Vegetariana",
      price: "€9.90",
      image: "/images/pizza-bild3.png", // Using the supreme pizza for vegetarian
      baseSize: 350,
      tags: ["Vegan"],
    },
    {
      name: "Prosciutto",
      price: "€12.90",
      image: "/images/pizza-bild3.png", // Using the supreme pizza
      baseSize: 280,
      tags: [],
    },
    {
      name: "Diavola",
      price: "€11.90",
      image: "/images/pizza-bild1.png", // Using the pepperoni pizza for spicy
      baseSize: 300,
      tags: ["Extra Scharf"],
    },
  ]

  // Get tag color based on tag name
  const getTagColor = (tag: string) => {
    switch (tag) {
      case "Viel Käse":
        return "#E1D249"
      case "Vegan":
        return "#365236"
      case "Extra Scharf":
        return "#A92828"
      case "Bisschen scharf":
        return "#FF9494"
      default:
        return "#CCCCCC"
    }
  }

  // Calculate responsive size based on screen width
  const getResponsiveSize = (baseSize: number) => {
    // Mobile: all pizzas have the same size
    if (windowWidth < 640) {
      return 150 // Fixed size for mobile
    }
    // Tablet: reduce size moderately
    else if (windowWidth < 1024) {
      return Math.floor(baseSize * 0.7) // 70% of original size for tablets
    }
    // Small desktop
    else if (windowWidth < 1280) {
      return Math.floor(baseSize * 0.8) // 80% of original size for small desktops
    }
    // Large desktop: use original size
    else {
      return baseSize
    }
  }

  // Get position styles for each pizza
  const getPizzaPosition = (index: number) => {
    // Completely separate positions for each device size
    if (windowWidth < 640) {
      // For mobile, we don't need absolute positioning
      // We'll use a different layout approach
      return {}
    } else if (windowWidth < 1024) {
      // Tablet layout - more spread out
      switch (index) {
        case 0:
          return { left: "19%", top: "5%" }
        case 1:
          return { left: "80%", top: "-1%" }
        case 2:
          return { left: "54%", top: "28%" }
        case 3:
          return { left: "18%", top: "45%" }
        case 4:
          return { left: "82%", top: "45%" }
        case 5:
          return { left: "52%", top: "71%" }
        default:
          return { left: "50%", top: "50%" }
      }
    } else {
      // Desktop layout - wide spread with lots of whitespace
      switch (index) {
        case 0:
          return { left: "18%", top: "-3%" }
        case 1:
          return { left: "85%", top: "0%" }
        case 2:
          return { left: "50%", top: "20%" }
        case 3:
          return { left: "18%", top: "40%" }
        case 4:
          return { left: "85%", top: "50%" }
        case 5:
          return { left: "52%", top: "70%" }
        default:
          return { left: "50%", top: "50%" }
      }
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY

      pizzasRef.current.forEach((pizza, index) => {
        if (pizza) {
          // Calculate rotation based on scroll position
          // Alternate direction based on index
          const rotationSpeed = 0.1 // Adjust for faster/slower rotation
          const direction = index % 2 === 0 ? 1 : -1
          const rotation = (scrollPosition * rotationSpeed * direction) % 360

          pizza.style.transform = `rotate(${rotation}deg)`
        }
      })
    }

    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  // Render for mobile devices (< 640px)
  const renderMobileLayout = () => {
    return (
      <div className="space-y-12 py-8">
        {pizzas.map((pizza, index) => {
          const isEven = index % 2 === 0

          return (
            <div key={index} className="flex items-center gap-6">
              {/* For even indices, pizza name on left, pizza on right */}
              {isEven ? (
                <>
                  <div className="w-1/2 flex flex-col items-start pl-4">
                    <h3
                      className="text-xl mb-2 text-left"
                      style={{
                        color: "#DA3027",
                        letterSpacing: "0.05em",
                      }}
                    >
                      {pizza.name.toUpperCase()}
                    </h3>
                    <p className="font-bold text-red-600 text-left" style={{ letterSpacing: "0.05em" }}>
                      {pizza.price}
                    </p>
                    {/* Tags as buttons */}
                    <div className="flex flex-wrap justify-start gap-2 mt-2">
                      {pizza.tags.map((tag, tagIndex) => (
                        <button
                          key={tagIndex}
                          className="text-sm px-[12px] py-[6px] text-white rounded-[20px]"
                          style={{ backgroundColor: getTagColor(tag), letterSpacing: "0.05em" }}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="w-1/2 flex justify-start">
                    <div
                      className="relative rounded-full overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group hover:scale-105"
                      style={{
                        width: "150px",
                        height: "150px",
                      }}
                    >
                      <div
                        ref={(el) => (pizzasRef.current[index] = el)}
                        className="absolute inset-0 rounded-full overflow-hidden"
                      >
                        <Image src={pizza.image || "/placeholder.svg"} alt={pizza.name} fill className="object-cover" />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-[#DA3027]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center rounded-full">
                        <p
                          className="text-[#FFFAF2] font-bold text-lg text-center px-2 mb-2"
                          style={{
                            letterSpacing: "0.05em",
                            textShadow:
                              "-1px -1px 0 #401A24, 1px -1px 0 #401A24, -1px 1px 0 #401A24, 1px 1px 0 #401A24",
                          }}
                        >
                          {pizza.price}
                        </p>
                        <Link href="/menu">
                          <button className="bg-[#F7C8DD] hover:bg-[#DA3027] text-[#DA3027] hover:text-[#F7C8DD] px-3 py-1 rounded-full font-londrina-solid font-bold text-xs transition-all duration-300 hover:scale-105">
                            Order Now
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                /* For odd indices, pizza on left, pizza name on right */
                <>
                  <div className="w-1/2 flex justify-end">
                    <div
                      className="relative rounded-full overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group hover:scale-105"
                      style={{
                        width: "150px",
                        height: "150px",
                      }}
                    >
                      <div
                        ref={(el) => (pizzasRef.current[index] = el)}
                        className="absolute inset-0 rounded-full overflow-hidden"
                      >
                        <Image src={pizza.image || "/placeholder.svg"} alt={pizza.name} fill className="object-cover" />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-[#DA3027]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center rounded-full">
                        <p
                          className="text-[#FFFAF2] font-bold text-lg text-center px-2 mb-2"
                          style={{
                            letterSpacing: "0.05em",
                            textShadow:
                              "-1px -1px 0 #401A24, 1px -1px 0 #401A24, -1px 1px 0 #401A24, 1px 1px 0 #401A24",
                          }}
                        >
                          {pizza.price}
                        </p>
                        <Link href="/menu">
                          <button className="bg-[#F7C8DD] hover:bg-[#DA3027] text-[#DA3027] hover:text-[#F7C8DD] px-3 py-1 rounded-full font-londrina-solid font-bold text-xs transition-all duration-300 hover:scale-105">
                            Order Now
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="w-1/2 flex flex-col items-start pl-4">
                    <h3
                      className="text-xl mb-2 text-left"
                      style={{
                        color: "#DA3027",
                        letterSpacing: "0.05em",
                      }}
                    >
                      {pizza.name.toUpperCase()}
                    </h3>
                    <p className="font-bold text-red-600 text-left" style={{ letterSpacing: "0.05em" }}>
                      {pizza.price}
                    </p>
                    {/* Tags as buttons */}
                    <div className="flex flex-wrap justify-start gap-2 mt-2">
                      {pizza.tags.map((tag, tagIndex) => (
                        <button
                          key={tagIndex}
                          className="text-sm px-[12px] py-[6px] text-white rounded-[20px]"
                          style={{ backgroundColor: getTagColor(tag), letterSpacing: "0.05em" }}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          )
        })}
      </div>
    )
  }

  // Render for tablet and desktop
  const renderDesktopLayout = () => {
    return (
      <div
        ref={containerRef}
        className="relative mx-auto"
        style={{
          height: windowWidth < 1024 ? "1000px" : "1200px",
          maxWidth: "1440px",
        }}
      >
        {pizzas.map((pizza, index) => {
          const responsiveSize = getResponsiveSize(pizza.baseSize)
          const position = getPizzaPosition(index)

          return (
            <div
              key={index}
              className="absolute transform -translate-x-1/2"
              style={{
                left: position.left,
                top: position.top,
                width: `${responsiveSize}px`,
              }}
            >
              {/* Pizza name above the pizza */}
              <h3
                className="text-xl text-center mb-4"
                style={{
                  color: "#DA3027",
                  letterSpacing: "0.05em",
                }}
              >
                {pizza.name.toUpperCase()}
              </h3>

              {/* Pizza circle */}
              <div
                className="relative mb-4 rounded-full overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 mx-auto group hover:scale-105"
                style={{
                  width: `${responsiveSize}px`,
                  height: `${responsiveSize}px`,
                }}
              >
                <div
                  ref={(el) => (pizzasRef.current[index] = el)}
                  className="absolute inset-0 rounded-full overflow-hidden"
                >
                  <Image src={pizza.image || "/placeholder.svg"} alt={pizza.name} fill className="object-cover" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#DA3027]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center rounded-full">
                  <p
                    className="text-[#FFFAF2] font-bold text-xl text-center px-4 mb-3"
                    style={{
                      letterSpacing: "0.05em",
                      textShadow: "-1px -1px 0 #401A24, 1px -1px 0 #401A24, -1px 1px 0 #401A24, 1px 1px 0 #401A24",
                    }}
                  >
                    {pizza.price}
                  </p>
                  <Link href="/menu">
                    <button className="bg-[#F7C8DD] hover:bg-[#DA3027] text-[#DA3027] hover:text-[#F7C8DD] px-4 py-2 rounded-full font-londrina-solid font-bold text-sm transition-all duration-300 hover:scale-105">
                      Order Now
                    </button>
                  </Link>
                </div>
              </div>

              {/* Tags as buttons */}
              <div className="flex flex-wrap justify-center gap-2 mt-2">
                {pizza.tags.map((tag, tagIndex) => (
                  <button
                    key={tagIndex}
                    className="text-sm px-[12px] py-[6px] text-white rounded-[20px]"
                    style={{ backgroundColor: getTagColor(tag), letterSpacing: "0.05em" }}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <section
      id="menu"
      className="py-20 overflow-hidden transition-colors duration-700"
      style={{ backgroundColor: bgColor }}
    >
      <div className="container px-4">
        <h2
          className="text-6xl text-center mb-16 text-[#F7C8DD]"
          style={{
            textShadow: "-2px -2px 0 #DA3027, 2px -2px 0 #DA3027, -2px 2px 0 #DA3027, 2px 2px 0 #DA3027",
            letterSpacing: "0.05em",
          }}
        >
          PIZZA MENU
        </h2>

        {windowWidth < 640 ? renderMobileLayout() : renderDesktopLayout()}

        {/* Order Now Button mit größerem Abstand und Hover-Effekt */}
        <div className="text-center mt-32">
          <Link href="/menu">
            <Button
              size="lg"
              className="bg-[#F7C8DD] hover:bg-[#DA3027] text-[#DA3027] hover:text-[#F7C8DD] rounded-[40px] transition-all duration-300 hover:scale-110 hover:shadow-lg transform font-londrina-solid font-bold"
            >
              Order Now
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
