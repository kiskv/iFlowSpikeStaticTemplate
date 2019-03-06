/**
 *
 * Header
 *
 */

import React from 'react';
import { Toolbar } from 'devextreme-react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const View = styled.div`
  background-color: white;
  padding: 10px;
  border-bottom: 1px solid #c6c6c6;
`;

/* eslint-disable react/prefer-stateless-function */
class Header extends React.Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.toolbarItems = [
      {
        widget: 'dxButton',
        location: 'before',
        options: {
          icon: 'menu',
          onClick: props.onClick,
        },
      },
      {
        location: 'after',
        template: () => '<div>322</div>',
      },
    ];
  }

  render() {
    return (
      <View>
        <Toolbar items={this.toolbarItems} />
      </View>
    );
  }
}

Header.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Header;
