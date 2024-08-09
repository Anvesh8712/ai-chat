import { db } from "@/app/firebase";
import { addDoc, collection } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { userId, chatName, messages } = await req.json();

    if (!userId || !chatName || !messages) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const docRef = await addDoc(collection(db, "chats"), {
      userId,
      chatName,
      messages,
      timestamp: new Date(),
    });

    return NextResponse.json(
      { message: "Chat saved successfully", chatId: docRef.id },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Failed to save chat" }, { status: 500 });
  }
}
