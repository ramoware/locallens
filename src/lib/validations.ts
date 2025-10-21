import { z } from 'zod';

export const eventSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title too long'),
  description: z.string().min(1, 'Description is required').max(500, 'Description too long'),
  location: z.string().min(1, 'Location is required').max(200, 'Location too long'),
  category: z.enum(['music', 'art', 'food', 'sports', 'tech', 'community', 'other']),
  date: z.string().min(1, 'Date is required'), // We'll validate date format in the API
});

export type EventFormData = z.infer<typeof eventSchema>;