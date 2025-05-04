import { type HTMLAttributes } from "react";
import { cn } from "@/shared/utils/shadcn";

interface Props extends HTMLAttributes<HTMLDivElement> {}

export function ChatBody({ className, ...props }: Props){
  return  <div className={cn("flex-grow overflow-y-auto", className)} {...props}/>
}
