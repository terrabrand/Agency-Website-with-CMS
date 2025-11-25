import React from 'react';
import { ArrowRight, Sparkles, Palette, Code, Megaphone, Bot, Mail, MessageSquare } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  return (
    <div className="w-full bg-white text-gray-900 font-sans">
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-20 md:pt-32 md:pb-32">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex-1 space-y-8">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] uppercase text-gray-950">
              Hi, We're RIC <br />
              Tanzania. <br />
              A Digital <br />
              Agency <br />
              Based in <span className="text-gray-900">Dar</span> <br />
              <span className="text-gray-900">es Salaam</span>
            </h1>
            
            <div className="flex items-center space-x-3 text-xs md:text-sm font-bold tracking-widest uppercase mt-4 text-gray-900">
              <span>● Design</span>
              <span>● Development</span>
              <span>● Strategy</span>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <Button asChild className="rounded-md bg-gray-950 text-white hover:bg-gray-800 px-8 py-6 text-sm font-bold uppercase tracking-wide">
                <a href="#contact">Get a project?</a>
              </Button>
              <Button asChild variant="outline" className="rounded-md border-gray-200 px-8 py-6 text-sm font-bold uppercase tracking-wide hover:bg-gray-50 bg-white text-gray-900">
                <Link to="/contact">Let's talk.</Link>
              </Button>
            </div>
          </div>
          
          <div className="flex-1 flex justify-center md:justify-end relative">
             <div className="w-72 h-72 md:w-[450px] md:h-[450px] lg:w-[500px] lg:h-[500px] rounded-full overflow-hidden relative z-10 border-4 border-white shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="RIC Tanzania Team" 
                  className="w-full h-full object-cover"
                />
             </div>
             {/* Abstract circle line */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] rounded-full border border-gray-200 -z-0 hidden md:block"></div>
          </div>
        </div>
      </section>

      {/* Marquee Bar */}
      <div className="bg-black text-white py-6 overflow-hidden">
        <div className="flex w-max animate-marquee whitespace-nowrap text-sm font-bold tracking-widest uppercase">
          {[...Array(10)].map((_, i) => (
            <React.Fragment key={i}>
              <span className="mx-6">● Design</span>
              <span className="mx-6">● Branding</span>
              <span className="mx-6">● Development</span>
              <span className="mx-6">● Strategy</span>
              <span className="mx-6">● Product Design</span>
              <span className="mx-6">● Motion Graphics</span>
              <span className="mx-6">● AI Solutions</span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Intro Section */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16 mb-20">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">RIC Tanzania</div>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900">
              Leading digital agency and creative director.
            </h2>
          </div>
          <div className="space-y-8">
            <p className="text-gray-600 text-lg leading-relaxed">
              We empower Tanzanian businesses with world-class digital solutions. From brand identity to cutting-edge AI automation, we combine international best practices with deep local market knowledge.
            </p>
            <div className="grid grid-cols-3 gap-8">
              <div>
                <div className="text-xs font-bold uppercase text-gray-400 mb-1">Location</div>
                <div className="font-bold text-gray-900">Dar es Salaam</div>
              </div>
              <div>
                <div className="text-xs font-bold uppercase text-gray-400 mb-1">Experience</div>
                <div className="font-bold text-gray-900">5+ Years</div>
              </div>
              <div>
                <div className="text-xs font-bold uppercase text-gray-400 mb-1">Since</div>
                <div className="font-bold text-gray-900">2019</div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 border border-gray-200 divide-y md:divide-y-0 md:divide-x divide-gray-200">
           <div className="p-12 lg:p-16 text-center">
              <div className="text-6xl font-bold mb-4 text-gray-900">5+</div>
              <div className="text-xs font-bold uppercase tracking-widest text-gray-500">Years of Experience</div>
           </div>
           <div className="p-12 lg:p-16 text-center bg-black text-white">
              <div className="text-6xl font-bold mb-4">150+</div>
              <div className="text-xs font-bold uppercase tracking-widest text-gray-400">Projects Completed</div>
           </div>
           <div className="p-12 lg:p-16 text-center">
              <div className="text-6xl font-bold mb-4 text-gray-900">80+</div>
              <div className="text-xs font-bold uppercase tracking-widest text-gray-500">Happy Clients</div>
           </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-16">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-5 h-5 text-gray-900" />
              </div>
              <h2 className="text-4xl font-bold mb-4 text-gray-900">Services</h2>
              <p className="text-gray-500 uppercase tracking-widest text-sm font-medium">Expertise & Capabilities</p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Palette, title: "Design & Creative", desc: "Crafting visually stunning designs that connect with your audience." },
                { icon: Code, title: "Development", desc: "Building digital experiences with the latest technology and best practices." },
                { icon: Megaphone, title: "Strategy", desc: "Data-driven strategies to grow your brand and reach your goals." },
                { icon: Bot, title: "AI Solutions", desc: "Leveraging AI to automate and optimize your business processes." },
              ].map((s, i) => (
                <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:border-gray-200 hover:shadow-md transition duration-300">
                   <s.icon className="w-8 h-8 mb-6 text-gray-900" />
                   <h3 className="text-lg font-bold mb-3 text-gray-900">{s.title}</h3>
                   <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Recognition Section */}
      <section className="py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="text-center mb-16">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-5 h-5 text-gray-900" />
            </div>
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Recognition</h2>
            <p className="text-gray-500 uppercase tracking-widest text-sm font-medium">Achievements & Milestones</p>
         </div>

         <div className="space-y-4">
            {[
              { id: 1, title: "Top Digital Agency Tanzania", category: "Business", year: "2024" },
              { id: 2, title: "Best Social Media Campaign", category: "Marketing", year: "2023" },
              { id: 3, title: "Excellence in Web Development", category: "Design", year: "2023" },
              { id: 4, title: "Innovation in AI Solutions", category: "Technology", year: "2024" },
            ].map((award) => (
              <div key={award.id} className="group flex items-center justify-between p-6 md:p-8 bg-white border border-gray-100 rounded-2xl hover:border-gray-300 transition-all duration-300 hover:shadow-sm cursor-default">
                 <div className="flex items-center gap-6 md:gap-8">
                    <div className="w-10 h-10 bg-gray-900 text-white flex items-center justify-center font-bold rounded-md flex-shrink-0">
                      {award.id}
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-bold text-gray-900 group-hover:text-black">{award.title}</h3>
                      <p className="text-xs text-gray-400 uppercase tracking-wider mt-1">{award.category}</p>
                    </div>
                 </div>
                 <div className="text-sm font-bold text-gray-900">{award.year}</div>
              </div>
            ))}
         </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gray-50/50 text-center border-t border-gray-100">
         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-8 text-3xl shadow-sm">👋</div>
            <h2 className="text-4xl md:text-5xl font-bold mb-10 tracking-tight text-gray-900">
              Tell me about your next project
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild className="rounded-md px-8 py-6 text-base bg-gray-900 text-white hover:bg-gray-800">
                <Link to="/contact">
                   <Mail className="mr-2 h-5 w-5" /> Email Me
                </Link>
              </Button>
              <Button asChild variant="outline" className="rounded-md px-8 py-6 text-base bg-white text-gray-900 border-gray-200 hover:bg-gray-50">
                 <a href="https://wa.me/255XXXXXXXXX" target="_blank" rel="noopener noreferrer">
                   <MessageSquare className="mr-2 h-5 w-5" /> WhatsApp
                 </a>
              </Button>
            </div>
         </div>
      </section>

    </div>
  );
};

export default About;