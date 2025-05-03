import {useCallback, useState} from 'react';
import type {ChatMessageDto} from '../dto/chat-message.dto';

export function useChat() {
    const [messages, setMessages] = useState<ChatMessageDto[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | undefined>(undefined);

    const sendMessage = useCallback(async (message: string) => {
            setIsLoading(true);
            setError(undefined);
            const oldMessages = messages;
            setMessages(currentMessages => [...currentMessages, {role: 'user', content: message}]);

            try {
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/v1/messages`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        messages: oldMessages,
                        message: message,
                    }),
                });

                if (!response.ok) {
                    throw new Error(
                        `API request failed with status ${response.status}: ${await response.text()}`
                    );
                }

                const assistantMessage = await response.json() as ChatMessageDto;
                setMessages(currentMessages => [...currentMessages, assistantMessage!]);
            } catch (err: any) {
                console.error("Chat API Error:", err);
                setError(err as Error);
                const errorMessage: ChatMessageDto = {
                    role: 'assistant',
                    content: `Sorry, an error occurred: Please try again.}`
                };
                setMessages(currentMessages => [...currentMessages, errorMessage]);
            } finally {
                setIsLoading(false);
            }
        },
        [isLoading]
    );

    return {
        messages,
        sendMessage,
        isLoading,
        error,
    };
}
