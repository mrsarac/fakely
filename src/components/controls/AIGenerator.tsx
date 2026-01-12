"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { useMockupStore } from "@/store/mockup-store";
import { generateId } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";

interface AIGeneratorProps {
  type: "chat" | "ai-chat" | "social";
}

const toneOptions = [
  { value: "casual", label: "Casual" },
  { value: "professional", label: "Professional" },
  { value: "funny", label: "Funny" },
  { value: "romantic", label: "Romantic" },
];

const languageOptions = [
  { value: "en", label: "English" },
  { value: "tr", label: "Turkish" },
];

export function AIGenerator({ type }: AIGeneratorProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [context, setContext] = useState("");
  const [tone, setTone] = useState<"casual" | "professional" | "funny" | "romantic">("casual");
  const [language, setLanguage] = useState<"tr" | "en">("en");

  const { chatMockup, aiChatMockup, socialPost, addMessage, addAIMessage, updateSocialPost } =
    useMockupStore();

  const handleGenerate = async () => {
    if (!context.trim()) {
      setError("Please enter a topic or context");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      let body: Record<string, unknown>;

      if (type === "chat") {
        body = {
          type: "messages",
          platform: chatMockup.platform,
          context,
          tone,
          messageCount: 4,
          language,
        };
      } else if (type === "ai-chat") {
        body = {
          type: "ai-response",
          message: context,
          platform: aiChatMockup.platform,
        };
      } else {
        body = {
          type: "post",
          platform: socialPost.platform,
          topic: context,
          style: tone === "professional" ? "informative" : "engaging",
          includeHashtags: true,
          language,
        };
      }

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Generation failed");
      }

      // Update store based on type
      if (type === "chat" && Array.isArray(data.result)) {
        data.result.forEach((msg: { senderId: string; content: string }) => {
          addMessage({
            id: generateId(),
            senderId: msg.senderId,
            content: msg.content,
            timestamp: new Date(),
            type: "text",
            status: msg.senderId === "me" ? "read" : undefined,
          });
        });
      } else if (type === "ai-chat") {
        addAIMessage({
          id: generateId(),
          role: "user",
          content: context,
        });
        addAIMessage({
          id: generateId(),
          role: "assistant",
          content: data.result,
        });
      } else if (type === "social") {
        const hashtags = data.result.hashtags?.join(" ") || "";
        updateSocialPost({
          content: data.result.content + (hashtags ? `\n\n${hashtags}` : ""),
        });
      }

      setContext("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const getPlaceholder = () => {
    if (type === "chat") return "E.g., Two friends planning a weekend trip";
    if (type === "ai-chat") return "E.g., How do I sort a list in Python?";
    return "E.g., New product launch announcement";
  };

  const getLabel = () => {
    if (type === "chat") return "Chat Topic";
    if (type === "ai-chat") return "Your Message";
    return "Post Topic";
  };

  return (
    <div className="space-y-4">
      {/* Header with neo-brutalism accent */}
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 bg-black shadow-brutal rounded-[4px] flex items-center justify-center">
          <span className="text-white text-[12px]">AI</span>
        </div>
        <span className="text-[13px] font-semibold text-[#1A1A1A]">Content Generator</span>
      </div>

      {/* Context Input */}
      <Textarea
        label={getLabel()}
        value={context}
        onChange={(e) => setContext(e.target.value)}
        placeholder={getPlaceholder()}
        rows={3}
        error={error || undefined}
      />

      {/* Tone Selector (for chat and social) */}
      {type !== "ai-chat" && (
        <Select
          label="Tone"
          options={toneOptions}
          value={tone}
          onChange={(value) => setTone(value as "casual" | "professional" | "funny" | "romantic")}
        />
      )}

      {/* Language Selector */}
      {type !== "ai-chat" && (
        <Select
          label="Language"
          options={languageOptions}
          value={language}
          onChange={(value) => setLanguage(value as "tr" | "en")}
        />
      )}

      {/* Generate Button - Neo-brutalism style */}
      <Button
        onClick={handleGenerate}
        loading={loading}
        className={cn(
          "w-full shadow-brutal hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none",
          "transition-all duration-150"
        )}
      >
        {loading ? "Generating..." : "Generate with AI"}
      </Button>

      <p className="text-[10px] text-[#A3A3A3] text-center">
        5 requests/min limit • Powered by Gemini 2.0 Flash
      </p>
    </div>
  );
}
