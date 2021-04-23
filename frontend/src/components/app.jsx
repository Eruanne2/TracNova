import React from "react";
import { Redirect, Route, Switch } from "react-router";
import axios from "axios";
import { AuthRoute, ProtectedRoute } from "../util/router_util";
import CorrelationPageContainer from "./correlations/correlation_page_container";
import CorrelationsIndexContainer from "./correlations/correlations_index_container";
import LoginFormContainer from './session/login_form_container'
import SignupFormContainer from './session/signup_form_container'
import AppMenuContainer from "./util/app_menu_container";
import DashboardContainer from './dashboard/dashboard_container';
import VariablePageContainer from "./variables/variable_page_container";
import VariableIndexContainer from "./variables/variables_index_container"
import PageNotFound from './static_pages/page_not_found';
import Splash from './static_pages/splash';
import VariablesIndexContainer from "./variables/variables_index_container";

window.axios = axios;

function NoIndexComponent(){
  return (<div className="index-page no-index"></div>)
}

export default function App(){
  return (
    <div>
      <ProtectedRoute path="/" component={AppMenuContainer}/>
      <section className="indices">
        <ProtectedRoute path={['/variables', '/correlations']} component={VariablesIndexContainer}/>
        <ProtectedRoute path="/correlations" component={CorrelationsIndexContainer}/>
      </section>
      <Switch>
        <AuthRoute exact path='/' component={Splash}/>
        <AuthRoute exact path="/login" component={LoginFormContainer}/>
        <AuthRoute exact path="/signup" component={SignupFormContainer}/>

        <ProtectedRoute exact path="/variables/:variableId" component={VariablePageContainer}/>
        <ProtectedRoute exact path="/correlations/:correlationId" component={CorrelationPageContainer}/>
        <ProtectedRoute exact path="/dashboard" component={DashboardContainer}/>
        <ProtectedRoute path={['/variables', '/correlations']} component={NoIndexComponent}/>
        <Route exact path="/">
          <Redirect to="/dashboard"/>
        </Route>
        
        <Route path='*' component={PageNotFound}/>
      </Switch>
    </div>
  );
}