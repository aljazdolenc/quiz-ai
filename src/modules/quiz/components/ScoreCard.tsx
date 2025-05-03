"use client"

import {AlertCircle, CheckCircle, Trophy, XCircle} from "lucide-react"
import {Card, CardContent, CardHeader, CardTitle} from "@/shared/ui/card.tsx";
import type {QuizDto} from "../dto/quiz.dto";
import {ScoreDto} from "@/modules/quiz/dto/score.dto.ts";

interface Props {
    quiz: QuizDto
}

export function ResultsPage({quiz}: Props) {
    const totalCorrect = quiz.questions.filter(q => q.score === ScoreDto.CORRECT).length;
    const totalPartiallyCorrect = quiz.questions.filter(q => q.score === ScoreDto.PARTIAL).length;
    const totalIncorrect = quiz.questions.filter(q => q.score === ScoreDto.WRONG).length;

    const scoreToPoints = (score: ScoreDto): number => {
        switch (score) {
            case ScoreDto.CORRECT:
                return 1;
            case ScoreDto.PARTIAL:
                return 0.5;
            case ScoreDto.WRONG:
                return 0;
        }
    }

    const pointsScored = quiz.questions
        .map(q => scoreToPoints(q.score!))
        .reduce((a, b) => a + b, 0);

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="flex items-center gap-4">
                            <span className="text-3xl">Score: </span>
                            <span className="text-2xl">{pointsScored} / {quiz.questions.length} points</span>
                        </CardTitle>
                    </div>
                    <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                        <Trophy className="h-8 w-8 text-primary"/>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex items-center gap-2 p-3 rounded-md bg-green-50">
                            <CheckCircle className="h-5 w-5 text-green-500"/>
                            <div>
                                <div className="font-medium">Correct</div>
                                <div className="text-sm text-muted-foreground">{totalCorrect} questions</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 p-3 rounded-md bg-yellow-50">
                            <AlertCircle className="h-5 w-5 text-yellow-500"/>
                            <div>
                                <div className="font-medium">Partially Correct</div>
                                <div className="text-sm text-muted-foreground">
                                    {totalPartiallyCorrect} questions
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 p-3 rounded-md bg-red-50">
                            <XCircle className="h-5 w-5 text-red-500"/>
                            <div>
                                <div className="font-medium">Incorrect</div>
                                <div className="text-sm text-muted-foreground">
                                    {totalIncorrect} questions
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
