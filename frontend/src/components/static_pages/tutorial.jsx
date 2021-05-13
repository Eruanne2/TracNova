import React from 'react';
import '../../styles/tutorial.css';
import {Link} from 'react-router-dom';
import logo from '../../images/tracnova3.png';

export default function Tutorial() {
  return(
    <div className="meet-za-team">
      <section className="modal app-menu-nav dropdown-menu">
        <section className="app-menu dropdown-menu">
          <ul>
            <li><Link to="/">
                <img src={logo} className="logo" alt="logo"/>
              </Link>
            </li>
          </ul>
          <ul>
            <li className="menu-item">
              <Link to="/login" className="go-back2">Home</Link>
            </li>
          </ul>
        </section>
      </section>

      <div className='tutorial-div'>
        <h1>User Tutorial</h1>
        <iframe width="672" height="378" src="https://www.youtube.com/embed/Vm-eAoNCHT0" frameBorder="0" allowFullScreen/>
      </div>
    </div>
  )
};