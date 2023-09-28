import { IUser } from './user.model';

export interface IMessage {
  id: number;
  content: string;
  sentAt: Date;
  sentBy: IUser;
}
