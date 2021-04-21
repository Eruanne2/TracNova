import React from "react";
import { Redirect, Route, Switch } from "react-router";
import axios from "axios";
import { AuthRoute, ProtectedRoute } from "../util/router_util";
import CorrelationPageContainer from "./correlations/correlation_page_container";
import CorrelationsPageContainer from "./correlations/correlations_page_container";
import LoginFormContainer from './session/login_form_container'
import SignupFormContainer from './session/signup_form_container'
import AppMenuContainer from "./util/app_menu_container";
import VariablesPageContainer from "./variables/variables_page_container";

window.axios = axios;
export default function App(){
  return (
    <>
      <ProtectedRoute path="/" component={AppMenuContainer}/>
      <Switch>
        <AuthRoute exact path="/login" component={LoginFormContainer}/>
        <AuthRoute exact path="/signup" component={SignupFormContainer}/>
        <ProtectedRoute exact path="/variables" component={VariablesPageContainer}/>
        <ProtectedRoute exact path="/correlations/:correlationId" component={CorrelationPageContainer}/>
        <ProtectedRoute exact path="/correlations" component={CorrelationsPageContainer}/>
        <Route exact path="/">
          <Redirect to="/correlations"/>
        </Route>  
      </Switch>
    </>
  );
}