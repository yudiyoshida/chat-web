import { IMessage } from './message.model';
import { IUser } from './user.model';

export interface IChat {
  id: number;
  name?: string;
  users: {
    me: IUser;
    others: IUser[];
  };
  messages: IMessage[];
}

export interface ICreateChat {
  name?: string;
  ids: number[];
}
