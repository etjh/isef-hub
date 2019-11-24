import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import JHInterface from './jh-interface';
import JHInterfaceDetail from './jh-interface-detail';
import JHInterfaceUpdate from './jh-interface-update';
import JHInterfaceDeleteDialog from './jh-interface-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={JHInterfaceUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={JHInterfaceUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={JHInterfaceDetail} />
      <ErrorBoundaryRoute path={match.url} component={JHInterface} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={JHInterfaceDeleteDialog} />
  </>
);

export default Routes;
