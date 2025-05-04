export interface AiResponseDto {
  candidates: {
    content: {
      parts: {
        text: string
      }[]
    }
  }[]
}
