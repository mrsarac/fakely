"use client";

import { cn } from "@/lib/utils";
import type { SocialPost } from "@/types";

interface XPostProps {
  post: SocialPost;
}

export function XPost({ post }: XPostProps) {
  const { author, content, likes, comments, shares, theme, timestamp } = post;
  const isDark = theme === "dark";

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num.toString();
  };

  const formatTimestamp = (): string => {
    const hours = timestamp.getHours();
    const minutes = timestamp.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    const displayHours = hours % 12 || 12;

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames[timestamp.getMonth()];
    const day = timestamp.getDate();
    const year = timestamp.getFullYear();

    return `${displayHours}:${minutes} ${ampm} · ${month} ${day}, ${year}`;
  };

  const renderContentWithHashtags = (text: string) => {
    const parts = text.split(/(\s+|#\w+)/g);
    return parts.map((part, index) => {
      if (part.startsWith("#")) {
        return (
          <span key={index} className="text-[#1D9BF0] hover:underline cursor-pointer">
            {part}
          </span>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  // Mock views count (10-50x likes for realism)
  const views = likes * Math.floor(Math.random() * 40 + 10);

  return (
    <div
      className={cn(
        "w-[500px] rounded-lg overflow-hidden shadow-xl border",
        isDark ? "bg-black border-gray-800" : "bg-white border-gray-200"
      )}
    >
      {/* Post Container */}
      <div className="p-4">
        {/* Header */}
        <div className="flex gap-3">
          {/* Profile Picture */}
          <div className="flex-shrink-0">
            <div
              className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center font-bold text-white bg-gray-600"
              )}
            >
              {author.avatar ? (
                <img
                  src={author.avatar}
                  alt={author.name}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                author.name.charAt(0)
              )}
            </div>
          </div>

          {/* Post Content */}
          <div className="flex-1 min-w-0">
            {/* Author Info */}
            <div className="flex items-center gap-1 flex-wrap">
              <span className={cn("font-bold text-[15px]", isDark ? "text-white" : "text-gray-900")}>
                {author.name}
              </span>
              {author.verified && (
                <svg className="w-[18px] h-[18px] text-[#1D9BF0]" viewBox="0 0 22 22" fill="currentColor">
                  <path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z" />
                </svg>
              )}
              <span className={cn("text-[15px]", isDark ? "text-gray-500" : "text-gray-600")}>
                @{author.username}
              </span>
            </div>

            {/* Post Content */}
            <div className={cn("text-[15px] leading-5 mt-1 whitespace-pre-wrap", isDark ? "text-white" : "text-gray-900")}>
              {renderContentWithHashtags(content)}
            </div>

            {/* Timestamp */}
            <div className={cn("text-[15px] mt-3 pb-3 border-b", isDark ? "text-gray-500 border-gray-800" : "text-gray-600 border-gray-200")}>
              {formatTimestamp()}
            </div>

            {/* Engagement Stats */}
            <div className={cn("flex gap-4 py-3 border-b", isDark ? "border-gray-800" : "border-gray-200")}>
              <div className="flex items-center gap-1">
                <span className={cn("font-bold text-sm", isDark ? "text-white" : "text-gray-900")}>
                  {formatNumber(comments)}
                </span>
                <span className={cn("text-sm", isDark ? "text-gray-500" : "text-gray-600")}>
                  Replies
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span className={cn("font-bold text-sm", isDark ? "text-white" : "text-gray-900")}>
                  {formatNumber(shares)}
                </span>
                <span className={cn("text-sm", isDark ? "text-gray-500" : "text-gray-600")}>
                  Reposts
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span className={cn("font-bold text-sm", isDark ? "text-white" : "text-gray-900")}>
                  {formatNumber(likes)}
                </span>
                <span className={cn("text-sm", isDark ? "text-gray-500" : "text-gray-600")}>
                  Likes
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span className={cn("font-bold text-sm", isDark ? "text-white" : "text-gray-900")}>
                  {formatNumber(views)}
                </span>
                <span className={cn("text-sm", isDark ? "text-gray-500" : "text-gray-600")}>
                  Views
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className={cn("flex items-center justify-around py-2", isDark ? "border-gray-800" : "border-gray-200")}>
              {/* Reply */}
              <button
                className={cn(
                  "group flex items-center gap-2 p-2 rounded-full transition-colors",
                  isDark ? "hover:bg-blue-500/10" : "hover:bg-blue-50"
                )}
              >
                <svg
                  className={cn("w-5 h-5 transition-colors", isDark ? "text-gray-500 group-hover:text-[#1D9BF0]" : "text-gray-600 group-hover:text-[#1D9BF0]")}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </button>

              {/* Repost */}
              <button
                className={cn(
                  "group flex items-center gap-2 p-2 rounded-full transition-colors",
                  isDark ? "hover:bg-green-500/10" : "hover:bg-green-50"
                )}
              >
                <svg
                  className={cn("w-5 h-5 transition-colors", isDark ? "text-gray-500 group-hover:text-green-500" : "text-gray-600 group-hover:text-green-500")}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                </svg>
              </button>

              {/* Like */}
              <button
                className={cn(
                  "group flex items-center gap-2 p-2 rounded-full transition-colors",
                  isDark ? "hover:bg-pink-500/10" : "hover:bg-pink-50"
                )}
              >
                <svg
                  className={cn("w-5 h-5 transition-colors", isDark ? "text-gray-500 group-hover:text-pink-500" : "text-gray-600 group-hover:text-pink-500")}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>

              {/* Views */}
              <button
                className={cn(
                  "group flex items-center gap-2 p-2 rounded-full transition-colors",
                  isDark ? "hover:bg-blue-500/10" : "hover:bg-blue-50"
                )}
              >
                <svg
                  className={cn("w-5 h-5 transition-colors", isDark ? "text-gray-500 group-hover:text-[#1D9BF0]" : "text-gray-600 group-hover:text-[#1D9BF0]")}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </button>

              {/* Bookmark & Share */}
              <div className="flex items-center gap-1">
                <button
                  className={cn(
                    "group flex items-center gap-2 p-2 rounded-full transition-colors",
                    isDark ? "hover:bg-blue-500/10" : "hover:bg-blue-50"
                  )}
                >
                  <svg
                    className={cn("w-5 h-5 transition-colors", isDark ? "text-gray-500 group-hover:text-[#1D9BF0]" : "text-gray-600 group-hover:text-[#1D9BF0]")}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                </button>
                <button
                  className={cn(
                    "group flex items-center gap-2 p-2 rounded-full transition-colors",
                    isDark ? "hover:bg-blue-500/10" : "hover:bg-blue-50"
                  )}
                >
                  <svg
                    className={cn("w-5 h-5 transition-colors", isDark ? "text-gray-500 group-hover:text-[#1D9BF0]" : "text-gray-600 group-hover:text-[#1D9BF0]")}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
