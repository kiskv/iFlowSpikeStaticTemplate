/**
 *
 * MenuLink
 *
 */

import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './styles.css';
// import styled from 'styled-components';

/* eslint-disable react/prefer-stateless-function */
class MenuLink extends React.Component {
  render() {
    return (
      <Link className="menu_link" {...this.props}>
        {this.props.children}
      </Link>
    );
  }
}

MenuLink.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.any]).isRequired,
};

export default MenuLink;
