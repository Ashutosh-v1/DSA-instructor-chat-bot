
export enum Sender {
  USER = 'user',
  BOT = 'bot',
}

export interface Message {
  text: string;
  sender: Sender;
}
