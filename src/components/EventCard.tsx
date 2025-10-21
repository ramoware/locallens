'use client';

import { Event } from '@/db/schema';
import { useState } from 'react';
import { Calendar, MapPin, Tag, Edit3, Trash2 } from 'lucide-react';

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
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="bg-card-bg text-card-text rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold leading-tight">{event.title}</h3>
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="text-red-400 hover:text-red-300 transition-colors disabled:opacity-50"
        >
          <Trash2 size={18} />
        </button>
      </div>
      
      <p className="text-sm opacity-90 mb-4 line-clamp-3">{event.description}</p>
      
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm">
          <Calendar size={16} className="opacity-70" />
          <span>{formatDate(event.date)}</span>
        </div>
        
        <div className="flex items-center gap-2 text-sm">
          <MapPin size={16} className="opacity-70" />
          <span>{event.location}</span>
        </div>
        
        <div className="flex items-center gap-2 text-sm">
          <Tag size={16} className="opacity-70" />
          <span className="capitalize">{event.category}</span>
        </div>
      </div>
    </div>
  );
}