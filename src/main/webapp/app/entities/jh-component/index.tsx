import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import JHComponent from './jh-component';
import JHComponentDetail from './jh-component-detail';
import JHComponentUpdate from './jh-component-update';
import JHComponentDeleteDialog from './jh-component-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={JHComponentUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={JHComponentUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={JHComponentDetail} />
      <ErrorBoundaryRoute path={match.url} component={JHComponent} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={JHComponentDeleteDialog} />
  </>
);

export default Routes;
