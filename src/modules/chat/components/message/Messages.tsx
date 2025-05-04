import { ArrowDown } from "lucide-react";
import { useAutoScroll } from "@/modules/chat/hooks/useAutoScroll.ts";
import { Button } from "@/shared/ui/button.tsx";
import { forwardRef, type HTMLAttributes } from "react";

interface ChatMessagesProps extends HTMLAttributes<HTMLDivElement> {
  smooth?: boolean;
}

const Messages = forwardRef<HTMLDivElement, ChatMessagesProps>(
  ({ className, children, smooth = false, ...props }, _ref) => {
    const { scrollRef, isAtBottom, scrollToBottom, disableAutoScroll } =
      useAutoScroll({
        smooth,
        content: children,
      });

    return (
      <div className="relative w-full h-full">
        <div
          className={`flex flex-col w-full h-full p-2 sm:p-4 overflow-y-auto ${className}`}
          ref={scrollRef}
          onWheel={disableAutoScroll}
          onTouchMove={disableAutoScroll}
          {...props}
        >
          <div className="flex flex-col gap-6">{children}</div>
        </div>

        {!isAtBottom && (
          <Button
            onClick={scrollToBottom}
            size="icon"
            variant="outline"
            className="absolute bottom-2 left-1/2 transform -translate-x-1/2 inline-flex rounded-full shadow-md bg-gray-50"
            aria-label="Scroll to bottom"
          >
            <ArrowDown className="size-4"/>
          </Button>
        )}
      </div>
    );
  },
);

Messages.displayName = "ChatMessages";

export { Messages };
