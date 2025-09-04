"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { FooterSection } from "@/components/footer-section"
import { PageTransition } from "@/components/page-transition"
import Image from "next/image"

export default function MenuPage() {
  const [activeTab, setActiveTab] = useState("PIZZA")
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleTransitionComplete = () => {
    setShowContent(true)
  }

  const menuData = {
    PIZZA: [
      {
        name: "Margaritta",
        description: "Hausgemachter Tomatensoße, frischem Basilikum und hochwertigem Mozzarella",
        priceM: "12€",
        priceL: "18€",
        isVegan: false,
      },
      {
        name: "Pepperoni",
        description: "Hausgemachter Tomatensoße, Mozzarella und würzige Pepperoni-Salami",
        priceM: "15€",
        priceL: "20€",
        isVegan: false,
      },
      {
        name: "Quattro Formaggi",
        description: "Vier verschiedene italienische Käsesorten, ohne Tomatensoße",
        priceM: "14€",
        priceL: "19€",
        isVegan: false,
      },
      {
        name: "Vegetariana",
        description: "Tomatensoße, veganer Käse, Paprika, Zucchini, Aubergine, Zwiebeln",
        priceM: "13€",
        priceL: "18€",
        isVegan: true,
      },
      {
        name: "Prosciutto e Funghi",
        description: "Tomatensoße, Mozzarella, Schinken, frische Champignons",
        priceM: "16€",
        priceL: "21€",
        isVegan: false,
      },
      {
        name: "Diavola",
        description: "Tomatensoße, Mozzarella, scharfe Salami, Chili, Zwiebeln",
        priceM: "15€",
        priceL: "20€",
        isVegan: false,
      },
    ],
    PASTA: [
      {
        name: "Spaghetti Carbonara",
        description: "Spaghetti mit Speck, Ei, Parmesan und schwarzem Pfeffer",
        priceM: "11€",
        priceL: "14€",
        isVegan: false,
      },
      {
        name: "Penne Arrabbiata",
        description: "Penne mit scharfer Tomatensoße, Knoblauch und Chili",
        priceM: "10€",
        priceL: "13€",
        isVegan: true,
      },
      {
        name: "Lasagne della Casa",
        description: "Hausgemachte Lasagne mit Hackfleisch und Béchamelsoße",
        priceM: "12€",
        priceL: "16€",
        isVegan: false,
      },
      {
        name: "Fettuccine Alfredo",
        description: "Fettuccine mit cremiger Parmesan-Butter-Soße",
        priceM: "11€",
        priceL: "15€",
        isVegan: false,
      },
    ],
    DESSERT: [
      {
        name: "Tiramisu",
        description: "Klassisches italienisches Dessert mit Mascarpone und Kaffee",
        priceM: "6€",
        priceL: "8€",
        isVegan: false,
      },
      {
        name: "Panna Cotta",
        description: "Cremiges Dessert mit Vanille und Beerensauce",
        priceM: "5€",
        priceL: "7€",
        isVegan: false,
      },
      {
        name: "Gelato",
        description: "Hausgemachtes italienisches Eis, verschiedene Sorten",
        priceM: "4€",
        priceL: "6€",
        isVegan: true,
      },
    ],
    DRINKS: [
      {
        name: "Coca Cola",
        description: "Erfrischende Cola, eisgekühlt serviert",
        priceM: "3€",
        priceL: "4€",
        isVegan: true,
      },
      {
        name: "Mineralwasser",
        description: "Stilles oder sprudelndes Mineralwasser",
        priceM: "2€",
        priceL: "3€",
        isVegan: true,
      },
      {
        name: "Italienischer Wein",
        description: "Auswahl an italienischen Rot- und Weißweinen",
        priceM: "5€",
        priceL: "8€",
        isVegan: false,
      },
      {
        name: "Espresso",
        description: "Authentischer italienischer Espresso",
        priceM: "2€",
        priceL: "3€",
        isVegan: true,
      },
    ],
  }

  const currentItems = menuData[activeTab as keyof typeof menuData] || []

  // Function to get the exact left position for each tab
  const getTabPosition = (tab: string) => {
    switch (tab) {
      case "PIZZA":
        return "0%"
      case "PASTA":
        return "22%"
      case "DESSERT":
        return "47.5%"
      case "DRINKS":
        return "75%"
      default:
        return "0%"
    }
  }

  // Function to get responsive icon size
  const getVeganIconSize = () => {
    if (typeof window !== "undefined") {
      const width = window.innerWidth
      if (width < 640) {
        return 14 // Mobile
      } else if (width < 1024) {
        return 18 // Tablet
      } else {
        return 20 // Desktop
      }
    }
    return 20 // Default
  }

  const [iconSize, setIconSize] = useState(40)

  useEffect(() => {
    const updateIconSize = () => {
      setIconSize(getVeganIconSize())
    }

    updateIconSize()
    window.addEventListener("resize", updateIconSize)

    return () => {
      window.removeEventListener("resize", updateIconSize)
    }
  }, [])

  return (
    <>
      {/* Page Transition */}
      {!showContent && <PageTransition title="OUR MENU" onComplete={handleTransitionComplete} />}

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
                OUR MENU
              </h1>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center -mt-8 relative z-10">
          <div className="bg-[#FAF1E4] rounded-full px-2 py-1.5 shadow-lg border-2 border-[#DA3027] relative">
            <div className="flex relative">
              {/* Sliding background indicator */}
              <div
                className="absolute top-0 h-full bg-[#F7C8DD] rounded-full transition-all duration-500 ease-in-out z-0"
                style={{
                  width: `calc(100% / 4)`,
                  left: getTabPosition(activeTab),
                }}
              />

              {["PIZZA", "PASTA", "DESSERT", "DRINKS"].map((tab, index) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2 rounded-full font-londrina-solid text-lg font-bold transition-all duration-300 relative z-10 flex-1 text-center ${
                    activeTab === tab ? "text-[#DA3027]" : "text-[#DA3027] hover:text-[#DA3027]/80"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Menu Content */}
        <div className="container mx-auto px-6 py-24 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-8">
            {currentItems.map((item, index) => (
              <div key={index} className="mb-8">
                {/* Item name with vegan icon, dotted line and size indicators */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center flex-1">
                    <div className="flex items-center">
                      {/* Vegan Icon */}
                      {item.isVegan && (
                        <div className="mr-2 flex-shrink-0">
                          <Image
                            src="/images/vegan.svg"
                            alt="Vegan"
                            width={iconSize}
                            height={iconSize}
                            className="object-contain"
                          />
                        </div>
                      )}
                      <h3 className="text-[#DA3027] font-londrina-solid text-2xl font-bold mr-2">{item.name}</h3>
                    </div>
                    <div className="flex-1 border-b-2 border-dotted border-[#DA3027] mx-2"></div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <span className="text-[#DA3027] font-londrina-solid text-lg font-bold">M</span>
                        <span className="text-[#DA3027] font-londrina-solid text-lg font-bold">L</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Prices */}
                <div className="flex justify-end mb-3">
                  <div className="flex space-x-4">
                    <span className="text-[#DA3027] font-londrina-solid text-xl font-bold">{item.priceM}</span>
                    <span className="text-[#DA3027] font-londrina-solid text-xl font-bold">{item.priceL}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-[#8B4513] text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      {showContent && <FooterSection />}
    </>
  )
}
