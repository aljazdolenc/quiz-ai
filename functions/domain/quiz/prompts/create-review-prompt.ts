import { QuestionTypeDto } from "../dto/question-type.dto";
import { QuizDto } from "../dto/quiz.dto";
import { SelectQuestionDto } from "../dto/select-question.dto";
import { TextQuestionDto } from "../dto/text-question.dto";
import { ScoreDto } from "../dto/score.dto";

export function createReviewPrompt(quiz: QuizDto) {
  return `
    You are reviewing a quiz titled: "${quiz.title}". Score each question with 
    "${ScoreDto.CORRECT}", "${ScoreDto.PARTIAL}" or "${ScoreDto.WRONG}".
    And provide short explanation for each question in second-person tone.
    For minor typos in the main point of the question, use ${ScoreDto.PARTIAL} as a score if the meaning was right.
    For ${ScoreDto.WRONG} and ${ScoreDto.PARTIAL} answers, provide a short explanation of why the answer was wrong and correct answer.
    
    Questions:
    ${
    quiz.questions
      .map(question => question.type === QuestionTypeDto.SELECT
        ? mapSelectQuestion(question)
        : mapTextQuestion(question)
      ).map((line, i) => `${i + 1}. Question\n${line}`)
      .join('\n')
  }
    
    Respond in JSON format:
    [
      {
        "score": "${ScoreDto.CORRECT}" | "${ScoreDto.PARTIAL}" | "${ScoreDto.WRONG}",
        "explanation": "..."
      }
    ]
    `
}

function mapSelectQuestion({
  question,
  options,
  correctId,
  selectedId
}: SelectQuestionDto) {
  const correctOption = options.find(option => option.id === correctId);
  const selectedOption = options.find(option => option.id === selectedId);

  return `
    Question: ${question}
    UserAnswer: ${selectedOption.value}
    Correct: ${correctOption.value}
    `;
}

function mapTextQuestion(question: TextQuestionDto) {
  return `
    Question: ${question.question}
    UserAnswer: ${question.answer}
    `;
}
