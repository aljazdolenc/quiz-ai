
export interface QuizHeaderProps {
    title: string;
    children?: React.ReactNode;
}

export function QuizHeader({title, children}: QuizHeaderProps) {
    return (
        <div>
            <h1 className="text-2xl font-bold pb-3 md:pb-0">{title}</h1>
            {children && children}
        </div>
    )
}
