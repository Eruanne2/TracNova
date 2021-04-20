import React from "react";
import { Redirect, Route, Switch } from "react-router";
import { AuthRoute, ProtectedRoute } from "../util/router_util";
import LoginFormContainer from './session/login_form_container'
import SignupFormContainer from './session/signup_form_container'

export default function App(){
  return (
    <Switch>
      <AuthRoute exact path="/login" component={LoginFormContainer}/>
      <AuthRoute exact path="/signup" component={SignupFormContainer}/>
      <Route exact path="/">
        <Redirect to="/correlations"/>
      </Route>
    </Switch>
  );
}