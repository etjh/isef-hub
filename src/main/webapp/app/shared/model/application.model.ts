import { IUser } from 'app/shared/model/user.model';

export interface IApplication {
  id?: number;
  name?: string;
  description?: string;
  owner?: IUser;
}

export const defaultValue: Readonly<IApplication> = {};
