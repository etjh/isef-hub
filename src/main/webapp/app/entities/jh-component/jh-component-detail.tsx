import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './jh-component.reducer';
import { IJHComponent } from 'app/shared/model/jh-component.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IJHComponentDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class JHComponentDetail extends React.Component<IJHComponentDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { jHComponentEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="isefApp.jHComponent.detail.title">JHComponent</Translate> [<b>{jHComponentEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="code">
                <Translate contentKey="isefApp.jHComponent.code">Code</Translate>
              </span>
            </dt>
            <dd>{jHComponentEntity.code}</dd>
            <dt>
              <span id="name">
                <Translate contentKey="isefApp.jHComponent.name">Name</Translate>
              </span>
            </dt>
            <dd>{jHComponentEntity.name}</dd>
            <dt>
              <span id="summary">
                <Translate contentKey="isefApp.jHComponent.summary">Summary</Translate>
              </span>
            </dt>
            <dd>{jHComponentEntity.summary}</dd>
            <dt>
              <span id="description">
                <Translate contentKey="isefApp.jHComponent.description">Description</Translate>
              </span>
            </dt>
            <dd>{jHComponentEntity.description}</dd>
            <dt>
              <Translate contentKey="isefApp.jHComponent.application">Application</Translate>
            </dt>
            <dd>{jHComponentEntity.application ? jHComponentEntity.application.id : ''}</dd>
            <dt>
              <Translate contentKey="isefApp.jHComponent.group">Group</Translate>
            </dt>
            <dd>{jHComponentEntity.group ? jHComponentEntity.group.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/jh-component" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/jh-component/${jHComponentEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ jHComponent }: IRootState) => ({
  jHComponentEntity: jHComponent.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JHComponentDetail);
