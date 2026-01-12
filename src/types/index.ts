// Platform Types
export type ChatPlatform = "whatsapp" | "imessage" | "discord" | "slack";
export type AIChatPlatform = "chatgpt" | "claude";
export type SocialPlatform = "instagram" | "x";
export type Platform = ChatPlatform | AIChatPlatform | SocialPlatform;

// Message Types
export interface Participant {
  id: string;
  name: string;
  avatar: string | null;
  isMe?: boolean;
}

export interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: Date;
  type: "text" | "image" | "voice";
  status?: "sent" | "delivered" | "read";
}

// Chat Mockup
export interface ChatMockup {
  platform: ChatPlatform;
  participants: Participant[];
  messages: Message[];
  theme: "light" | "dark";
  showStatusBar: boolean;
}

// AI Chat Mockup
export interface AIMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export interface AIChatMockup {
  platform: AIChatPlatform;
  model: string;
  messages: AIMessage[];
  theme: "light" | "dark";
}

// Social Post Mockup
export interface SocialPost {
  platform: SocialPlatform;
  author: {
    name: string;
    username: string;
    avatar: string | null;
    verified: boolean;
  };
  content: string;
  image?: string;
  likes: number;
  comments: number;
  shares: number;
  timestamp: Date;
  theme: "light" | "dark";
}

// Store State
export interface MockupState {
  activeTab: "chat" | "ai-chat" | "social";
  chatMockup: ChatMockup;
  aiChatMockup: AIChatMockup;
  socialPost: SocialPost;
  setActiveTab: (tab: "chat" | "ai-chat" | "social") => void;
  setChatPlatform: (platform: ChatPlatform) => void;
  setAIChatPlatform: (platform: AIChatPlatform) => void;
  setSocialPlatform: (platform: SocialPlatform) => void;
  addMessage: (message: Message) => void;
  addAIMessage: (message: AIMessage) => void;
  updateSocialPost: (post: Partial<SocialPost>) => void;
  setTheme: (theme: "light" | "dark") => void;
}
