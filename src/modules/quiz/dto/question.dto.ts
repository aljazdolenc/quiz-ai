import type {TextQuestionDto} from "@/modules/quiz/dto/text-question.dto.ts";
import type { SelectQuestionDto } from "./select-question.dto";

export type QuestionDto = SelectQuestionDto | TextQuestionDto;
