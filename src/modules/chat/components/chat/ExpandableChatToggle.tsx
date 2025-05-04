import { X } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/utils/shadcn";
import { IconRobotFace } from "@tabler/icons-react";
import type { ButtonHTMLAttributes, ReactNode } from "react";

export interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode;
  isOpen: boolean;
  toggleChat: () => void;
}

export function ExpandableChatToggle({ className, icon, isOpen, toggleChat, ...props }: Props) {
  return <Button
    variant="default"
    onClick={toggleChat}
    className={cn(
      "w-14 h-14 rounded-full shadow-md flex items-center justify-center hover:shadow-lg hover:shadow-black/30 transition-all duration-300",
      className,
    )}
    {...props}
  >
    {isOpen ? <X className="size-7"/> : icon || <IconRobotFace className="size-7"/>}
  </Button>
}
