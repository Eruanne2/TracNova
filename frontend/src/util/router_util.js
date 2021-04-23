import React from 'react';
import {connect} from 'react-redux';
import {Route, Redirect, withRouter} from 'react-router-dom';

const Auth = ({component: Component, path, loggedIn, exact}) => (
  <Route {...{path, exact}} render={
    (props) => (
      loggedIn ? 
        <Redirect to="/dashboard" /> :
        <Component {...props}/> 
    )
  } />
);

const Protected = ({component: Component, path, loggedIn, exact}) => (
  <Route {...{path, exact}} render={props => (
    loggedIn ?
      <Component {...props} /> :
      <Redirect to="/" />
  )}/>
);

const mapSTP = ({session}) => ({
  loggedIn: session.isAuthenticated,
  currentUser: session.user
});

export const AuthRoute = withRouter(connect(mapSTP)(Auth));
export const ProtectedRoute = withRouter(connect(mapSTP)(Protected));