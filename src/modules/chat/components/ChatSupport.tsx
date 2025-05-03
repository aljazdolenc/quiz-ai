import {Button} from "@/shared/ui/button";
import {Send} from "lucide-react";
import {useEffect, useRef, useState, type FormEvent} from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {ExpandableChat, ExpandableChatBody, ExpandableChatFooter, ExpandableChatHeader} from "./ExpandableChat";
import {ChatBubble, ChatBubbleAvatar, ChatBubbleMessage} from "./ChatBubble";
import {ChatMessages} from "./ChatMessages.tsx";
import {ChatInput} from "./ChatInput.tsx";
import {useChat} from "@/modules/chat/hooks/useChat.tsx";

export default function ChatSupport() {
    const [isGenerating, setIsGenerating] = useState(false);
    const [input, setInput] = useState("");
    const {messages, sendMessage, isLoading } = useChat();
    const messagesRef = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (messagesRef.current) {
            messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
        }
    }, [messages]);

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!input.length) {
            return;
        }

        setInput("");
        setIsGenerating(true);

        try {
            await sendMessage(input);
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <ExpandableChat size="md" position="bottom-right">
            <ExpandableChatHeader className="bg-muted/60 flex-col text-center justify-center">
                <h1 className="text-xl font-semibold">Tutor AI ✨</h1>
                <p>Ask any question for tutor to answer</p>
            </ExpandableChatHeader>
            <ExpandableChatBody>
                <ChatMessages className="bg-muted/25" ref={messagesRef}>
                    <ChatBubble variant="received">
                        <ChatBubbleAvatar src="" fallback="🤖"/>
                        <ChatBubbleMessage>
                            Hello! I'm the AI assistant. How can I help you today?
                        </ChatBubbleMessage>
                    </ChatBubble>

                    {messages && messages.map((message, index) => (
                        <ChatBubble key={index} variant={message.role == "user" ? "sent" : "received"}>
                            {message.role === "assistant" && (
                                <ChatBubbleAvatar src="" fallback="🤖"/>
                            )}
                            <ChatBubbleMessage variant={message.role == "user" ? "sent" : "received"}>
                                {message.content.split("```").map((part: string, index: number) => (
                                    <Markdown key={index} remarkPlugins={[remarkGfm]}>
                                        {part}
                                    </Markdown>
                                ))}
                            </ChatBubbleMessage>
                        </ChatBubble>
                    ))}

                    {isGenerating && (
                        <ChatBubble variant="received">
                            <ChatBubbleAvatar src="" fallback="🤖"/>
                            <ChatBubbleMessage isLoading/>
                        </ChatBubble>
                    )}
                </ChatMessages>
            </ExpandableChatBody>
            <ExpandableChatFooter className="bg-muted/25">
                <form ref={formRef} className="flex relative gap-2" onSubmit={onSubmit}>
                    <ChatInput
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="min-h-12 bg-background shadow-none "
                    />
                    <Button
                        className="absolute top-1/2 right-2 transform  -translate-y-1/2"
                        type="submit"
                        size="icon"
                        disabled={isLoading || isGenerating || !input}
                    >
                        <Send className="size-4"/>
                    </Button>
                </form>
            </ExpandableChatFooter>
        </ExpandableChat>
    );
}
