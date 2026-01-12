"use client";

import { cn } from "@/lib/utils";

interface Option {
  value: string;
  label: string;
  color?: string;
}

interface SelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
}

export function Select({ options, value, onChange, label }: SelectProps) {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-[12px] font-medium text-[#666666] uppercase tracking-wider">
          {label}
        </label>
      )}
      <div className="grid grid-cols-2 gap-2">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={cn(
              "px-3 py-2 rounded-[6px] text-[13px] font-medium transition-all duration-150 text-left",
              "border",
              value === option.value
                ? "bg-black text-white border-black"
                : "bg-white text-[#666666] border-[#E5E5E5] hover:border-[#D1D1D1] hover:text-[#1A1A1A]"
            )}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
