import React from "react";
import { Redirect, Route, Switch } from "react-router";
import axios from "axios";
import { AuthRoute, ProtectedRoute } from "../util/router_util";
import CorrelationPageContainer from "./correlations/correlation_page_container";
import LoginFormContainer from './session/login_form_container'
import SignupFormContainer from './session/signup_form_container'

window.axios = axios;
export default function App(){
  return (
    <Switch>
      <AuthRoute exact path="/login" component={LoginFormContainer}/>
      <AuthRoute exact path="/signup" component={SignupFormContainer}/>
      <ProtectedRoute exact path="/correlations/:correlationId" component={CorrelationPageContainer}/>
      <Route exact path="/">
        <Redirect to="/correlations/0"/>
      </Route>  
    </Switch>
  );
}