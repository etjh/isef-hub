import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate, translate } from 'react-jhipster';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from './menu-components';

export const EntitiesMenu = props => (
  <NavDropdown icon="th-list" name={translate('global.menu.entities.main')} id="entity-menu">
    <MenuItem icon="asterisk" to="/expert">
      <Translate contentKey="global.menu.entities.expert" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/jh-component">
      <Translate contentKey="global.menu.entities.jhComponent" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/application">
      <Translate contentKey="global.menu.entities.application" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/jh-interface">
      <Translate contentKey="global.menu.entities.jhInterface" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/issue">
      <Translate contentKey="global.menu.entities.issue" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/solution">
      <Translate contentKey="global.menu.entities.solution" />
    </MenuItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
