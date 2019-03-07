/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import styled from 'styled-components';

import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import GridView from 'containers/GridView/Loadable';
import Menu from 'containers/Menu/Loadable';
import Header from 'components/Header';
import Footer from 'components/Footer';
import Form from 'containers/Form';
import ControlPanel from 'containers/ControlPanel';
import EditView from 'containers/EditView/Loadable';

import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';

import GlobalStyle from '../../global-styles';

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  height: 100vh;
`;

const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const Routes = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  margin: 10px;
`;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      opened: false,
      formVisible: false,
    };
  }

  onModeChange = opened =>
    new Promise(resolve => {
      this.setState({ opened }, () => {
        setTimeout(() => {
          resolve(true);
        }, 500);
      });
    });

  onMenuClick = () => {
    const { opened } = this.state;
    this.setState({
      opened: !opened,
    });
  };

  setFormVisible = () => {
    const { formVisible } = this.state;
    this.setState({formVisible: !formVisible})
  }

  render() {
    return (
      <Container>
        <Content>
          <Form onClose={this.setFormVisible} visible={this.state.formVisible}/>
          <Header onClick={this.onMenuClick} />
          <Menu opened={this.state.opened} onModeChange={this.onModeChange}>
            <ControlPanel />
            <Routes>
              <Switch>
                <Route exact path="/" component={HomePage} />
                <Route path="/grid/:gridType" component={GridView} />
                <Route path="/edit/:gridType" component={EditView} />
                <Route component={NotFoundPage} />
              </Switch>
            </Routes>
          </Menu>
          <Footer />
          <GlobalStyle />
        </Content>
      </Container>
    );
  }
}

