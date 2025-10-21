'use client';

import { Rocket } from 'lucide-react';

export default function HeroSection() {
  const scrollToEvents = () => {
    document.getElementById('events-section')?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-4xl mx-auto">
        {/* LocalLens Logo with custom LL */}
        <div className="mb-8">
          <h1 className="text-8xl md:text-9xl font-bold mb-4 tracking-tight">
            Loca
            <span className="relative inline-block">
              <span className="text-accent-purple relative z-10">ll</span>
              {/* This is where your PNG will go - using a placeholder for now */}
              <div className="absolute inset-0 bg-accent-yellow rounded-lg transform rotate-6 scale-110 opacity-20"></div>
            </span>
            ens
          </h1>
          <p className="text-2xl md:text-3xl opacity-90 mb-12">
            Discover Hyperlocal Events in Your Community
          </p>
        </div>

        {/* Call to Action Button */}
        <button
          onClick={scrollToEvents}
          className="group bg-accent-purple text-card-text px-12 py-6 rounded-2xl font-bold text-xl hover:scale-110 transform transition-all duration-300 shadow-2xl flex items-center gap-4 mx-auto"
        >
          <span>Explore Events</span>
          <Rocket className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={24} />
        </button>

        {/* Scroll Indicator */}
        <div className="mt-20 animate-bounce">
          <div className="w-6 h-10 border-2 border-foreground rounded-full flex justify-center">
            <div className="w-1 h-3 bg-foreground rounded-full mt-2"></div>
          </div>
        </div>
      </div>
    </section>
  );
}