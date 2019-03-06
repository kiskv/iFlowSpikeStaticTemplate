/**
 *
 * GridView
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import DataGrid from 'devextreme-react/data-grid';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectGridView from './selectors';
import reducer from './reducer';
import saga from './saga';

/* eslint-disable react/prefer-stateless-function */
export class GridView extends React.Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>GridView</title>
          <meta name="description" content="Description of GridView" />
        </Helmet>
        <DataGrid dataSource={[{ a: 1, b: 2 }, { a: 3, b: 4 }]} />
      </div>
    );
  }
}

GridView.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  gridView: makeSelectGridView(),
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

const withReducer = injectReducer({ key: 'gridView', reducer });
const withSaga = injectSaga({ key: 'gridView', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(GridView);
