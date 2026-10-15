import type { InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function FieldGroup({
  label,
  hint,
  children,
  className,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label className="font-label text-[11px] text-ink/60">{label}</label>
      {children}
      {hint && <p className="text-xs text-ink/45">{hint}</p>}
    </div>
  );
}

const baseInputClass =
  "w-full rounded-lg border border-ink/15 bg-paper px-3.5 py-2.5 text-sm text-ink outline-none transition-colors focus:border-wine";

export function TextInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cn(baseInputClass, props.className)} />;
}

export function TextArea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={cn(baseInputClass, "min-h-32 resize-y", props.className)} />;
}

export function Select(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={cn(baseInputClass, props.className)} />;
}

export function Checkbox({ label, ...props }: InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="flex items-center gap-2 text-sm text-ink">
      <input type="checkbox" {...props} className="h-4 w-4 accent-wine" />
      {label}
    </label>
  );
}
