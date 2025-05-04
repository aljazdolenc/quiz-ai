import { cn } from "@/shared/utils/shadcn.ts";

interface ProgressBarProps {
  currentQuestion: number
  totalQuestions: number
  className?: string
}

export function QuizProgress({
  currentQuestion,
  totalQuestions,
  className
}: ProgressBarProps) {
  const progress = (currentQuestion / totalQuestions) * 100

  return (
    <div className={cn("w-full", className)}>
      <div className="flex justify-between text-sm mb-1">
        <span>Question {currentQuestion} of {totalQuestions}</span>
        <span>{Math.round(progress)}%</span>
      </div>
      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-500 transition-all duration-300 ease-in-out"
          style={{ width: `${progress}%` }}/>
      </div>
    </div>
  )
}
