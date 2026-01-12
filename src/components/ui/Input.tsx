"use client";

import { cn } from "@/lib/utils";
import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="space-y-1">
        {label && (
          <label className="block text-[12px] font-medium text-[#666666] uppercase tracking-wider">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            "w-full bg-white border border-[#E5E5E5] px-3 py-2 rounded-[6px] text-[13px] text-[#1A1A1A]",
            "placeholder:text-[#A3A3A3]",
            "focus:outline-none focus:ring-1 focus:ring-black focus:border-black",
            "transition-all duration-150",
            error && "border-red-500 focus:ring-red-500",
            className
          )}
          {...props}
        />
        {error && (
          <p className="text-[12px] text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
