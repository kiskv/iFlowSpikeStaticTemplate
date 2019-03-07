/**
 *
 * Header
 *
 */

import React from 'react';
import { Toolbar } from 'devextreme-react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const View = styled.div`
  background-color: white;
  padding: 10px;
  border-bottom: 1px solid #c6c6c6;
`;

/* eslint-disable react/prefer-stateless-function */
class Header extends React.Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.toolbarItems = [
      {
        widget: 'dxButton',
        location: 'before',
        options: {
          icon: 'menu',
          onClick: props.onClick,
        },
      },
      {
        widget: 'dxButton',
        location: 'before',
        options: {
          icon: 'home',
          activeStateEnabled : false,
          focusStateEnabled : false,
          hoverStateEnabled : false,
          onClick: props.onClick,
          stylingMode : 'text',
        },
      },
      {
        cssClass : "textAsBtn",
        location: 'before',
        text: "IFLOW APP",
        onClick : props.onClick,
      },
      {
        location: 'center',
        text: "ЧЭСК КОНФИГУРАЦИЯ ФЛ",
        onClick : props.onClick,
      },
      {
        location : 'after',
        widget : 'dxButton',
        options: {
          icon: 'event',
        },
      },
      {
        location : 'after',
        widget : 'dxMenu',
        options: {
          icon: 'bookmark',
        },
      },
    ];
  }

  render() {
    return (
      <View>
        <Toolbar dataSource={this.toolbarItems} />
      </View>
    );
  }
}

Header.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Header;
