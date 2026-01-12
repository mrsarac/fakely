"use client";

import { cn } from "@/lib/utils";

interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (id: string) => void;
}

export function Tabs({ tabs, activeTab, onChange }: TabsProps) {
  return (
    <div className="flex gap-1 p-1 bg-[#F5F5F5] rounded-[8px]">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={cn(
            "flex items-center gap-2 px-3 py-1.5 rounded-[6px] text-[13px] font-medium transition-all duration-150",
            activeTab === tab.id
              ? "bg-white text-[#1A1A1A] shadow-sm"
              : "text-[#666666] hover:text-[#1A1A1A]"
          )}
        >
          {tab.icon}
          {tab.label}
        </button>
      ))}
    </div>
  );
}
