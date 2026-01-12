const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent";

interface GenerateMessagesParams {
  platform: string;
  context: string;
  tone: "casual" | "professional" | "funny" | "romantic";
  messageCount: number;
  language: "tr" | "en";
}

interface GeneratePostParams {
  platform: string;
  topic: string;
  style: "informative" | "engaging" | "promotional";
  includeHashtags: boolean;
  language: "tr" | "en";
}

interface Message {
  senderId: string;
  content: string;
}

interface PostContent {
  content: string;
  hashtags?: string[];
}

export async function generateMessages(
  params: GenerateMessagesParams,
  apiKey: string
): Promise<Message[]> {
  const { platform, context, tone, messageCount, language } = params;

  const prompt = `Generate a realistic ${platform} chat conversation.
Context: ${context}
Tone: ${tone}
Number of messages: ${messageCount}
Language: ${language === "tr" ? "Turkish" : "English"}

Return ONLY a JSON array with this format (no markdown, no explanation):
[
  {"senderId": "me", "content": "message text"},
  {"senderId": "other", "content": "reply text"}
]

Make it natural and realistic. Alternate between "me" and "other" senders.`;

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.8,
          maxOutputTokens: 1024,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      throw new Error("No response from Gemini");
    }

    // Parse JSON from response (handle potential markdown wrapping)
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      throw new Error("Invalid response format");
    }

    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    console.error("Gemini API error:", error);
    throw error;
  }
}

export async function generatePost(
  params: GeneratePostParams,
  apiKey: string
): Promise<PostContent> {
  const { platform, topic, style, includeHashtags, language } = params;

  const prompt = `Generate a ${platform} post.
Topic: ${topic}
Style: ${style}
Include hashtags: ${includeHashtags}
Language: ${language === "tr" ? "Turkish" : "English"}

Return ONLY a JSON object with this format (no markdown, no explanation):
{
  "content": "post text here",
  "hashtags": ["tag1", "tag2"] // only if includeHashtags is true
}

Make it engaging and platform-appropriate.`;

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.8,
          maxOutputTokens: 512,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      throw new Error("No response from Gemini");
    }

    // Parse JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Invalid response format");
    }

    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    console.error("Gemini API error:", error);
    throw error;
  }
}

export async function generateAIResponse(
  userMessage: string,
  platform: "chatgpt" | "claude",
  apiKey: string
): Promise<string> {
  const prompt = `You are simulating ${platform === "chatgpt" ? "ChatGPT" : "Claude"}.
User message: "${userMessage}"

Generate a helpful, natural response as if you were ${platform === "chatgpt" ? "ChatGPT" : "Claude"}.
Keep it concise (2-3 sentences max).
Return ONLY the response text, no quotes or formatting.`;

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 256,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm here to help!";
  } catch (error) {
    console.error("Gemini API error:", error);
    throw error;
  }
}
