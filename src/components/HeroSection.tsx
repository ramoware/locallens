'use client';

import { Rocket, MapPin, Calendar, Users } from 'lucide-react';

export default function HeroSection() {
  const scrollToEvents = () => {
    document.getElementById('events-section')?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent-purple rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-yellow rounded-full blur-3xl"></div>
      </div>

      <div className="text-center max-w-6xl mx-auto relative z-10">
        {/* LocalLens Logo */}
        <div className="mb-12">
          <span className="relative inline-block">
           <img 
             src="/locallens-logo.png" 
             alt="locallens-logo" 
             className="h-[360px] w-[1280px] inline-block -mb-4 mx-1"
            />
          </span>          

          <div className="w-24 h-1 bg-gradient-to-r from-accent-purple to-accent-yellow mx-auto mb-8 rounded-full"></div>
          <p className="text-2xl md:text-3xl opacity-90 mb-12 leading-relaxed max-w-3xl mx-auto">
            Discover <span className="text-accent-yellow font-semibold">hyperlocal events</span> that make your community come alive
          </p>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 max-w-4xl mx-auto">
          {[
            { icon: MapPin, text: "Neighborhood Focus", color: "from-green-400 to-emerald-500" },
            { icon: Calendar, text: "Real-time Updates", color: "from-purple-400 to-purple-600" },
            { icon: Users, text: "Community Driven", color: "from-yellow-400 to-yellow-600" },
          ].map((item, index) => (
            <div key={index} className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10">
              <div className={`p-3 rounded-xl bg-gradient-to-r ${item.color} text-white`}>
                <item.icon size={24} />
              </div>
              <span className="text-lg font-medium">{item.text}</span>
            </div>
          ))}
        </div>

        {/* Call to Action Button */}
        <button
          onClick={scrollToEvents}
          className="group relative bg-gradient-to-r from-accent-purple to-purple-700 text-card-text px-16 py-6 rounded-2xl font-bold text-xl hover:scale-105 transform transition-all duration-500 shadow-2xl hover:shadow-3xl"
        >
          <span className="relative z-10 flex items-center gap-4">
            Explore Local Events
            <Rocket className="group-hover:translate-x-2 group-hover:-translate-y-1 transition-transform duration-300" size={24} />
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-accent-yellow to-yellow-400 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
        </button>

        {/* Enhanced Scroll Indicator */}
        <div className="mt-24">
          <div className="text-sm opacity-60 mb-4">Scroll to explore</div>
          <div className="animate-bounce inline-flex flex-col items-center">
            <div className="w-1 h-8 bg-gradient-to-b from-accent-yellow to-transparent rounded-full"></div>
            <div className="w-1 h-8 bg-gradient-to-b from-accent-purple to-transparent rounded-full mt-2"></div>
          </div>
        </div>
      </div>
    </section>
  );
}