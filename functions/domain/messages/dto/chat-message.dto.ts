export interface ChatMessageDto {
  role: 'user' | 'assistant' | 'system';
  content: string;
}
