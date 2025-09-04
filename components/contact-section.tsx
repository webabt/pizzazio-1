import { Phone, MapPin, Clock, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ContactSection() {
  return (
    <section id="contact" className="bg-gray-900 text-white py-20">
      <div className="container px-4">
        <h2 className="text-4xl font-bold text-center mb-16 text-red-500">Get In Touch</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
            <div className="flex items-center mb-4">
              <Phone className="h-6 w-6 mr-4 text-red-500" />
              <p>+49 123 456 7890</p>
            </div>
            <div className="flex items-center mb-4">
              <Mail className="h-6 w-6 mr-4 text-red-500" />
              <p>info@example.com</p>
            </div>
            <div className="flex items-center mb-4">
              <MapPin className="h-6 w-6 mr-4 text-red-500" />
              <p>Pizzastraße 123, 10115 Berlin, Germany</p>
            </div>
            <div className="flex items-center mb-4">
              <Clock className="h-6 w-6 mr-4 text-red-500" />
              <p>Monday - Sunday: 11:00 AM - 11:00 PM</p>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h3 className="text-2xl font-semibold mb-6">Send us a Message</h3>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="mt-1 block w-full rounded-md border-gray-700 bg-gray-800 text-white shadow-sm focus:border-red-500 focus:ring-red-500"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 block w-full rounded-md border-gray-700 bg-gray-800 text-white shadow-sm focus:border-red-500 focus:ring-red-500"
                  placeholder="Your Email"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-700 bg-gray-800 text-white shadow-sm focus:border-red-500 focus:ring-red-500"
                  placeholder="Your Message"
                ></textarea>
              </div>
              <Button size="lg" className="bg-red-600 hover:bg-red-700 w-full">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
