import {Env} from "../../../shared/interface/env.js";
import {HttpClient} from "../../../shared/http/http-client.js";
import {AiResponseDto} from "../../../domain/ai/dto/ai-response.dto.js";
import {ChatMessageDto} from "../../../domain/messages/dto/chat-message.dto.js";
import {createAssistantPrompt} from "../../../domain/messages/prompts/create-assistant-prompt.js";

export const onRequestPost: PagesFunction<Env> = async ({request, env}) => {
    const {messages, message} = await request.json() as { messages: ChatMessageDto[], message: string};

    const response = await HttpClient.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${env.GEMINI_API_KEY}`,
        {
            body: JSON.stringify({
                system_instruction: {
                    parts: [
                        {
                            text: createAssistantPrompt()
                        }
                    ]
                },
                contents: [
                    ...mapMessages(messages),
                    {
                        role: "user",
                        parts: [{text: message}]
                    }
                ]
            })
        }
    )
    const {candidates} = await response.json() as AiResponseDto;

    return new Response(JSON.stringify({
        role: 'assistant',
        content: candidates[0].content.parts[0].text,
    } satisfies ChatMessageDto));
}

function mapMessages(messages: ChatMessageDto[]) {
    return messages
        .filter(message => message.role !== 'system')
        .map(message => ({
            role: message.role,
            parts: [{text: message.content}]
        }))
}
