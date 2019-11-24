import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './application.reducer';
import { IApplication } from 'app/shared/model/application.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IApplicationProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Application extends React.Component<IApplicationProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { applicationList, match } = this.props;
    return (
      <div>
        <h2 id="application-heading">
          <Translate contentKey="isefApp.application.home.title">Applications</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="isefApp.application.home.createLabel">Create a new Application</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          {applicationList && applicationList.length > 0 ? (
            <Table responsive aria-describedby="application-heading">
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="global.field.id">ID</Translate>
                  </th>
                  <th>
                    <Translate contentKey="isefApp.application.name">Name</Translate>
                  </th>
                  <th>
                    <Translate contentKey="isefApp.application.description">Description</Translate>
                  </th>
                  <th>
                    <Translate contentKey="isefApp.application.owner">Owner</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {applicationList.map((application, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${application.id}`} color="link" size="sm">
                        {application.id}
                      </Button>
                    </td>
                    <td>{application.name}</td>
                    <td>{application.description}</td>
                    <td>{application.owner ? application.owner.id : ''}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${application.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${application.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${application.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="isefApp.application.home.notFound">No Applications found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ application }: IRootState) => ({
  applicationList: application.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Application);
