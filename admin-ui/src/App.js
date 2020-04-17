import React from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import { history } from './components/shared/history.helper';
//import { authenticationService } from './components/shared/authentication.service';
import {PrivateRoute} from './components/shared/PrivateRoute';
import HomePage from './components/HomePage';
import Login from "./components/login";
import SignUp from "./components/signup";
import Logout from "./components/logout";
import ProductGroup from './components/ProductGroup';

function App() {
  return (<Router history={history}>
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <div className="collapse navbar-collapse" id="navbarTogglerMenu">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to={"/login"}>Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/signUp"}>Sign up</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/logout"}>Logout</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="auth-wrapper">
        <div className="auth-inner">
          <Switch>
            <PrivateRoute exact path="/" component={HomePage} />
            <Route path="/login" component={Login} />
            <Route path="/signUp" component={SignUp} />
            <Route path="/logout" component={Logout} />
            <PrivateRoute path="/productGroup" component={ProductGroup} />
          </Switch>
        </div>
      </div>
    </div></Router>
  );
}

export default App;