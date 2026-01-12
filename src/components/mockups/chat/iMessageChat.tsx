"use client";

import { cn, formatTime } from "@/lib/utils";
import type { ChatMockup } from "@/types";

interface iMessageChatProps {
  mockup: ChatMockup;
}

export function iMessageChat({ mockup }: iMessageChatProps) {
  const { participants, messages, theme, showStatusBar } = mockup;
  const isDark = theme === "dark";
  const otherParticipant = participants.find((p) => !p.isMe);

  return (
    <div
      className={cn(
        "w-[375px] h-[667px] rounded-[40px] overflow-hidden shadow-2xl border-[12px]",
        isDark ? "border-[#1c1c1e] bg-black" : "border-gray-200 bg-white"
      )}
    >
      {/* Status Bar - iOS Style */}
      {showStatusBar && (
        <div
          className={cn(
            "h-11 flex items-center justify-between px-6 text-xs font-semibold",
            isDark ? "bg-black text-white" : "bg-white text-black"
          )}
        >
          <span className="text-sm">9:41</span>
          <div className="flex items-center gap-1">
            {/* Signal Strength */}
            <svg className="w-4 h-3" fill="currentColor" viewBox="0 0 16 12">
              <circle cx="2" cy="10" r="1.5" />
              <circle cx="6" cy="8" r="1.5" />
              <circle cx="10" cy="5" r="1.5" />
              <circle cx="14" cy="2" r="1.5" />
            </svg>
            {/* WiFi */}
            <svg className="w-4 h-3" fill="currentColor" viewBox="0 0 16 12">
              <path d="M8 12c-.8 0-1.5-.7-1.5-1.5S7.2 9 8 9s1.5.7 1.5 1.5S8.8 12 8 12zm2.7-3.2c-.4-.4-1-.7-1.7-.7s-1.3.2-1.7.7l-1.1-1.1c.7-.7 1.6-1.1 2.8-1.1s2.1.4 2.8 1.1l-1.1 1.1zm2.8-2.8c-1.1-1.1-2.5-1.7-4.5-1.7s-3.4.6-4.5 1.7L3.4 4.9c1.4-1.4 3.2-2.1 5.6-2.1s4.2.7 5.6 2.1l-1.1 1.1z" />
            </svg>
            {/* Battery */}
            <div className="flex items-center ml-1">
              <div className={cn(
                "w-6 h-3 rounded-sm border flex items-center px-0.5",
                isDark ? "border-white" : "border-black"
              )}>
                <div className={cn(
                  "h-2 w-full rounded-[1px]",
                  isDark ? "bg-white" : "bg-black"
                )} />
              </div>
              <div className={cn(
                "w-0.5 h-1.5 rounded-r ml-0.5",
                isDark ? "bg-white" : "bg-black"
              )} />
            </div>
          </div>
        </div>
      )}

      {/* Header - iOS Blue */}
      <div
        className={cn(
          "h-12 flex items-center px-4 gap-3",
          isDark ? "bg-[#1c1c1e]" : "bg-[#f7f7f7]",
          "border-b",
          isDark ? "border-[#38383a]" : "border-gray-300"
        )}
      >
        <button className={isDark ? "text-[#0a84ff]" : "text-[#007aff]"}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div
          className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold text-sm",
            isDark ? "bg-[#48484a]" : "bg-[#c7c7cc]"
          )}
        >
          {otherParticipant?.name?.charAt(0) || "?"}
        </div>
        <div className="flex-1">
          <p className={cn("font-semibold text-sm", isDark ? "text-white" : "text-black")}>
            {otherParticipant?.name || "Contact"}
          </p>
        </div>
        <button className={isDark ? "text-[#0a84ff]" : "text-[#007aff]"}>
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
          </svg>
        </button>
      </div>

      {/* Chat Area */}
      <div
        className={cn(
          "h-[calc(100%-11.5rem)] overflow-y-auto px-3 py-4 space-y-2",
          isDark ? "bg-black" : "bg-white"
        )}
      >
        {messages.map((msg, index) => {
          const isMe = msg.senderId === "me";
          const showDeliveryStatus = isMe && index === messages.length - 1;

          return (
            <div key={msg.id} className="space-y-0.5">
              <div
                className={cn("flex", isMe ? "justify-end" : "justify-start")}
              >
                <div
                  className={cn(
                    "max-w-[70%] rounded-[18px] px-4 py-2 shadow-sm",
                    isMe
                      ? "bg-[#007aff] text-white rounded-br-[4px]"
                      : isDark
                      ? "bg-[#3a3a3c] text-white rounded-bl-[4px]"
                      : "bg-[#e9e9eb] text-black rounded-bl-[4px]"
                  )}
                >
                  <p className="text-[15px] leading-[20px]">{msg.content}</p>
                </div>
              </div>

              {/* Delivery Status - iOS Style */}
              {showDeliveryStatus && (
                <div className={cn("flex", isMe ? "justify-end" : "justify-start")}>
                  <p className={cn(
                    "text-[11px] px-1",
                    isDark ? "text-gray-500" : "text-gray-600"
                  )}>
                    {msg.status === "read" ? "Read" : msg.status === "delivered" ? "Delivered" : "Sent"} {formatTime(msg.timestamp)}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Input Bar - iOS Style */}
      <div
        className={cn(
          "h-12 flex items-center gap-2 px-2 border-t",
          isDark ? "bg-[#1c1c1e] border-[#38383a]" : "bg-[#f7f7f7] border-gray-300"
        )}
      >
        <button className={isDark ? "text-[#0a84ff]" : "text-[#007aff]"}>
          <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
            <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
          </svg>
        </button>
        <button className={isDark ? "text-[#0a84ff]" : "text-[#007aff]"}>
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
        </button>
        <div
          className={cn(
            "flex-1 h-8 rounded-[18px] px-3 flex items-center text-sm border",
            isDark
              ? "bg-[#38383a] border-[#48484a] text-gray-400"
              : "bg-white border-gray-300 text-gray-500"
          )}
        >
          <span>iMessage</span>
        </div>
        <button className={isDark ? "text-[#0a84ff]" : "text-[#007aff]"}>
          <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
            <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
