import {Progress} from "@/shared/ui/progress.tsx";
import {useEffect, useState} from "react";
import {IconCircleCheck, IconLoader} from "@tabler/icons-react";

const stages = [
    {
        title: 'Analyzing responses',
        icon: <IconCircleCheck/>,
        minProgress: 20,
    },
    {
        title: 'Identifying knowledge gaps',
        minProgress: 50,
    },
    {
        title: 'Preparing results',
        minProgress: 75,
    }
]

export function ProcessingQuiz() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prevProgress) => {
                if (prevProgress >= 95) {
                    clearInterval(timer);
                    return prevProgress;
                }
                return prevProgress + 5;
            });
        }, 250);

        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <div className="flex-1 min-h-0 flex flex-col justify-center items-center gap-6">
            <div className="flex flex-col items-center justify-center gap-6 px-4 pt-6 sm:pt-12">
                <h1
                    className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent max-w-lg mx-auto">
                    Analyzing Your Quiz
                </h1>
            </div>

            <div className="w-full max-w-md mt-2 mb-4">
                <div className="flex justify-between mb-2 text-sm text-gray-600">
                    <span>Processing</span>
                    <span>{progress}%</span>
                </div>
                <Progress value={progress} className="h-2 bg-blue-100"/>
            </div>

            <div className="w-full max-w-md space-y-3 animate-fade-in">
                {stages.map((stage, index) => (
                    <div
                        key={index}
                        className={`p-4 border rounded-lg bg-white shadow-sm ${progress > stage.minProgress ? 'border-blue-500' : ''}`}
                    >
                        <div className="flex items-center">
                            <IconCircleCheck
                                className={`w-5.5 h-5.5 mr-2 ${progress > stage.minProgress ? 'text-blue-500' : 'text-gray-200'}`}/>
                            <span className="font-medium">{stage.title}</span>
                        </div>
                    </div>
                ))}

                {progress > 90 && (
                    <div className="p-4 border rounded-lg bg-white shadow-sm border-blue-500">
                        <div className="flex items-center">
                            <IconLoader className={`w-5.5 h-5.5 mr-2 text-blue-500 animate-spin`}/>
                            <span className="font-medium">Finalizing</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
