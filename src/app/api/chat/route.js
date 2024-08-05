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
  //   const data = await req.json();
  //   console.log(data);
  //   return NextResponse.json({ message: "hello from server" });

  const completion = await openai.chat.completions.create({
    model: "meta-llama/llama-3.1-8b-instruct:free",
    messages: [
      {
        role: "user",
        content: "Give me a recipe to make honey glazed pineapple",
      },
    ],
  });

  console.log(completion.choices[0].message);
  return NextResponse.json({ message: "hello from server" });
}
