import React from "react";
import { withRouter } from "react-router";
import {Link, NavLink} from "react-router-dom";
import '../../styles/app_menu_nav.css';
import logo from '../../images/tracnova3.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function AppMenu({history, variables, logout}){
  const handleLogout = e => {
    e.preventDefault();

    logout();
    history.push('/');
  }

  return (
    <section className="modal app-menu-nav dropdown-menu">
      <section className="app-menu dropdown-menu">
        <ul>
          <li><Link to="/">
              <img src={logo} className="logo" alt="logo"/>
            </Link>
          </li>
          <li>
            <Link to='/meet-the-team'>Meet the Team</Link>
          </li>
          <li>
            <Link to='/tutorial'>Tutorial </Link>
          </li>
          <li>
            <p id='tutorial-arrow' className='hidden'><i><FontAwesomeIcon icon={faArrowLeft} /></i></p>
          </li>
        </ul>
        <ul>
          <li className="menu-item">
            <NavLink activeClassName="selected" to='/variables'>Factors</NavLink>
          </li>
            {/* <li className="menu-item">
              <NavLink activeClassName="selected" to="/correlations">Correlations</NavLink>
            </li> */}
          <li className="menu-item">
            <NavLink activeClassName="selected" to="#" onClick={handleLogout}>Logout</NavLink>
          </li>
        </ul>
      </section>
    </section>
  )
}

export default withRouter(AppMenu);