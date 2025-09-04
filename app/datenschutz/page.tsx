"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useEffect } from "react"

export default function DatenschutzPage() {
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
          <h1 className="text-4xl md:text-5xl font-londrina-solid text-[#48001A] mb-8">Datenschutzerklärung</h1>

          <div className="space-y-6">
            <section className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-2xl font-londrina-solid text-[#DA3027] mb-4">Datenschutz</h2>
              <p className="text-gray-700">
                Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst und behandeln Ihre personenbezogenen Daten
                vertraulich entsprechend der gesetzlichen Datenschutzvorschriften.
              </p>
            </section>

            <section className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-2xl font-londrina-solid text-[#DA3027] mb-4">Verantwortliche Stelle</h2>
              <div className="space-y-2">
                <p>Pizza Zio</p>
                <p>Musterstraße 123, 12345 Musterstadt</p>
                <p>E-Mail: info@pizzazio.de</p>
              </div>
            </section>

            <section className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-2xl font-londrina-solid text-[#DA3027] mb-4">Datenerfassung</h2>
              <p className="text-gray-700">
                Beim Besuch unserer Website werden automatisch Informationen wie IP-Adresse, Browsertyp und Zugriffszeit
                erfasst. Diese Daten dienen der technischen Bereitstellung der Website.
              </p>
            </section>

            <section className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-2xl font-londrina-solid text-[#DA3027] mb-4">Kontaktformular</h2>
              <p className="text-gray-700">
                Wenn Sie uns über das Kontaktformular kontaktieren, werden Ihre Angaben zur Bearbeitung Ihrer Anfrage
                gespeichert.
              </p>
            </section>

            <section className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-2xl font-londrina-solid text-[#DA3027] mb-4">Ihre Rechte</h2>
              <p className="text-gray-700">
                Sie haben das Recht auf Auskunft, Berichtigung, Löschung oder Einschränkung der Verarbeitung Ihrer
                personenbezogenen Daten. Kontaktieren Sie uns unter den oben genannten Kontaktdaten.
              </p>
            </section>

            <section className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-2xl font-londrina-solid text-[#DA3027] mb-4">Social Media</h2>
              <p className="text-gray-700">
                Unsere Website verlinkt zu Instagram und TikTok. Beim Klick auf diese Links gelten die
                Datenschutzbestimmungen der jeweiligen Anbieter.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
