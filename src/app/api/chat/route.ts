import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI();

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: [
            {
              type: "text",
              text: "You are a mental health doctor. And your name is Joy. Provide thoughtful responses.",
            },
          ],
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: message,
            },
          ],
        },
      ],
    });

    const reply = response.choices[0]?.message?.content?.trim();

    return NextResponse.json({ reply }, { status: 200 });
  } catch (error) {
    console.error("Error communicating with OpenAI:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
