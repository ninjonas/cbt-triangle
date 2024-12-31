import { NextResponse, NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';
import logger from '../../utils/logger';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    // Ensure all required fields are persisted
    const entry = await prisma.entry.create({
      data: {
        situation: data.situation,                     // Persist situation as a string
        thoughts: data.thoughts.join(','),             // Convert array to comma-separated string
        feelings: JSON.stringify(data.feelings),      // Convert feelings to JSON string
        pleasantness: data.pleasantness,               // Persist pleasantness as an integer
        unpleasantness: data.unpleasantness,           // Persist unpleasantness as an integer
        behaviors: data.behaviors.join(','),           // Convert array to comma-separated string
        coreBeliefs: JSON.stringify(data.coreBeliefs), // Convert core beliefs to JSON string
      },
    });

    logger.info('Entry saved successfully: ' + JSON.stringify(entry));
    return NextResponse.json(entry, { status: 201 });
  } catch (error: any) {
    logger.error('Error saving entry: ' + error.message);
    return NextResponse.json({ error: 'Failed to save entry' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (id) {
    // Fetch a single entry by ID
    try {
      const entry = await prisma.entry.findUnique({
        where: { id: String(id) },
      });
      if (entry) {
        return NextResponse.json(entry, { status: 200 });
      } else {
        logger.warn('Entry not found: ' + id);
        return NextResponse.json({ error: 'Entry not found' }, { status: 404 });
      }
    } catch (error: any) {
      logger.error('Error fetching entry: ' + error.message);
      return NextResponse.json({ error: 'Failed to fetch entry' }, { status: 500 });
    }
  } else {
    // Fetch all entries
    try {
      const entries = await prisma.entry.findMany({
        select: {
          id: true,
          situation: true,
          updatedAt: true,
        },
        orderBy: {
          updatedAt: 'desc',
        },
      });

      return NextResponse.json(entries, { status: 200 });
    } catch (error: any) {
      logger.error('Error fetching entries: ' + error.message);
      return NextResponse.json({ error: 'Failed to fetch entries' }, { status: 500 });
    }
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  }

  try {
    await prisma.entry.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Entry deleted successfully' }, { status: 200 });
  } catch (error: any) {
    logger.error('Error deleting entry: ' + error.message);
    return NextResponse.json({ error: 'Failed to delete entry' }, { status: 500 });
  }
}