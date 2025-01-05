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

    // Retrieve query parameters for search, page, and id
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const search = searchParams.get('search') || ''; // Search query
    const page = parseInt(searchParams.get('page') || '1', 10); // Current page
    const pageSize = 5; // Number of diaries per page

    const loggedInUser = await db.user.findUnique({
      where: { clerkUserId: user.id },
    });

    if (!loggedInUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    if (id) {
      // Fetch diary by ID
      const diary = await db.diary.findUnique({
        where: { id },
      });

      if (!diary || diary.userId !== loggedInUser.id) {
        return NextResponse.json(
          { error: 'Diary not found or access denied' },
          { status: 404 }
        );
      }

      return NextResponse.json(diary, { status: 200 });
    }

    // Query diaries with search and pagination
    const diaries = await db.diary.findMany({
      where: {
        userId: loggedInUser.id,
        AND: [
          {
            OR: [
              { title: { contains: search, mode: 'insensitive' } },
              { content: { contains: search, mode: 'insensitive' } },
            ],
          },
        ],
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: { createdAt: 'desc' },
    });

    // Get the total count of diaries for pagination
    const totalDiaries = await db.diary.count({
      where: {
        userId: loggedInUser.id,
        AND: [
          {
            OR: [
              { title: { contains: search, mode: 'insensitive' } },
              { content: { contains: search, mode: 'insensitive' } },
            ],
          },
        ],
      },
    });

    // Calculate total pages
    const totalPages = Math.ceil(totalDiaries / pageSize);

    return NextResponse.json(
      {
        diaries,
        totalPages,
        currentPage: page,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to fetch diaries' },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id, title, content } = await req.json();

    if (!id || !title || !content) {
      return NextResponse.json({ error: 'Invalid request data' }, { status: 400 });
    }

    const loggedInUser = await db.user.findUnique({
      where: { clerkUserId: user.id },
    });

    if (!loggedInUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const diary = await db.diary.findUnique({
      where: { id },
    });

    if (!diary || diary.userId !== loggedInUser.id) {
      return NextResponse.json({ error: 'Diary not found or access denied' }, { status: 404 });
    }

    const updatedDiary = await db.diary.update({
      where: { id },
      data: { title, content },
    });

    return NextResponse.json(updatedDiary, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to update diary' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const user = await currentUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await req.json();

    const loggedInUser = await db.user.findUnique({
      where: { clerkUserId: user.id },
    });

    if (!loggedInUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const diary = await db.diary.findUnique({
      where: { id },
    });

    if (!diary || diary.userId !== loggedInUser.id) {
      return NextResponse.json({ error: 'Diary not found or access denied' }, { status: 404 });
    }

    const deleteDiary = await db.diary.delete({
      where: { id },
    });

    return NextResponse.json(deleteDiary, { status: 200 })
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to update diary' }, { status: 500 });
  }
}