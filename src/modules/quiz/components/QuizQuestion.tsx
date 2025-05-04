import type { QuestionDto } from "@/modules/quiz/dto/question.dto.ts";
import { TextQuestion } from "@/modules/quiz/components/TextQuestion.tsx";
import { QuestionTypeDto } from "@/modules/quiz/dto/question-type.dto.ts";
import { SelectQuestion } from "./SelectQuestion";

interface Props {
  question: QuestionDto;
  setIsAnswered?: (isAnswered: boolean) => void;
  previewMode?: boolean;
}

export function QuizQuestion({ question, setIsAnswered, previewMode }: Props) {
  if (question.type === QuestionTypeDto.TEXT) {
    return <TextQuestion
      question={question}
      setIsAnswered={setIsAnswered}
      previewMode={previewMode}
    />
  }

  if (question.type === QuestionTypeDto.SELECT) {
    return <SelectQuestion
      question={question}
      setIsAnswered={setIsAnswered}
      previewMode={previewMode}
    />
  }

  return <div>Unknown question type</div>
}
