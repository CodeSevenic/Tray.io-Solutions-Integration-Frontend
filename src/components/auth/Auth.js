import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { baseUrl } from '../../urlConfig';
export const auth = {
  isAuthenticated: sessionStorage.getItem('userLogged') || false,

  authenticate(cb) {
    this.isAuthenticated = true;
    sessionStorage.setItem('userLogged', true);

    if (typeof cb === 'function') {
      cb(true);
    }
  },

  signout(cb) {
    fetch(`/api/logout`, { method: 'POST', credentials: 'include' })
      .then((res) => {
        this.isAuthenticated = false;
        if (typeof cb === 'function') {
          // user was logged out
          cb(true);
        }
      })
      .catch((err) => {
        console.log('Error logging out user.');
        if (typeof cb === 'function') {
          // user was not logged out
          cb(false);
        }
      });
  },
};

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      auth.isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

export const RedirectMain = (props) =>
  auth.isAuthenticated ? (
    <Redirect {...props} to="/solutions/discover" />
  ) : (
    <Redirect {...props} to="/login" />
  );
