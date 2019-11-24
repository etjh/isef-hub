import React from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Expert from './expert';
import JHComponent from './jh-component';
import Application from './application';
import JHInterface from './jh-interface';
import Issue from './issue';
import Solution from './solution';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}expert`} component={Expert} />
      <ErrorBoundaryRoute path={`${match.url}jh-component`} component={JHComponent} />
      <ErrorBoundaryRoute path={`${match.url}application`} component={Application} />
      <ErrorBoundaryRoute path={`${match.url}jh-interface`} component={JHInterface} />
      <ErrorBoundaryRoute path={`${match.url}issue`} component={Issue} />
      <ErrorBoundaryRoute path={`${match.url}solution`} component={Solution} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
