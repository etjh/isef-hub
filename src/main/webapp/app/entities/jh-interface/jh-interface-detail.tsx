import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './jh-interface.reducer';
import { IJHInterface } from 'app/shared/model/jh-interface.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IJHInterfaceDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class JHInterfaceDetail extends React.Component<IJHInterfaceDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { jHInterfaceEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="isefApp.jHInterface.detail.title">JHInterface</Translate> [<b>{jHInterfaceEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="code">
                <Translate contentKey="isefApp.jHInterface.code">Code</Translate>
              </span>
            </dt>
            <dd>{jHInterfaceEntity.code}</dd>
            <dt>
              <span id="name">
                <Translate contentKey="isefApp.jHInterface.name">Name</Translate>
              </span>
            </dt>
            <dd>{jHInterfaceEntity.name}</dd>
            <dt>
              <span id="summary">
                <Translate contentKey="isefApp.jHInterface.summary">Summary</Translate>
              </span>
            </dt>
            <dd>{jHInterfaceEntity.summary}</dd>
            <dt>
              <span id="description">
                <Translate contentKey="isefApp.jHInterface.description">Description</Translate>
              </span>
            </dt>
            <dd>{jHInterfaceEntity.description}</dd>
            <dt>
              <Translate contentKey="isefApp.jHInterface.producer">Producer</Translate>
            </dt>
            <dd>{jHInterfaceEntity.producer ? jHInterfaceEntity.producer.id : ''}</dd>
            <dt>
              <Translate contentKey="isefApp.jHInterface.consumer">Consumer</Translate>
            </dt>
            <dd>{jHInterfaceEntity.consumer ? jHInterfaceEntity.consumer.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/jh-interface" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/jh-interface/${jHInterfaceEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ jHInterface }: IRootState) => ({
  jHInterfaceEntity: jHInterface.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JHInterfaceDetail);
