import {createContext, type ReactNode, useContext, useEffect, useMemo, useState} from 'react';
import type {QuizDto} from "@/modules/quiz/dto/quiz.dto.ts";
import {useQueryClient} from "@tanstack/react-query";

type DataContextType = {
    quizzes: QuizDto[];
    recommendations: QuizDto[];
    recommendationsLoading: boolean;
    getQuiz: (id: string) => QuizDto | undefined;
    submitQuiz: (quiz: QuizDto) => Promise<QuizDto>;
    createQuiz: (prompt: string) => Promise<QuizDto>;
    addQuiz: (quiz: QuizDto) => void;
};

const QuizContext = createContext<DataContextType | undefined>(undefined);

export const QuizProvider = ({children}: { children: ReactNode }) => {
    const quizzesKey = 'quizzes';
    const recommendationsKey = 'recommendations';
    const queryClient = useQueryClient();
    const [quizzes, setQuizzes] = useState<QuizDto[]>(loadQuizzes());
    const [recommendations, setRecommendations] = useState<QuizDto[]>([]);
    const [recommendationsLoading, setRecommendationsLoading] = useState(true);

    useEffect(() => {
        loadRecommendations().then(quizzes => setRecommendations(quizzes))
    }, []);
    useEffect(() => {
        if (!recommendationsLoading) {
            saveRecommendations(recommendations)
        }
    }, [recommendations, recommendationsLoading]);
    useEffect(() => saveQuizzes(quizzes), [quizzes]);

    function loadQuizzes() {
        const quizzes = localStorage.getItem(quizzesKey);

        return quizzes ? JSON.parse(quizzes) : [];
    }

    function saveQuizzes(quizzes: QuizDto[]) {
        localStorage.setItem(quizzesKey, JSON.stringify(quizzes));
    }

    async function loadRecommendations() {
        setRecommendationsLoading(true);
        const data = localStorage.getItem(recommendationsKey);
        const recommendations = data ? JSON.parse(data) as QuizDto[] : [];

        if (!recommendations.length) {
            const items = await getRecommendations(3, quizzes.slice(0, 5));
            setRecommendationsLoading(false);
            return items;
        }

        setRecommendationsLoading(false);
        console.log('setting loading false');
        return recommendations;
    }

    function saveRecommendations(recommendations: QuizDto[] | null) {
        console.log('save', {recommendations})
        if (!recommendations) {
            localStorage.removeItem(recommendationsKey);
        } else {
            localStorage.setItem(recommendationsKey, JSON.stringify(recommendations));
        }
    }

    function getRecommendations(limit: number, pastQuizzes: QuizDto[]) {
        return queryClient.fetchQuery({
            queryKey: ['getRecommendations'],
            queryFn: async () => {
                const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/v1/quiz/recommendations?limit=${limit}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({quizzes: pastQuizzes}),
                });

                if (!res.ok) {
                    throw new Error('Failed to submit quiz');
                }

                return await res.json() as QuizDto[];
            },
        })
    }

    function addQuiz(quiz: QuizDto) {
        setQuizzes([...quizzes, quiz]);
    }

    function getQuiz(id: string): QuizDto | undefined {
        console.log({quizzes})
        return quizzes.find(quiz => quiz.id === id);
    }

    function submitQuiz(quiz: QuizDto) {
        return queryClient.fetchQuery({
            queryKey: ['submitQuiz'],
            queryFn: async () => {
                const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/v1/quiz/submit`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({quiz}),
                });

                if (!res.ok) {
                    throw new Error('Failed to submit quiz');
                }

                const index = quizzes.findIndex(q => q.id === quiz.id);
                const evaluatedQuiz = await res.json() as QuizDto;
                quizzes[index] = evaluatedQuiz;
                setQuizzes([...quizzes]);

                setRecommendationsLoading(true);
                setRecommendations(await getRecommendations(3, quizzes.slice(0, 5)))
                setRecommendationsLoading(false);

                return evaluatedQuiz;
            },
        })
    }

    function createQuiz(prompt: string) {
        return queryClient.fetchQuery({
            queryKey: ['createQuiz'],
            queryFn: async () => {
                const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/v1/quiz`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({prompt}),
                });

                if (!res.ok) {
                    throw new Error('Failed to create quiz');
                }

                const quiz = await res.json() as QuizDto;
                addQuiz(quiz);

                return quiz;
            },
        })
    }

    const contextValue = useMemo(() => ({
        quizzes,
        recommendations,
        recommendationsLoading,
        getQuiz,
        submitQuiz,
        createQuiz,
        addQuiz,
    }), [quizzes, recommendations, recommendationsLoading]);

    return (
        <QuizContext.Provider value={contextValue}>
            {children}
        </QuizContext.Provider>
    );
};

export const useQuizContext = () => {
    const ctx = useContext(QuizContext);
    if (!ctx) throw new Error('useQuizContext must be used within a QuizProvider');
    return ctx;
};
