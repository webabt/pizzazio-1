"use client"

import type React from "react"
import { useRef, useEffect, useState } from "react"
import { useScroll, useTransform, motion } from "framer-motion"
import Image from "next/image"
import { dispatchColorChange, BACKGROUND_COLORS } from "@/hooks/use-background-color"

interface SlideProps {
  direction: "left" | "right"
  left: string
  progress: any
  textColor: string
  children: React.ReactNode
}

const Slide = ({ direction, left, progress, textColor, children }: SlideProps) => {
  const directionValue = direction === "left" ? -1 : 1
  const translateX = useTransform(progress, [0, 1], [150 * directionValue, -150 * directionValue])

  return (
    <motion.div style={{ x: translateX, left: left }} className="relative flex whitespace-nowrap">
      {/* Render children multiple times for the scrolling effect */}
      <div style={{ color: textColor }} className="transition-colors duration-300">
        {children}
      </div>
      <div style={{ color: textColor }} className="transition-colors duration-300">
        {children}
      </div>
      <div style={{ color: textColor }} className="transition-colors duration-300">
        {children}
      </div>
    </motion.div>
  )
}

interface PhraseProps {
  text: string
  imageSrc: string
}

const Phrase = ({ text, imageSrc }: PhraseProps) => {
  return (
    <div className="px-5 flex gap-5 items-center">
      <p className="text-[8vw] md:text-[5vw]">{text}</p>
      <span className="relative aspect-[110/92] w-[80px] md:w-[110px] overflow-hidden">
        <Image src={imageSrc || "/placeholder.svg"} alt={text} fill style={{ objectFit: "contain" }} />
      </span>
    </div>
  )
}

// Global state for color management
let isColorChanged = false

export function TextAnimation() {
  const container = useRef<HTMLDivElement>(null)
  const [bgColor, setBgColor] = useState("transparent")
  const [textColor, setTextColor] = useState("#F8C8DD") // Start mit rosa Farbe

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  })

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (value) => {
      // Trigger color change at 45%
      if (value > 0.45 && !isColorChanged) {
        setBgColor(BACKGROUND_COLORS.animated)
        setTextColor("rgba(218,48,39,1)") // Wechsel zu Rot
        isColorChanged = true

        // Dispatch event für alle anderen Komponenten
        dispatchColorChange(true)

        console.log("Color change triggered at scroll progress:", value)
      } else if (value <= 0.45 && isColorChanged) {
        setBgColor("transparent")
        setTextColor("#F8C8DD") // Zurück zu Rosa
        isColorChanged = false

        // Reset colors für alle anderen Komponenten
        dispatchColorChange(false)
      }
    })

    return () => unsubscribe()
  }, [scrollYProgress])

  return (
    <div
      ref={container}
      className="py-40 pb-40 overflow-hidden transition-colors duration-700"
      style={{ backgroundColor: bgColor }}
    >
      <Slide direction="left" left="-40%" progress={scrollYProgress} textColor={textColor}>
        <Phrase text="Authentic Italian Pizza" imageSrc="/images/margarita.svg" />
      </Slide>
      <Slide direction="right" left="-25%" progress={scrollYProgress} textColor={textColor}>
        <Phrase text="Traditional Wood-Fired Oven" imageSrc="/images/pasta.svg" />
      </Slide>
      <Slide direction="left" left="-75%" progress={scrollYProgress} textColor={textColor}>
        <Phrase text="Fresh Italian Ingredients" imageSrc="/images/bruschetta.svg" />
      </Slide>
    </div>
  )
}
