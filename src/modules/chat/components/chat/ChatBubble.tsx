import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/shared/utils/shadcn.ts";
import {
  Children, cloneElement, type ComponentProps, forwardRef, type HTMLAttributes, isValidElement
} from "react";

const chatBubbleVariant = cva(
  "flex gap-2 max-w-[90%] items-end relative group",
  {
    variants: {
      variant: {
        received: "self-start",
        sent: "self-end flex-row-reverse",
      },
      layout: {
        default: "",
        ai: "max-w-full w-full items-center",
      },
    },
    defaultVariants: {
      variant: "received",
      layout: "default",
    },
  },
);

interface ChatBubbleProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof chatBubbleVariant> {
}

export const ChatBubble = forwardRef<HTMLDivElement, ChatBubbleProps>(
  ({ className, variant, layout, children, ...props }, ref) => (
    <div
      className={cn(
        chatBubbleVariant({ variant, layout, className }),
        "relative group",
      )}
      ref={ref}
      {...props}
    >
      {Children.map(children, (child) =>
        isValidElement(child) && typeof child.type !== "string"
          ? cloneElement(child, {
            variant,
            layout,
          } as ComponentProps<typeof child.type>)
          : child,
      )}
    </div>
  ),
);
ChatBubble.displayName = "ChatBubble";
