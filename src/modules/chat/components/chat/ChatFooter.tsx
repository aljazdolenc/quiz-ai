"use client";

import { type HTMLAttributes } from "react";
import { cn } from "@/shared/utils/shadcn";

interface Props extends HTMLAttributes<HTMLDivElement> {
}

export function ChatFooter({ className, ...props }: Props) {
  return <div className={cn("border-t p-4", className)} {...props}/>
}
