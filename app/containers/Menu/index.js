/**
 *
 * Menu
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Drawer } from 'devextreme-react';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import MenuList from 'components/MenuList/index';
import makeSelectMenu from './selectors';
import reducer from './reducer';
import saga from './saga';
import { getNavigation } from './actions';

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
    const navigation = await getNavigation();
    this.setState({
      navigation,
      loading: false
    });
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

Menu.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  menu: makeSelectMenu(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

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
