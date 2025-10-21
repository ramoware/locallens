import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { events } from '@/db/schema';
import { eventSchema } from '@/lib/validations';
import { getOrCreateSession } from '@/lib/session';
import { eq, and } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  try {
    const sessionId = await getOrCreateSession();
    const json = await request.json();
    
    // Validate input
    const validatedData = eventSchema.parse(json);
    
    // Convert date string to ISO string
    const eventDate = new Date(validatedData.date).toISOString();
    
    // Insert into database
    const [event] = await db.insert(events).values({
      ...validatedData,
      date: eventDate,
      sessionId,
    }).returning();
    
    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    console.error('POST /api/events error:', error);
    return NextResponse.json(
      { error: 'Failed to create event' },
      { status: 400 }
    );
  }
}

export async function GET() {
  try {
    const allEvents = await db
      .select()
      .from(events)
      .orderBy(events.date);
    
    return NextResponse.json(allEvents);
  } catch (error) {
    console.error('GET /api/events error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const sessionId = await getOrCreateSession();
    const json = await request.json();
    const { id, ...updateData } = json;
    
    if (!id) {
      return NextResponse.json(
        { error: 'Event ID is required' },
        { status: 400 }
      );
    }
    
    // Validate input
    const validatedData = eventSchema.parse(updateData);
    
    // Check if event exists and belongs to session
    const existingEvent = await db
      .select()
      .from(events)
      .where(and(eq(events.id, id), eq(events.sessionId, sessionId)))
      .limit(1);
    
    if (existingEvent.length === 0) {
      return NextResponse.json(
        { error: 'Event not found or access denied' },
        { status: 404 }
      );
    }
    
    // Prepare update values with proper typing
    const updateValues: {
      title: string;
      description: string;
      location: string;
      category: string;
      date?: string;
    } = {
      title: validatedData.title,
      description: validatedData.description,
      location: validatedData.location,
      category: validatedData.category,
    };
    
    // Only update date if it's provided and valid
    if (validatedData.date) {
      updateValues.date = new Date(validatedData.date).toISOString();
    }
    
    // Update event
    const [updatedEvent] = await db
      .update(events)
      .set(updateValues)
      .where(and(eq(events.id, id), eq(events.sessionId, sessionId)))
      .returning();
    
    return NextResponse.json(updatedEvent);
  } catch (error) {
    console.error('PUT /api/events error:', error);
    return NextResponse.json(
      { error: 'Failed to update event' },
      { status: 400 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const sessionId = await getOrCreateSession();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: 'Event ID is required' },
        { status: 400 }
      );
    }
    
    // Check if event exists and belongs to session
    const existingEvent = await db
      .select()
      .from(events)
      .where(and(eq(events.id, parseInt(id)), eq(events.sessionId, sessionId)))
      .limit(1);
    
    if (existingEvent.length === 0) {
      return NextResponse.json(
        { error: 'Event not found or access denied' },
        { status: 404 }
      );
    }
    
    // Delete event
    await db
      .delete(events)
      .where(and(eq(events.id, parseInt(id)), eq(events.sessionId, sessionId)));
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DELETE /api/events error:', error);
    return NextResponse.json(
      { error: 'Failed to delete event' },
      { status: 500 }
    );
  }
}