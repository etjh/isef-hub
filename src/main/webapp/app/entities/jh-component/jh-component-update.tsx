import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IApplication } from 'app/shared/model/application.model';
import { getEntities as getApplications } from 'app/entities/application/application.reducer';
import { getEntities as getJHComponents } from 'app/entities/jh-component/jh-component.reducer';
import { getEntity, updateEntity, createEntity, reset } from './jh-component.reducer';
import { IJHComponent } from 'app/shared/model/jh-component.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IJHComponentUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IJHComponentUpdateState {
  isNew: boolean;
  applicationId: string;
  groupId: string;
}

export class JHComponentUpdate extends React.Component<IJHComponentUpdateProps, IJHComponentUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      applicationId: '0',
      groupId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getApplications();
    this.props.getJHComponents();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { jHComponentEntity } = this.props;
      const entity = {
        ...jHComponentEntity,
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
    this.props.history.push('/jh-component');
  };

  render() {
    const { jHComponentEntity, applications, jHComponents, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="isefApp.jHComponent.home.createOrEditLabel">
              <Translate contentKey="isefApp.jHComponent.home.createOrEditLabel">Create or edit a JHComponent</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : jHComponentEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="jh-component-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="jh-component-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="codeLabel" for="jh-component-code">
                    <Translate contentKey="isefApp.jHComponent.code">Code</Translate>
                  </Label>
                  <AvField id="jh-component-code" type="text" name="code" />
                </AvGroup>
                <AvGroup>
                  <Label id="nameLabel" for="jh-component-name">
                    <Translate contentKey="isefApp.jHComponent.name">Name</Translate>
                  </Label>
                  <AvField id="jh-component-name" type="text" name="name" />
                </AvGroup>
                <AvGroup>
                  <Label id="summaryLabel" for="jh-component-summary">
                    <Translate contentKey="isefApp.jHComponent.summary">Summary</Translate>
                  </Label>
                  <AvField id="jh-component-summary" type="text" name="summary" />
                </AvGroup>
                <AvGroup>
                  <Label id="descriptionLabel" for="jh-component-description">
                    <Translate contentKey="isefApp.jHComponent.description">Description</Translate>
                  </Label>
                  <AvField id="jh-component-description" type="text" name="description" />
                </AvGroup>
                <AvGroup>
                  <Label for="jh-component-application">
                    <Translate contentKey="isefApp.jHComponent.application">Application</Translate>
                  </Label>
                  <AvInput id="jh-component-application" type="select" className="form-control" name="application.id">
                    <option value="" key="0" />
                    {applications
                      ? applications.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="jh-component-group">
                    <Translate contentKey="isefApp.jHComponent.group">Group</Translate>
                  </Label>
                  <AvInput id="jh-component-group" type="select" className="form-control" name="group.id">
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
                <Button tag={Link} id="cancel-save" to="/jh-component" replace color="info">
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
  applications: storeState.application.entities,
  jHComponents: storeState.jHComponent.entities,
  jHComponentEntity: storeState.jHComponent.entity,
  loading: storeState.jHComponent.loading,
  updating: storeState.jHComponent.updating,
  updateSuccess: storeState.jHComponent.updateSuccess
});

const mapDispatchToProps = {
  getApplications,
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
)(JHComponentUpdate);
