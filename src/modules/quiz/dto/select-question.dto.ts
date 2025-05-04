import type { SelectOptionDto } from "./select-option.dto";
import type { ScoreDto } from "@/modules/quiz/dto/score.dto.ts";
import { QuestionTypeDto } from "@/modules/quiz/dto/question-type.dto.ts";

export interface SelectQuestionDto {
  id: string;
  type: QuestionTypeDto.SELECT;
  question: string;
  options: SelectOptionDto[];
  correctId: string;
  selectedId?: string;
  score?: ScoreDto;
  explanation?: string;
}
