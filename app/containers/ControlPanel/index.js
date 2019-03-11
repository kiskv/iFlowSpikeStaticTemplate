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
import { setVisibleForm } from 'containers/Form/actions';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';

const View = styled.div`
  margin: 10px;
`;

/* eslint-disable react/prefer-stateless-function */
class ControlPanel extends React.Component {
  onDeletePress = () => {
    notify(JSON.stringify(this.props.selected));
  }

  onRefresh = () => {
    notify("Refresh");
  }

  addNewRow = () => {
    this.props.history.push({
      pathname: `/edit/${this.props.viewId}`,
      state: {
        newrow: true,
      },
    });
  }

  editRow = () => {
    if(this.props.selected.length > 1) {
      notify('Не более одного.');
    } else if (this.props.selected.length === 0) {
      notify('Выберите строку.')
    } else {
      this.props.history.push(`/edit/${this.props.viewId}`);
    }
  }

  showForm = () => {
    this.props.setVisibleForm(true);
  }

  render() {
    return (
      <View>
        <Toolbar items={this.props.items(this)} style={{ backgroundColor: 'transparent' }} />
      </View>
    );
  }
}

ControlPanel.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  selected: PropTypes.arrayOf(PropTypes.any).isRequired,
  viewId: PropTypes.string,
  items: PropTypes.func,
  setVisibleForm: PropTypes.func.isRequired,
};

ControlPanel.defaultProps = {
  items: () => [],
  viewId: null,
}

const mapStateToProps = state => ({
  selected: state.get('grid').selected,
  viewId: state.get('menu').viewId,
  items: state.get('cpanel').items,
});

const mapDispatchToProps = (dispatch) => ({
  setVisibleForm: visible => dispatch(setVisibleForm(visible)),
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
