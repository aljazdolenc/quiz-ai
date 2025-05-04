import { Env } from "../../../../shared/interface/env";
import { QuizDto } from "../../../../domain/quiz/dto/quiz.dto";
import { HttpClient } from "../../../../shared/http/http-client";
import { AiResponseDto } from "../../../../domain/ai/dto/ai-response.dto";
import {
  createRecommendationsPrompt
} from "../../../../domain/quiz/prompts/create-recommendations-prompt";
import { uuid } from "../../../../shared/util/uuid";

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const limitQuery = new URL(request.url).searchParams.get('limit');
  const limit = Number(limitQuery ?? 10);

  if (limit > 10) {
    return new Response(JSON.stringify({ message: 'Limit must be less than or equal to 10' }), { status: 400 })
  }

  const { quizzes } = await request.json() as { quizzes: QuizDto[] };

  if (quizzes.length === 0) {
    return new Response(JSON.stringify(defaultRecommendations));
  }

  const response = await HttpClient.post(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${env.GEMINI_API_KEY}`,
    {
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: createRecommendationsPrompt(limit, quizzes) }]
          }
        ],
        generationConfig: {
          responseMimeType: "application/json",
        },
      })
    }
  )
  const { candidates } = await response.json() as AiResponseDto;
  const recommendations = JSON.parse(candidates[0].content.parts[0].text) as QuizDto[];
  console.log(recommendations);
  recommendations.forEach(quiz => {
    quiz.id = uuid();
    quiz.createdAt = new Date().toISOString();
    quiz.totalPoints = quiz.questions.length;
  });

  return new Response(JSON.stringify(recommendations));
}

const defaultRecommendations = [
  {
    "id": uuid(),
    "title": "Algebra Basics",
    "description": "Test your fundamental algebra skills.",
    "createdAt": new Date().toISOString(),
    "totalPoints": 6,
    "questions": [
      {
        "type": "select",
        "question": "Solve for x: 2x + 5 = 11",
        "options": [
          { "id": "a", "value": "2" },
          { "id": "b", "value": "3" },
          { "id": "c", "value": "4" },
          { "id": "d", "value": "5" }
        ],
        "correctId": "b"
      },
      {
        "type": "text",
        "question": "What is the square root of 144?"
      },
      {
        "type": "select",
        "question": "Simplify the expression: 3(x + 2) - x",
        "options": [
          { "id": "a", "value": "2x + 6" },
          { "id": "b", "value": "3x + 6" },
          { "id": "c", "value": "4x + 2" },
          { "id": "d", "value": "2x + 2" }
        ],
        "correctId": "a"
      },
      {
        "type": "text",
        "question": "What is the value of pi (π) rounded to two decimal places?"
      },
      {
        "type": "select",
        "question": "If a triangle has angles 45°, 45°, what is the third angle?",
        "options": [
          { "id": "a", "value": "45°" },
          { "id": "b", "value": "60°" },
          { "id": "c", "value": "90°" },
          { "id": "d", "value": "100°" }
        ],
        "correctId": "c"
      },
      {
        "type": "text",
        "question": "What is 15% of 200?"
      }
    ]
  },
  {
    "id": uuid(),
    "title": "Cell Biology",
    "description": "Explore the fundamental concepts of cells.",
    "createdAt": new Date().toISOString(),
    "totalPoints": 6,
    "questions": [
      {
        "type": "select",
        "question": "What is the powerhouse of the cell?",
        "options": [
          { "id": "a", "value": "Nucleus" },
          { "id": "b", "value": "Ribosome" },
          { "id": "c", "value": "Mitochondrion" },
          { "id": "d", "value": "Chloroplast" }
        ],
        "correctId": "c"
      },
      {
        "type": "text",
        "question": "What is the main function of the cell membrane?"
      },
      {
        "type": "select",
        "question": "Which organelle is responsible for protein synthesis?",
        "options": [
          { "id": "a", "value": "Golgi Apparatus" },
          { "id": "b", "value": "Ribosome" },
          { "id": "c", "value": "Lysosome" },
          { "id": "d", "value": "Endoplasmic Reticulum" }
        ],
        "correctId": "b"
      },
      {
        "type": "text",
        "question": "What does DNA stand for?"
      },
      {
        "type": "select",
        "question": "Plant cells have a cell wall, but animal cells do not. What is the primary component of the plant cell wall?",
        "options": [
          { "id": "a", "value": "Chitin" },
          { "id": "b", "value": "Peptidoglycan" },
          { "id": "c", "value": "Cellulose" },
          { "id": "d", "value": "Keratin" }
        ],
        "correctId": "c"
      },
      {
        "type": "text",
        "question": "What is the process by which cells divide to produce two identical daughter cells?"
      }
    ]
  },
  {
    "id": uuid(),
    "title": "React Concepts",
    "description": "Check your knowledge of core React concepts.",
    "createdAt": new Date().toISOString(),
    "totalPoints": 6,
    "questions": [
      {
        "type": "select",
        "question": "What is JSX?",
        "options": [
          { "id": "a", "value": "A JavaScript testing framework" },
          {
            "id": "b",
            "value": "A JavaScript syntax extension for writing HTML-like code"
          },
          { "id": "c", "value": "A state management library" },
          { "id": "d", "value": "A CSS preprocessor" }
        ],
        "correctId": "b"
      },
      {
        "type": "text",
        "question": "How do you pass data from a parent component to a child component in React?"
      },
      {
        "type": "select",
        "question": "Which hook is used to manage state in a functional component?",
        "options": [
          { "id": "a", "value": "useEffect" },
          { "id": "b", "value": "useContext" },
          { "id": "c", "value": "useState" },
          { "id": "d", "value": "useReducer" }
        ],
        "correctId": "c"
      },
      {
        "type": "text",
        "question": "What is the purpose of the `key` prop when rendering lists in React?"
      },
      {
        "type": "select",
        "question": "What command is used to create a new React application using Create React App?",
        "options": [
          { "id": "a", "value": "npm init react-app my-app" },
          { "id": "b", "value": "npx create-react-app my-app" },
          { "id": "c", "value": "yarn new react-app my-app" },
          { "id": "d", "value": "react create my-app" }
        ],
        "correctId": "b"
      },
      {
        "type": "text",
        "question": "What is the Virtual DOM?"
      }
    ]
  }
]
