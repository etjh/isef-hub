import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './application.reducer';
import { IApplication } from 'app/shared/model/application.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IApplicationDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ApplicationDetail extends React.Component<IApplicationDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { applicationEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="isefApp.application.detail.title">Application</Translate> [<b>{applicationEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="name">
                <Translate contentKey="isefApp.application.name">Name</Translate>
              </span>
            </dt>
            <dd>{applicationEntity.name}</dd>
            <dt>
              <span id="description">
                <Translate contentKey="isefApp.application.description">Description</Translate>
              </span>
            </dt>
            <dd>{applicationEntity.description}</dd>
            <dt>
              <Translate contentKey="isefApp.application.owner">Owner</Translate>
            </dt>
            <dd>{applicationEntity.owner ? applicationEntity.owner.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/application" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/application/${applicationEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ application }: IRootState) => ({
  applicationEntity: application.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ApplicationDetail);
