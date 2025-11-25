import React from "react"
import { Link } from "react-router-dom"
import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="text-2xl font-bold mb-4">RIC Tanzania</div>
            <p className="text-sm text-gray-400">
              Your trusted digital partner for innovative solutions in Tanzania and beyond.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/" className="block text-gray-400 hover:text-white transition-colors">
                Home
              </Link>
              <Link to="/services" className="block text-gray-400 hover:text-white transition-colors">
                Services
              </Link>
              <Link to="/about" className="block text-gray-400 hover:text-white transition-colors">
                About Us
              </Link>
              <Link to="/clients" className="block text-gray-400 hover:text-white transition-colors">
                Clients
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <div className="space-y-2 text-sm text-gray-400">
              <div>Logo Design</div>
              <div>Social Media Management</div>
              <div>Website Creation</div>
              <div>Digital Ads</div>
              <div>WhatsApp Automation</div>
              <div>AI Solutions</div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Phone size={16} />
                <span>+255 XXX XXX XXX</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} />
                <span>info@rictanzania.co.tz</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                <span>Dar es Salaam, Tanzania</span>
              </div>
              <div className="flex gap-4 mt-4">
                <a href="#" className="hover:text-white transition-colors">
                  <Facebook size={20} />
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  <Instagram size={20} />
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} RIC Tanzania. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}