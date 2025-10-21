'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { EventFormData, eventSchema } from '@/lib/validations';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { X } from 'lucide-react';

interface EventFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEventCreated: () => void;
}

const categories = [
  { value: 'music', label: '🎵 Music' },
  { value: 'art', label: '🎨 Art' },
  { value: 'food', label: '🍕 Food' },
  { value: 'sports', label: '⚽ Sports' },
  { value: 'tech', label: '💻 Tech' },
  { value: 'community', label: '🏘️ Community' },
  { value: 'other', label: '🌟 Other' },
];

export default function EventForm({ open, onOpenChange, onEventCreated }: EventFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
  });

  const onSubmit = async (data: EventFormData) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        reset();
        onEventCreated();
        onOpenChange(false); // Close modal on success
      } else {
        console.error('Failed to create event');
      }
    } catch (error) {
      console.error('Failed to create event:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-background rounded-2xl p-6 w-full max-w-md border border-gray-700 shadow-2xl z-50">
          <div className="flex justify-between items-center mb-6">
            <Dialog.Title className="text-2xl font-bold">Create New Event</Dialog.Title>
            <Dialog.Close asChild>
              <button className="text-gray-400 hover:text-white transition-colors rounded-full p-1">
                <X size={24} />
              </button>
            </Dialog.Close>
          </div>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-2">
                Event Title
              </label>
              <input
                type="text"
                id="title"
                {...register('title')}
                className="w-full p-3 rounded-xl bg-gray-800 text-white border border-gray-600 focus:border-accent-purple focus:ring-2 focus:ring-accent-purple transition-all"
                placeholder="Enter event title"
              />
              {errors.title && (
                <p className="text-red-400 text-sm mt-1">{errors.title.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium mb-2">
                Description
              </label>
              <textarea
                id="description"
                rows={3}
                {...register('description')}
                className="w-full p-3 rounded-xl bg-gray-800 text-white border border-gray-600 focus:border-accent-purple focus:ring-2 focus:ring-accent-purple transition-all"
                placeholder="Describe your event"
              />
              {errors.description && (
                <p className="text-red-400 text-sm mt-1">{errors.description.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium mb-2">
                Location
              </label>
              <input
                type="text"
                id="location"
                {...register('location')}
                className="w-full p-3 rounded-xl bg-gray-800 text-white border border-gray-600 focus:border-accent-purple focus:ring-2 focus:ring-accent-purple transition-all"
                placeholder="Where is the event?"
              />
              {errors.location && (
                <p className="text-red-400 text-sm mt-1">{errors.location.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium mb-2">
                Category
              </label>
              <select
                id="category"
                {...register('category')}
                className="w-full p-3 rounded-xl bg-gray-800 text-white border border-gray-600 focus:border-accent-purple focus:ring-2 focus:ring-accent-purple transition-all"
              >
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-red-400 text-sm mt-1">{errors.category.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="date" className="block text-sm font-medium mb-2">
                Date & Time
              </label>
              <input
                type="datetime-local"
                id="date"
                {...register('date')}
                className="w-full p-3 rounded-xl bg-gray-800 text-white border border-gray-600 focus:border-accent-purple focus:ring-2 focus:ring-accent-purple transition-all"
              />
              {errors.date && (
                <p className="text-red-400 text-sm mt-1">{errors.date.message}</p>
              )}
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <Dialog.Close asChild>
                <button
                  type="button"
                  className="px-6 py-3 text-sm font-medium text-gray-300 hover:text-white transition-colors"
                >
                  Cancel
                </button>
              </Dialog.Close>
              <button
                type="submit"
                disabled={isLoading}
                className="bg-accent-purple text-card-text px-6 py-3 rounded-xl font-semibold disabled:opacity-50 hover:scale-105 transform transition-all duration-300"
              >
                {isLoading ? 'Creating...' : 'Create Event'}
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}