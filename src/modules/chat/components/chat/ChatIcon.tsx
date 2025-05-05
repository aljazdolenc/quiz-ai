import { Button } from "@/shared/ui/button.tsx";
import { Send } from "lucide-react";
import { type FormEvent, useEffect, useRef, useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { MessageBubble } from "../message/MessageBubble.tsx";
import { Messages } from "../message/Messages.tsx";
import { ChatInput } from "./ChatInput.tsx";
import { useChat } from "@/modules/chat/hooks/useChat.tsx";
import { ChatHeader } from "@/modules/chat/components/chat/ChatHeader.tsx";
import { Chat } from "@/modules/chat/components/chat/Chat.tsx";
import { ChatBody } from "@/modules/chat/components/chat/ChatBody.tsx";
import { ChatFooter } from "@/modules/chat/components/chat/ChatFooter.tsx";
import { MessageAvatar } from "../message/MessageAvatar.tsx";
import { Message } from "@/modules/chat/components/message/Mesage.tsx";
import MessageLoading from "@/modules/chat/components/message/MessageLoading.tsx";

export default function ChatIcon() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [input, setInput] = useState("");
  const { messages, sendMessage, isLoading } = useChat();
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
    <Chat size="md" position="bottom-right">
      <ChatHeader className="bg-muted/60 flex-col text-center justify-center">
        <h1 className="text-xl font-semibold">Tutor AI ✨</h1>
        <p>Ask any question for tutor to answer</p>
      </ChatHeader>
      <ChatBody>
        <Messages className="bg-muted/25" ref={messagesRef}>
          <MessageBubble variant="received">
            <MessageAvatar src="/assistant-avatar.png" fallback="🤖"/>
            <Message>
              Hello! I'm the AI assistant. How can I help you today?
            </Message>
          </MessageBubble>

          {messages && messages.map((message, index) => (
            <MessageBubble key={index}
                           variant={message.role == "user" ? "sent" : "received"}>
              {message.role === "assistant" && (
                <MessageAvatar src="/assistant-avatar.png" fallback="🤖"/>
              )}
              <Message
                variant={message.role == "user" ? "sent" : "received"}>
                {message.content.split("```").map((part: string, index: number) => (
                  <Markdown key={index} remarkPlugins={[remarkGfm]}>
                    {part}
                  </Markdown>
                ))}
              </Message>
            </MessageBubble>
          ))}

          {isGenerating && (
            <MessageBubble variant="received">
              <MessageAvatar src="/assistant-avatar.png" fallback="🤖"/>
              <Message>
                  <MessageLoading/>
              </Message>
            </MessageBubble>
          )}
        </Messages>
      </ChatBody>
      <ChatFooter className="bg-muted/25 px-2 py-3">
        <form ref={formRef} className="flex relative gap-2" onSubmit={onSubmit}>
          <ChatInput
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="bg-background shadow-none"
          />
          <Button
            className="absolute top-1/2 right-2 transform -translate-y-1/2"
            type="submit"
            size="icon"
            disabled={isLoading || isGenerating || !input}
          >
            <Send className="size-4"/>
          </Button>
        </form>
      </ChatFooter>
    </Chat>
  );
}
