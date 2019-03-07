/**
 *
 * EditView
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectEditView from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
export class EditView extends React.Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>EditView</title>
          <meta name="description" content="Description of EditView" />
        </Helmet>
        <FormattedMessage {...messages.header} />
      </div>
    );
  }
}

EditView.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  editView: makeSelectEditView(),
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

const withReducer = injectReducer({ key: 'editView', reducer });
const withSaga = injectSaga({ key: 'editView', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(EditView);
