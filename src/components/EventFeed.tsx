'use client';

import { useState, useEffect } from 'react';
import { Event } from '@/db/schema';
import EventCard from './EventCard';
import EventForm from './EventForm';
import { Plus } from 'lucide-react';

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
    <section id="events-section" className="max-w-7xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="flex justify-between items-center mb-12">
        <div>
          <h2 className="text-4xl font-bold mb-4">Community Events</h2>
          <p className="text-xl opacity-90">Find and share local happenings</p>
        </div>
        <button
          onClick={() => setIsFormOpen(true)}
          className="bg-accent-purple text-card-text px-8 py-4 rounded-2xl font-semibold text-lg hover:scale-105 transform transition-all duration-300 flex items-center gap-3 shadow-lg"
        >
          <Plus size={24} />
          Add Event
        </button>
      </div>

      {/* Events Grid */}
      {events.length === 0 ? (
        <div className="text-center py-20">
          <div className="max-w-md mx-auto">
            {/* SVG Illustration */}
            <svg 
              className="mx-auto h-48 w-48 mb-8 opacity-70" 
              viewBox="0 0 200 200" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="8" fill="none"/>
              <path d="M60 80 L140 80 M60 120 L140 120 M60 100 L140 100" stroke="currentColor" strokeWidth="6"/>
              <circle cx="70" cy="60" r="12" fill="currentColor"/>
              <circle cx="130" cy="60" r="12" fill="currentColor"/>
            </svg>
            <h3 className="text-2xl font-semibold mb-4">No events yet</h3>
            <p className="text-lg opacity-80 mb-8">Be the first to share an event in your community!</p>
            <button
              onClick={() => setIsFormOpen(true)}
              className="bg-accent-purple text-card-text px-6 py-3 rounded-xl font-semibold hover:scale-105 transform transition-all duration-300"
            >
              Create First Event
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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