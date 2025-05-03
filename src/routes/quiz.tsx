import {createFileRoute} from '@tanstack/react-router'
import {type FormEvent, useState} from 'react';
import {IconLoader, IconSend} from "@tabler/icons-react";
import {Input} from "@/shared/ui/input";
import {Button} from "@/shared/ui/button";
import {QuizRecommendations} from "@/modules/quiz/components/QuizRecommendations.tsx";
import {useQuizContext} from "@/modules/quiz/hooks/quizContext.tsx";
import {toast} from "sonner";

export const Route = createFileRoute('/quiz')({
    component: QuizLandingPage,
})

export function QuizLandingPage() {
    const navigate = Route.useNavigate();
    const [chatInput, setChatInput] = useState("");
    const [loading, setLoading] = useState(false);
    const {createQuiz} = useQuizContext();

    const submit = async (e: FormEvent) => {
        e.preventDefault();

        if (!chatInput.trim()) {
            return;
        }

        try {
            setLoading(true);
            const quiz = await createQuiz(chatInput);
            await navigate({to: `/quiz/$quizId`, params: {quizId: quiz.id}, search: {index: 0}});
            setLoading(false);
        } catch (e) {
            console.error('Failed to create quiz', e);
            toast.error('Failed to create quiz', {closeButton: true});
        }
    }

    return (
        <div className="py-12">
            <section className="text-center animate-fade-in pt-16 md:pt-20 mb-32 md:mb-28">
                <h1
                    className="text-4xl md:text-5xl/14 font-bold mb-12 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent max-w-lg mx-auto">
                    What do you want to learn today?
                </h1>

                <form className="max-w-xl mx-auto mb-16 md:mb-10 animate-fade-in relative" onSubmit={submit}>
                    <Input
                        className="pr-12 py-6 text-base shadow-md hover:shadow transition-shadow"
                        placeholder="I want to learn about..."
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                    />
                    <Button
                        className="absolute right-1 top-1/2 -translate-y-1/2 p-2 h-auto"
                        type="submit"
                        variant="ghost"
                        size="icon"
                        disabled={!chatInput.trim()}
                    >
                        {loading
                            ? <IconLoader className="h-5 w-5 animate-spin text-blue-500"/>
                            : <IconSend className="h-5 w-5 text-blue-500"/>
                        }
                    </Button>
                </form>
            </section>

            <QuizRecommendations/>
        </div>
    )
}
