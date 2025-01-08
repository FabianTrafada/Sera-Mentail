import { NextResponse } from 'next/server';
import OpenAI from "openai";

const openai = new OpenAI()

// const openai = new OpenAIApi(
//   new Configuration({
//     apiKey: process.env.OPENAI_API_KEY,
//   })
// );

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
              text: `The diary says: ${content}. Respond like a mental health doctor. (REMOVE STYLING LIKE * \n, and the language are the same with diary's language)`
            }
          ],
        },
      ],
    });

    console.log(completion.choices[0].message);

    // Extract and return the generated response
    const reply = completion.choices[0]?.message?.content;
    return NextResponse.json({ reply }, { status: 200 });

    // const response = await ollama.chat({
    //   model: 'llama3.2',
    //   messages: [{ role: 'user', content: `Imagine you are a mental doctor, there is a patient who comes to you, he has a diary, well the contents of his diary are ${content}, reply reply with a tips and trick like a mental doctor. (NO QUESTION)` }],
    // })

    // Send the content to the Ollama API
    // const response = await fetch('http://localhost:11434/api/generate', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     model: 'llama3.2',
    //     prompt: `Imagine you are a mental doctor, there is a patient who comes to you, he has a diary, well the contents of his diary are ${content}, reply reply with a tips and trick like a mental doctor. (NO QUESTION)`,
    //   }),
    // });

    // const data = response.message.content;
    // console.log(data)
  } catch (error) {
    console.error('Error communicating with Ollama:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
