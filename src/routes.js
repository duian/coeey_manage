import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from './App';
import Login from './views/Login';
// import Home from './views/Home';
import Product from './views/Product';
import FraudParam from './views/FraudParam';
import SystemParam from './views/SystemParam';
import ValidateSettings from './views/ValidateSettings';
import auth from './utils/auth';

function redirectToDashboad(nextState, replace) {
  if (auth.loggedIn()) {
    replace('/');
  }
}

function redirectToLogin(nextState, replace) {
  if (!auth.loggedIn()) {
    replace('/login');
  }
}

class Routes extends React.Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="login" component={Login} onEnter={redirectToDashboad}/>
        <Route path="/" component={App} onEnter={redirectToLogin}>
          <IndexRoute component={Product}/>
          <Route path="product" component={Product}/>
          <Route path="fraudParam" component={FraudParam}/>
          <Route path="systemParam" component={SystemParam}/>
          <Route path="validateSettings" component={ValidateSettings}/>
        </Route>
      </Router>
    );
  }
}

export default Routes;
