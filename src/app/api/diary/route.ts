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

export async function GET(req: Request) {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Retrieve query parameters for search and page
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || ""; // Search query
    const page = parseInt(searchParams.get("page") || "1", 10); // Current page
    const pageSize = 5; // Number of diaries per page

    const loggedInUser = await db.user.findUnique({
      where: { clerkUserId: user.id },
    });

    if (!loggedInUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Query diaries with search and pagination
    const diaries = await db.diary.findMany({
      where: {
        userId: loggedInUser.id,
        AND: [
          {
            OR: [
              { title: { contains: search, mode: 'insensitive' } },
              { content: { contains: search, mode: 'insensitive' } }
            ]
          }
        ]
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: { createdAt: 'desc' },
    });

    const totalDiaries = await db.diary.count({
      where: {
        userId: loggedInUser.id,
        AND: [
          {
            OR: [
              { title: { contains: search, mode: 'insensitive' } },
              { content: { contains: search, mode: 'insensitive' } }
            ]
          }
        ]
      },
    });

    const totalPages = Math.ceil(totalDiaries / pageSize);

    return NextResponse.json({
      diaries,
      totalPages, 
      currentPage: page,
    }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch diaries' }, { status: 500 });
  }
}
