export interface Message {
  type: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export interface Chat {
  id: number;
  name: string;
  messages: Message[];
  createdAt: string;
}
