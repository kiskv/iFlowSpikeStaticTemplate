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
import { Form } from 'devextreme-react/form';
import styled from 'styled-components';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import Proxy from 'utils/modules/DirectProxy';
import { ruColumns } from 'utils/modules/Store';
import reducer from './reducer';
import saga from './saga';

const Container = styled.div`
  margin: 10px;
`;

/* eslint-disable react/prefer-stateless-function */
export class EditView extends React.Component {
  constructor(props) {
    super(props);
    this.form = null;
    this.state = {
      formItems: [],
      data: {},
    };
  }

  componentDidMount(){
    if(this.props.selected.length === 0) {
      if(!this.props.location.state){ 
        this.props.history.push(`/grid/${this.props.match.params.gridType}`)
      }
    } else {
      this.getFormElements();
    }
  }

  getFormElements = () => {
    const fetchData = new Proxy('Domain.PE_RD_Debtors');
    const loadOptions = {
      data: [{
        viewId: 'pe_rd_debtors_listview',
        curViewId: 'pe_rd_debtors_listview',
        select: 'LINK,N_Code,C_Name1,C_Name2,C_Name3,C_Address1,N_Debit1_WO_Peni,N_Debit1_Peni,N_Debit1,N_DebtPeriods1,N_OverDuePeriods1,D_Date_Due,D_Date_LastDue',
        filter: [
          {
            property: 'LINK',
            value: this.props.selected[0].LINK,
          },
        ],
        page: 1,
        start: 0,
        limit: 25,
        sort: [{ property: 'C_Address1', direction: 'ASC' }],
      }],
    };
    fetchData.get(loadOptions)
      .then((data) => {
        if (data) {
          const { result } = data[0];
          if (result.records.length > 0) {
            const keys = Object.keys(result.records[0]);
            const formItems = [{
              itemType: 'group',
              colSpan: 3,
              items: [],
            }];
            keys.map((item) => {
              formItems[0].items.push({
                dataField: item,
                label: {
                  text: ruColumns.find(el => el.name === item).text,
                },
              });
              return null;
            });
            this.setState({
              formItems,
              data: result.records[0],
            });
          }
        }
      });
  }

  render() {
    return (
      <Container>
        <Helmet>
          <title>EditView</title>
          <meta name="description" content="Description of EditView" />
        </Helmet>
        <Form formData={this.state.data} items={this.state.formItems} scrollingEnabled />
      </Container>
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
