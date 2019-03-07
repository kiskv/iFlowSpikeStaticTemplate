/**
 *
 * ControlPanel
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Toolbar from 'devextreme-react/toolbar';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import notify from 'devextreme/ui/notify';
import { withRouter } from 'react-router-dom'

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
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
      },
    ];
  }

  onDeletePress = () => {
    notify(JSON.stringify(this.props.selected));
  }

  addNewRow = () => {
    this.props.history.push(`/edit/new`);
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
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  selected: PropTypes.arrayOf(PropTypes.any).isRequired,
};

const mapStateToProps = state => ({
  selected: state.get('grid').selected,
  viewId: state.get('menu').viewId,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
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
