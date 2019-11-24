import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './solution.reducer';
import { ISolution } from 'app/shared/model/solution.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ISolutionDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class SolutionDetail extends React.Component<ISolutionDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { solutionEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="isefApp.solution.detail.title">Solution</Translate> [<b>{solutionEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="code">
                <Translate contentKey="isefApp.solution.code">Code</Translate>
              </span>
            </dt>
            <dd>{solutionEntity.code}</dd>
            <dt>
              <span id="version">
                <Translate contentKey="isefApp.solution.version">Version</Translate>
              </span>
            </dt>
            <dd>{solutionEntity.version}</dd>
            <dt>
              <span id="from">
                <Translate contentKey="isefApp.solution.from">From</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={solutionEntity.from} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="until">
                <Translate contentKey="isefApp.solution.until">Until</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={solutionEntity.until} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="summary">
                <Translate contentKey="isefApp.solution.summary">Summary</Translate>
              </span>
            </dt>
            <dd>{solutionEntity.summary}</dd>
            <dt>
              <span id="description">
                <Translate contentKey="isefApp.solution.description">Description</Translate>
              </span>
            </dt>
            <dd>{solutionEntity.description}</dd>
            <dt>
              <Translate contentKey="isefApp.solution.issue">Issue</Translate>
            </dt>
            <dd>{solutionEntity.issue ? solutionEntity.issue.id : ''}</dd>
            <dt>
              <Translate contentKey="isefApp.solution.expert">Expert</Translate>
            </dt>
            <dd>{solutionEntity.expert ? solutionEntity.expert.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/solution" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/solution/${solutionEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ solution }: IRootState) => ({
  solutionEntity: solution.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SolutionDetail);
