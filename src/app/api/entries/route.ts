import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import logger from '../../utils/logger'

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const entry = await prisma.entry.create({
      data: {
        thoughts: data.thoughts.join(','),             // Convert array to comma-separated string
        feelings: JSON.stringify(data.feelings),      // Convert feelings to JSON string
        behaviors: data.behaviors.join(','),          // Convert array to comma-separated string
        coreBeliefs: JSON.stringify(data.coreBeliefs) // Convert cognitions to JSON string
      },
    });

    logger.info('Entry saved successfully: ' + JSON.stringify(entry));
    return NextResponse.json(entry, { status: 201 });
  } catch (error: any) {
    logger.error('Error saving entry: ' + error.message);
    return NextResponse.json({ error: 'Failed to save entry' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const entries = await prisma.entry.findMany();

    const formattedEntries = entries.map((entry) => ({
      ...entry,
      thoughts: entry.thoughts.split(','),             // Convert string back to array
      feelings: JSON.parse(entry.feelings),           // Parse JSON string to object
      behaviors: entry.behaviors.split(','),          // Convert string back to array
      coreBeliefs: JSON.parse(entry.coreBeliefs)      // Parse JSON string to object
    }));

    logger.info('Fetched entries successfully');
    return NextResponse.json(formattedEntries);
  } catch (error: any) {
    logger.error('Error fetching entries: ' + error.message);
    return NextResponse.json({ error: 'Failed to fetch entries' }, { status: 500 });
  }
}
