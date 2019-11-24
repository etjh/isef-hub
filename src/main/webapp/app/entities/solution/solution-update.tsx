import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IIssue } from 'app/shared/model/issue.model';
import { getEntities as getIssues } from 'app/entities/issue/issue.reducer';
import { IExpert } from 'app/shared/model/expert.model';
import { getEntities as getExperts } from 'app/entities/expert/expert.reducer';
import { getEntity, updateEntity, createEntity, reset } from './solution.reducer';
import { ISolution } from 'app/shared/model/solution.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ISolutionUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ISolutionUpdateState {
  isNew: boolean;
  issueId: string;
  expertId: string;
}

export class SolutionUpdate extends React.Component<ISolutionUpdateProps, ISolutionUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      issueId: '0',
      expertId: '0',
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

    this.props.getIssues();
    this.props.getExperts();
  }

  saveEntity = (event, errors, values) => {
    values.from = convertDateTimeToServer(values.from);
    values.until = convertDateTimeToServer(values.until);

    if (errors.length === 0) {
      const { solutionEntity } = this.props;
      const entity = {
        ...solutionEntity,
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
    this.props.history.push('/solution');
  };

  render() {
    const { solutionEntity, issues, experts, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="isefApp.solution.home.createOrEditLabel">
              <Translate contentKey="isefApp.solution.home.createOrEditLabel">Create or edit a Solution</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : solutionEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="solution-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="solution-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="codeLabel" for="solution-code">
                    <Translate contentKey="isefApp.solution.code">Code</Translate>
                  </Label>
                  <AvField id="solution-code" type="text" name="code" />
                </AvGroup>
                <AvGroup>
                  <Label id="versionLabel" for="solution-version">
                    <Translate contentKey="isefApp.solution.version">Version</Translate>
                  </Label>
                  <AvField id="solution-version" type="text" name="version" />
                </AvGroup>
                <AvGroup>
                  <Label id="fromLabel" for="solution-from">
                    <Translate contentKey="isefApp.solution.from">From</Translate>
                  </Label>
                  <AvInput
                    id="solution-from"
                    type="datetime-local"
                    className="form-control"
                    name="from"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.solutionEntity.from)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="untilLabel" for="solution-until">
                    <Translate contentKey="isefApp.solution.until">Until</Translate>
                  </Label>
                  <AvInput
                    id="solution-until"
                    type="datetime-local"
                    className="form-control"
                    name="until"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.solutionEntity.until)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="summaryLabel" for="solution-summary">
                    <Translate contentKey="isefApp.solution.summary">Summary</Translate>
                  </Label>
                  <AvField id="solution-summary" type="text" name="summary" />
                </AvGroup>
                <AvGroup>
                  <Label id="descriptionLabel" for="solution-description">
                    <Translate contentKey="isefApp.solution.description">Description</Translate>
                  </Label>
                  <AvField id="solution-description" type="text" name="description" />
                </AvGroup>
                <AvGroup>
                  <Label for="solution-issue">
                    <Translate contentKey="isefApp.solution.issue">Issue</Translate>
                  </Label>
                  <AvInput id="solution-issue" type="select" className="form-control" name="issue.id">
                    <option value="" key="0" />
                    {issues
                      ? issues.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="solution-expert">
                    <Translate contentKey="isefApp.solution.expert">Expert</Translate>
                  </Label>
                  <AvInput id="solution-expert" type="select" className="form-control" name="expert.id">
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
                <Button tag={Link} id="cancel-save" to="/solution" replace color="info">
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
  issues: storeState.issue.entities,
  experts: storeState.expert.entities,
  solutionEntity: storeState.solution.entity,
  loading: storeState.solution.loading,
  updating: storeState.solution.updating,
  updateSuccess: storeState.solution.updateSuccess
});

const mapDispatchToProps = {
  getIssues,
  getExperts,
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
)(SolutionUpdate);
