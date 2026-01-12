"use client";

import { cn, formatTime } from "@/lib/utils";
import type { ChatMockup } from "@/types";

interface WhatsAppChatProps {
  mockup: ChatMockup;
}

export function WhatsAppChat({ mockup }: WhatsAppChatProps) {
  const { participants, messages, theme, showStatusBar } = mockup;
  const isDark = theme === "dark";
  const otherParticipant = participants.find((p) => !p.isMe);

  return (
    <div
      className={cn(
        "w-[375px] h-[667px] rounded-[40px] overflow-hidden shadow-2xl border-8",
        isDark ? "border-gray-800 bg-[#0b141a]" : "border-gray-200 bg-[#efeae2]"
      )}
    >
      {/* Status Bar */}
      {showStatusBar && (
        <div
          className={cn(
            "h-11 flex items-center justify-between px-6 text-xs font-medium",
            isDark ? "bg-[#1f2c34] text-white" : "bg-[#075e54] text-white"
          )}
        >
          <span>09:41</span>
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M2 17h2v4H2v-4zm4-5h2v9H6v-9zm4-4h2v13h-2V8zm4-4h2v17h-2V4zm4 8h2v9h-2v-9z" />
            </svg>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9z" />
            </svg>
            <span className="ml-1">100%</span>
          </div>
        </div>
      )}

      {/* Header */}
      <div
        className={cn(
          "h-14 flex items-center px-4 gap-3",
          isDark ? "bg-[#1f2c34]" : "bg-[#075e54]"
        )}
      >
        <button className="text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div
          className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold",
            isDark ? "bg-[#2a3942]" : "bg-[#128c7e]"
          )}
        >
          {otherParticipant?.name?.charAt(0) || "?"}
        </div>
        <div className="flex-1">
          <p className="text-white font-medium">{otherParticipant?.name || "Contact"}</p>
          <p className="text-white/70 text-xs">online</p>
        </div>
        <div className="flex items-center gap-4 text-white">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" />
          </svg>
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" />
          </svg>
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
          </svg>
        </div>
      </div>

      {/* Chat Background */}
      <div
        className={cn(
          "h-[calc(100%-11rem)] overflow-y-auto p-3 space-y-2",
          isDark ? "bg-[#0b141a]" : "bg-[#efeae2]"
        )}
        style={{
          backgroundImage: isDark
            ? "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231f2c34' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
            : "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4cfc4' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}
      >
        {messages.map((msg) => {
          const isMe = msg.senderId === "me";
          return (
            <div
              key={msg.id}
              className={cn("flex", isMe ? "justify-end" : "justify-start")}
            >
              <div
                className={cn(
                  "max-w-[70%] rounded-lg px-3 py-2 shadow-sm relative",
                  isMe
                    ? isDark
                      ? "bg-[#005c4b] text-white"
                      : "bg-[#dcf8c6]"
                    : isDark
                    ? "bg-[#1f2c34] text-white"
                    : "bg-white"
                )}
              >
                <p className="text-sm">{msg.content}</p>
                <div
                  className={cn(
                    "flex items-center justify-end gap-1 mt-1",
                    isMe
                      ? isDark
                        ? "text-white/60"
                        : "text-gray-500"
                      : isDark
                      ? "text-white/60"
                      : "text-gray-400"
                  )}
                >
                  <span className="text-[10px]">{formatTime(msg.timestamp)}</span>
                  {isMe && (
                    <svg
                      className={cn(
                        "w-4 h-4",
                        msg.status === "read" ? "text-blue-500" : ""
                      )}
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      {msg.status === "read" ? (
                        <path d="M18 7l-1.41-1.41-6.34 6.34 1.41 1.41L18 7zm4.24-1.41L11.66 16.17 7.48 12l-1.41 1.41L11.66 19l12-12-1.42-1.41zM.41 13.41L6 19l1.41-1.41L1.83 12 .41 13.41z" />
                      ) : (
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                      )}
                    </svg>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Input Bar */}
      <div
        className={cn(
          "h-14 flex items-center gap-2 px-2",
          isDark ? "bg-[#1f2c34]" : "bg-[#f0f0f0]"
        )}
      >
        <button
          className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center",
            isDark ? "text-gray-400" : "text-gray-500"
          )}
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
        </button>
        <div
          className={cn(
            "flex-1 h-10 rounded-full px-4 flex items-center",
            isDark ? "bg-[#2a3942]" : "bg-white"
          )}
        >
          <span className={isDark ? "text-gray-400" : "text-gray-500"}>
            Type a message
          </span>
        </div>
        <button className="w-10 h-10 rounded-full bg-[#00a884] flex items-center justify-center text-white">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
            <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
