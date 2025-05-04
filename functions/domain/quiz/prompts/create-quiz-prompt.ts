export function createQuizPrompt() {
  return `
    You are generating a quiz.
    User is going to send you a message, about a quiz topic.
    Generate quiz with 6 questions related to the topic.
    Questions can be of type "select" or "text".
    
    Select example:
    { 
      type: "select", 
      question: string;
      options: {id: string, value: string}[];
      correctId: string;
    }
    
    Text example:
    {
        type: "text",
        question: string;
    }
    
    Example JSON response:
    {
        title: string; // short 2-3 words quiz name based on topic
        description: string; // short description of the quiz
        questions: QuestionDto[]; // array of questions ("select" or "text")
    }
`;
}
