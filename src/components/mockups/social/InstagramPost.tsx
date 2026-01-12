"use client";

import { cn } from "@/lib/utils";
import type { SocialPost } from "@/types";

interface InstagramPostProps {
  post: SocialPost;
}

export function InstagramPost({ post }: InstagramPostProps) {
  const { author, content, likes, comments, theme, timestamp } = post;
  const isDark = theme === "dark";

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num.toString();
  };

  const timeAgo = (): string => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours < 1) return "Just now";
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}d ago`;
    return timestamp.toLocaleDateString("en-US");
  };

  return (
    <div
      className={cn(
        "w-[400px] rounded-lg overflow-hidden shadow-xl border",
        isDark ? "bg-black border-gray-800" : "bg-white border-gray-200"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center font-bold text-white",
              "bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600"
            )}
          >
            {author.avatar ? (
              <img src={author.avatar} alt={author.name} className="w-full h-full rounded-full object-cover" />
            ) : (
              author.name.charAt(0)
            )}
          </div>
          <div>
            <div className="flex items-center gap-1">
              <span className={cn("font-semibold text-sm", isDark ? "text-white" : "text-gray-900")}>
                {author.username}
              </span>
              {author.verified && (
                <svg className="w-4 h-4 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
              )}
            </div>
          </div>
        </div>
        <button className={isDark ? "text-white" : "text-gray-900"}>
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
          </svg>
        </button>
      </div>

      {/* Image Placeholder */}
      <div className={cn("aspect-square flex items-center justify-center", isDark ? "bg-gray-900" : "bg-gray-100")}>
        <svg className={cn("w-20 h-20", isDark ? "text-gray-700" : "text-gray-300")} fill="currentColor" viewBox="0 0 24 24">
          <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
        </svg>
      </div>

      {/* Actions */}
      <div className="p-3 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className={isDark ? "text-white" : "text-gray-900"}>
              <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>
            <button className={isDark ? "text-white" : "text-gray-900"}>
              <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </button>
            <button className={isDark ? "text-white" : "text-gray-900"}>
              <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </button>
          </div>
          <button className={isDark ? "text-white" : "text-gray-900"}>
            <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </button>
        </div>

        {/* Likes */}
        <p className={cn("font-semibold text-sm", isDark ? "text-white" : "text-gray-900")}>
          {formatNumber(likes)} likes
        </p>

        {/* Caption */}
        <p className={cn("text-sm", isDark ? "text-white" : "text-gray-900")}>
          <span className="font-semibold">{author.username}</span>{" "}
          {content}
        </p>

        {/* Comments */}
        <button className={cn("text-sm", isDark ? "text-gray-400" : "text-gray-500")}>
          View all {comments} comments
        </button>

        {/* Time */}
        <p className={cn("text-xs uppercase", isDark ? "text-gray-500" : "text-gray-400")}>
          {timeAgo()}
        </p>
      </div>
    </div>
  );
}
