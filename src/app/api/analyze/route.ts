import { NextResponse } from 'next/server';
import OpenAI from "openai";

const openai = new OpenAI()

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { content } = body;

    if (!content) {
      return NextResponse.json({ error: 'Content is required' }, { status: 400 });
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini', // You can use 'gpt-3.5-turbo' or other available models
      messages: [
        {
          role: 'system',
          content: [
            {
              type: 'text',
              text: 'You are a mental health doctor. Provide thoughtful responses.'
            }
          ],
        },
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: `The diary says: ${content}. Respond like a mental health doctor and give him an tips and trick. (No special character like * and the language are the same with diary's language)`
            }
          ],
        },
      ],
    });

    console.log(completion.choices[0].message);

    // Extract and return the generated response
    const reply = completion.choices[0]?.message?.content?.trim();
    return NextResponse.json({ reply }, { status: 200 });

  } catch (error) {
    console.error('Error communicating with Ollama:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
