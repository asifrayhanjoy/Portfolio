import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Server-side validation
    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json(
        { success: false, message: "Please provide a valid name." },
        { status: 400 },
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== "string" || !emailRegex.test(email.trim())) {
      return NextResponse.json(
        { success: false, message: "Please provide a valid email address." },
        { status: 400 },
      );
    }

    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json(
        { success: false, message: "Please provide a message." },
        { status: 400 },
      );
    }

    const client = await clientPromise;
    const db = client.db("portfolio");
    const collection = db.collection("messages");

    const newDocument = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: typeof subject === "string" ? subject.trim() : "",
      message: message.trim(),
      createdAt: new Date(),
      read: false,
    };

    const result = await collection.insertOne(newDocument);

    return NextResponse.json(
      {
        success: true,
        message: "Your message has been saved successfully!",
        insertedId: result.insertedId.toString(),
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error saving message to MongoDB:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to send message. Please try again later.",
      },
      { status: 500 },
    );
  }
}
