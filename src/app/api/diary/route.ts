import { db } from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { title, content } = await req.json();

    const loggedInUser = await db.user.findUnique({
      where: { clerkUserId: user.id },
    });

    if (!loggedInUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const diary = await db.diary.create({
      data: {
        title,
        content,
        userId: loggedInUser.id,
      },
    });

    return NextResponse.json(diary, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to save diary' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const loggedInUser = await db.user.findUnique({
      where: { clerkUserId: user.id },
      include: { diaries: true },
    });

    if (!loggedInUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(loggedInUser.diaries, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch diaries' }, { status: 500 });
  }
}
