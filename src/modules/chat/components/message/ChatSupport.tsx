import { Button } from "@/shared/ui/button.tsx";
import { Send } from "lucide-react";
import { type FormEvent, useEffect, useRef, useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ChatBubble } from "../chat/ChatBubble.tsx";
import { Messages } from "./Messages.tsx";
import { ChatInput } from "../chat/ChatInput.tsx";
import { useChat } from "@/modules/chat/hooks/useChat.tsx";
import { ExpandableChatHeader } from "@/modules/chat/components/chat/ExpandableChatHeader.tsx";
import { ExpandableChat } from "@/modules/chat/components/chat/ExpandableChat.tsx";
import { ExpandableChatBody } from "@/modules/chat/components/chat/ExpandableChatBody.tsx";
import { ExpandableChatFooter } from "@/modules/chat/components/chat/ExpandableChatFooter.tsx";
import { MessageAvatar } from "./MessageAvatar.tsx";
import { Message } from "@/modules/chat/components/message/Mesage.tsx";
import MessageLoading from "@/modules/chat/components/message/MessageLoading.tsx";

export default function ChatSupport() {
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
    <ExpandableChat size="md" position="bottom-right">
      <ExpandableChatHeader
        className="bg-muted/60 flex-col text-center justify-center">
        <h1 className="text-xl font-semibold">Tutor AI ✨</h1>
        <p>Ask any question for tutor to answer</p>
      </ExpandableChatHeader>
      <ExpandableChatBody>
        <Messages className="bg-muted/25" ref={messagesRef}>
          <ChatBubble variant="received">
            <MessageAvatar src="/assistant-avatar.png" fallback="🤖"/>
            <Message>
              Hello! I'm the AI assistant. How can I help you today?
            </Message>
          </ChatBubble>

          {messages && messages.map((message, index) => (
            <ChatBubble key={index}
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
            </ChatBubble>
          ))}

          {isGenerating && (
            <ChatBubble variant="received">
              <MessageAvatar src="/assistant-avatar.png" fallback="🤖"/>
              <Message>
                  <MessageLoading/>
              </Message>
            </ChatBubble>
          )}
        </Messages>
      </ExpandableChatBody>
      <ExpandableChatFooter className="bg-muted/25 px-2 py-3">
        <form ref={formRef} className="flex relative gap-2"
              onSubmit={onSubmit}>
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
      </ExpandableChatFooter>
    </ExpandableChat>
  );
}
