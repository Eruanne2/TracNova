import React from "react";
import { withRouter } from "react-router";
import {Link, NavLink} from "react-router-dom";
import '../../styles/app_menu_nav.css';

function AppMenu({history, variables, logout}){
  const handleLogout = e => {
    e.preventDefault();

    logout();
    history.push('/');
  }
  return (
    <section className="app-menu-nav dropdown-menu">
      <section className="app-menu dropdown-menu">
        <div>TracNova Logo</div>
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