import { IUser } from './user.model';

export interface IMessage {
  id: number;
  content: string;
  sentAt: Date;
  sentBy: IUser;
}

export interface ISendMessage {
  chatId: number;
  content: string;
}
