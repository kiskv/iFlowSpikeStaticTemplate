/**
 *
 * Form
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import styled from 'styled-components';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectForm from './selectors';
import reducer from './reducer';
import saga from './saga';

const View = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.26);
`;

const Container = styled.div`
  max-width: 100%;
  min-width: 70%;
  height: 100%;
  background-color: white;
  float: right;
  box-shadow: -4px 1px 4px 0px rgba(0,0,0,0.53);
`;

/* eslint-disable react/prefer-stateless-function */
export class Form extends React.Component {
  render() {
    return (
      <View>
        <Container>
          <button type="button" onClick={this.props.onClose}>Close</button>
        </Container>
      </View>
    );
  }
}

Form.propTypes = {
  onClose: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  form: makeSelectForm(),
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

const withReducer = injectReducer({ key: 'form', reducer });
const withSaga = injectSaga({ key: 'form', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Form);
