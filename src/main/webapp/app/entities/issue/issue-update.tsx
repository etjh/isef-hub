import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './issue.reducer';
import { IIssue } from 'app/shared/model/issue.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IIssueUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IIssueUpdateState {
  isNew: boolean;
}

export class IssueUpdate extends React.Component<IIssueUpdateProps, IIssueUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
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
  }

  saveEntity = (event, errors, values) => {
    values.date = convertDateTimeToServer(values.date);

    if (errors.length === 0) {
      const { issueEntity } = this.props;
      const entity = {
        ...issueEntity,
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
    this.props.history.push('/issue');
  };

  render() {
    const { issueEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="isefApp.issue.home.createOrEditLabel">
              <Translate contentKey="isefApp.issue.home.createOrEditLabel">Create or edit a Issue</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : issueEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="issue-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="issue-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="codeLabel" for="issue-code">
                    <Translate contentKey="isefApp.issue.code">Code</Translate>
                  </Label>
                  <AvField id="issue-code" type="text" name="code" />
                </AvGroup>
                <AvGroup>
                  <Label id="dateLabel" for="issue-date">
                    <Translate contentKey="isefApp.issue.date">Date</Translate>
                  </Label>
                  <AvInput
                    id="issue-date"
                    type="datetime-local"
                    className="form-control"
                    name="date"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.issueEntity.date)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="summaryLabel" for="issue-summary">
                    <Translate contentKey="isefApp.issue.summary">Summary</Translate>
                  </Label>
                  <AvField id="issue-summary" type="text" name="summary" />
                </AvGroup>
                <AvGroup>
                  <Label id="descriptionLabel" for="issue-description">
                    <Translate contentKey="isefApp.issue.description">Description</Translate>
                  </Label>
                  <AvField id="issue-description" type="text" name="description" />
                </AvGroup>
                <AvGroup>
                  <Label id="statusLabel" for="issue-status">
                    <Translate contentKey="isefApp.issue.status">Status</Translate>
                  </Label>
                  <AvInput
                    id="issue-status"
                    type="select"
                    className="form-control"
                    name="status"
                    value={(!isNew && issueEntity.status) || 'New'}
                  >
                    <option value="New">{translate('isefApp.IssueStatus.New')}</option>
                    <option value="Known">{translate('isefApp.IssueStatus.Known')}</option>
                    <option value="Old">{translate('isefApp.IssueStatus.Old')}</option>
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/issue" replace color="info">
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
  issueEntity: storeState.issue.entity,
  loading: storeState.issue.loading,
  updating: storeState.issue.updating,
  updateSuccess: storeState.issue.updateSuccess
});

const mapDispatchToProps = {
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
)(IssueUpdate);
