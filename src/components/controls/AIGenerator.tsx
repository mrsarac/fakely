"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { useMockupStore } from "@/store/mockup-store";
import { generateId } from "@/lib/utils";

interface AIGeneratorProps {
  type: "chat" | "ai-chat" | "social";
}

export function AIGenerator({ type }: AIGeneratorProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [context, setContext] = useState("");
  const [tone, setTone] = useState<"casual" | "professional" | "funny" | "romantic">("casual");
  const [language, setLanguage] = useState<"tr" | "en">("tr");

  const { chatMockup, aiChatMockup, socialPost, addMessage, addAIMessage, updateSocialPost } =
    useMockupStore();

  const handleGenerate = async () => {
    if (!context.trim()) {
      setError("Lütfen bir konu/bağlam girin");
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
      setError(err instanceof Error ? err.message : "Bir hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
      <h3 className="text-sm font-medium text-gray-400 mb-3 flex items-center gap-2">
        <span>✨</span> AI İçerik Üret
      </h3>

      <div className="space-y-3">
        {/* Context Input */}
        <div>
          <label className="text-xs text-gray-500 mb-1 block">
            {type === "chat"
              ? "Sohbet konusu"
              : type === "ai-chat"
              ? "Mesajınız"
              : "Post konusu"}
          </label>
          <textarea
            value={context}
            onChange={(e) => setContext(e.target.value)}
            placeholder={
              type === "chat"
                ? "Örn: İki arkadaş hafta sonu planı yapıyor"
                : type === "ai-chat"
                ? "Örn: Python'da liste nasıl sıralanır?"
                : "Örn: Yeni ürün lansmanı duyurusu"
            }
            className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder:text-gray-500 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
            rows={2}
          />
        </div>

        {/* Tone Selector (for chat and social) */}
        {type !== "ai-chat" && (
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Ton</label>
            <div className="grid grid-cols-2 gap-2">
              {(["casual", "professional", "funny", "romantic"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTone(t)}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
                    tone === t
                      ? "bg-purple-600 text-white"
                      : "bg-white/5 text-gray-400 hover:bg-white/10"
                  )}
                >
                  {t === "casual" && "😊 Günlük"}
                  {t === "professional" && "💼 Profesyonel"}
                  {t === "funny" && "😄 Komik"}
                  {t === "romantic" && "❤️ Romantik"}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Language Selector */}
        {type !== "ai-chat" && (
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Dil</label>
            <div className="flex gap-2">
              <button
                onClick={() => setLanguage("tr")}
                className={cn(
                  "flex-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
                  language === "tr"
                    ? "bg-purple-600 text-white"
                    : "bg-white/5 text-gray-400 hover:bg-white/10"
                )}
              >
                🇹🇷 Türkçe
              </button>
              <button
                onClick={() => setLanguage("en")}
                className={cn(
                  "flex-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
                  language === "en"
                    ? "bg-purple-600 text-white"
                    : "bg-white/5 text-gray-400 hover:bg-white/10"
                )}
              >
                🇬🇧 English
              </button>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <p className="text-xs text-red-400 bg-red-400/10 px-3 py-2 rounded-lg">
            {error}
          </p>
        )}

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={loading}
          className={cn(
            "w-full py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2",
            loading
              ? "bg-gray-600 text-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700"
          )}
        >
          {loading ? (
            <>
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Üretiliyor...
            </>
          ) : (
            <>
              <span>✨</span>
              AI ile Üret
            </>
          )}
        </button>

        <p className="text-[10px] text-gray-600 text-center">
          5 istek/dakika limit • Gemini 2.0 Flash
        </p>
      </div>
    </div>
  );
}
