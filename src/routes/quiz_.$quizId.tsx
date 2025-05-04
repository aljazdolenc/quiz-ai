import { createFileRoute } from '@tanstack/react-router'
import { useCallback, useEffect, useState } from "react";
import { useQuizContext } from "@/modules/quiz/hooks/quizContext.tsx";
import type { QuizDto } from "@/modules/quiz/dto/quiz.dto.ts";
import { QuizHeader } from "@/modules/quiz/components/QuizHeader.tsx";
import { QuizProgress } from "@/modules/quiz/components/QuizProgress.tsx";
import { QuizQuestion } from "@/modules/quiz/components/QuizQuestion.tsx";
import { Button } from "@/shared/ui/button.tsx";
import { IconChevronLeft, IconChevronRight, IconStarsFilled } from "@tabler/icons-react";
import { ProcessingQuiz } from "@/modules/quiz/components/ProcessingQuiz.tsx";
import { toast } from "sonner";

export const Route = createFileRoute('/quiz_/$quizId')({
  component: QuizResultsPage,
  validateSearch: (search) => ({
    index: Number(search?.index ?? 1),
  }),
})

function QuizResultsPage() {
  const navigate = Route.useNavigate();
  const { quizId } = Route.useParams();
  const { index } = Route.useSearch();
  const [quiz, setQuiz] = useState<QuizDto | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const { getQuiz, submitQuiz } = useQuizContext();

  const loadQuiz = useCallback(async () => {
    const quiz = getQuiz(quizId);

    if (!quiz) {
      console.error(`Quiz ${quizId} not found`);
      await navigate({ to: '/quiz' });
      toast.error('Quiz not found', { closeButton: true, id: 'quiz-not-found' });
    } else {
      setQuiz(quiz);
    }
  }, [quizId]);

  const updateIndex = async (index: number) => {
    await navigate({ to: Route.fullPath, search: { index: index } })
  }

  const submit = async (quiz: QuizDto) => {
    setAnalyzing(true);
    await submitQuiz(quiz);
    await navigate({ to: '/quiz/$quizId/results', params: { quizId: quiz.id } })
    setAnalyzing(false);
  }

  useEffect(() => {
    updateIndex(0);
    loadQuiz();
  }, [quizId]);

  if (!quiz) {
    return null;
  }

  const currentQuestion = quiz.questions?.[index];

  return (
    <div
      className="container mx-auto flex flex-col gap-5 @sm:gap-8 w-full pt-6 @sm:pt-10 pb-24 @sm:pb-6">
      {analyzing
        ? <ProcessingQuiz/>
        : (<>
          <QuizHeader title={quiz.title}>
            <QuizProgress currentQuestion={index + 1}
                          totalQuestions={quiz.questions?.length ?? 0}/>
          </QuizHeader>
          <QuizQuestion question={currentQuestion!}
                        setIsAnswered={setIsAnswered}/>
          <div
            className="flex items-center justify-between w-full mt-0 md:mt-6">
            {index !== 0 && (
              <Button variant="outline"
                      onClick={() => updateIndex(index - 1)}>
                <IconChevronLeft/>
                Back
              </Button>
            )}
            {index + 1 === quiz.questions?.length
              ? <Button className="ml-auto" onClick={() => submit(quiz)}
                        disabled={!isAnswered}>
                Review
                <IconStarsFilled/>
              </Button>
              : <Button className="ml-auto"
                        onClick={() => updateIndex(index + 1)}
                        disabled={!isAnswered}>
                Next
                <IconChevronRight/>
              </Button>
            }
          </div>
        </>)
      }
    </div>
  );
}
