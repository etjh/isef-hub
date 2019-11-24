import { Moment } from 'moment';
import { IssueStatus } from 'app/shared/model/enumerations/issue-status.model';

export interface IIssue {
  id?: number;
  code?: string;
  date?: Moment;
  summary?: string;
  description?: string;
  status?: IssueStatus;
}

export const defaultValue: Readonly<IIssue> = {};
