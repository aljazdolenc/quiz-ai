import { QuizDto } from "../dto/quiz.dto";
import { ScoreDto } from "../dto/score.dto";

export function createRecommendationsPrompt(limit: number, quizzes: QuizDto[]): string {
  return `
    You are generating a ${limit} quiz recommendations for a user, 
    based on the quizzes they have already taken.
    Generate quizzes with 6 questions related to the topic.
    Questions can be of type "select" or "text". 
    Include similar questions to the ones the user has already taken and were wrong and some new ones.
    
    Past quizzes:
    ${mapQuizzes(quizzes)}
    
    Select example:
    { 
      type: "select", 
      question: string;
      options: {id: string, value: string}[];
      correctId: string;
    }
    
    Text example:
    {
        type: "text",
        question: string;
    }
    
    Example JSON response:
    {
        title: string; // short 2-3 words quiz name based on topic
        description: string; // short description of the quiz
        questions: QuestionDto[]; // array of questions ("select" or "text")
    }[]
`;
}

function mapQuizzes(quizzes: QuizDto[]) {
  return quizzes.map((quiz, i) => `
        ${i + 1} Quiz: 
        Title: ${quiz.title}
        Description: ${quiz.description}
        Incorrect Questions: [${quiz.questions.filter(q => q.score !== ScoreDto.CORRECT).join(", ")}]
    `).join('\n');
}
