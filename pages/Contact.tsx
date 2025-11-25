import React from 'react';
import { Phone, Mail, MapPin, MessageSquare, Send } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Contact: React.FC = () => {
  const { settings } = useAuth();

  return (
    <div className="w-full bg-white">
      {/* Header */}
      <div className="bg-[#111111] text-white py-20 text-center">
         <h1 className="text-4xl font-bold mb-4">Get In Touch</h1>
         <p className="text-gray-400">Ready to transform your business? Let's talk about your digital needs</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 mb-20">
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Contact Info */}
            <div className="md:col-span-1 space-y-6">
               <div className="bg-white p-8 rounded-xl shadow-lg h-full border border-gray-100">
                  <h3 className="font-bold mb-6 text-lg">Contact Information</h3>
                  <p className="text-sm text-gray-500 mb-8">Get in touch with us through any of these channels</p>
                  
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center text-gray-600"><Phone size={20}/></div>
                      <div>
                        <div className="font-medium text-sm">Phone</div>
                        <div className="text-gray-500 text-sm">{settings.companyPhone}</div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center text-gray-600"><Mail size={20}/></div>
                      <div>
                        <div className="font-medium text-sm">Email</div>
                        <div className="text-gray-500 text-sm">{settings.companyEmail}</div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center text-gray-600"><MapPin size={20}/></div>
                      <div>
                        <div className="font-medium text-sm">Office</div>
                        <div className="text-gray-500 text-sm">{settings.companyAddress}</div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center text-gray-600"><MessageSquare size={20}/></div>
                      <div>
                        <div className="font-medium text-sm">WhatsApp</div>
                        <div className="text-gray-500 text-sm">Chat with us</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-10 bg-[#111111] text-white p-6 rounded-xl">
                     <h4 className="font-bold mb-2">Free Consultation</h4>
                     <p className="text-xs text-gray-400 mb-4 leading-relaxed">
                       Not sure where to start? Book a free 30-minute consultation. We'll help you understand which services are right for your business.
                     </p>
                     <button className="w-full bg-white text-black text-xs font-bold py-3 rounded text-center hover:bg-gray-200 transition">
                       Schedule Consultation
                     </button>
                  </div>
               </div>
            </div>

            {/* Form */}
            <div className="md:col-span-2">
               <div className="bg-white p-8 rounded-xl shadow-lg h-full border border-gray-100">
                  <h3 className="font-bold mb-6 text-lg">Send Us a Message</h3>
                  <p className="text-sm text-gray-500 mb-8">Fill out the form below and we'll get back to you within 24 hours</p>
                  
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div>
                         <label className="block text-xs font-medium text-gray-700 mb-2">Full Name *</label>
                         <input type="text" className="w-full border border-gray-200 rounded p-3 text-sm focus:ring-2 focus:ring-black focus:outline-none" placeholder="Your name" />
                       </div>
                       <div>
                         <label className="block text-xs font-medium text-gray-700 mb-2">Email *</label>
                         <input type="email" className="w-full border border-gray-200 rounded p-3 text-sm focus:ring-2 focus:ring-black focus:outline-none" placeholder="your@email.com" />
                       </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div>
                         <label className="block text-xs font-medium text-gray-700 mb-2">Phone Number</label>
                         <input type="text" className="w-full border border-gray-200 rounded p-3 text-sm focus:ring-2 focus:ring-black focus:outline-none" placeholder="+255 XXX XXX XXX" />
                       </div>
                       <div>
                         <label className="block text-xs font-medium text-gray-700 mb-2">Service Interested In</label>
                         <input type="text" className="w-full border border-gray-200 rounded p-3 text-sm focus:ring-2 focus:ring-black focus:outline-none" placeholder="e.g., Logo Design" />
                       </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-2">Message *</label>
                      <textarea rows={4} className="w-full border border-gray-200 rounded p-3 text-sm focus:ring-2 focus:ring-black focus:outline-none" placeholder="Tell us about your project..."></textarea>
                    </div>

                    <button type="button" className="bg-black text-white px-6 py-3 rounded text-sm font-medium flex items-center space-x-2 hover:bg-gray-800 transition">
                      <Send size={16} />
                      <span>Send Message</span>
                    </button>
                  </form>
               </div>
            </div>

         </div>

         {/* Office Hours */}
         <div className="mt-20 text-center">
            <h3 className="text-2xl font-bold mb-10">Office Hours</h3>
            <div className="flex flex-col md:flex-row justify-center gap-6">
               <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 w-full md:w-80 text-left">
                  <div className="font-bold mb-2">Weekdays</div>
                  <div className="text-gray-500 text-sm mb-4">Monday - Friday</div>
                  <div className="text-lg font-medium">8:00 AM - 6:00 PM EAT</div>
               </div>
               <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 w-full md:w-80 text-left">
                  <div className="font-bold mb-2">Weekends</div>
                  <div className="text-gray-500 text-sm mb-4">Saturday</div>
                  <div className="text-lg font-medium">9:00 AM - 2:00 PM EAT</div>
               </div>
            </div>
            <p className="text-gray-400 text-xs mt-8">For urgent matters outside office hours, contact us via WhatsApp</p>
         </div>
      </div>
    </div>
  );
};

export default Contact;