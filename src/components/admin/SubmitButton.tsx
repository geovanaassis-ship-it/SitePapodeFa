"use client";

import { useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";

export function SubmitButton({
  children,
  variant = "primary",
  className,
}: {
  children: React.ReactNode;
  variant?: "primary" | "danger" | "ghost";
  className?: string;
}) {
  const { pending } = useFormStatus();

  const variants: Record<string, string> = {
    primary: "bg-wine text-paper hover:bg-wine/90",
    danger: "bg-transparent text-wine border border-wine/40 hover:bg-wine/10",
    ghost: "bg-transparent text-ink border border-ink/15 hover:bg-ink/5",
  };

  return (
    <button
      type="submit"
      disabled={pending}
      className={cn(
        "font-label rounded-full px-5 py-2.5 text-[12px] transition-colors disabled:opacity-60",
        variants[variant],
        className,
      )}
    >
      {pending ? "Salvando…" : children}
    </button>
  );
}
