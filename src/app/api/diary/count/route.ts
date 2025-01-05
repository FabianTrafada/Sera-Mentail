import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export async function GET() {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const loggedInUser = await db.user.findUnique({
      where: { clerkUserId: user.id },
    });

    if (!loggedInUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Hitung jumlah diary berdasarkan userId
    const diaryCount = await db.diary.count({
      where: { userId: loggedInUser.id },
    });
  
    return NextResponse.json({ count: diaryCount }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch diary count" }, { status: 500 });
  }
}
