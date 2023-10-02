import { IUser } from './user.model';

export interface IChat {
  id: number;
  users: {
    me: IUser;
    others: IUser[];
  };
}
