"use client";

import { cn, formatTime } from "@/lib/utils";
import type { ChatMockup } from "@/types";

interface DiscordChatProps {
  mockup: ChatMockup;
}

// Discord username colors
const USERNAME_COLORS = [
  "#f47fff", // Pink
  "#7289da", // Blurple (Discord brand)
  "#43b581", // Green
  "#faa61a", // Orange
  "#f04747", // Red
  "#00b0f4", // Blue
  "#c27c0e", // Gold
  "#99aab5", // Gray
];

export function DiscordChat({ mockup }: DiscordChatProps) {
  const { participants, messages, theme, showStatusBar } = mockup;
  const isDark = theme === "dark";

  // Assign colors to participants
  const participantColors = new Map<string, string>();
  participants.forEach((p, idx) => {
    participantColors.set(p.id, USERNAME_COLORS[idx % USERNAME_COLORS.length]);
  });

  return (
    <div
      className={cn(
        "w-[800px] h-[600px] rounded-lg overflow-hidden shadow-2xl",
        isDark ? "bg-[#36393f]" : "bg-white"
      )}
    >
      {/* Main Layout: Sidebar + Chat */}
      <div className="flex h-full">
        {/* Sidebar with Server Icon */}
        <div className={cn(
          "w-[72px] flex flex-col items-center py-3 gap-2",
          isDark ? "bg-[#202225]" : "bg-[#f2f3f5]"
        )}>
          {/* Home Button */}
          <div className={cn(
            "w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-all",
            isDark ? "bg-[#5865f2] hover:bg-[#4752c4]" : "bg-[#5865f2] hover:bg-[#4752c4]"
          )}>
            <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
            </svg>
          </div>

          {/* Divider */}
          <div className={cn(
            "w-8 h-0.5 rounded-full",
            isDark ? "bg-[#36393f]" : "bg-[#d4d7dc]"
          )} />

          {/* Server Icon */}
          <div className={cn(
            "w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-all font-semibold text-lg hover:rounded-2xl",
            isDark ? "bg-[#36393f] text-[#dcddde] hover:bg-[#5865f2] hover:text-white" : "bg-[#e3e5e8] text-[#4f5660] hover:bg-[#5865f2] hover:text-white"
          )}>
            FM
          </div>
        </div>

        {/* Channel Sidebar */}
        <div className={cn(
          "w-60 flex flex-col",
          isDark ? "bg-[#2f3136]" : "bg-[#f2f3f5]"
        )}>
          {/* Server Name */}
          <div className={cn(
            "h-12 px-4 flex items-center justify-between border-b cursor-pointer hover:bg-opacity-80 transition-all",
            isDark ? "border-[#202225] shadow-sm" : "border-[#e3e5e8]"
          )}>
            <span className={cn(
              "font-semibold text-[15px]",
              isDark ? "text-white" : "text-[#060607]"
            )}>
              Fakely Mockups
            </span>
            <svg className={cn(
              "w-4 h-4",
              isDark ? "text-[#b9bbbe]" : "text-[#4f5660]"
            )} fill="currentColor" viewBox="0 0 24 24">
              <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
            </svg>
          </div>

          {/* Channels List */}
          <div className="flex-1 overflow-y-auto p-2">
            {/* Text Channels */}
            <div className="mb-4">
              <div className={cn(
                "px-2 py-1 text-xs font-semibold uppercase tracking-wide flex items-center cursor-pointer",
                isDark ? "text-[#8e9297] hover:text-[#dcddde]" : "text-[#4f5660] hover:text-[#060607]"
              )}>
                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
                </svg>
                Text Channels
              </div>
              <div className={cn(
                "px-2 py-1.5 rounded flex items-center cursor-pointer mt-1",
                isDark ? "bg-[#393c43] text-white" : "bg-[#e3e5e8] text-[#060607]"
              )}>
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M5.88 4.12L13.76 12l-7.88 7.88L8 22l10-10L8 2z" />
                </svg>
                <span className="text-[15px] font-medium">general</span>
              </div>
              <div className={cn(
                "px-2 py-1.5 rounded flex items-center cursor-pointer mt-0.5",
                isDark ? "text-[#96989d] hover:bg-[#393c43] hover:text-[#dcddde]" : "text-[#4f5660] hover:bg-[#e3e5e8] hover:text-[#060607]"
              )}>
                <span className="text-xl mr-2">#</span>
                <span className="text-[15px]">random</span>
              </div>
              <div className={cn(
                "px-2 py-1.5 rounded flex items-center cursor-pointer mt-0.5",
                isDark ? "text-[#96989d] hover:bg-[#393c43] hover:text-[#dcddde]" : "text-[#4f5660] hover:bg-[#e3e5e8] hover:text-[#060607]"
              )}>
                <span className="text-xl mr-2">#</span>
                <span className="text-[15px]">announcements</span>
              </div>
            </div>
          </div>

          {/* User Area */}
          <div className={cn(
            "h-[52px] px-2 flex items-center gap-2",
            isDark ? "bg-[#292b2f]" : "bg-[#e3e5e8]"
          )}>
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm",
              isDark ? "bg-[#5865f2] text-white" : "bg-[#5865f2] text-white"
            )}>
              {participants.find(p => p.isMe)?.name?.charAt(0) || "M"}
            </div>
            <div className="flex-1 min-w-0">
              <p className={cn(
                "text-sm font-semibold truncate",
                isDark ? "text-white" : "text-[#060607]"
              )}>
                {participants.find(p => p.isMe)?.name || "You"}
              </p>
              <p className={cn(
                "text-xs truncate",
                isDark ? "text-[#b9bbbe]" : "text-[#4f5660]"
              )}>
                #1234
              </p>
            </div>
            <div className="flex items-center gap-1">
              <button className={cn(
                "w-8 h-8 rounded flex items-center justify-center hover:bg-opacity-20",
                isDark ? "text-[#b9bbbe] hover:bg-white" : "text-[#4f5660] hover:bg-black"
              )}>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
                </svg>
              </button>
              <button className={cn(
                "w-8 h-8 rounded flex items-center justify-center hover:bg-opacity-20",
                isDark ? "text-[#b9bbbe] hover:bg-white" : "text-[#4f5660] hover:bg-black"
              )}>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Channel Header */}
          <div className={cn(
            "h-12 px-4 flex items-center justify-between border-b",
            isDark ? "border-[#202225] shadow-sm" : "border-[#e3e5e8]"
          )}>
            <div className="flex items-center gap-2">
              <span className={cn(
                "text-xl font-semibold",
                isDark ? "text-[#8e9297]" : "text-[#4f5660]"
              )}>
                #
              </span>
              <span className={cn(
                "font-semibold text-[15px]",
                isDark ? "text-white" : "text-[#060607]"
              )}>
                general
              </span>
            </div>
            <div className="flex items-center gap-4">
              <button className={cn(
                "hover:text-opacity-80 transition-all",
                isDark ? "text-[#b9bbbe]" : "text-[#4f5660]"
              )}>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              </button>
              <button className={cn(
                "hover:text-opacity-80 transition-all",
                isDark ? "text-[#b9bbbe]" : "text-[#4f5660]"
              )}>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                </svg>
              </button>
              <button className={cn(
                "hover:text-opacity-80 transition-all",
                isDark ? "text-[#b9bbbe]" : "text-[#4f5660]"
              )}>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                </svg>
              </button>
              <button className={cn(
                "hover:text-opacity-80 transition-all",
                isDark ? "text-[#b9bbbe]" : "text-[#4f5660]"
              )}>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className={cn(
            "flex-1 overflow-y-auto p-4",
            isDark ? "bg-[#36393f]" : "bg-white"
          )}>
            {messages.map((msg, idx) => {
              const sender = participants.find(p => p.id === msg.senderId);
              const isMe = msg.senderId === "me";
              const color = participantColors.get(msg.senderId) || USERNAME_COLORS[0];

              // Show avatar if first message or different sender
              const showAvatar = idx === 0 || messages[idx - 1]?.senderId !== msg.senderId;

              return (
                <div
                  key={msg.id}
                  className={cn(
                    "group relative py-0.5 px-3 -mx-3 rounded transition-colors",
                    isDark ? "hover:bg-[#32353b]" : "hover:bg-[#f7f8f9]",
                    showAvatar ? "mt-4" : "mt-0.5"
                  )}
                >
                  <div className="flex gap-4">
                    {/* Avatar */}
                    <div className="w-10 flex-shrink-0">
                      {showAvatar && (
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center font-semibold text-white"
                          style={{ backgroundColor: color }}
                        >
                          {sender?.name?.charAt(0) || "?"}
                        </div>
                      )}
                    </div>

                    {/* Message Content */}
                    <div className="flex-1 min-w-0">
                      {showAvatar && (
                        <div className="flex items-baseline gap-2 mb-0.5">
                          <span
                            className="font-semibold text-[15px] cursor-pointer hover:underline"
                            style={{ color }}
                          >
                            {sender?.name || "Unknown"}
                          </span>
                          <span className={cn(
                            "text-xs",
                            isDark ? "text-[#72767d]" : "text-[#5c5e66]"
                          )}>
                            {formatTime(msg.timestamp)}
                          </span>
                        </div>
                      )}
                      <p className={cn(
                        "text-[15px] leading-snug",
                        isDark ? "text-[#dcddde]" : "text-[#2e3338]"
                      )}>
                        {msg.content}
                      </p>
                    </div>
                  </div>

                  {/* Timestamp on hover (compact mode) */}
                  {!showAvatar && (
                    <span className={cn(
                      "absolute left-0 top-1 px-2 text-[10px] opacity-0 group-hover:opacity-100 transition-opacity",
                      isDark ? "text-[#72767d]" : "text-[#5c5e66]"
                    )}>
                      {formatTime(msg.timestamp)}
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Input Bar */}
          <div className="px-4 pb-6">
            <div className={cn(
              "rounded-lg p-2 flex items-center gap-2",
              isDark ? "bg-[#40444b]" : "bg-[#ebedef]"
            )}>
              <button className={cn(
                "w-6 h-6 flex items-center justify-center rounded transition-colors",
                isDark ? "text-[#b9bbbe] hover:text-[#dcddde]" : "text-[#4f5660] hover:text-[#060607]"
              )}>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                </svg>
              </button>
              <input
                type="text"
                placeholder="Message #general"
                className={cn(
                  "flex-1 bg-transparent outline-none text-[15px]",
                  isDark ? "text-[#dcddde] placeholder:text-[#72767d]" : "text-[#2e3338] placeholder:text-[#5c5e66]"
                )}
                readOnly
              />
              <button className={cn(
                "w-6 h-6 flex items-center justify-center rounded transition-colors",
                isDark ? "text-[#b9bbbe] hover:text-[#dcddde]" : "text-[#4f5660] hover:text-[#060607]"
              )}>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
                </svg>
              </button>
              <button className={cn(
                "w-6 h-6 flex items-center justify-center rounded transition-colors",
                isDark ? "text-[#b9bbbe] hover:text-[#dcddde]" : "text-[#4f5660] hover:text-[#060607]"
              )}>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
