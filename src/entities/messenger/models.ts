export interface IMessage {
  id: number | string;
  content: string;
  receiver: string;
  sender: string;
  timestamp: string;
}

export interface IChat {
  id: string;
  user: string
  lastMessage: {
    content: string;
    timestamp: string;
    sender: string;
  }
}
