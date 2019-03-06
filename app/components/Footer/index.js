/**
 *
 * Footer
 *
 */

import React from 'react';
import ToolBar from 'devextreme-react/toolbar';
// import PropTypes from 'prop-types';
import styled from 'styled-components';

const View = styled.div`
  display: flex;
  align-items: flex-end;
  z-index: 2000;
`;

const items = [
  {
    location: 'before',
    template: () => '<div style="color: white">322</div>',
  },
];

/* eslint-disable react/prefer-stateless-function */
class Footer extends React.Component {
  render() {
    return (
      <View>
        <ToolBar className="footer" items={items} style={{backgroundColor: '#4a4a4a', padding: 10}} />
      </View>
    );
  }
}

Footer.propTypes = {};

export default Footer;
