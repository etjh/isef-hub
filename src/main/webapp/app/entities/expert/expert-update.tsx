import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntities as getExperts } from 'app/entities/expert/expert.reducer';
import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { getEntity, updateEntity, createEntity, reset } from './expert.reducer';
import { IExpert } from 'app/shared/model/expert.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IExpertUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IExpertUpdateState {
  isNew: boolean;
  groupId: string;
  userId: string;
}

export class ExpertUpdate extends React.Component<IExpertUpdateProps, IExpertUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      groupId: '0',
      userId: '0',
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

    this.props.getExperts();
    this.props.getUsers();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { expertEntity } = this.props;
      const entity = {
        ...expertEntity,
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
    this.props.history.push('/expert');
  };

  render() {
    const { expertEntity, experts, users, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="isefApp.expert.home.createOrEditLabel">
              <Translate contentKey="isefApp.expert.home.createOrEditLabel">Create or edit a Expert</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : expertEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="expert-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="expert-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="nameLabel" for="expert-name">
                    <Translate contentKey="isefApp.expert.name">Name</Translate>
                  </Label>
                  <AvField id="expert-name" type="text" name="name" />
                </AvGroup>
                <AvGroup>
                  <Label id="contactDetailsLabel" for="expert-contactDetails">
                    <Translate contentKey="isefApp.expert.contactDetails">Contact Details</Translate>
                  </Label>
                  <AvField id="expert-contactDetails" type="text" name="contactDetails" />
                </AvGroup>
                <AvGroup>
                  <Label for="expert-group">
                    <Translate contentKey="isefApp.expert.group">Group</Translate>
                  </Label>
                  <AvInput id="expert-group" type="select" className="form-control" name="group.id">
                    <option value="" key="0" />
                    {experts
                      ? experts.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="expert-user">
                    <Translate contentKey="isefApp.expert.user">User</Translate>
                  </Label>
                  <AvInput id="expert-user" type="select" className="form-control" name="user.id">
                    <option value="" key="0" />
                    {users
                      ? users.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/expert" replace color="info">
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
  experts: storeState.expert.entities,
  users: storeState.userManagement.users,
  expertEntity: storeState.expert.entity,
  loading: storeState.expert.loading,
  updating: storeState.expert.updating,
  updateSuccess: storeState.expert.updateSuccess
});

const mapDispatchToProps = {
  getExperts,
  getUsers,
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
)(ExpertUpdate);
