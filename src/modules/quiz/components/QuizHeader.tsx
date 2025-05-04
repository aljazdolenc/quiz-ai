import type { ReactNode } from "react";

export interface QuizHeaderProps {
  title: string;
  children?: ReactNode;
}

export function QuizHeader({ title, children }: QuizHeaderProps) {
  return (
    <div>
      <h1 className="text-2xl font-bold pb-3 md:pb-0">{title}</h1>
      {children}
    </div>
  )
}
