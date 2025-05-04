import { SelectOptionDto } from "./select-option.dto";
import { ScoreDto } from "./score.dto";
import { QuestionTypeDto } from "./question-type.dto";

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
