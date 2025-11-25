import React, { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "./ui/button"
import { Menu, X } from "lucide-react"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-gray-900">RIC</div>
            <div className="text-sm text-gray-600">Tanzania</div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-gray-900 transition-colors">
              Home
            </Link>
            <Link to="/services" className="text-gray-600 hover:text-gray-900 transition-colors">
              Services
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-gray-900 transition-colors">
              About
            </Link>
            <Link to="/clients" className="text-gray-600 hover:text-gray-900 transition-colors">
              Clients
            </Link>
            <Link to="/contact" className="text-gray-600 hover:text-gray-900 transition-colors">
              Contact
            </Link>
            <Button asChild>
              <Link to="/client-area">Client Area</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-gray-900">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-4 bg-white border-b border-gray-200">
            <Link to="/" className="block text-gray-700 hover:text-gray-900 transition-colors px-4">
              Home
            </Link>
            <Link to="/services" className="block text-gray-700 hover:text-gray-900 transition-colors px-4">
              Services
            </Link>
            <Link to="/about" className="block text-gray-700 hover:text-gray-900 transition-colors px-4">
              About
            </Link>
            <Link to="/clients" className="block text-gray-700 hover:text-gray-900 transition-colors px-4">
              Clients
            </Link>
            <Link to="/contact" className="block text-gray-700 hover:text-gray-900 transition-colors px-4">
              Contact
            </Link>
            <div className="px-4">
              <Button asChild className="w-full">
                <Link to="/client-area">Client Area</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}