import type { ScoreDto } from "@/modules/quiz/dto/score.dto.ts";
import { QuestionTypeDto } from "@/modules/quiz/dto/question-type.dto.ts";

export interface TextQuestionDto {
  id: string;
  type: QuestionTypeDto.TEXT;
  question: string;
  answer?: string;
  score?: ScoreDto;
  explanation?: string;
}
