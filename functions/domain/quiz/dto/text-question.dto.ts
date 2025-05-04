import { ScoreDto } from "./score.dto";
import { QuestionTypeDto } from "./question-type.dto";

export interface TextQuestionDto {
  id: string;
  type: QuestionTypeDto.TEXT;
  question: string;
  answer?: string;
  score?: ScoreDto;
  explanation?: string;
}
