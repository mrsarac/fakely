"use client";

import { cn } from "@/lib/utils";
import type { AIChatMockup } from "@/types";

interface ChatGPTMockupProps {
  mockup: AIChatMockup;
}

export function ChatGPTMockup({ mockup }: ChatGPTMockupProps) {
  const { messages, theme, model } = mockup;
  const isDark = theme === "dark";

  return (
    <div
      className={cn(
        "w-[800px] h-[600px] rounded-xl overflow-hidden shadow-2xl border",
        isDark ? "bg-[#212121] border-gray-700" : "bg-white border-gray-200"
      )}
    >
      {/* Header */}
      <div
        className={cn(
          "h-14 flex items-center justify-between px-4 border-b",
          isDark ? "border-gray-700" : "border-gray-200"
        )}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#10a37f] flex items-center justify-center">
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729z" />
            </svg>
          </div>
          <div>
            <h2 className={cn("font-semibold", isDark ? "text-white" : "text-gray-900")}>
              ChatGPT
            </h2>
            <p className={cn("text-xs", isDark ? "text-gray-400" : "text-gray-500")}>
              {model}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            className={cn(
              "p-2 rounded-lg",
              isDark ? "hover:bg-gray-700 text-gray-400" : "hover:bg-gray-100 text-gray-500"
            )}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className={cn("h-[calc(100%-7.5rem)] overflow-y-auto", isDark ? "bg-[#212121]" : "bg-white")}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={cn(
              "px-4 py-6",
              msg.role === "assistant" && (isDark ? "bg-[#2d2d2d]" : "bg-gray-50")
            )}
          >
            <div className="max-w-3xl mx-auto flex gap-4">
              {msg.role === "user" ? (
                <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white text-sm font-medium shrink-0">
                  S
                </div>
              ) : (
                <div className="w-8 h-8 rounded-full bg-[#10a37f] flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729z" />
                  </svg>
                </div>
              )}
              <div className="flex-1">
                <p className={cn("text-sm leading-relaxed", isDark ? "text-gray-200" : "text-gray-800")}>
                  {msg.content}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className={cn("h-16 px-4 flex items-center", isDark ? "bg-[#212121]" : "bg-white")}>
        <div className="max-w-3xl mx-auto w-full">
          <div
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-xl border",
              isDark ? "bg-[#2d2d2d] border-gray-600" : "bg-gray-100 border-gray-300"
            )}
          >
            <input
              type="text"
              placeholder="Message ChatGPT..."
              className={cn(
                "flex-1 bg-transparent outline-none text-sm",
                isDark ? "text-white placeholder:text-gray-500" : "text-gray-900 placeholder:text-gray-400"
              )}
              disabled
            />
            <button className="p-1.5 rounded-lg bg-gray-500 text-white">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
