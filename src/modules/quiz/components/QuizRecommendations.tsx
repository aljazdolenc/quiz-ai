import {MessageSquare} from "lucide-react";
import {useNavigate} from "@tanstack/react-router";
import {Button} from "@/shared/ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/shared/ui/card.tsx";
import {useQuizContext} from "../service/quizContext";
import {Skeleton} from "@/shared/ui/skeleton.tsx";
import type {QuizDto} from "@/modules/quiz/dto/quiz.dto.ts";
import {IconBrain, IconChevronRight, IconClock} from "@tabler/icons-react";
import {Separator} from "@/shared/ui/separator.tsx";

export function QuizRecommendations() {
    const navigate = useNavigate();
    const {recommendations, recommendationsLoading, addQuiz} = useQuizContext();

    const openQuiz = async (quiz: QuizDto) => {
        addQuiz(quiz);
        await navigate({to: '/quiz/$quizId', params: {quizId: quiz.id}, search: {index: 0}})
    }

    return (
        <section className="animate-fade-in">
            <h2 className="text-2xl font-semibold flex items-center mb-4">
                <MessageSquare className="mr-2 text-blue-500"/> Recommended For You
            </h2>
            <Separator className="mb-6"/>
            <div className="grid grid-cols-1 @xl/main:grid-cols-2 @3xl/main:grid-cols-3 gap-6">
                {recommendationsLoading
                    ? (
                        <>
                            <Skeleton className={"h-52 w-full"}/>
                            <Skeleton className={"h-52 w-full"}/>
                            <Skeleton className={"h-52 w-full"}/>
                        </>
                    )
                    : recommendations.map((quiz) => (
                        <Card key={quiz.id} className="h-full transition-all hover:shadow-md">
                            <CardHeader>
                                <CardTitle className="text-xl mb-2">{quiz.title}</CardTitle>
                                <CardDescription>{quiz.description}</CardDescription>
                            </CardHeader>
                            <CardContent className="mt-auto">
                                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                                    <div className="flex items-center gap-1">
                                        <IconBrain className="h-4 w-4 text-blue-500"/>
                                        <span>{quiz.questions.length} questions</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <IconClock className="h-4 w-4 text-blue-500"/>
                                        <span>~{quiz.questions.length * 0.5} mins</span>
                                    </div>
                                </div>
                                <Button className="w-full cursor-pointer" onClick={() => openQuiz(quiz)}>
                                    Start Quiz
                                    <IconChevronRight className="h-4 w-4 ml-1"/>
                                </Button>
                            </CardContent>
                        </Card>
                    ))
                }
            </div>
        </section>
    )
}
