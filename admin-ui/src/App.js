import React from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProductGroupState from './context/ProductGroup/ProductGroupState';
import GroceryState from './context/Grocery/GroceryState';
import { history } from './components/shared/history.helper';
import {PrivateRoute} from './components/shared/PrivateRoute';
import HomePage from './components/HomePage';
import Login from "./components/Login";
import SignUp from "./components/Signup";
import Logout from "./components/Logout";
import ProductGroups from './components/ProductGroups';
import Product from './components/Product';
import Grocery from './components/Grocery';
import Navbar from './components/layout/Navbar';
import TreeMenu from './components/layout/TreeMenu';

function App() {
  return (
  <ProductGroupState>
  <GroceryState>
  <Router history={history}>
    <div className="App">
      <Navbar></Navbar>

      <div className="container">
        <Row> <Col md={2}  className="navigation" style={{height: '100%'}}> <TreeMenu></TreeMenu> </Col>
              <Col md={10}> 
              <Switch>
                <PrivateRoute exact path="/" component={HomePage} />
                <Route path="/login" component={Login} />
                <Route path="/signUp" component={SignUp} />
                <Route path="/logout" component={Logout} />
                <PrivateRoute path="/productGroup" component={ProductGroups} />
                <PrivateRoute path="/product" component={Product} />
                <PrivateRoute path="/grocery" component={Grocery} />
              </Switch>
              </Col>
        </Row>
      </div>
    </div>
    </Router>
    </GroceryState>
    </ProductGroupState>
  );
}

export default App;