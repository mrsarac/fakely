import { create } from "zustand";
import type {
  MockupState,
  ChatPlatform,
  AIChatPlatform,
  SocialPlatform,
  Message,
  AIMessage,
  SocialPost,
} from "@/types";
import { generateId } from "@/lib/utils";

const defaultParticipants = [
  { id: "me", name: "Me", avatar: null, isMe: true },
  { id: "other", name: "Alex", avatar: null },
];

const defaultMessages: Message[] = [
  {
    id: generateId(),
    senderId: "other",
    content: "Hey, how are you?",
    timestamp: new Date(Date.now() - 60000),
    type: "text",
    status: "read",
  },
  {
    id: generateId(),
    senderId: "me",
    content: "I'm good, thanks! You?",
    timestamp: new Date(),
    type: "text",
    status: "delivered",
  },
];

const defaultAIMessages: AIMessage[] = [
  {
    id: generateId(),
    role: "user",
    content: "Hello, can you help me with something?",
  },
  {
    id: generateId(),
    role: "assistant",
    content: "Of course! I'd be happy to help. What do you need?",
  },
];

const defaultSocialPost: SocialPost = {
  platform: "instagram",
  author: {
    name: "Fakely",
    username: "fakely",
    avatar: null,
    verified: true,
  },
  content:
    "Creating fake chat and social post mockups has never been easier! 🎭\n\n#fakely #mockup #design",
  likes: 1234,
  comments: 56,
  shares: 78,
  timestamp: new Date(),
  theme: "light",
};

export const useMockupStore = create<MockupState>((set) => ({
  activeTab: "chat",
  chatMockup: {
    platform: "whatsapp",
    participants: defaultParticipants,
    messages: defaultMessages,
    theme: "light",
    showStatusBar: true,
  },
  aiChatMockup: {
    platform: "chatgpt",
    model: "GPT-4",
    messages: defaultAIMessages,
    theme: "light",
  },
  socialPost: defaultSocialPost,

  setActiveTab: (tab) => set({ activeTab: tab }),

  setChatPlatform: (platform: ChatPlatform) =>
    set((state) => ({
      chatMockup: { ...state.chatMockup, platform },
    })),

  setAIChatPlatform: (platform: AIChatPlatform) =>
    set((state) => ({
      aiChatMockup: {
        ...state.aiChatMockup,
        platform,
        model: platform === "chatgpt" ? "GPT-4" : "Claude 3.5",
      },
    })),

  setSocialPlatform: (platform: SocialPlatform) =>
    set((state) => ({
      socialPost: { ...state.socialPost, platform },
    })),

  addMessage: (message: Message) =>
    set((state) => ({
      chatMockup: {
        ...state.chatMockup,
        messages: [...state.chatMockup.messages, message],
      },
    })),

  addAIMessage: (message: AIMessage) =>
    set((state) => ({
      aiChatMockup: {
        ...state.aiChatMockup,
        messages: [...state.aiChatMockup.messages, message],
      },
    })),

  updateSocialPost: (post: Partial<SocialPost>) =>
    set((state) => ({
      socialPost: { ...state.socialPost, ...post },
    })),

  setTheme: (theme: "light" | "dark") =>
    set((state) => ({
      chatMockup: { ...state.chatMockup, theme },
      aiChatMockup: { ...state.aiChatMockup, theme },
      socialPost: { ...state.socialPost, theme },
    })),
}));
