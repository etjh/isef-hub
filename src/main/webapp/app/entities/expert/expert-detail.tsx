import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './expert.reducer';
import { IExpert } from 'app/shared/model/expert.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IExpertDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ExpertDetail extends React.Component<IExpertDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { expertEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="isefApp.expert.detail.title">Expert</Translate> [<b>{expertEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="name">
                <Translate contentKey="isefApp.expert.name">Name</Translate>
              </span>
            </dt>
            <dd>{expertEntity.name}</dd>
            <dt>
              <span id="contactDetails">
                <Translate contentKey="isefApp.expert.contactDetails">Contact Details</Translate>
              </span>
            </dt>
            <dd>{expertEntity.contactDetails}</dd>
            <dt>
              <Translate contentKey="isefApp.expert.group">Group</Translate>
            </dt>
            <dd>{expertEntity.group ? expertEntity.group.id : ''}</dd>
            <dt>
              <Translate contentKey="isefApp.expert.user">User</Translate>
            </dt>
            <dd>{expertEntity.user ? expertEntity.user.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/expert" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/expert/${expertEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ expert }: IRootState) => ({
  expertEntity: expert.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExpertDetail);
