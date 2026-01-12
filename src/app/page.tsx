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
import { Button } from "@/components/ui/Button";
import { Tabs } from "@/components/ui/Tabs";
import { Select } from "@/components/ui/Select";
import { cn } from "@/lib/utils";
import { toPng } from "html-to-image";

const mockupTabs = [
  { id: "chat", label: "Chat" },
  { id: "ai-chat", label: "AI Chat" },
  { id: "social", label: "Social" },
];

const chatPlatforms = [
  { value: "whatsapp", label: "WhatsApp" },
  { value: "imessage", label: "iMessage" },
  { value: "discord", label: "Discord" },
  { value: "slack", label: "Slack" },
];

const aiPlatforms = [
  { value: "chatgpt", label: "ChatGPT" },
  { value: "claude", label: "Claude" },
];

const socialPlatforms = [
  { value: "instagram", label: "Instagram" },
  { value: "x", label: "X (Twitter)" },
];

const themeOptions = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
];

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

  const getCurrentPlatform = () => {
    if (activeTab === "chat") return chatMockup.platform;
    if (activeTab === "ai-chat") return aiChatMockup.platform;
    return socialPost.platform;
  };

  const getPlatformLabel = () => {
    const platform = getCurrentPlatform();
    if (activeTab === "chat") {
      return chatPlatforms.find((p) => p.value === platform)?.label || platform;
    }
    if (activeTab === "ai-chat") {
      return aiPlatforms.find((p) => p.value === platform)?.label || platform;
    }
    return socialPlatforms.find((p) => p.value === platform)?.label || platform;
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] flex flex-col">
      {/* Header - 48px slim */}
      <header className="h-12 border-b border-[#E5E5E5] bg-white flex items-center justify-between px-4 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-black rounded-[4px] flex items-center justify-center">
              <span className="text-white text-[10px] font-bold">F</span>
            </div>
            <span className="text-[14px] font-semibold text-[#1A1A1A]">Fakely</span>
          </div>

          {/* Breadcrumb */}
          <div className="hidden sm:flex items-center gap-1 text-[13px] text-[#A3A3A3]">
            <span>/</span>
            <span className="text-[#666666]">{mockupTabs.find((t) => t.id === activeTab)?.label}</span>
            <span>/</span>
            <span className="text-[#1A1A1A]">{getPlatformLabel()}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* GitHub */}
          <a
            href="https://github.com/mrsarac/fakely"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-[6px] text-[#666666] hover:bg-[#F5F5F5] hover:text-[#1A1A1A] transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>

          {/* Export Button */}
          <Button
            onClick={handleExport}
            loading={exporting}
            size="sm"
          >
            {exporting ? "Exporting..." : "Export PNG"}
          </Button>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar - 260px */}
        <aside className="w-[260px] bg-[#F9F9F9] border-r border-[#E5E5E5] flex flex-col">
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {/* Mockup Type */}
            <div className="space-y-2">
              <label className="block text-[12px] font-medium text-[#666666] uppercase tracking-wider">
                Mockup Type
              </label>
              <Tabs
                tabs={mockupTabs}
                activeTab={activeTab}
                onChange={(id) => setActiveTab(id as "chat" | "ai-chat" | "social")}
              />
            </div>

            {/* Platform */}
            <Select
              label="Platform"
              options={
                activeTab === "chat"
                  ? chatPlatforms
                  : activeTab === "ai-chat"
                  ? aiPlatforms
                  : socialPlatforms
              }
              value={getCurrentPlatform()}
              onChange={(value) => {
                if (activeTab === "chat") {
                  setChatPlatform(value as "whatsapp" | "imessage" | "discord" | "slack");
                } else if (activeTab === "ai-chat") {
                  setAIChatPlatform(value as "chatgpt" | "claude");
                } else {
                  setSocialPlatform(value as "instagram" | "x");
                }
              }}
            />

            {/* Theme */}
            <Select
              label="Theme"
              options={themeOptions}
              value={currentTheme}
              onChange={(value) => setTheme(value as "light" | "dark")}
            />

            {/* Divider */}
            <div className="border-t border-[#E5E5E5]" />

            {/* AI Generator */}
            <AIGenerator type={activeTab} />
          </div>

          {/* Footer in Sidebar */}
          <div className="p-4 border-t border-[#E5E5E5]">
            <p className="text-[11px] text-[#A3A3A3] text-center">
              Free & Open Source
            </p>
            <p className="text-[10px] text-[#A3A3A3] text-center mt-1">
              Made by{" "}
              <a
                href="https://github.com/neurabytelabs"
                className="text-[#666666] hover:text-[#1A1A1A] transition-colors"
              >
                NeuraByte Labs
              </a>
            </p>
          </div>
        </aside>

        {/* Canvas Area */}
        <main className="flex-1 canvas-grid overflow-auto">
          <div className="min-h-full flex items-center justify-center p-8">
            <div
              ref={mockupRef}
              className={cn(
                "transition-all duration-300",
                "shadow-md rounded-lg"
              )}
            >
              {activeTab === "chat" && renderChatMockup()}
              {activeTab === "ai-chat" && renderAIChatMockup()}
              {activeTab === "social" && renderSocialMockup()}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
