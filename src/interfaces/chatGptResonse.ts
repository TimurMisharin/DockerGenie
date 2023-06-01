/* eslint-disable @typescript-eslint/naming-convention */
export interface ChatGptResponse {
    id: string;
    object: string;
    created: number;
    model: string;
    usage: Usage;
    choices: Choice[];
  }
  
  interface Usage {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  }
  
  interface Choice {
    message: Message;
    finish_reason: string;
    index: number;
  }
  
  interface Message {
    role: string;
    content: string;
  }
  