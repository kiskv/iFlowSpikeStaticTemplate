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
import DataSource from 'utils/modules/Store';
import { setToolbarItems } from 'containers/ControlPanel/actions';

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
    this.dataSource = DataSource;
    this.state = {
      columnAutoWidth: false,
    };
    locale('ru');
    loadMessages(ruLocale);
  }
  
  componentDidMount() {
    this.props.setToolbarItems('grid');
    this.props.setCurrentViewId(this.props.match.params.gridType);
  }

  onSelectionChanged = (data) => {
    this.props.setSelectedItems(data.selectedRowsData);
  }

  render() {
    const select = 'LINK,N_Code,C_Name1,C_Name2,C_Name3,C_Address1,N_Debit1_WO_Peni,N_Debit1_Peni,N_Debit1,N_DebtPeriods1,N_OverDuePeriods1,D_Date_Due,D_Date_LastDue';
    return (
      <Container>
        <DataGrid
          columnAutoWidth={this.state.columnAutoWidth}
          cacheEnabled
          elementAttr={{
            id: 'gridContainer',
          }}
          dataSource={this.dataSource({ viewId: this.props.match.params.gridType, action: 'pe_rd_debtors', select })}
          showBorders
          allowColumnReordering
          allowColumnResizing
          remoteOperations
          onSelectionChanged={this.onSelectionChanged}>
          <Selection 
            mode="multiple"
            showCheckBoxesMode="onClick"
            selectAllMode="allPages" />
          <Scrolling rowRenderingMode="virtual" mode="virtual" />
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
  setToolbarItems: PropTypes.func.isRequired,
};

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
  setSelectedItems: selected => dispatch(setSelectedItems(selected)),
  setCurrentViewId: viewId => dispatch(setCurrentViewId(viewId)),
  setToolbarItems: path => dispatch(setToolbarItems(path)),
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
