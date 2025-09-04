"use client"

import { useTransform, motion, useScroll } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import { useBackgroundColor } from "@/hooks/use-background-color"

// Die Projektdaten
export const projects = [
  {
    title: "Margherita Classica",
    description:
      "Unsere klassische Pizza Margherita mit hausgemachter Tomatensoße, frischem Basilikum und hochwertigem Mozzarella - einfach und perfekt.",
    src: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=1000",
    link: "#menu",
    color: "#DA3027",
  },
  {
    title: "Prosciutto e Funghi",
    description:
      "Eine harmonische Kombination aus würzigem Schinken und saftigen Pilzen, perfekt abgerundet mit unserem hausgemachten Mozzarella und frischen Kräutern.",
    src: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1000",
    link: "#menu",
    color: "#F9A1CA",
  },
  {
    title: "Quattro Formaggi",
    description:
      "Ein Traum für Käseliebhaber: vier verschiedene italienische Käsesorten schmelzen zu einem unvergleichlichen Geschmackserlebnis zusammen.",
    src: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1000",
    link: "#menu",
    color: "#DA3027",
  },
  {
    title: "Diavola Piccante",
    description:
      "Für Liebhaber der scharfen Küche: würzige Salami, frische Chilischoten und unsere geheime Gewürzmischung sorgen für ein feuriges Geschmackserlebnis.",
    src: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?q=80&w=1000",
    link: "#menu",
    color: "#F9A1CA",
  },
  {
    title: "Vegetariana",
    description:
      "Reichlich frisches, saisonales Gemüse auf unserer hausgemachten Tomatensoße mit cremigem Mozzarella - ein Fest der Farben und Aromen.",
    src: "https://images.unsplash.com/photo-1528137871618-79d2761e3fd5?q=80&w=1000",
    link: "#menu",
    color: "#DA3027",
  },
]

// Die einzelne Card-Komponente
const Card = ({
  i,
  title,
  description,
  src,
  url,
  color,
  progress,
  range,
  targetScale,
}: {
  i: number
  title: string
  description: string
  src: string
  url: string
  color: string
  progress: any
  range: number[]
  targetScale: number
}) => {
  const container = useRef(null)
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"],
  })

  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1])

  const scale = useTransform(progress, range, [1, targetScale])

  return (
    <div ref={container} className="h-screen flex items-center justify-center sticky top-0">
      <motion.div
        style={{
          backgroundColor: color,
          scale,
          top: `calc(-5vh + ${i * 25}px)`,
        }}
        className="flex flex-col relative h-[500px] w-full max-w-[1000px] rounded-3xl p-6 md:p-12 origin-top mx-4"
      >
        <div className="flex flex-col md:flex-row h-full gap-4 md:gap-12">
          <div className="w-full md:w-2/5 relative">
            <h2
              style={{
                color: color === "#DA3027" ? "#F8C8DD" : "#DA3027",
                fontSize: "50px",
              }}
              className="text-left m-0 mb-4"
            >
              {title}
            </h2>
            <p
              className="text-sm md:text-base first-letter:text-xl md:first-letter:text-2xl"
              style={{ color: color === "#DA3027" ? "#F8C8DD" : "#DA3027" }}
            >
              {description}
            </p>
          </div>

          <div className="relative w-full md:w-3/5 h-64 md:h-full rounded-xl md:rounded-3xl overflow-hidden">
            <motion.div className="w-full h-full" style={{ scale: imageScale }}>
              <div className="relative w-full h-full">
                <Image src={src || "/placeholder.svg"} alt={title} fill className="object-cover" />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

// Die Hauptkomponente, die alle Cards rendert
export function ParallaxCards() {
  const container = useRef(null)

  // Verwende den zentralen Hook für Hintergrundfarbe
  const sectionBgColor = useBackgroundColor()

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  })

  return (
    <section
      id="specialties"
      className="py-10 md:py-20 transition-colors duration-700"
      style={{ backgroundColor: sectionBgColor }}
    >
      <div className="container px-4">
        <h2
          className="text-4xl md:text-6xl text-center mb-16 text-[#DA3027]"
          style={{
            letterSpacing: "0.05em",
          }}
        >
          UNSERE SPEZIALITÄTEN
        </h2>
      </div>

      <div ref={container}>
        {projects.map((project, i) => {
          const targetScale = 1 - (projects.length - i) * 0.05
          return (
            <Card
              key={i}
              i={i}
              title={project.title}
              description={project.description}
              src={project.src}
              url={project.link}
              color={project.color}
              progress={scrollYProgress}
              range={[i * 0.25, 1]}
              targetScale={targetScale}
            />
          )
        })}
      </div>
    </section>
  )
}
