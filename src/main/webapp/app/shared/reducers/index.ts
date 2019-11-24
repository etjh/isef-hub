import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import locale, { LocaleState } from './locale';
import authentication, { AuthenticationState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';

import administration, { AdministrationState } from 'app/modules/administration/administration.reducer';
import userManagement, { UserManagementState } from 'app/modules/administration/user-management/user-management.reducer';
import register, { RegisterState } from 'app/modules/account/register/register.reducer';
import activate, { ActivateState } from 'app/modules/account/activate/activate.reducer';
import password, { PasswordState } from 'app/modules/account/password/password.reducer';
import settings, { SettingsState } from 'app/modules/account/settings/settings.reducer';
import passwordReset, { PasswordResetState } from 'app/modules/account/password-reset/password-reset.reducer';
// prettier-ignore
import expert, {
  ExpertState
} from 'app/entities/expert/expert.reducer';
// prettier-ignore
import jHComponent, {
  JHComponentState
} from 'app/entities/jh-component/jh-component.reducer';
// prettier-ignore
import application, {
  ApplicationState
} from 'app/entities/application/application.reducer';
// prettier-ignore
import jHInterface, {
  JHInterfaceState
} from 'app/entities/jh-interface/jh-interface.reducer';
// prettier-ignore
import issue, {
  IssueState
} from 'app/entities/issue/issue.reducer';
// prettier-ignore
import solution, {
  SolutionState
} from 'app/entities/solution/solution.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly locale: LocaleState;
  readonly applicationProfile: ApplicationProfileState;
  readonly administration: AdministrationState;
  readonly userManagement: UserManagementState;
  readonly register: RegisterState;
  readonly activate: ActivateState;
  readonly passwordReset: PasswordResetState;
  readonly password: PasswordState;
  readonly settings: SettingsState;
  readonly expert: ExpertState;
  readonly jHComponent: JHComponentState;
  readonly application: ApplicationState;
  readonly jHInterface: JHInterfaceState;
  readonly issue: IssueState;
  readonly solution: SolutionState;
  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  locale,
  applicationProfile,
  administration,
  userManagement,
  register,
  activate,
  passwordReset,
  password,
  settings,
  expert,
  jHComponent,
  application,
  jHInterface,
  issue,
  solution,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar
});

export default rootReducer;
