import {QuestionTypeDto} from "../dto/question-type.dto.js";
import {QuizDto} from "../dto/quiz.dto.js";
import {SelectQuestionDto} from "../dto/select-question.dto.js";
import {TextQuestionDto} from "../dto/text-question.dto.js";
import {ScoreDto} from "../dto/score.dto.js";

export function createReviewPrompt(quiz: QuizDto) {
    return `
    You are reviewing a quiz titled: "${quiz.title}". Score each question with 
    "${ScoreDto.CORRECT}", "${ScoreDto.PARTIAL}" or "${ScoreDto.WRONG}".
    And provide short explanation for each question in second-person tone.
    
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

function mapSelectQuestion({question, options, correctId, selectedId}: SelectQuestionDto) {
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
