import {cn} from "@/shared/utils/shadcn.ts";
import type { QuestionDto } from "../dto/question.dto";
import { ScoreDto } from "../dto/score.dto";

interface QuestionExplanationProps {
    question: QuestionDto
}

export function QuestionExplanation({question}: QuestionExplanationProps) {
    const {score, explanation} = question;

    return (
        <div className="mt-6">
            <h4 className="font-medium mb-2">Explanation:</h4>
            <div className={cn(
                "p-4 rounded-md",
                score === ScoreDto.CORRECT && "bg-green-50 border border-green-200",
                score === ScoreDto.PARTIAL && "bg-yellow-50 border border-yellow-200",
                score === ScoreDto.WRONG && "bg-red-50 border border-red-200",
            )}>
                <p>{explanation}</p>
            </div>
        </div>
    );
}
