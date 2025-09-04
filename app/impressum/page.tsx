"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useEffect } from "react"

export default function ImpressumPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[#DA3027] hover:text-[#48001A] transition-colors duration-300 mb-8"
        >
          <ArrowLeft size={20} />
          Zurück zur Startseite
        </Link>

        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-londrina-solid text-[#48001A] mb-8">Impressum</h1>

          <div className="space-y-6">
            <section className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-2xl font-londrina-solid text-[#DA3027] mb-4">Angaben gemäß § 5 TMG</h2>
              <div className="space-y-2">
                <p>
                  <strong>Pizza Zio</strong>
                </p>
                <p>Musterstraße 123</p>
                <p>12345 Musterstadt</p>
                <p>Deutschland</p>
              </div>
            </section>

            <section className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-2xl font-londrina-solid text-[#DA3027] mb-4">Kontakt</h2>
              <div className="space-y-2">
                <p>
                  <strong>Telefon:</strong> +49 (0) 123 456789
                </p>
                <p>
                  <strong>E-Mail:</strong> info@pizzazio.de
                </p>
              </div>
            </section>

            <section className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-2xl font-londrina-solid text-[#DA3027] mb-4">Vertreten durch</h2>
              <p>Max Mustermann</p>
            </section>

            <section className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-2xl font-londrina-solid text-[#DA3027] mb-4">Haftungsausschluss</h2>
              <p className="text-gray-700">
                Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte externer Links.
                Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
