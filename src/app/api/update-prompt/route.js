import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.API_KEY,
  //   defaultHeaders: {
  //     "HTTP-Referer": $YOUR_SITE_URL, // Optional, for including your app on openrouter.ai rankings.
  //     "X-Title": $YOUR_SITE_NAME, // Optional. Shows in rankings on openrouter.ai.
  //   },
});

export async function POST(req) {
  const data = await req.json();

  const completion = await openai.chat.completions.create({
    model: "meta-llama/llama-3.1-8b-instruct:free",
    messages: [
      {
        role: "system",
        content: `Please create a new system prompt for the following idea:\n\n${data.idea}`,
      },
    ],
  });

  console.log(completion.choices[0].message.content);
  const newSystemPrompt = completion.choices[0].message.content;

  return NextResponse.json({
    newSystemPrompt,
    status: 200,
  });
}
