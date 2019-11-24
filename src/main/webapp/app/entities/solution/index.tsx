import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Solution from './solution';
import SolutionDetail from './solution-detail';
import SolutionUpdate from './solution-update';
import SolutionDeleteDialog from './solution-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={SolutionUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={SolutionUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={SolutionDetail} />
      <ErrorBoundaryRoute path={match.url} component={Solution} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={SolutionDeleteDialog} />
  </>
);

export default Routes;
