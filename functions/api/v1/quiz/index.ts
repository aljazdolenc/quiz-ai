import { Env } from "../../../shared/interface/env";
import { HttpClient } from "../../../shared/http/http-client";
import { createQuizPrompt } from "../../../domain/quiz/prompts/create-quiz-prompt";
import { AiResponseDto } from "../../../domain/ai/dto/ai-response.dto";
import { uuid } from "../../../shared/util/uuid";
import { QuizDto } from "../../../domain/quiz/dto/quiz.dto";

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const { prompt } = await request.json() as { prompt: string };

  const response = await HttpClient.post(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${env.GEMINI_API_KEY}`,
    {
      body: JSON.stringify({
        system_instruction: {
          parts: [
            {
              text: createQuizPrompt()
            }
          ]
        },
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }]
          }
        ],
        generationConfig: {
          responseMimeType: "application/json",
        },
      })
    }
  )
  const { candidates } = await response.json() as AiResponseDto;
  const quiz = JSON.parse(candidates[0].content.parts[0].text) as QuizDto;

  return new Response(JSON.stringify({
    id: uuid(),
    createdAt: new Date().toISOString(),
    totalPoints: quiz.questions.length,
    ...quiz
  } satisfies QuizDto));
}
