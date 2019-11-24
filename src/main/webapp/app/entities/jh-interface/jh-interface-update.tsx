import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IJHComponent } from 'app/shared/model/jh-component.model';
import { getEntities as getJHComponents } from 'app/entities/jh-component/jh-component.reducer';
import { getEntity, updateEntity, createEntity, reset } from './jh-interface.reducer';
import { IJHInterface } from 'app/shared/model/jh-interface.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IJHInterfaceUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IJHInterfaceUpdateState {
  isNew: boolean;
  producerId: string;
  consumerId: string;
}

export class JHInterfaceUpdate extends React.Component<IJHInterfaceUpdateProps, IJHInterfaceUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      producerId: '0',
      consumerId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (!this.state.isNew) {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getJHComponents();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { jHInterfaceEntity } = this.props;
      const entity = {
        ...jHInterfaceEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/jh-interface');
  };

  render() {
    const { jHInterfaceEntity, jHComponents, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="isefApp.jHInterface.home.createOrEditLabel">
              <Translate contentKey="isefApp.jHInterface.home.createOrEditLabel">Create or edit a JHInterface</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : jHInterfaceEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="jh-interface-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="jh-interface-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="codeLabel" for="jh-interface-code">
                    <Translate contentKey="isefApp.jHInterface.code">Code</Translate>
                  </Label>
                  <AvField id="jh-interface-code" type="text" name="code" />
                </AvGroup>
                <AvGroup>
                  <Label id="nameLabel" for="jh-interface-name">
                    <Translate contentKey="isefApp.jHInterface.name">Name</Translate>
                  </Label>
                  <AvField id="jh-interface-name" type="text" name="name" />
                </AvGroup>
                <AvGroup>
                  <Label id="summaryLabel" for="jh-interface-summary">
                    <Translate contentKey="isefApp.jHInterface.summary">Summary</Translate>
                  </Label>
                  <AvField id="jh-interface-summary" type="text" name="summary" />
                </AvGroup>
                <AvGroup>
                  <Label id="descriptionLabel" for="jh-interface-description">
                    <Translate contentKey="isefApp.jHInterface.description">Description</Translate>
                  </Label>
                  <AvField id="jh-interface-description" type="text" name="description" />
                </AvGroup>
                <AvGroup>
                  <Label for="jh-interface-producer">
                    <Translate contentKey="isefApp.jHInterface.producer">Producer</Translate>
                  </Label>
                  <AvInput id="jh-interface-producer" type="select" className="form-control" name="producer.id">
                    <option value="" key="0" />
                    {jHComponents
                      ? jHComponents.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="jh-interface-consumer">
                    <Translate contentKey="isefApp.jHInterface.consumer">Consumer</Translate>
                  </Label>
                  <AvInput id="jh-interface-consumer" type="select" className="form-control" name="consumer.id">
                    <option value="" key="0" />
                    {jHComponents
                      ? jHComponents.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/jh-interface" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  jHComponents: storeState.jHComponent.entities,
  jHInterfaceEntity: storeState.jHInterface.entity,
  loading: storeState.jHInterface.loading,
  updating: storeState.jHInterface.updating,
  updateSuccess: storeState.jHInterface.updateSuccess
});

const mapDispatchToProps = {
  getJHComponents,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JHInterfaceUpdate);
