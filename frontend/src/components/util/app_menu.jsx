import React from "react";
import { withRouter } from "react-router";
import {Link} from "react-router-dom";

function AppMenu({logout, history,...props}){
  const handleLogout = e => {
    e.preventDefault();

    logout();
    history.push('/');
  }
  return (
    <section className="modal app-menu dropdown-menu">
      <section className="lightbox app-menu dropdown-menu">
        <ul>
          <li className="menu-item">
            <Link to="#" onClick={handleLogout}>Logout</Link>
          </li>
        </ul>
      </section>
    </section>
  )
}

export default withRouter(AppMenu);