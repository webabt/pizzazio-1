import "./globals.css"
import { Inter, Playfair_Display, Bebas_Neue, Alumni_Sans as Alumni_Sans_SC, Londrina_Solid } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { GSAPProvider } from "@/components/gsap-provider"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" })
const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
})

const alumniSansSc = Alumni_Sans_SC({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-alumni-sans-sc",
})

const londrinaSolid = Londrina_Solid({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-londrina-solid",
})

export const metadata = {
  title: "Pizza Zio - Authentic Italian Pizza",
  description: "Authentic Italian Pizza since 1997",
    generator: 'v0.dev'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${londrinaSolid.variable} font-londrina-solid`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <GSAPProvider>{children}</GSAPProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
