import { Env } from "../../../../shared/interface/env";
import { QuizDto } from "../../../../domain/quiz/dto/quiz.dto";
import { HttpClient } from "../../../../shared/http/http-client";
import { AiResponseDto } from "../../../../domain/ai/dto/ai-response.dto";
import { createReviewPrompt } from "../../../../domain/quiz/prompts/create-review-prompt";
import { ScoreDto } from "../../../../domain/quiz/dto/score.dto";

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const { quiz } = await request.json() as { quiz: QuizDto };

  const response = await HttpClient.post(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${env.GEMINI_API_KEY}`,
    {
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: createReviewPrompt(quiz) }]
          }
        ],
        generationConfig: {
          responseMimeType: "application/json",
        },
      })
    }
  )
  const { candidates } = await response.json() as AiResponseDto;
  const scores = JSON.parse(candidates[0].content.parts[0].text) as {
    score: ScoreDto,
    explanation: string
  }[];

  scores.forEach(((score, index) => {
    const question = quiz.questions[index];
    question.score = score.score;
    question.explanation = score.explanation;
  }));
  const totalScore = scores
    .map(({ score }) => {
      switch (score) {
        case ScoreDto.CORRECT:
          return 1;
        case ScoreDto.PARTIAL:
          return 0.5;
        case ScoreDto.WRONG:
          return 0;
      }
    })
    .reduce((acc, score) => acc + score, 0);

  return new Response(JSON.stringify({
    ...quiz,
    score: totalScore
  }satisfies QuizDto));
}
