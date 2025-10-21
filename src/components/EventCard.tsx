'use client';

import { Event } from '@/db/schema';
import { useState } from 'react';
import { Calendar, MapPin, Tag, Trash2, Users } from 'lucide-react';

interface EventCardProps {
  event: Event;
  onEventUpdated: () => void;
}

export default function EventCard({ event, onEventUpdated }: EventCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this event?')) return;

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/events?id=${event.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        onEventUpdated();
      } else {
        console.error('Failed to delete event');
      }
    } catch (error) {
      console.error('Failed to delete event:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      }),
      time: date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      })
    };
  };

  const { date, time } = formatDate(event.date);

  return (
    <div className="group relative bg-gradient-to-br from-card-bg to-purple-900 text-card-text rounded-3xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 border border-purple-500/20">
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10">
        {/* Header with date badge */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-bold leading-tight truncate">{event.title}</h3>
            <div className="flex items-center gap-2 mt-2">
              <div className="bg-accent-yellow/20 text-accent-yellow px-3 py-1 rounded-full text-xs font-medium">
                {date}
              </div>
              <div className="text-accent-yellow/80 text-xs font-medium">
                {time}
              </div>
            </div>
          </div>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="flex-shrink-0 text-red-300/70 hover:text-red-300 transition-all duration-300 hover:scale-110 p-2 rounded-lg hover:bg-red-500/10"
          >
            <Trash2 size={18} />
          </button>
        </div>
        
        {/* Description */}
        <p className="text-sm opacity-90 mb-6 leading-relaxed line-clamp-3">
          {event.description}
        </p>
        
        {/* Details */}
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-sm">
            <div className="bg-accent-purple/20 p-2 rounded-lg">
              <MapPin size={16} className="text-accent-purple" />
            </div>
            <span className="flex-1 truncate">{event.location}</span>
          </div>
          
          <div className="flex items-center gap-3 text-sm">
            <div className="bg-accent-purple/20 p-2 rounded-lg">
              <Tag size={16} className="text-accent-purple" />
            </div>
            <span className="capitalize bg-accent-purple/30 px-3 py-1 rounded-full text-xs font-medium">
              {event.category}
            </span>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <div className="bg-accent-purple/20 p-2 rounded-lg">
              <Users size={16} className="text-accent-purple" />
            </div>
            <span className="text-xs opacity-75">Local Community</span>
          </div>
        </div>
      </div>
    </div>
  );
}