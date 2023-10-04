import { IUser } from './user.model';

export interface IChat {
  id: number;
  name?: string;
  users: {
    me: IUser;
    others: IUser[];
  };
}

export interface ICreateChat {
  name?: string;
  ids: number[];
}
