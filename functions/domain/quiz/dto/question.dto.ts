import type { SelectQuestionDto } from "./select-question.dto";
import type { TextQuestionDto } from "./text-question.dto";

export type QuestionDto = SelectQuestionDto | TextQuestionDto;
