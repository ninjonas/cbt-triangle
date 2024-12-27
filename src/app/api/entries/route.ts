import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import logger from '../../utils/logger';

const prisma = new PrismaClient();

export async function POST(req: Request) {
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
