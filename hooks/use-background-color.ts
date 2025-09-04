"use client"

import { useState, useEffect } from "react"

// Zentrale Farbkonfiguration
export const BACKGROUND_COLORS = {
  default: "#F9F1E4",
  animated: "#F7C8DD",
} as const

// Hook für die zentrale Hintergrundfarb-Animation
export function useBackgroundColor() {
  const [bgColor, setBgColor] = useState(BACKGROUND_COLORS.default)

  useEffect(() => {
    const handleColorChange = (event: CustomEvent) => {
      console.log("Background color change received:", event.detail)

      if (event.detail && event.detail.triggered) {
        setBgColor(BACKGROUND_COLORS.animated)
        console.log("Background changed to animated color:", BACKGROUND_COLORS.animated)
      } else {
        setBgColor(BACKGROUND_COLORS.default)
        console.log("Background reset to default color:", BACKGROUND_COLORS.default)
      }
    }

    // Event Listener für Farbänderungen
    window.addEventListener("textAnimationColorChange", handleColorChange as EventListener)

    return () => {
      window.removeEventListener("textAnimationColorChange", handleColorChange as EventListener)
    }
  }, [])

  return bgColor
}

// Utility-Funktion zum Dispatchen von Farbänderungen
export function dispatchColorChange(triggered: boolean) {
  const event = new CustomEvent("textAnimationColorChange", {
    detail: {
      backgroundColor: triggered ? BACKGROUND_COLORS.animated : BACKGROUND_COLORS.default,
      triggered,
    },
  })
  window.dispatchEvent(event)
}
