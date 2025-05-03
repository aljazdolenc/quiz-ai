import {Card, CardContent, CardHeader, CardTitle} from "@/shared/ui/card.tsx";
import {Checkbox} from "@/shared/ui/checkbox.tsx";
import {cn} from "@/shared/utils/shadcn.ts";
import {Label} from "@/shared/ui/label.tsx";
import {QuestionExplanation} from "@/modules/quiz/components/QuestionExplanation.tsx";
import type {SelectQuestionDto} from "@/modules/quiz/dto/select-question.dto.ts";
import {useEffect, useState} from "react";

interface SelectQuestionProps {
    question: SelectQuestionDto;
    answeredChanged?: (isAnswered: boolean) => void;
    previewMode?: boolean;
}

export function SelectQuestion({question, answeredChanged, previewMode}: SelectQuestionProps) {
    const {question: questionText, options, correctId, explanation } = question;
    const [selectedId, setSelectedId] = useState(question.selectedId);

    useEffect(() => {
        if (!selectedId || selectedId === question.selectedId) {
            question.selectedId = undefined;
        } else {
            question.selectedId = selectedId;
        }

        answeredChanged?.(question.selectedId !== undefined);
    }, [selectedId]);

    return (
        <Card className="w-full animate-fade-in">
            <CardHeader>
                <CardTitle className="text-xl">{questionText}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-2 md:space-y-4">
                    {options.map((option, optionIndex) => (
                        <div
                            key={option.id}
                            className={cn(
                                "flex items-center space-x-3 p-3 rounded-md transition-colors border border-gray-100 cursor-pointer",
                                previewMode && option.id === correctId && "bg-green-50 border border-green-200",
                                previewMode && option.id === selectedId && selectedId !== correctId && "bg-red-50 border border-red-200",
                                !previewMode && "hover:bg-muted",
                            )}
                            onClick={() => !previewMode && setSelectedId(option.id)}
                        >
                            <Checkbox
                                id={`${question.id}-${optionIndex}`}
                                checked={!previewMode ? option.id === selectedId : option.id === selectedId || option.id === correctId}
                                onCheckedChange={() => setSelectedId(option.id !== selectedId ? option.id : undefined)}
                                disabled={previewMode}
                                className={cn(
                                    previewMode && option.id === correctId && "bg-green-700! border-green-700!",
                                    previewMode && option.id === selectedId && selectedId !== correctId  && "bg-red-700! border-red-700!"
                                )}
                            />
                            <div className="space-y-1 leading-none">
                                <Label
                                    htmlFor={`${question.id}-${option}`}
                                    className={cn(
                                        "text-base font-normal cursor-pointer",
                                        previewMode && option.id === correctId && "font-medium text-green-700",
                                        previewMode && option.id === selectedId && selectedId !== correctId  && "font-medium text-red-700",
                                    )}
                                >
                                    {option.value}
                                </Label>
                            </div>
                        </div>
                    ))}
                </div>

                {explanation && <QuestionExplanation question={question}/>}
            </CardContent>
        </Card>
    )
}
