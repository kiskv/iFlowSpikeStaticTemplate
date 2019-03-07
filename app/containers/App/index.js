/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Footer from '../../components/Footer';
import Form from '../Form';
import ControlPanel from '../ControlPanel';
import EditView from '../EditView/Loadable';
import HomePage from '../HomePage/Loadable';

import NotFoundPage from '../NotFoundPage/Loadable';

import GridView from '../GridView/Loadable';
import Menu from '../Menu/Loadable';
import Header from '../Header';

import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';

import GlobalStyle from '../../global-styles';

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
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

class App extends React.Component {
  moveToDefaultPage = () => {
    this.props.history.push(`/grid/${this.props.defaultPage}`);
  } 

  render() {
    return (
      <Container>
        <Content>
          <Form />
          <Header onHomeClick={this.moveToDefaultPage} />
          <Menu>
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

App.propTypes = {
  defaultPage: PropTypes.string,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
}

App.defaultProps = {
  defaultPage: '',
}

const mapStateToProps = (state) => ({
  defaultPage: state.get('menu').defaultPage,
});

const mapDispatchToProps = () => ({});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(App));
