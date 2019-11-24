import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './jh-component.reducer';
import { IJHComponent } from 'app/shared/model/jh-component.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IJHComponentProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class JHComponent extends React.Component<IJHComponentProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { jHComponentList, match } = this.props;
    return (
      <div>
        <h2 id="jh-component-heading">
          <Translate contentKey="isefApp.jHComponent.home.title">JH Components</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="isefApp.jHComponent.home.createLabel">Create a new JH Component</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          {jHComponentList && jHComponentList.length > 0 ? (
            <Table responsive aria-describedby="jh-component-heading">
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="global.field.id">ID</Translate>
                  </th>
                  <th>
                    <Translate contentKey="isefApp.jHComponent.code">Code</Translate>
                  </th>
                  <th>
                    <Translate contentKey="isefApp.jHComponent.name">Name</Translate>
                  </th>
                  <th>
                    <Translate contentKey="isefApp.jHComponent.summary">Summary</Translate>
                  </th>
                  <th>
                    <Translate contentKey="isefApp.jHComponent.description">Description</Translate>
                  </th>
                  <th>
                    <Translate contentKey="isefApp.jHComponent.application">Application</Translate>
                  </th>
                  <th>
                    <Translate contentKey="isefApp.jHComponent.group">Group</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {jHComponentList.map((jHComponent, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${jHComponent.id}`} color="link" size="sm">
                        {jHComponent.id}
                      </Button>
                    </td>
                    <td>{jHComponent.code}</td>
                    <td>{jHComponent.name}</td>
                    <td>{jHComponent.summary}</td>
                    <td>{jHComponent.description}</td>
                    <td>
                      {jHComponent.application ? (
                        <Link to={`application/${jHComponent.application.id}`}>{jHComponent.application.id}</Link>
                      ) : (
                        ''
                      )}
                    </td>
                    <td>{jHComponent.group ? <Link to={`jh-component/${jHComponent.group.id}`}>{jHComponent.group.id}</Link> : ''}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${jHComponent.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${jHComponent.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${jHComponent.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="isefApp.jHComponent.home.notFound">No JH Components found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ jHComponent }: IRootState) => ({
  jHComponentList: jHComponent.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JHComponent);
