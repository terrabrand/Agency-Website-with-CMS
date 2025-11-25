import React from "react"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { ArrowRight, Palette, Share2, Globe, Radio, MessageSquare, Bot, FileText, Zap, CreditCard } from "lucide-react"
import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export default function HomePage() {
  const { services, homepageContent } = useAuth();

  // Icon Map for rendering Lucide components from string names
  const iconMap: any = {
    Palette: Palette,
    Share2: Share2,
    Globe: Globe,
    Radio: Radio,
    Zap: Zap,
    '🆕': MessageSquare
  };

  // Get the latest 6 services (assuming newest are added to the end of the list)
  const latestServices = [...services].reverse().slice(0, 6);

  const customServices = [
    {
      title: "WhatsApp API Automation",
      description: "Automate customer communication with WhatsApp Business API",
      icon: MessageSquare,
    },
    {
      title: "Content Strategy",
      description: "Comprehensive planning and strategy for your brand",
      icon: FileText,
    },
    {
      title: "AI Solutions",
      description: "Custom AI-powered solutions for your business",
      icon: Bot,
    },
  ]

  const clients = [
    { name: "National Bank" },
    { name: "Mattered" },
    { name: "Coca-Cola" },
    { name: "Adobe" },
    { name: "Subway" },
    { name: "Code Academy" },
  ]

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Hero Section - Minimalist centered */}
      <section className="relative py-20 md:py-32 lg:py-40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <img
                src="https://picsum.photos/seed/ric/150/150"
                alt="RIC Tanzania"
                className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-gray-100"
              />
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance leading-tight">
            {homepageContent.heroTitle}
          </h1>

          <p className="text-lg md:text-xl text-gray-500 mb-10 max-w-2xl mx-auto text-pretty leading-relaxed">
            {homepageContent.heroSubtitle}
          </p>

          <Button size="lg" className="rounded-full px-8" asChild>
            <Link to="/clients">
              Latest Work <ArrowRight className="ml-2" size={18} />
            </Link>
          </Button>
        </div>
      </section>

      {/* Clients/Partners Logo Section */}
      <section className="py-12 border-y border-gray-200 bg-gray-50/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300">
            {clients.map((client, index) => (
              <div key={index} className="h-10 flex items-center justify-center font-bold text-lg text-gray-400">
                {client.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section - Centered with cards */}
      <section className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
              {homepageContent.servicesTitle}
            </h2>
          </div>

          {/* Standard Services with icons */}
          <div className="mb-16">
            <div className="flex items-center justify-center mb-8">
              <div className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium">Standard Services</div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestServices.map((service, index) => {
                const Icon = iconMap[service.icon] || MessageSquare;
                return (
                  <Card
                    key={service.id}
                    className="text-center hover:shadow-lg transition-all duration-300 border-2 hover:border-gray-300 flex flex-col h-full"
                  >
                    <CardHeader className="pb-4">
                      <div className="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <Icon className="text-gray-900" size={28} />
                      </div>
                      <CardTitle className="text-lg mb-2">{service.title}</CardTitle>
                      <CardDescription className="text-sm leading-relaxed min-h-[3rem]">
                        {service.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0 mt-auto">
                      <div className="text-xl font-bold text-gray-900 mb-4">{service.price}</div>
                      <Button className="w-full rounded-full" size="sm" asChild>
                        <Link to="/client-area">
                          <CreditCard className="mr-2" size={16} />
                          Buy Now
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
            
            <div className="mt-8 text-center">
              <Button variant="outline" className="rounded-full px-8" asChild>
                <Link to="/services">View All Services</Link>
              </Button>
            </div>
          </div>

          {/* Custom Services */}
          <div>
            <div className="flex items-center justify-center mb-8">
              <div className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium">Custom Solutions</div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {customServices.map((service, index) => {
                const Icon = service.icon
                return (
                  <Card
                    key={index}
                    className="text-center hover:shadow-lg transition-all duration-300 border-2 hover:border-gray-300"
                  >
                    <CardHeader className="pb-4">
                      <div className="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <Icon className="text-gray-900" size={28} />
                      </div>
                      <CardTitle className="text-lg mb-2">{service.title}</CardTitle>
                      <CardDescription className="text-sm leading-relaxed min-h-[3rem]">
                        {service.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <Button className="w-full rounded-full bg-[#25D366] hover:bg-[#128C7E] text-white border-none" size="sm" asChild>
                        <a href="https://wa.me/255XXXXXXXXX" target="_blank" rel="noopener noreferrer">
                          <MessageSquare className="mr-2 shrink-0" size={18} />
                          WhatsApp Enquiry
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Minimalist centered with icon */}
      <section className="py-20 md:py-28 bg-gray-50/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8 flex justify-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
              <MessageSquare className="text-gray-900" size={32} />
            </div>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-balance">
            {homepageContent.ctaTitle}
          </h2>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10">
            <Button size="lg" className="rounded-full px-8" asChild>
              <Link to="/contact">
                <MessageSquare className="mr-2" size={18} />
                Email Me
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8 bg-transparent border-gray-300" asChild>
              <a href="https://wa.me/255XXXXXXXXX" target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}