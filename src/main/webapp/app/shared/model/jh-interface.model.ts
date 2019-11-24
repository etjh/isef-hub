import { IJHComponent } from 'app/shared/model/jh-component.model';

export interface IJHInterface {
  id?: number;
  code?: string;
  name?: string;
  summary?: string;
  description?: string;
  producer?: IJHComponent;
  consumer?: IJHComponent;
}

export const defaultValue: Readonly<IJHInterface> = {};
