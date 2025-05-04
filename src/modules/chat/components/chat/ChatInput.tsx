import { Textarea } from "@/shared/ui/textarea.tsx";
import { cn } from "@/shared/utils/shadcn.ts";
import { type TextareaHTMLAttributes } from "react";

interface ChatInputProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
}

export function ChatInput({ className, ...restProps }: ChatInputProps) {
  return (
    <Textarea
      autoComplete="off"
      name="message"
      className={cn(
        "pl-4 pr-12 py-3 max-h-14 sm:max-h-40 min-h-none sm:text-lg bg-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 w-full rounded-md flex items-center resize-none",
        className,
      )}
      {...restProps}
    />
  );
}
