import { type HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/shared/utils/shadcn.ts";

const chatBubbleMessageVariants = cva("p-4", {
  variants: {
    variant: {
      received: "bg-secondary text-secondary-foreground rounded-r-lg rounded-tl-lg",
      sent: "bg-primary text-primary-foreground rounded-l-lg rounded-tr-lg",
    },
    layout: {
      default: "",
      ai: "border-t w-full rounded-none bg-transparent",
    },
  },
  defaultVariants: {
    variant: "received",
    layout: "default",
  },
});

interface Props extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof chatBubbleMessageVariants> {
}

export function Message({ className, variant, layout, children, ...props }: Props) {
  return (
    <div
      className={cn(
        chatBubbleMessageVariants({ variant, layout, className }),
        "break-words max-w-full whitespace-pre-wrap",
      )}
      {...props}
    >
      {children}
    </div>
  )
}
