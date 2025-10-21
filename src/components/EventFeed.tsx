'use client';

import { useState, useEffect } from 'react';
import { Event } from '@/db/schema';
import EventCard from './EventCard';
import EventForm from './EventForm';
import { Plus, Sparkles } from 'lucide-react';

export default function EventFeed() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const fetchEvents = async () => {
    try {
      const response = await fetch('/api/events');
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error('Failed to fetch events:', error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleEventCreated = () => {
    fetchEvents();
    setIsFormOpen(false);
  };

  return (
    <section id="events-section" className="max-w-7xl mx-auto px-4 py-20">
      {/* Enhanced Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-3 bg-gradient-to-r from-accent-purple/20 to-accent-yellow/20 px-6 py-3 rounded-2xl mb-6">
          <Sparkles size={20} className="text-accent-yellow" />
          <span className="text-sm font-semibold text-accent-yellow">Community Events</span>
          <Sparkles size={20} className="text-accent-yellow" />
        </div>
        <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-accent-yellow bg-clip-text text-transparent">
          Discover Local Happenings
        </h2>
        <p className="text-xl opacity-80 max-w-2xl mx-auto leading-relaxed">
          Find and share the best events in your neighborhood. From concerts to community gatherings, never miss out on what's happening around you.
        </p>
      </div>

      {/* Action Bar */}
      <div className="flex justify-between items-center mb-12 p-6 bg-gradient-to-r from-accent-purple/10 to-transparent rounded-2xl border border-accent-purple/20">
        <div>
          <h3 className="text-2xl font-semibold mb-2">
            {events.length} {events.length === 1 ? 'Event' : 'Events'} Nearby
          </h3>
          <p className="opacity-70">Join your community in these amazing experiences</p>
        </div>
        <button
          onClick={() => setIsFormOpen(true)}
          className="group bg-gradient-to-r from-accent-purple to-purple-700 text-card-text px-8 py-4 rounded-2xl font-semibold text-lg hover:scale-105 transform transition-all duration-300 shadow-2xl flex items-center gap-3 hover:shadow-3xl"
        >
          <Plus size={24} className="group-hover:rotate-90 transition-transform duration-300" />
          Create Event
        </button>
      </div>

      {/* Events Grid */}
      {events.length === 0 ? (
        <div className="text-center py-20">
          <div className="max-w-md mx-auto">
            {/* Enhanced SVG Illustration */}
            <div className="relative mb-8">
              <svg 
                className="mx-auto h-48 w-48 opacity-70" 
                viewBox="0 0 200 200" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="8" fill="none" opacity="0.3"/>
                <path d="M60 80 L140 80 M60 120 L140 120 M60 100 L140 100" stroke="currentColor" strokeWidth="6" opacity="0.5"/>
                <circle cx="70" cy="60" r="12" fill="currentColor" opacity="0.7"/>
                <circle cx="130" cy="60" r="12" fill="currentColor" opacity="0.7"/>
                {/* Floating elements */}
                <circle cx="50" cy="150" r="8" fill="#ffde59" opacity="0.6">
                  <animate attributeName="cy" values="150;140;150" dur="2s" repeatCount="indefinite"/>
                </circle>
                <circle cx="150" cy="50" r="6" fill="#6a0dad" opacity="0.6">
                  <animate attributeName="cx" values="150;160;150" dur="3s" repeatCount="indefinite"/>
                </circle>
              </svg>
            </div>
            <h3 className="text-3xl font-semibold mb-4 bg-gradient-to-r from-white to-accent-yellow bg-clip-text text-transparent">
              No Events Yet
            </h3>
            <p className="text-lg opacity-80 mb-8 leading-relaxed">
              Be the pioneer! Share the first event and kickstart your community's social calendar.
            </p>
            <button
              onClick={() => setIsFormOpen(true)}
              className="bg-gradient-to-r from-accent-purple to-purple-700 text-card-text px-8 py-4 rounded-2xl font-semibold hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Start the Movement
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <EventCard key={event.id} event={event} onEventUpdated={fetchEvents} />
          ))}
        </div>
      )}

      <EventForm
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        onEventCreated={handleEventCreated}
      />
    </section>
  );
}