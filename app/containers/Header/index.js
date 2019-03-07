/**
 *
 * Header
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Toolbar } from 'devextreme-react';
import styled from 'styled-components';

import injectReducer from 'utils/injectReducer';
import makeSelectHeader from './selectors';
import reducer from './reducer';
import { setOpenedType } from '../Menu/actions';

const View = styled.div`
  background-color: white;
  padding: 10px;
  border-bottom: 1px solid #c6c6c6;
`;

/* eslint-disable react/prefer-stateless-function */
class Header extends React.Component {
  helpMenuItems = [
    {
      icon : 'help',
      items : [
        { text : 'Как работать с дебиторами'},
        { text : 'Как работать с ЛС'},
      ],
    },
  ];

  userMenuItems = [
    {
      icon : 'user',
      items : [
        { text : 'Профиль'},
        { text : 'Выйти'},
      ],
    },
  ];

  constructor(props) {
    super(props);
    this.bookmarkMenuItems = [
      {
        icon : 'bookmark',
        items : [
          { text : 'Раздел дебиторы'},
          { text : 'Раздел ЛС'},
        ],
      },

    ];

    this.toolbarItems = [
      {
        widget: 'dxButton',
        location: 'before',
        options: {
          icon: 'menu',
          onClick: this.onMenuClick,
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
          onClick: props.onHomeClick,
          stylingMode : 'text',
        },
      },
      {
        cssClass : "textAsBtn",
        location: 'before',
        text: "IFLOW APP",
        onClick: props.onHomeClick,
      },
      {
        location: 'center',
        text: "ЧЭСК КОНФИГУРАЦИЯ ФЛ",
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
          items : this.bookmarkMenuItems,
        },
      },
      {
        location : 'after',
        widget : 'dxMenu',
        options: {
          items : this.helpMenuItems,
        },
      },
      {
        location : 'after',
        widget : 'dxMenu',
        options: {
          items : this.userMenuItems,
        },
      },
    ];
  }

  onMenuClick = () => {
    this.props.setOpenedType(!this.props.opened)
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
  onHomeClick: PropTypes.func.isRequired,
  setOpenedType: PropTypes.func.isRequired,
  opened: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  opened: state.get('menu').opened,
})

const mapDispatchToProps = (dispatch) => ({
  setOpenedType: visible => dispatch(setOpenedType(visible)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);
