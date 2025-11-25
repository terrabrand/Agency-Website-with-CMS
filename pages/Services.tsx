import React from 'react';
import { ShoppingCart, MessageCircle, MessageSquare, Palette, Share2, Globe, Radio, Zap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Services: React.FC = () => {
  const { services, servicesContent } = useAuth();

  // Icon Map for rendering Lucide components from string names
  const iconMap: any = {
    Palette: Palette,
    Share2: Share2,
    Globe: Globe,
    Radio: Radio,
    Zap: Zap,
    '🆕': MessageSquare
  };

  return (
    <div className="w-full bg-white pb-20 font-sans text-gray-900">
      {/* Hero Section */}
      <section className="bg-white pt-24 pb-20 text-center border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-block px-4 py-1.5 bg-gray-100 rounded-full text-sm font-medium text-gray-900 mb-8">
            Ready Services
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-8 text-gray-900 tracking-tight leading-[1.1] whitespace-pre-wrap">
            {servicesContent.heroTitle}
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed whitespace-pre-wrap">
            {servicesContent.heroDescription}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="bg-black text-white px-8 py-3.5 rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors w-full sm:w-auto shadow-sm">
              View Services
            </button>
            <button className="bg-white text-gray-900 border border-gray-200 px-8 py-3.5 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors w-full sm:w-auto">
              Get Free Consultation
            </button>
          </div>
        </div>
      </section>

      {/* Brand Logos Strip */}
      <div className="bg-gray-50 py-10 mb-20 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-sm font-medium text-gray-400 mb-6 uppercase tracking-wider">Trusted by Industry Leaders</p>
            <div className="flex justify-between items-center opacity-50 grayscale overflow-x-auto gap-12 no-scrollbar">
                <div className="font-bold text-xl text-gray-900 whitespace-nowrap">National Bank</div>
                <div className="font-bold text-xl text-gray-900 whitespace-nowrap">Company+</div>
                <div className="font-bold text-xl text-gray-900 whitespace-nowrap">CocaCola</div>
                <div className="font-bold text-xl text-gray-900 whitespace-nowrap">Airbnb</div>
                <div className="font-bold text-xl text-gray-900 whitespace-nowrap">Uber Eats</div>
                <div className="font-bold text-xl text-gray-900 whitespace-nowrap">Zoom</div>
            </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Standard Services Header */}
        <div className="text-center mb-16">
           <div className="inline-block px-3 py-1 bg-gray-100 rounded-full text-xs font-bold text-gray-600 uppercase tracking-wider mb-4">Ready to Buy</div>
           <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Standard Services</h2>
           <p className="text-gray-600 max-w-2xl mx-auto text-lg">Purchase instantly with mobile money and get started right away</p>
        </div>

        {/* Standard Services Grid (Dynamic from Context) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {services.map((service) => {
            const IconComponent = iconMap[service.icon] || MessageSquare;
            return (
              <div key={service.id} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 flex flex-col hover:border-gray-300 transition-all hover:shadow-md">
                <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-gray-900">
                        <IconComponent size={24} />
                    </div>
                    <span className="bg-gray-100 text-gray-600 text-xs font-bold px-2 py-1 rounded uppercase tracking-wide">{service.tag}</span>
                </div>
                
                <h3 className="text-xl font-bold mb-2 text-gray-900">{service.title}</h3>
                <p className="text-gray-500 text-sm mb-6 flex-grow leading-relaxed">{service.description}</p>
                
                <div className="pt-4 border-t border-gray-50 mt-auto">
                    <div className="mb-4">
                      <span className="text-sm text-gray-500">From </span>
                      <span className="text-xl font-bold text-gray-900">{service.price}</span>
                    </div>
                    <Link to="/client-area" className="w-full bg-black text-white py-3 rounded-lg font-medium flex items-center justify-center space-x-2 hover:bg-gray-800 transition">
                      <ShoppingCart size={16} />
                      <span>Buy Now</span>
                    </Link>
                    <p className="text-center text-xs text-gray-400 mt-2 font-medium">Pay with Mobile Money</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Custom Services Section */}
        <div className="text-center mb-16">
            <div className="inline-block px-3 py-1 bg-gray-100 rounded-full text-xs font-bold text-gray-600 uppercase tracking-wider mb-4">Custom Solutions</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">{servicesContent.customSolutionsTitle}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">{servicesContent.customSolutionsDescription}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
           {[
             {icon: "💬", tag: "Technology", title: "WhatsApp API Automation", desc: "Automate customer communication with WhatsApp Business API integration."},
             {icon: "📄", tag: "Strategy", title: "Content Strategy", desc: "Comprehensive content planning and editorial calendars aligned with your goals."},
             {icon: "🤖", tag: "Technology", title: "AI Solutions", desc: "Custom AI integration and automation to enhance your business operations."},
           ].map((item, idx) => (
             <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 flex flex-col hover:border-gray-300 transition-all hover:shadow-md">
                <div className="flex justify-between items-start mb-6">
                     <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-2xl">{item.icon}</div>
                     <span className="bg-blue-50 text-blue-600 text-xs font-bold px-2 py-1 rounded uppercase tracking-wide">{item.tag}</span>
                </div>
                
                <h3 className="text-lg font-bold mb-3 text-gray-900">{item.title}</h3>
                <p className="text-gray-500 text-sm mb-8 flex-grow leading-relaxed">{item.desc}</p>
                
                <button className="w-full bg-[#25D366] text-white py-3 rounded-lg font-medium flex items-center justify-center space-x-2 hover:bg-[#128C7E] transition mt-auto">
                  <MessageCircle size={18} />
                  <span>WhatsApp Enquiry</span>
                </button>
                <p className="text-center text-xs text-gray-400 mt-2 font-medium">Get custom pricing</p>
             </div>
           ))}
        </div>

        {/* Support Banner */}
        <div className="bg-gray-900 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between text-white relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-gray-800 rounded-full mix-blend-overlay filter blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
           
           <div className="flex items-center space-x-6 mb-8 md:mb-0 relative z-10">
             <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <span className="text-3xl">🎧</span>
             </div>
             <div>
               <h3 className="text-2xl font-bold mb-2">Need Help?</h3>
               <p className="text-gray-400">Our customer support team is available 24/7 to assist you</p>
             </div>
           </div>
           
           <div className="flex flex-col sm:flex-row gap-4 relative z-10 w-full md:w-auto">
             <button className="bg-white text-gray-900 px-6 py-3 rounded-lg text-sm font-bold hover:bg-gray-100 transition text-center">
                Live Chat
             </button>
             <button className="bg-transparent border border-white/30 text-white px-6 py-3 rounded-lg text-sm font-bold hover:bg-white/10 transition flex items-center justify-center gap-2">
                <MessageSquare size={16} /> WhatsApp Support
             </button>
           </div>
        </div>

      </div>
    </div>
  );
};

export default Services;