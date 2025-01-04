import { currentUser } from "@clerk/nextjs/server";
import { db } from "./prisma";

export const checkUser = async () => {
    const user = await currentUser();
    const name = `${user?.firstName} ${user?.lastName}`

    if(!user) {
        return null
    }

    try {
        const loggedInUser = await db.user.findUnique({
            where: {
                clerkUserId: user.id,
            },
        })

        if(loggedInUser) {
            return loggedInUser
        }

        const newUser = await db.user.create({
            data: {
                clerkUserId: user.id,
                name,
                imageUrl: user.imageUrl,
                email: user.emailAddresses[0].emailAddress
            }
        })

        return newUser
    } catch (error) {
        console.error(error)
    }
}

export const addDiaryEntry = async (title: string, content: string) => {
    const response = await fetch('/api/diary', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, content }),
    });
  
    if (!response.ok) {
      throw new Error('Failed to add diary entry');
    }
  
    return response.json();
  };