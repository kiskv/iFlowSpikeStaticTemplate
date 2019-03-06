/**
 *
 * GridView
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import styled from 'styled-components';

import DataGrid, {
  Editing,
  HeaderFilter,
  Column,
  Paging,
  Scrolling,
  FilterRow,
  FilterPanel,
  ColumnChooser
} from 'devextreme-react/data-grid';
import ruLocale from 'devextreme/localization/messages/ru.json';
import { loadMessages, locale } from 'devextreme/localization';
import 'devextreme-intl';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectGridView from './selectors';
import reducer from './reducer';
import saga from './saga';

const Container = styled.div`
    display: flex;
    flex: 1;
    background-color: white;
    padding: 10px;
    flex-direction: column;
`;

/* eslint-disable react/prefer-stateless-function */
export class GridView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        userType: 0,
        columnAutoWidth: false
    };
    locale('ru');
    loadMessages(ruLocale);
}

addNewRow = () => {
    if (this.state.userType === 0) {
        this.props.history.push({ pathname: '/add' });
    }
}

onEditingStart = (e) => {
    if (this.state.userType === 0) {
        const { gridType } = this.props.match.params;
        this.props.history.push(`/edit/${gridType}/${e.data.LINK}`);
    }
}

render() {
    return (
        <Container>
            <DataGrid
                columnAutoWidth={this.state.columnAutoWidth}
                cacheEnabled
                elementAttr={{
                    id: 'gridContainer'
                }}
                dataSource={[{a: 1, b: 2, c: 3, d: 4}, {a: 5, b: 6, c: 7, d: 8}]}
                showBorders
                allowColumnReordering
                allowColumnResizing
                onInitNewRow={this.addNewRow}
                onEditingStart={this.onEditingStart}
                remoteOperations>
                <Scrolling rowRenderingMode="virtual" />
                <ColumnChooser enabled />
                <Paging pageSize={25} />
                <HeaderFilter visible allowSearch />
                <FilterRow visible />
                <Editing
                    mode={this.state.userType === 0 ? null : 'form'}
                    allowAdding
                    allowUpdating
                    allowDeleting
                    useIcons />
                <FilterPanel visible />
            </DataGrid>
        </Container>
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
