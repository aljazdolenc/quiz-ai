import {createFileRoute, redirect} from '@tanstack/react-router'
import {useQuizContext} from "@/modules/quiz/service/quizContext.tsx";
import {useCallback, useEffect, useState} from "react";
import {QuizHeader} from '@/modules/quiz/components/QuizHeader';
import {QuizQuestion} from '@/modules/quiz/components/QuizQuestion';
import type {QuizDto} from "@/modules/quiz/dto/quiz.dto.ts";
import {ResultsPage} from '@/modules/quiz/components/ScoreCard';
import {Separator} from "@/shared/ui/separator.tsx";

export const Route = createFileRoute('/quiz_/$quizId_/results')({
    component: QuizPage
})

function QuizPage() {
    const {quizId} = Route.useParams();
    const [quiz, setQuiz] = useState<QuizDto | null>(null);
    const {getQuiz} = useQuizContext();

    const loadQuiz = useCallback(async () => {
        const quiz = await getQuiz(quizId);

        if (!quiz) {
            console.error(`Quiz ${quizId} not found`);
            throw redirect({to: '/not-found'});
        }

        console.log('Quiz loaded', quiz);
        setQuiz(quiz);
    }, quizId);

    useEffect(() => {
        loadQuiz();
    }, [quizId]);

    if (!quiz) {
        return null;
    }

    return (
        <div className="flex flex-col gap-8 w-full pt-8 pb-10">
            <QuizHeader title={`Results: ${quiz.title}`}/>
            <ResultsPage quiz={quiz}/>
            <Separator/>
            {quiz.questions!.map((question, i) =>(
              <div>
                  <h2 className="font-semibold text-xl mb-4">{i + 1}. Question:</h2>
                  <QuizQuestion key={i} question={question} previewMode/>
              </div>
            ))}
        </div>
    )
}
