/**
 *
 * MenuList
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link as LinkComponent } from 'react-router-dom';
import './styles.css';

const Container = styled.div`
  display: flex;
  flex: 0;
  flex-direction: column;
`;

const List = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  margin: 10px;
  background-color: white;
  padding: 10px;
  border: 1px solid #c6c6c6;
  margin-right: 0px;
`;

const MobileContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const MobileList = styled.div`
  display: flex;
  flex: 1;
  width: 290px;
  height: 100%;
  flex-direction: column;
  background-color: white;
  padding: 10px;
`;

const TreeLink = styled.div`
  display: flex;
  flex-direction: column;
`;

const Link = styled(LinkComponent)`
  margin-left: 10px;
`;

/* eslint-disable react/prefer-stateless-function */
class MenuList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openedTree: null,
      openedLink: null,
    };
  }

  onClick = (index = null, viewType = null) => {
    if(index !== null) {
      this.setState({
        openedTree: index,
      })
    } else {
      this.props.onClick(viewType);
      this.setState({
        openedLink: viewType,
      })
    }
  }

  renderLinks = (navigation) =>
    navigation.map((item, index) => {
      if (item.children) {
        return (
          <TreeLink key={index}>
            <button type="button" className="menu_link" onClick={this.onClick.bind(this, index)}>
              <div>{item.text}</div>
              <div style={{paddingLeft: 15}}>{'>'}</div>
            </button>
            {this.state.openedTree === index && this.renderLinks(item.children)}
          </TreeLink>
        );
      }
      return (
        <Link 
          key={index} 
          className={this.state.openedLink === item.viewType ? "opened_link" : "menu_link"} 
          to={`/grid/${item.viewType}`} 
          onClick={() => this.onClick(null, item.viewType)}>
          {item.text}
        </Link>
      );
    });

  render() {
    if (this.props.type === 'desktop') {
      return (
        <Container>
          <List>{this.renderLinks(this.props.navigation)}</List>
        </Container>
      );
    }
    return (
      <MobileContainer>
        <MobileList>
          {this.renderLinks(this.props.navigation)}
        </MobileList>
      </MobileContainer>
    );
  }
}

MenuList.propTypes = {
  navigation: PropTypes.arrayOf(PropTypes.object).isRequired,
  type: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default MenuList;
