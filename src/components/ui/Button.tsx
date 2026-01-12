"use client";

import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", loading, children, disabled, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center gap-2 font-medium rounded-[6px] transition-all duration-150 focus:outline-none focus:ring-1 focus:ring-black disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
      primary: "bg-black text-white hover:bg-[#222]",
      secondary: "bg-white border border-[#E5E5E5] text-[#1A1A1A] hover:bg-[#F5F5F5] hover:border-[#D1D1D1]",
      ghost: "text-[#666666] hover:bg-[#E5E5E5] hover:text-[#1A1A1A]",
    };

    const sizes = {
      sm: "px-2 py-1 text-[12px]",
      md: "px-3 py-1.5 text-[13px]",
      lg: "px-4 py-2 text-[14px]",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
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
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
