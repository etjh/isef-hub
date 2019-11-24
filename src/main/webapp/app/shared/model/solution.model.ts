import { Moment } from 'moment';
import { IIssue } from 'app/shared/model/issue.model';
import { IExpert } from 'app/shared/model/expert.model';

export interface ISolution {
  id?: number;
  code?: string;
  version?: string;
  from?: Moment;
  until?: Moment;
  summary?: string;
  description?: string;
  issue?: IIssue;
  expert?: IExpert;
}

export const defaultValue: Readonly<ISolution> = {};
