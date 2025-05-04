"use client";

import { type HTMLAttributes } from "react";
import { cn } from "@/shared/utils/shadcn";

interface Props extends HTMLAttributes<HTMLDivElement> {
}

export function ExpandableChatHeader({ className, ...props }: Props) {
  return <div
    className={cn("flex items-center justify-between p-4 border-b", className)}
    {...props}
  />
}
