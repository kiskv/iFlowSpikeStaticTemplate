/**
 *
 * Menu
 *
 */

import React from 'react';
import { Drawer } from 'devextreme-react';
import PropTypes from 'prop-types';
import MenuList from './MenuList/index';
import { getDrawerMode } from './helper';
// import styled from 'styled-components';

/* eslint-disable react/prefer-stateless-function */
class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navigation: [],
      loading: true,
      drawerMode: document.body.offsetWidth > 1100 ? 'shrink' : 'overlap',
      currentWidth: document.body.offsetWidth,
    };
  }

  componentDidMount() {
    this.getNavigationList();
    window.onresize = this.onWindowResize;
  }

  onWindowResize = () => {
    const drawerMode = getDrawerMode(
      this.state.drawerMode,
      this.state.currentWidth,
    );
    if (drawerMode) {
      if (drawerMode === 'overlap') {
        this.props.onModeChange(false).then(res => {
          if (res) {
            this.setState({ drawerMode });
          }
        });
      } else {
        this.setState({ drawerMode });
      }
    }
  };

  getNavigationList = async () => {
    const response = await fetch(
      'http://vnext/iflow/robert/nav?_dc=1550754996520',
    );
    const result = await response.json();
    if (result && result.children && result.children.length > 0) {
      const navigation = result.children;
      navigation.splice(0, 1);
      this.setState({
        navigation,
        loading: false,
      });
    }
  };

  getComponent = () => (
    <MenuList
      navigation={this.state.navigation}
      type={this.state.drawerMode === 'shrink' ? 'desktop' : 'mobile'}
    />
  );

  render() {
    if (this.state.loading) {
      return <div>Loading...</div>;
    }
    return (
      <Drawer
        opened={this.props.opened}
        position="left"
        openedStateMode={this.state.drawerMode}
        component={this.getComponent}
      >
        {this.props.children}
      </Drawer>
    );
  }
}

Menu.propTypes = {
  opened: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.any]).isRequired,
  onModeChange: PropTypes.func.isRequired,
};

export default Menu;
