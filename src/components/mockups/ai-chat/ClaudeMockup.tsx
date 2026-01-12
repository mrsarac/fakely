"use client";

import { cn } from "@/lib/utils";
import type { AIChatMockup } from "@/types";

interface ClaudeMockupProps {
  mockup: AIChatMockup;
}

export function ClaudeMockup({ mockup }: ClaudeMockupProps) {
  const { messages, theme, model } = mockup;
  const isDark = theme === "dark";

  return (
    <div
      className={cn(
        "w-[800px] h-[600px] rounded-xl overflow-hidden shadow-2xl border",
        isDark ? "bg-[#1a1a1a] border-gray-800" : "bg-white border-gray-200"
      )}
    >
      {/* Header */}
      <div
        className={cn(
          "h-14 flex items-center justify-between px-4 border-b",
          isDark ? "border-gray-800" : "border-gray-200"
        )}
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            {/* Claude Logo */}
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#D97706] to-[#F59E0B] flex items-center justify-center">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17 8h-1V6.5C16 4.57 14.43 3 12.5 3S9 4.57 9 6.5V8H8c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h9c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-5 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6.5c0-1.71 1.39-3.1 3.1-3.1s3.1 1.39 3.1 3.1V8z" />
              </svg>
            </div>
            <div>
              <h2 className={cn("font-semibold text-sm", isDark ? "text-white" : "text-gray-900")}>
                Claude
              </h2>
              <p className={cn("text-xs", isDark ? "text-gray-500" : "text-gray-500")}>
                {model}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {/* Model Selector */}
          <button
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-medium border",
              isDark
                ? "bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-750"
                : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100"
            )}
          >
            {model}
          </button>
          {/* Menu Button */}
          <button
            className={cn(
              "p-2 rounded-lg",
              isDark ? "hover:bg-gray-800 text-gray-400" : "hover:bg-gray-100 text-gray-600"
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
      <div
        className={cn(
          "h-[calc(100%-7.5rem)] overflow-y-auto",
          isDark ? "bg-[#1a1a1a]" : "bg-white"
        )}
      >
        {messages.map((msg, index) => (
          <div
            key={msg.id}
            className={cn(
              "px-4 py-6 border-b",
              isDark ? "border-gray-800" : "border-gray-100",
              index === messages.length - 1 && "border-b-0"
            )}
          >
            <div className="max-w-3xl mx-auto">
              <div className="flex gap-4">
                {/* Avatar */}
                {msg.role === "user" ? (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-medium shrink-0">
                    U
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#D97706] to-[#F59E0B] flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17 8h-1V6.5C16 4.57 14.43 3 12.5 3S9 4.57 9 6.5V8H8c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h9c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-5 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6.5c0-1.71 1.39-3.1 3.1-3.1s3.1 1.39 3.1 3.1V8z" />
                    </svg>
                  </div>
                )}
                <div className="flex-1 space-y-2">
                  {/* Role Label */}
                  <div
                    className={cn(
                      "text-xs font-medium",
                      msg.role === "user"
                        ? isDark
                          ? "text-blue-400"
                          : "text-blue-600"
                        : isDark
                        ? "text-[#F59E0B]"
                        : "text-[#D97706]"
                    )}
                  >
                    {msg.role === "user" ? "You" : "Claude"}
                  </div>
                  {/* Content */}
                  <div
                    className={cn(
                      "text-sm leading-relaxed",
                      isDark ? "text-gray-200" : "text-gray-900"
                    )}
                  >
                    {msg.content}
                  </div>
                  {/* Actions (only for assistant) */}
                  {msg.role === "assistant" && (
                    <div className="flex items-center gap-2 pt-2">
                      <button
                        className={cn(
                          "p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800",
                          isDark ? "text-gray-500" : "text-gray-400"
                        )}
                        title="Copy"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                          />
                        </svg>
                      </button>
                      <button
                        className={cn(
                          "p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800",
                          isDark ? "text-gray-500" : "text-gray-400"
                        )}
                        title="Regenerate"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                          />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div
        className={cn(
          "h-20 px-4 flex items-center border-t",
          isDark ? "bg-[#1a1a1a] border-gray-800" : "bg-white border-gray-200"
        )}
      >
        <div className="max-w-3xl mx-auto w-full">
          <div
            className={cn(
              "flex items-center gap-2 px-4 py-3 rounded-xl border transition-colors",
              isDark
                ? "bg-[#242424] border-gray-700 hover:border-gray-600"
                : "bg-gray-50 border-gray-300 hover:border-gray-400"
            )}
          >
            {/* Attachment Button */}
            <button
              className={cn(
                "p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700",
                isDark ? "text-gray-400" : "text-gray-500"
              )}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                />
              </svg>
            </button>
            {/* Input Field */}
            <input
              type="text"
              placeholder="Send a message..."
              className={cn(
                "flex-1 bg-transparent outline-none text-sm",
                isDark
                  ? "text-white placeholder:text-gray-500"
                  : "text-gray-900 placeholder:text-gray-400"
              )}
              disabled
            />
            {/* Send Button */}
            <button
              className={cn(
                "p-2 rounded-lg transition-colors",
                isDark
                  ? "bg-[#D97706] hover:bg-[#F59E0B] text-white"
                  : "bg-[#D97706] hover:bg-[#B45309] text-white"
              )}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 10l7-7m0 0l7 7m-7-7v18"
                />
              </svg>
            </button>
          </div>
          {/* Footer Text */}
          <p
            className={cn(
              "text-xs text-center mt-2",
              isDark ? "text-gray-600" : "text-gray-500"
            )}
          >
            Claude can make mistakes. Please double-check responses.
          </p>
        </div>
      </div>
    </div>
  );
}
