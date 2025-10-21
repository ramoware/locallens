import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const events = pgTable('events', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  location: text('location').notNull(),
  category: text('category').notNull(),
  date: timestamp('date', { mode: 'string' }).notNull(), // Changed to string mode
  sessionId: text('session_id').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export type Event = typeof events.$inferSelect;
export type NewEvent = typeof events.$inferInsert;