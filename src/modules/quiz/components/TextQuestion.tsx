import {Card, CardContent, CardHeader, CardTitle} from "@/shared/ui/card.tsx";
import {Textarea} from "@/shared/ui/textarea.tsx";
import {QuestionExplanation} from "@/modules/quiz/components/QuestionExplanation.tsx";
import type {TextQuestionDto} from "../dto/text-question.dto";
import {useEffect, useState} from "react";
import {cn} from "@/shared/utils/shadcn";
import {ScoreDto} from "@/modules/quiz/dto/score.dto.ts";

interface TextQuestionProps {
    question: TextQuestionDto
    answeredChanged?: (isAnswered: boolean) => void;
    previewMode?: boolean;
}

export function TextQuestion({question, answeredChanged, previewMode}: TextQuestionProps) {
    const {question: questionText, answer, explanation, score} = question;
    const [text, setText] = useState(answer);

    useEffect(() => {
        setText(question.answer);
    }, [question]);

    useEffect(() => {
        question.answer = text || undefined;
        answeredChanged?.(question.answer !== undefined);
    }, [text]);

    return (
        <Card className="w-full animate-fade-in">
            <CardHeader>
                <CardTitle className="text-xl">{questionText}</CardTitle>
            </CardHeader>
            <CardContent>
                <Textarea
                    className={cn([
                        previewMode && score === ScoreDto.CORRECT && "border border-green-200",
                        previewMode && score === ScoreDto.PARTIAL && "border border-yellow-200",
                        previewMode && score === ScoreDto.WRONG && "border border-red-200",
                        previewMode && "pointer-events-none",
                    ])}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                {previewMode && explanation && <QuestionExplanation question={question}/>}
            </CardContent>
        </Card>
    )
}
