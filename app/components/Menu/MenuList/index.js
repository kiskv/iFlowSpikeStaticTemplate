/**
 *
 * MenuList
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from '../MenuLink/index';

const Container = styled.div`
  display: flex;
  flex: 0;
`;

const List = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  min-width: 290px;
  background-color: white;
  padding: 10px;
  border: 1px solid #c6c6c6;
  margin: 10px;
  margin-right: 0px;
`;

const MobileContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  min-width: 290px;
  height: 100%;
  background-color: white;
  padding: 10px;
`;

/* eslint-disable react/prefer-stateless-function */
class MenuList extends React.Component {
  renderLinks = () =>
    this.props.navigation.map((item, index) => (
      <Link key={index} to={`/grid/${item.viewType}`}>
        {item.text}
      </Link>
    ));

  render() {
    if (this.props.type === 'desktop') {
      return (
        <Container>
          <List>{this.renderLinks()}</List>
        </Container>
      );
    }
    return <MobileContainer>{this.renderLinks()}</MobileContainer>;
  }
}

MenuList.propTypes = {
  navigation: PropTypes.arrayOf(PropTypes.object).isRequired,
  type: PropTypes.string.isRequired,
};

export default MenuList;
