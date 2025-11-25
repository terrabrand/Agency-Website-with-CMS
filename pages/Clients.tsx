import React from 'react';
import { ArrowRight, Star, Award, Lightbulb, TrendingUp, Smartphone, Globe, PenTool, Radio, Layout, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/button';

const Clients: React.FC = () => {
  return (
    <div className="w-full bg-white text-gray-900 font-sans">
      
      {/* Hero Section - Sarah Ndege */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="w-full md:w-1/2 space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-gray-900">
              Sarah Ndege <br />
              is Operations <br />
              Manager at Safari <br />
              Adventures TZ
            </h1>
            
            <div className="flex flex-wrap gap-3">
               <span className="px-4 py-1.5 bg-gray-100 text-gray-900 rounded-full text-sm font-bold">Tourism</span>
               <span className="px-4 py-1.5 bg-gray-100 text-gray-900 rounded-full text-sm font-bold">Digital Strategy</span>
               <span className="px-4 py-1.5 bg-gray-100 text-gray-900 rounded-full text-sm font-bold">WhatsApp Automation</span>
            </div>
          </div>
          
          <div className="w-full md:w-1/2 flex justify-center md:justify-end relative">
             <div className="w-72 h-72 md:w-[450px] md:h-[450px] rounded-full overflow-hidden bg-gray-100 relative z-10">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Sarah Ndege" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />
             </div>
          </div>
        </div>

        {/* Awards/Stats Strip */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center gap-2">
                <Smartphone size={32} className="mb-2" />
                <div className="font-bold text-sm">Apple Editor's Choice</div>
                <div className="text-xs text-gray-500">Featured mobile app design</div>
            </div>
            <div className="flex flex-col items-center gap-2">
                <Lightbulb size={32} className="mb-2" />
                <div className="font-bold text-sm">Idea of the Day</div>
                <div className="text-xs text-gray-500">Innovative web solutions</div>
            </div>
            <div className="flex flex-col items-center gap-2">
                <Star size={32} className="mb-2" />
                <div className="font-bold text-sm">Top Digital Agency</div>
                <div className="text-xs text-gray-500">Tanzania 2024</div>
            </div>
            <div className="flex flex-col items-center gap-2">
                <TrendingUp size={32} className="mb-2" />
                <div className="font-bold text-sm">98% Success Rate</div>
                <div className="text-xs text-gray-500">Client satisfaction</div>
            </div>
        </div>
      </section>

      {/* Featured Project - Dark Section */}
      <section className="bg-[#111111] text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="flex flex-col lg:flex-row gap-16 items-center">
              <div className="w-full lg:w-1/2">
                 <img 
                    src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                    alt="Safari Adventures App" 
                    className="rounded-xl shadow-2xl opacity-90"
                 />
              </div>
              <div className="w-full lg:w-1/2 space-y-6">
                 <div className="text-xs font-bold tracking-widest text-gray-400 uppercase">Featured Project</div>
                 <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                    Designing a digital experience <br />
                    for Safari Adventures Tanzania
                 </h2>
                 <div className="flex items-center space-x-1 text-white">
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <span className="ml-2 text-sm font-medium">5.0</span>
                 </div>
                 <p className="text-gray-400 text-lg leading-relaxed">
                    We worked with Safari Adventures to create a comprehensive mobile app that transformed how they connect with customers. The solution includes real-time booking, WhatsApp integration, and AI-powered customer support that handles inquiries in multiple languages.
                 </p>
                 <Button className="bg-white text-black hover:bg-gray-200 rounded-full px-6 mt-4">
                    Read Full Case Study <ArrowRight size={16} className="ml-2" />
                 </Button>
              </div>
           </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-gray-50 py-16 border-b border-gray-200">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
               <div>
                  <div className="text-4xl font-bold text-gray-900 mb-1">200+</div>
                  <div className="text-sm text-gray-500">Happy Clients</div>
               </div>
               <div>
                  <div className="text-4xl font-bold text-gray-900 mb-1">500+</div>
                  <div className="text-sm text-gray-500">Projects Delivered</div>
               </div>
               <div>
                  <div className="text-4xl font-bold text-gray-900 mb-1">10+</div>
                  <div className="text-sm text-gray-500">Industries Served</div>
               </div>
               <div>
                  <div className="text-4xl font-bold text-gray-900 mb-1">95%</div>
                  <div className="text-sm text-gray-500">Client Satisfaction</div>
               </div>
            </div>
         </div>
      </section>

      {/* Case Study 2 - Workplackers */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="flex flex-col-reverse md:flex-row gap-16 items-center">
             <div className="w-full md:w-1/2 space-y-6">
                 <div className="inline-block px-3 py-1 bg-gray-100 rounded-full text-xs font-bold text-gray-600 uppercase tracking-wider">Case Study</div>
                 <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Workplackers App</h2>
                 <div className="flex items-center space-x-1 text-black">
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <span className="ml-2 text-sm font-medium">5.0</span>
                 </div>
                 <p className="text-gray-600 leading-relaxed">
                   A mobile-first platform that revolutionizes how Tanzanian workers find employment opportunities. The app connects job seekers with employers, offering real-time notifications, in-app messaging, and integrated mobile money payments for application fees.
                 </p>
                 <ul className="space-y-3 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                       <span className="mt-1.5 w-1.5 h-1.5 bg-black rounded-full flex-shrink-0" />
                       Community-based collaboration that makes finding work easier for over 250,000 members seeking a profound cultural experience
                    </li>
                    <li className="flex items-start gap-2">
                       <span className="mt-1.5 w-1.5 h-1.5 bg-black rounded-full flex-shrink-0" />
                       AI-powered job matching that analyzes skills and experience
                    </li>
                    <li className="flex items-start gap-2">
                       <span className="mt-1.5 w-1.5 h-1.5 bg-black rounded-full flex-shrink-0" />
                       Seamless mobile-first design optimized for low-bandwidth networks
                    </li>
                 </ul>
                 <Button variant="outline" className="mt-4 rounded border-gray-300">
                    View Project Details <ArrowRight size={16} className="ml-2" />
                 </Button>
             </div>
             <div className="w-full md:w-1/2 bg-gray-50 rounded-2xl p-8 lg:p-12">
                <img 
                   src="https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                   alt="Workplackers App" 
                   className="rounded-xl shadow-xl transform rotate-3 hover:rotate-0 transition-all duration-500"
                />
             </div>
         </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-50 py-24">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-16 text-gray-900">What Our Clients Say</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                    {
                        quote: "RIC Tanzania transformed our digital presence completely. The website they built has increased our customer inquiries by 300%.",
                        name: "John Mwambu",
                        role: "CEO",
                        company: "Tanzania Tech Hub",
                        tag: "Technology"
                    },
                    {
                        quote: "Their social media management has helped us reach customers across East Africa. Professional and results-driven team.",
                        name: "Grace Kimaro",
                        role: "Marketing Director",
                        company: "Kilimanjaro Coffee Co.",
                        tag: "Agriculture"
                    },
                    {
                        quote: "The logo and branding package exceeded our expectations. They truly understood our vision and brought it to life.",
                        name: "Ahmed Hassan",
                        role: "Managing Director",
                        company: "Dar Construction Ltd",
                        tag: "Construction"
                    },
                    {
                        quote: "Our WhatsApp automation has revolutionized customer service. We can now handle 10x more inquiries efficiently.",
                        name: "Sarah Ndege",
                        role: "Operations Manager",
                        company: "Safari Adventures TZ",
                        tag: "Tourism"
                    },
                    {
                        quote: "The digital ads campaign brought us customers from all over the world. ROI was exceptional!",
                        name: "Fatma Ali",
                        role: "Owner",
                        company: "Zanzibar Spice Market",
                        tag: "Retail"
                    },
                    {
                        quote: "Professional, timely, and excellent results. Their content strategy has positioned us as thought leaders.",
                        name: "Dr. Peter Moshi",
                        role: "Dean",
                        company: "Tanzania Business School",
                        tag: "Education"
                    }
                ].map((t, i) => (
                    <div key={i} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col h-full">
                        <div className="text-4xl text-gray-300 font-serif mb-4">”</div>
                        <p className="text-gray-600 mb-6 flex-grow text-sm leading-relaxed">{t.quote}</p>
                        <div className="flex items-center gap-4 mt-auto">
                            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-500 text-xs">
                                {t.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                                <div className="font-bold text-sm text-gray-900">{t.name}</div>
                                <div className="text-xs text-gray-500">{t.company}</div>
                            </div>
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-50">
                            <span className="text-xs font-bold uppercase tracking-wider text-gray-400 bg-gray-50 px-2 py-1 rounded">{t.tag}</span>
                        </div>
                    </div>
                ))}
            </div>
         </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-2 text-gray-900">Portfolio</h2>
            <p className="text-gray-500">Recognition & Accomplishments</p>
         </div>

         {/* Category: Technology */}
         <div className="mb-20">
            <div className="flex justify-between items-end mb-8">
                <h3 className="text-xl font-bold text-gray-900">Technology</h3>
                <span className="text-sm text-gray-500 border border-gray-200 rounded-full px-3 py-1">3 Projects</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    { title: "N26 Banking App", desc: "Mobile app design that completely transformed how millions of users manage their finances.", tags: ["Mobile App", "FinTech", "UX Design"], img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
                    { title: "WhatsApp Business API Integration", desc: "Custom WhatsApp automation system handling 10,000+ daily customer interactions.", tags: ["API Integration", "Automation", "CRM"], img: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
                    { title: "E-Commerce Platform", desc: "Scalable e-commerce system with mobile money integration for African markets.", tags: ["Web Development", "E-Commerce", "Payment"], img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" }
                ].map((p, i) => (
                    <div key={i} className="group">
                        <div className="bg-gray-100 rounded-xl overflow-hidden mb-4 h-64">
                            <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>
                        <div className="flex flex-wrap gap-2 mb-3">
                            {p.tags.map((tag, t) => (
                                <span key={t} className="text-xs font-bold bg-gray-100 text-gray-600 px-2 py-1 rounded">{tag}</span>
                            ))}
                        </div>
                        <h4 className="font-bold text-lg mb-2 text-gray-900">{p.title}</h4>
                        <p className="text-sm text-gray-500">{p.desc}</p>
                    </div>
                ))}
            </div>
         </div>

         {/* Category: Design */}
         <div className="mb-20">
            <div className="flex justify-between items-end mb-8">
                <h3 className="text-xl font-bold text-gray-900">Design</h3>
                <span className="text-sm text-gray-500 border border-gray-200 rounded-full px-3 py-1">3 Projects</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    { title: "Safari Adventures Brand Identity", desc: "Logo design, brand guidelines, and marketing materials that capture the essence of African adventure.", tags: ["Branding", "Logo Design", "Identity"], img: "https://images.unsplash.com/photo-1600607686527-6fb886090705?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
                    { title: "Kilimanjaro Coffee Packaging", desc: "Modern packaging that honors traditional Tanzanian coffee heritage while appealing to global markets.", tags: ["Packaging", "Print Design", "Branding"], img: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
                    { title: "Dar Construction Website Redesign", desc: "Clean, professional web design highlighting construction projects with stunning photography.", tags: ["Web Design", "UI/UX", "Corporate"], img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" }
                ].map((p, i) => (
                    <div key={i} className="group">
                        <div className="bg-gray-100 rounded-xl overflow-hidden mb-4 h-64">
                             <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>
                        <div className="flex flex-wrap gap-2 mb-3">
                            {p.tags.map((tag, t) => (
                                <span key={t} className="text-xs font-bold bg-gray-100 text-gray-600 px-2 py-1 rounded">{tag}</span>
                            ))}
                        </div>
                        <h4 className="font-bold text-lg mb-2 text-gray-900">{p.title}</h4>
                        <p className="text-sm text-gray-500">{p.desc}</p>
                    </div>
                ))}
            </div>
         </div>

         {/* Category: Media */}
         <div className="mb-20">
            <div className="flex justify-between items-end mb-8">
                <h3 className="text-xl font-bold text-gray-900">Media</h3>
                <span className="text-sm text-gray-500 border border-gray-200 rounded-full px-3 py-1">3 Projects</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    { title: "Zanzibar Tourism Campaign", desc: "Facebook, Instagram, and Google Ads campaign that increased tourism bookings by 180%.", tags: ["Digital Ads", "Social Media", "Campaign"], img: "https://images.unsplash.com/photo-1534764879204-748956cc18d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
                    { title: "Radio Jingles for National Bank", desc: "Creative radio commercials in Swahili and English broadcast across major stations.", tags: ["Radio", "Audio Production", "Branding"], img: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
                    { title: "Social Media Management - Tech Hub", desc: "Strategic content creation and community management across all social platforms.", tags: ["Social Media", "Content", "Growth"], img: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" }
                ].map((p, i) => (
                    <div key={i} className="group">
                        <div className="bg-gray-100 rounded-xl overflow-hidden mb-4 h-64">
                             <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>
                        <div className="flex flex-wrap gap-2 mb-3">
                            {p.tags.map((tag, t) => (
                                <span key={t} className="text-xs font-bold bg-gray-100 text-gray-600 px-2 py-1 rounded">{tag}</span>
                            ))}
                        </div>
                        <h4 className="font-bold text-lg mb-2 text-gray-900">{p.title}</h4>
                        <p className="text-sm text-gray-500">{p.desc}</p>
                    </div>
                ))}
            </div>
         </div>
      </section>

      {/* Footer CTA */}
      <section className="bg-[#111111] text-white py-24 text-center">
         <div className="max-w-3xl mx-auto px-4">
             <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Growing List of Success Stories</h2>
             <p className="text-gray-400 mb-10 text-lg">Let's discuss how we can help your business thrive in the digital age</p>
             <Button className="bg-white text-black hover:bg-gray-200 rounded px-8 py-6 text-base font-bold">
                 Get Free Consultation
             </Button>
         </div>
      </section>

    </div>
  );
};

export default Clients;