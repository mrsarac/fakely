import { NextRequest, NextResponse } from "next/server";
import { generateMessages, generatePost, generateAIResponse } from "@/lib/gemini";

// Simple in-memory rate limiting
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 5; // 5 requests per minute
const RATE_WINDOW = 60 * 1000; // 1 minute

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_WINDOW });
    return true;
  }

  if (record.count >= RATE_LIMIT) {
    return false;
  }

  record.count++;
  return true;
}

export async function POST(request: NextRequest) {
  // Get client IP
  const ip = request.headers.get("x-forwarded-for") || "anonymous";

  // Check rate limit
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Rate limit exceeded. Please wait a minute." },
      { status: 429 }
    );
  }

  // Get API key from environment
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "AI generation not configured" },
      { status: 503 }
    );
  }

  try {
    const body = await request.json();
    const { type, ...params } = body;

    let result;

    switch (type) {
      case "messages":
        result = await generateMessages(params, apiKey);
        break;
      case "post":
        result = await generatePost(params, apiKey);
        break;
      case "ai-response":
        result = await generateAIResponse(params.message, params.platform, apiKey);
        break;
      default:
        return NextResponse.json(
          { error: "Invalid generation type" },
          { status: 400 }
        );
    }

    return NextResponse.json({ result });
  } catch (error) {
    console.error("Generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate content" },
      { status: 500 }
    );
  }
}
