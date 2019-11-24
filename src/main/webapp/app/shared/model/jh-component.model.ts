import { IApplication } from 'app/shared/model/application.model';
import { IJHComponent } from 'app/shared/model/jh-component.model';

export interface IJHComponent {
  id?: number;
  code?: string;
  name?: string;
  summary?: string;
  description?: string;
  application?: IApplication;
  group?: IJHComponent;
}

export const defaultValue: Readonly<IJHComponent> = {};
