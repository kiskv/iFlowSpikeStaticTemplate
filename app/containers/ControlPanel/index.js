/**
 *
 * ControlPanel
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import Toolbar from 'devextreme-react/toolbar';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import notify from 'devextreme/ui/notify';
import { withRouter } from 'react-router-dom'

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectControlPanel from './selectors';
import reducer from './reducer';
import saga from './saga';

const View = styled.div`
  margin: 10px;
`;

/* eslint-disable react/prefer-stateless-function */
class ControlPanel extends React.Component {
  constructor(props){
    super(props);
    this.items = [
      {
        location: 'after',
        widget: 'dxButton',
        locateInMenu: 'auto',
        options: {
          icon: 'close',
          onClick: this.onDeletePress,
        },
      },
      {
        location: 'after',
        widget: 'dxButton',
        locateInMenu: 'auto',
        options: {
          icon: 'edit',
          onClick: this.addNewRow,
        },
      },
      {
        location: 'after',
        widget: 'dxButton',
        locateInMenu: 'auto',
        options: {
          icon: 'plus',
          onClick: this.addNewRow,
        },
      },
      {
        location: 'after',
        widget: 'dxButton',
        locateInMenu: 'auto',
        options: {
          icon: 'refresh',
          onClick: () => notify('Refresh'),
        },
      }
    ];
  }

  onDeletePress = () => {
    notify(JSON.stringify(this.props.selected));
  }

  addNewRow = () => {
    this.props.history.push('/edit');
  }

  render() {
    return (
      <View>
        <Toolbar items={this.items} style={{ backgroundColor: 'transparent' }} />
      </View>
    );
  }
}

ControlPanel.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {
    selected: state.get('grid').selected
  }
};

const mapDispatchToProps = (dispatch) => ({
  dispatch
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'controlPanel', reducer });
const withSaga = injectSaga({ key: 'controlPanel', saga });

export default withRouter(compose(
  withReducer,
  withSaga,
  withConnect,
)(ControlPanel));
