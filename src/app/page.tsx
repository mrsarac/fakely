"use client";

import { useRef, useState } from "react";
import { useMockupStore } from "@/store/mockup-store";
import { WhatsAppChat } from "@/components/mockups/chat/WhatsAppChat";
import { iMessageChat as IMessageChat } from "@/components/mockups/chat/iMessageChat";
import { DiscordChat } from "@/components/mockups/chat/DiscordChat";
import { SlackChat } from "@/components/mockups/chat/SlackChat";
import { ChatGPTMockup } from "@/components/mockups/ai-chat/ChatGPTMockup";
import { ClaudeMockup } from "@/components/mockups/ai-chat/ClaudeMockup";
import { InstagramPost } from "@/components/mockups/social/InstagramPost";
import { XPost } from "@/components/mockups/social/XPost";
import { AIGenerator } from "@/components/controls/AIGenerator";
import { cn } from "@/lib/utils";
import { toPng } from "html-to-image";

const tabs = [
  { id: "chat", label: "Chat", icon: "💬" },
  { id: "ai-chat", label: "AI Chat", icon: "🤖" },
  { id: "social", label: "Social Post", icon: "📱" },
] as const;

const chatPlatforms = [
  { id: "whatsapp", label: "WhatsApp", color: "#25d366" },
  { id: "imessage", label: "iMessage", color: "#007aff" },
  { id: "discord", label: "Discord", color: "#5865f2" },
  { id: "slack", label: "Slack", color: "#4a154b" },
] as const;

const aiPlatforms = [
  { id: "chatgpt", label: "ChatGPT", color: "#10a37f" },
  { id: "claude", label: "Claude", color: "#d97706" },
] as const;

const socialPlatforms = [
  { id: "instagram", label: "Instagram", color: "#e4405f" },
  { id: "x", label: "X (Twitter)", color: "#000000" },
] as const;

export default function Home() {
  const {
    activeTab,
    setActiveTab,
    chatMockup,
    aiChatMockup,
    socialPost,
    setChatPlatform,
    setAIChatPlatform,
    setSocialPlatform,
    setTheme,
  } = useMockupStore();

  const mockupRef = useRef<HTMLDivElement>(null);
  const [exporting, setExporting] = useState(false);

  const currentTheme = chatMockup.theme;

  const handleExport = async () => {
    if (!mockupRef.current) return;

    setExporting(true);
    try {
      const dataUrl = await toPng(mockupRef.current, {
        quality: 1,
        pixelRatio: 2,
        backgroundColor: "transparent",
      });

      // Download the image
      const link = document.createElement("a");
      link.download = `fakely-mockup-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Export failed:", error);
    } finally {
      setExporting(false);
    }
  };

  const renderChatMockup = () => {
    switch (chatMockup.platform) {
      case "whatsapp":
        return <WhatsAppChat mockup={chatMockup} />;
      case "imessage":
        return <IMessageChat mockup={chatMockup} />;
      case "discord":
        return <DiscordChat mockup={chatMockup} />;
      case "slack":
        return <SlackChat mockup={chatMockup} />;
      default:
        return <WhatsAppChat mockup={chatMockup} />;
    }
  };

  const renderAIChatMockup = () => {
    switch (aiChatMockup.platform) {
      case "chatgpt":
        return <ChatGPTMockup mockup={aiChatMockup} />;
      case "claude":
        return <ClaudeMockup mockup={aiChatMockup} />;
      default:
        return <ChatGPTMockup mockup={aiChatMockup} />;
    }
  };

  const renderSocialMockup = () => {
    switch (socialPost.platform) {
      case "instagram":
        return <InstagramPost post={socialPost} />;
      case "x":
        return <XPost post={socialPost} />;
      default:
        return <InstagramPost post={socialPost} />;
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🎭</span>
            <div>
              <h1 className="text-2xl font-bold text-white">Fakely</h1>
              <p className="text-xs text-gray-400">Free & Open Source Mockup Generator</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/mrsarac/fakely"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </a>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar - Controls */}
          <aside className="lg:col-span-3 space-y-6">
            {/* Tabs */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <h3 className="text-sm font-medium text-gray-400 mb-3">Mockup Tipi</h3>
              <div className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all",
                      activeTab === tab.id
                        ? "bg-purple-600 text-white"
                        : "bg-white/5 text-gray-300 hover:bg-white/10"
                    )}
                  >
                    <span className="text-xl">{tab.icon}</span>
                    <span className="font-medium">{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Platform Selector */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <h3 className="text-sm font-medium text-gray-400 mb-3">Platform</h3>
              <div className="space-y-2">
                {activeTab === "chat" &&
                  chatPlatforms.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setChatPlatform(p.id)}
                      className={cn(
                        "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all",
                        chatMockup.platform === p.id
                          ? "ring-2 ring-offset-2 ring-offset-gray-900"
                          : "bg-white/5 hover:bg-white/10"
                      )}
                      style={{
                        backgroundColor:
                          chatMockup.platform === p.id ? p.color : undefined,
                      }}
                    >
                      <span
                        className={cn(
                          "font-medium",
                          chatMockup.platform === p.id ? "text-white" : "text-gray-300"
                        )}
                      >
                        {p.label}
                      </span>
                    </button>
                  ))}
                {activeTab === "ai-chat" &&
                  aiPlatforms.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setAIChatPlatform(p.id)}
                      className={cn(
                        "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all",
                        aiChatMockup.platform === p.id
                          ? "ring-2 ring-offset-2 ring-offset-gray-900"
                          : "bg-white/5 hover:bg-white/10"
                      )}
                      style={{
                        backgroundColor:
                          aiChatMockup.platform === p.id ? p.color : undefined,
                      }}
                    >
                      <span
                        className={cn(
                          "font-medium",
                          aiChatMockup.platform === p.id ? "text-white" : "text-gray-300"
                        )}
                      >
                        {p.label}
                      </span>
                    </button>
                  ))}
                {activeTab === "social" &&
                  socialPlatforms.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setSocialPlatform(p.id)}
                      className={cn(
                        "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all",
                        socialPost.platform === p.id
                          ? "ring-2 ring-offset-2 ring-offset-gray-900"
                          : "bg-white/5 hover:bg-white/10"
                      )}
                      style={{
                        backgroundColor:
                          socialPost.platform === p.id ? p.color : undefined,
                      }}
                    >
                      <span
                        className={cn(
                          "font-medium",
                          socialPost.platform === p.id ? "text-white" : "text-gray-300"
                        )}
                      >
                        {p.label}
                      </span>
                    </button>
                  ))}
              </div>
            </div>

            {/* Theme Toggle */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <h3 className="text-sm font-medium text-gray-400 mb-3">Tema</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setTheme("light")}
                  className={cn(
                    "flex-1 py-3 rounded-lg font-medium transition-all",
                    currentTheme === "light"
                      ? "bg-white text-gray-900"
                      : "bg-white/5 text-gray-300 hover:bg-white/10"
                  )}
                >
                  ☀️ Light
                </button>
                <button
                  onClick={() => setTheme("dark")}
                  className={cn(
                    "flex-1 py-3 rounded-lg font-medium transition-all",
                    currentTheme === "dark"
                      ? "bg-gray-800 text-white"
                      : "bg-white/5 text-gray-300 hover:bg-white/10"
                  )}
                >
                  🌙 Dark
                </button>
              </div>
            </div>

            {/* AI Generator */}
            <AIGenerator type={activeTab} />

            {/* Export Button */}
            <button
              onClick={handleExport}
              disabled={exporting}
              className={cn(
                "w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg shadow-purple-500/25 flex items-center justify-center gap-2",
                exporting && "opacity-50 cursor-not-allowed"
              )}
            >
              {exporting ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
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
                  Dışa Aktarılıyor...
                </>
              ) : (
                <>📥 PNG Olarak İndir</>
              )}
            </button>
          </aside>

          {/* Main Content - Preview */}
          <main className="lg:col-span-9">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 min-h-[700px] flex items-center justify-center overflow-auto">
              <div ref={mockupRef}>
                {activeTab === "chat" && renderChatMockup()}
                {activeTab === "ai-chat" && renderAIChatMockup()}
                {activeTab === "social" && renderSocialMockup()}
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <p className="text-gray-400">
            Made with ❤️ by{" "}
            <a
              href="https://github.com/neurabytelabs"
              className="text-purple-400 hover:text-purple-300"
            >
              NeuraByte Labs
            </a>
          </p>
          <p className="text-gray-500 text-sm mt-2">
            100% Free • Open Source • No Watermarks
          </p>
        </div>
      </footer>
    </main>
  );
}
