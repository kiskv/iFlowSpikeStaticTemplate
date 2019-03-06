/**
 *
 * NavigationHistory
 *
 */

import React from 'react';
import Toolbar from 'devextreme-react/toolbar';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import notify from 'devextreme/ui/notify';

const View = styled.div`
  margin: 10px;
`;

const items = [
  {
    location: 'before',
    widget: 'dxButton',
    options: {
      type: 'back',
      text: 'Back',
      onClick: () => {
        notify('Back button has been clicked!');
      },
    },
  },
  {
    location: 'before',
    widget: 'dxButton',
    locateInMenu: 'auto',
    options: {
      icon: 'refresh',
      onClick: () => {
        notify('Refresh button has been clicked!');
      },
    },
  },
  {
    location: 'center',
    locateInMenu: 'never',
    template: () =>
      "<div class='toolbar-label'><b>Tom's Club</b> Products</div>",
  },
  {
    location: 'after',
    widget: 'dxButton',
    locateInMenu: 'auto',
    options: {
      icon: 'plus',
      onClick: () => {
        notify('Add button has been clicked!');
      },
    },
  },
  {
    locateInMenu: 'always',
    text: 'Save',
    onClick: () => {
      notify('Save option has been clicked!');
    },
  },
  {
    locateInMenu: 'always',
    text: 'Print',
    onClick: () => {
      notify('Print option has been clicked!');
    },
  },
  {
    locateInMenu: 'always',
    text: 'Settings',
    onClick: () => {
      notify('Settings option has been clicked!');
    },
  },
];

/* eslint-disable react/prefer-stateless-function */
class NavigationHistory extends React.Component {
  render() {
    return (
      <View>
        <Toolbar items={items} style={{ backgroundColor: 'transparent' }} />
      </View>
    );
  }
}

NavigationHistory.propTypes = {};

export default NavigationHistory;
