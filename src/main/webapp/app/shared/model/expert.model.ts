import { IExpert } from 'app/shared/model/expert.model';
import { IUser } from 'app/shared/model/user.model';

export interface IExpert {
  id?: number;
  name?: string;
  contactDetails?: string;
  group?: IExpert;
  user?: IUser;
}

export const defaultValue: Readonly<IExpert> = {};
