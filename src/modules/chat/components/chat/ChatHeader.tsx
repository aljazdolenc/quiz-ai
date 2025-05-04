"use client";

import { type HTMLAttributes } from "react";
import { cn } from "@/shared/utils/shadcn.ts";

interface Props extends HTMLAttributes<HTMLDivElement> {
}

export function ChatHeader({ className, ...props }: Props) {
  return <div
    className={cn("flex items-center justify-between p-4 border-b", className)}
    {...props}
  />
}
