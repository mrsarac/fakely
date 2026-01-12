"use client";

import { cn, formatTime } from "@/lib/utils";
import type { ChatMockup } from "@/types";

interface SlackChatProps {
  mockup: ChatMockup;
}

export function SlackChat({ mockup }: SlackChatProps) {
  const { participants, messages, theme } = mockup;
  const isDark = theme === "dark";

  // Get channel info
  const channelName = mockup.participants.find((p) => !p.isMe)?.name || "general";

  // Group consecutive messages from the same sender
  const groupedMessages = messages.reduce((acc, msg, index) => {
    const prevMsg = messages[index - 1];
    const isConsecutive = prevMsg && prevMsg.senderId === msg.senderId;
    const timeDiff = prevMsg
      ? new Date(msg.timestamp).getTime() - new Date(prevMsg.timestamp).getTime()
      : Infinity;
    const showHeader = !isConsecutive || timeDiff > 5 * 60 * 1000; // 5 minutes

    acc.push({ ...msg, showHeader });
    return acc;
  }, [] as Array<typeof messages[0] & { showHeader: boolean }>);

  return (
    <div
      className={cn(
        "w-[800px] h-[600px] rounded-lg overflow-hidden shadow-2xl border flex",
        isDark
          ? "border-[#1a1d21] bg-[#1a1d21]"
          : "border-gray-300 bg-white"
      )}
    >
      {/* Workspace Sidebar */}
      <div className="w-[68px] bg-[#4a154b] flex flex-col items-center py-3 gap-3">
        {/* Workspace Avatar */}
        <div className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center cursor-pointer">
          <span className="text-white font-bold text-lg">W</span>
        </div>

        {/* Channels */}
        <div className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center cursor-pointer relative">
          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
          <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#4a154b]" />
        </div>

        {/* DMs */}
        <div className="w-10 h-10 rounded-lg hover:bg-white/10 transition-colors flex items-center justify-center cursor-pointer">
          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z" />
          </svg>
        </div>

        {/* Add */}
        <div className="w-10 h-10 rounded-lg hover:bg-white/10 transition-colors flex items-center justify-center cursor-pointer">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* User Avatar */}
        <div className="w-10 h-10 rounded-lg bg-[#1264a3] flex items-center justify-center cursor-pointer">
          <span className="text-white font-semibold text-sm">
            {participants.find((p) => p.isMe)?.name?.charAt(0) || "M"}
          </span>
        </div>
      </div>

      {/* Channel Sidebar */}
      <div
        className={cn(
          "w-[220px] flex flex-col",
          isDark ? "bg-[#1a1d21]" : "bg-[#f4ede4]"
        )}
      >
        {/* Workspace Header */}
        <div
          className={cn(
            "h-12 px-4 flex items-center justify-between cursor-pointer hover:bg-black/5",
            isDark ? "border-b border-white/10" : "border-b border-black/10"
          )}
        >
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <span
              className={cn(
                "font-bold text-[15px] truncate",
                isDark ? "text-white" : "text-gray-900"
              )}
            >
              Workspace
            </span>
          </div>
          <svg
            className={cn("w-4 h-4 flex-shrink-0", isDark ? "text-white" : "text-gray-900")}
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M7 10l5 5 5-5z" />
          </svg>
        </div>

        {/* Channel List */}
        <div className="flex-1 overflow-y-auto p-2">
          {/* Channels Section */}
          <div className="mb-3">
            <div
              className={cn(
                "px-2 py-1 flex items-center justify-between cursor-pointer rounded hover:bg-black/5 group",
                isDark ? "text-white/70" : "text-gray-700"
              )}
            >
              <span className="text-xs font-semibold">Channels</span>
              <svg
                className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
              </svg>
            </div>
            <div
              className={cn(
                "px-2 py-1 rounded cursor-pointer flex items-center gap-2 font-medium",
                isDark
                  ? "bg-[#1264a3] text-white"
                  : "bg-[#1264a3] text-white"
              )}
            >
              <span className="text-sm">#</span>
              <span className="text-sm truncate">{channelName}</span>
            </div>
            <div
              className={cn(
                "px-2 py-1 rounded cursor-pointer hover:bg-black/5 flex items-center gap-2",
                isDark ? "text-white/70" : "text-gray-700"
              )}
            >
              <span className="text-sm">#</span>
              <span className="text-sm truncate">random</span>
            </div>
            <div
              className={cn(
                "px-2 py-1 rounded cursor-pointer hover:bg-black/5 flex items-center gap-2",
                isDark ? "text-white/70" : "text-gray-700"
              )}
            >
              <span className="text-sm">#</span>
              <span className="text-sm truncate">announcements</span>
            </div>
          </div>

          {/* Direct Messages */}
          <div>
            <div
              className={cn(
                "px-2 py-1 flex items-center justify-between cursor-pointer rounded hover:bg-black/5 group",
                isDark ? "text-white/70" : "text-gray-700"
              )}
            >
              <span className="text-xs font-semibold">Direct messages</span>
              <svg
                className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
              </svg>
            </div>
            {participants
              .filter((p) => !p.isMe)
              .slice(0, 3)
              .map((participant) => (
                <div
                  key={participant.id}
                  className={cn(
                    "px-2 py-1 rounded cursor-pointer hover:bg-black/5 flex items-center gap-2",
                    isDark ? "text-white/70" : "text-gray-700"
                  )}
                >
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-sm truncate">{participant.name}</span>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Channel Header */}
        <div
          className={cn(
            "h-12 px-4 flex items-center justify-between",
            isDark
              ? "bg-[#222529] border-b border-white/10"
              : "bg-white border-b border-gray-200"
          )}
        >
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "font-bold text-[15px]",
                isDark ? "text-white" : "text-gray-900"
              )}
            >
              # {channelName}
            </span>
            <svg
              className={cn("w-4 h-4", isDark ? "text-white/70" : "text-gray-500")}
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
          </div>
          <div className="flex items-center gap-3">
            <svg
              className={cn(
                "w-5 h-5 cursor-pointer hover:opacity-70",
                isDark ? "text-white/70" : "text-gray-500"
              )}
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
            </svg>
            <svg
              className={cn(
                "w-5 h-5 cursor-pointer hover:opacity-70",
                isDark ? "text-white/70" : "text-gray-500"
              )}
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
            </svg>
          </div>
        </div>

        {/* Messages */}
        <div
          className={cn(
            "flex-1 overflow-y-auto p-4 space-y-2",
            isDark ? "bg-[#1a1d21]" : "bg-white"
          )}
        >
          {groupedMessages.map((msg) => {
            const sender = participants.find((p) => p.id === msg.senderId);
            const isMe = msg.senderId === "me";

            return (
              <div key={msg.id} className="group hover:bg-black/5 -mx-4 px-4 py-1">
                {msg.showHeader ? (
                  // Full message with header
                  <div className="flex gap-2">
                    <div
                      className={cn(
                        "w-9 h-9 rounded flex items-center justify-center font-semibold text-sm flex-shrink-0",
                        isMe
                          ? "bg-[#1264a3] text-white"
                          : "bg-[#e01e5a] text-white"
                      )}
                    >
                      {sender?.name?.charAt(0) || "?"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-2">
                        <span
                          className={cn(
                            "font-bold text-[15px]",
                            isDark ? "text-white" : "text-gray-900"
                          )}
                        >
                          {sender?.name || "User"}
                        </span>
                        <span
                          className={cn(
                            "text-xs",
                            isDark ? "text-white/50" : "text-gray-500"
                          )}
                        >
                          {formatTime(msg.timestamp)}
                        </span>
                      </div>
                      <div
                        className={cn(
                          "text-[15px] leading-relaxed break-words",
                          isDark ? "text-white/90" : "text-gray-900"
                        )}
                      >
                        {msg.content}
                      </div>
                    </div>
                  </div>
                ) : (
                  // Compact message (no header)
                  <div className="flex gap-2">
                    <div className="w-9 flex-shrink-0 flex items-center justify-center">
                      <span
                        className={cn(
                          "text-xs opacity-0 group-hover:opacity-100 transition-opacity",
                          isDark ? "text-white/50" : "text-gray-500"
                        )}
                      >
                        {new Date(msg.timestamp).toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                    <div
                      className={cn(
                        "flex-1 text-[15px] leading-relaxed break-words",
                        isDark ? "text-white/90" : "text-gray-900"
                      )}
                    >
                      {msg.content}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Input Bar */}
        <div className="p-4">
          <div
            className={cn(
              "rounded-lg border-2 overflow-hidden",
              isDark
                ? "border-white/20 bg-[#222529]"
                : "border-gray-300 bg-white"
            )}
          >
            {/* Formatting Toolbar */}
            <div
              className={cn(
                "h-10 px-3 flex items-center gap-1 border-b",
                isDark ? "border-white/10" : "border-gray-200"
              )}
            >
              <button
                className={cn(
                  "w-7 h-7 rounded hover:bg-black/10 flex items-center justify-center",
                  isDark ? "text-white/70" : "text-gray-600"
                )}
                title="Bold"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M15.6 10.79c.97-.67 1.65-1.77 1.65-2.79 0-2.26-1.75-4-4-4H7v14h7.04c2.09 0 3.71-1.7 3.71-3.79 0-1.52-.86-2.82-2.15-3.42zM10 6.5h3c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-3v-3zm3.5 9H10v-3h3.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5z" />
                </svg>
              </button>
              <button
                className={cn(
                  "w-7 h-7 rounded hover:bg-black/10 flex items-center justify-center",
                  isDark ? "text-white/70" : "text-gray-600"
                )}
                title="Italic"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M10 4v3h2.21l-3.42 8H6v3h8v-3h-2.21l3.42-8H18V4z" />
                </svg>
              </button>
              <button
                className={cn(
                  "w-7 h-7 rounded hover:bg-black/10 flex items-center justify-center",
                  isDark ? "text-white/70" : "text-gray-600"
                )}
                title="Strikethrough"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M10 19h4v-3h-4v3zM5 4v3h5v3h4V7h5V4H5zM3 14h18v-2H3v2z" />
                </svg>
              </button>
              <div
                className={cn(
                  "w-px h-5 mx-1",
                  isDark ? "bg-white/10" : "bg-gray-300"
                )}
              />
              <button
                className={cn(
                  "w-7 h-7 rounded hover:bg-black/10 flex items-center justify-center",
                  isDark ? "text-white/70" : "text-gray-600"
                )}
                title="Link"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z" />
                </svg>
              </button>
              <button
                className={cn(
                  "w-7 h-7 rounded hover:bg-black/10 flex items-center justify-center",
                  isDark ? "text-white/70" : "text-gray-600"
                )}
                title="Code"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" />
                </svg>
              </button>
              <button
                className={cn(
                  "w-7 h-7 rounded hover:bg-black/10 flex items-center justify-center",
                  isDark ? "text-white/70" : "text-gray-600"
                )}
                title="Emoji"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
                </svg>
              </button>
              <button
                className={cn(
                  "w-7 h-7 rounded hover:bg-black/10 flex items-center justify-center",
                  isDark ? "text-white/70" : "text-gray-600"
                )}
                title="Mention"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10h5v-2h-5c-4.34 0-8-3.66-8-8s3.66-8 8-8 8 3.66 8 8v1.43c0 .79-.71 1.57-1.5 1.57s-1.5-.78-1.5-1.57V12c0-2.76-2.24-5-5-5s-5 2.24-5 5 2.24 5 5 5c1.38 0 2.64-.56 3.54-1.47.65.89 1.77 1.47 2.96 1.47 1.97 0 3.5-1.6 3.5-3.57V12c0-5.52-4.48-10-10-10zm0 13c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" />
                </svg>
              </button>
            </div>

            {/* Input Field */}
            <div className="p-3">
              <div
                className={cn(
                  "text-[15px] min-h-[24px]",
                  isDark ? "text-white/50" : "text-gray-500"
                )}
              >
                Message #{channelName}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="h-10 px-3 flex items-center justify-between">
              <div className="flex items-center gap-1">
                <button
                  className={cn(
                    "w-7 h-7 rounded hover:bg-black/10 flex items-center justify-center",
                    isDark ? "text-white/70" : "text-gray-600"
                  )}
                  title="Attach"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5v10.5c0 .55-.45 1-1 1s-1-.45-1-1V6H10v9.5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V5c0-2.21-1.79-4-4-4S7 2.79 7 5v12.5c0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5V6h-1.5z" />
                  </svg>
                </button>
                <button
                  className={cn(
                    "w-7 h-7 rounded hover:bg-black/10 flex items-center justify-center",
                    isDark ? "text-white/70" : "text-gray-600"
                  )}
                  title="Video"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" />
                  </svg>
                </button>
                <button
                  className={cn(
                    "w-7 h-7 rounded hover:bg-black/10 flex items-center justify-center",
                    isDark ? "text-white/70" : "text-gray-600"
                  )}
                  title="Voice"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
                    <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
                  </svg>
                </button>
              </div>
              <button
                className={cn(
                  "w-7 h-7 rounded-full bg-[#007a5a] hover:bg-[#006644] flex items-center justify-center transition-colors",
                  "text-white"
                )}
                title="Send"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
