import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import { PrivateRoute, RedirectMain } from './components/auth/Auth';

import Demo from './views/Demo';
import Account from './views/Account';
import SolutionsMine from './views/SolutionsMine';
import SolutionsDiscover from './views/SolutionsDiscover';
import Authentications from './views/Authentications';
import Users from './views/Users';
import PasswordReset from './components/auth/PasswordReset';
import ComingSoon from './views/ComingSoon';
const App = () => {
  const currentPathname = window.location.pathname;
  return (
    <Router>
      <div className="app-container">
        <Switch>
          <RedirectMain exact from={`/`} />
        </Switch>
        {/* <Route path="/demo" component={Demo} /> */}
        <Route path="/login" component={ComingSoon} />
        <Route path="/user-reset-password" component={ComingSoon} />
        <PrivateRoute path="/account" component={Account} />
        <PrivateRoute path="/solutions/discover" component={SolutionsDiscover} />
        <PrivateRoute path="/solutions/mine" component={SolutionsMine} />
        <PrivateRoute path="/authentications" component={Authentications} />
        <PrivateRoute path="/admin/users" component={Users} />
        <Route path="/admin/register" component={Register} />
      </div>
    </Router>
  );
};

export default App;
