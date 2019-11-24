import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './issue.reducer';
import { IIssue } from 'app/shared/model/issue.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IIssueDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class IssueDetail extends React.Component<IIssueDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { issueEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="isefApp.issue.detail.title">Issue</Translate> [<b>{issueEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="code">
                <Translate contentKey="isefApp.issue.code">Code</Translate>
              </span>
            </dt>
            <dd>{issueEntity.code}</dd>
            <dt>
              <span id="date">
                <Translate contentKey="isefApp.issue.date">Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={issueEntity.date} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="summary">
                <Translate contentKey="isefApp.issue.summary">Summary</Translate>
              </span>
            </dt>
            <dd>{issueEntity.summary}</dd>
            <dt>
              <span id="description">
                <Translate contentKey="isefApp.issue.description">Description</Translate>
              </span>
            </dt>
            <dd>{issueEntity.description}</dd>
            <dt>
              <span id="status">
                <Translate contentKey="isefApp.issue.status">Status</Translate>
              </span>
            </dt>
            <dd>{issueEntity.status}</dd>
          </dl>
          <Button tag={Link} to="/issue" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/issue/${issueEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ issue }: IRootState) => ({
  issueEntity: issue.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IssueDetail);
