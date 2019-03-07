/**
 *
 * Menu
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Drawer } from 'devextreme-react';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import MenuList from 'components/MenuList/index';
import reducer from './reducer';
import saga from './saga';
import { getNavigation, setCurrentViewId } from './actions';
import { getDrawerMode } from './helper';

/* eslint-disable react/prefer-stateless-function */
class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
    await this.props.getNavigation();
  };

  getComponent = () => (
    <MenuList
      navigation={this.props.navigation}
      type={this.state.drawerMode === 'shrink' ? 'desktop' : 'mobile'}
      onClick={this.props.setCurrentViewId}
    />
  );

  render() {
    if (this.props.loading) {
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
  navigation: PropTypes.arrayOf(PropTypes.any).isRequired,
  getNavigation: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  setCurrentViewId: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  navigation: state.get('menu').navigation,
  loading: state.get('menu').loading,
});

const mapDispatchToProps = (dispatch) => ({
  getNavigation: () => dispatch(getNavigation()),
  setCurrentViewId: viewId => dispatch(setCurrentViewId(viewId)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'menu', reducer });
const withSaga = injectSaga({ key: 'menu', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Menu);
