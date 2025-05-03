import type {SelectQuestionDto} from "./select-question.dto.js";
import type {TextQuestionDto} from "./text-question.dto.js";

export type QuestionDto = SelectQuestionDto | TextQuestionDto;
