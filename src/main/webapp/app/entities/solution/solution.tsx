import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './solution.reducer';
import { ISolution } from 'app/shared/model/solution.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ISolutionProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Solution extends React.Component<ISolutionProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { solutionList, match } = this.props;
    return (
      <div>
        <h2 id="solution-heading">
          <Translate contentKey="isefApp.solution.home.title">Solutions</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="isefApp.solution.home.createLabel">Create a new Solution</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          {solutionList && solutionList.length > 0 ? (
            <Table responsive aria-describedby="solution-heading">
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="global.field.id">ID</Translate>
                  </th>
                  <th>
                    <Translate contentKey="isefApp.solution.code">Code</Translate>
                  </th>
                  <th>
                    <Translate contentKey="isefApp.solution.version">Version</Translate>
                  </th>
                  <th>
                    <Translate contentKey="isefApp.solution.from">From</Translate>
                  </th>
                  <th>
                    <Translate contentKey="isefApp.solution.until">Until</Translate>
                  </th>
                  <th>
                    <Translate contentKey="isefApp.solution.summary">Summary</Translate>
                  </th>
                  <th>
                    <Translate contentKey="isefApp.solution.description">Description</Translate>
                  </th>
                  <th>
                    <Translate contentKey="isefApp.solution.issue">Issue</Translate>
                  </th>
                  <th>
                    <Translate contentKey="isefApp.solution.expert">Expert</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {solutionList.map((solution, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${solution.id}`} color="link" size="sm">
                        {solution.id}
                      </Button>
                    </td>
                    <td>{solution.code}</td>
                    <td>{solution.version}</td>
                    <td>
                      <TextFormat type="date" value={solution.from} format={APP_DATE_FORMAT} />
                    </td>
                    <td>
                      <TextFormat type="date" value={solution.until} format={APP_DATE_FORMAT} />
                    </td>
                    <td>{solution.summary}</td>
                    <td>{solution.description}</td>
                    <td>{solution.issue ? <Link to={`issue/${solution.issue.id}`}>{solution.issue.id}</Link> : ''}</td>
                    <td>{solution.expert ? <Link to={`expert/${solution.expert.id}`}>{solution.expert.id}</Link> : ''}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${solution.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${solution.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${solution.id}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.delete">Delete</Translate>
                          </span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="alert alert-warning">
              <Translate contentKey="isefApp.solution.home.notFound">No Solutions found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ solution }: IRootState) => ({
  solutionList: solution.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Solution);
