/**
 *
 * GridView
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import DataGrid, {
  Editing,
  HeaderFilter,
  Paging,
  Scrolling,
  FilterRow,
  FilterPanel,
  ColumnChooser,
  Selection,
} from 'devextreme-react/data-grid';
import ruLocale from 'devextreme/localization/messages/ru.json';
import { loadMessages, locale } from 'devextreme/localization';
import 'devextreme-intl';

import { setSelectedItems } from './actions';
import { setCurrentViewId } from '../Menu/actions';

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
      columnAutoWidth: false,
    };
    locale('ru');
    loadMessages(ruLocale);
  }
  
  componentDidMount() {
    this.props.setCurrentViewId(this.props.match.params.gridType);
  }

  onSelectionChanged = (data) => {
    this.props.setSelectedItems(data.selectedRowsData);
  }

  render() {
    return (
      <Container>
        <DataGrid
          columnAutoWidth={this.state.columnAutoWidth}
          cacheEnabled
          elementAttr={{
            id: 'gridContainer',
          }}
          dataSource={[
            {a: 1, b: 2, c: 3, d: 4}, 
            {a: 5, b: 6, c: 7, d: 8}, 
            {a: 9, b: 10, c: 11, d: 12}, 
            {a: 13, b: 14, c: 15, d: 16},
          ]}
          showBorders
          allowColumnReordering
          allowColumnResizing
          remoteOperations
          onSelectionChanged={this.onSelectionChanged}>
          <Selection 
            mode="multiple"
            showCheckBoxesMode="onClick"
            selectAllMode="allPages" />
          <Scrolling rowRenderingMode="virtual" />
          <ColumnChooser enabled />
          <Paging pageSize={25} />
          <HeaderFilter visible allowSearch />
          <FilterRow visible />
          <Editing
            mode="form"
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
  setSelectedItems: PropTypes.func.isRequired,
  setCurrentViewId: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.objectOf(PropTypes.any),
  }).isRequired,
};

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
  setSelectedItems: selected => dispatch(setSelectedItems(selected)),
  setCurrentViewId: viewId => dispatch(setCurrentViewId(viewId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GridView);

// const withReducer = injectReducer({ key: 'gridView', reducer });
// const withSaga = injectSaga({ key: 'gridView', saga });

// export default compose(
//   withReducer,
//   withSaga,
//   withConnect,
// )(GridView);
