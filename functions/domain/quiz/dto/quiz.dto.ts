import { type QuestionDto } from "./question.dto";

export interface QuizDto {
  id: string;
  title: string;
  description: string;
  totalQuestions: number;
  totalPoints: number;
  createdAt: string;
  score: number | null;
  questions: QuestionDto[];
}
