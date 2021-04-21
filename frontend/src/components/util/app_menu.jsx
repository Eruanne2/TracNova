import React from "react";
import { withRouter } from "react-router";
import {Link, NavLink} from "react-router-dom";

function AppMenu({history, variables, logout}){
  const handleLogout = e => {
    e.preventDefault();

    logout();
    history.push('/');
  }

  return (
    <section className="modal app-menu dropdown-menu">
      <section className="lightbox app-menu dropdown-menu">
        <img className="brand" alt="logo"/>
        <ul>
          <li className="menu-item">
            <NavLink activeClassName="selected" to="/variables">Variables</NavLink>
          </li>
          { variables.length < 2 ? null :
              <li className="menu-item">
                <NavLink activeClassName="selected" to="/correlations">Correlations</NavLink>
              </li>
          }
          <li className="menu-item">
            <NavLink activeClassName="selected" to="#" onClick={handleLogout}>Logout</NavLink>
          </li>
        </ul>
      </section>
    </section>
  )
}

export default withRouter(AppMenu);