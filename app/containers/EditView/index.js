/**
 *
 * EditView
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';

/* eslint-disable react/prefer-stateless-function */
export class EditView extends React.Component {
  componentDidMount(){
    if(this.props.selected.length === 0) {
      if(!this.props.location.state){ 
        this.props.history.push(`/grid/${this.props.match.params.gridType}`)
      }
    }
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>EditView</title>
          <meta name="description" content="Description of EditView" />
        </Helmet>
        <div>
          {JSON.stringify(this.props.selected)}
        </div>
      </div>
    );
  }
}

EditView.propTypes = {
  selected: PropTypes.arrayOf(PropTypes.any).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.object.isRequired,
  }).isRequired,
  location: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = state => ({
  selected: state.get('grid').selected,
})

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'editView', reducer });
const withSaga = injectSaga({ key: 'editView', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(EditView);
