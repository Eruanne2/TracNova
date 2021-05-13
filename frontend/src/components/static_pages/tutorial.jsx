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
        <iframe width="672" height="378" src="https://www.youtube.com/embed/i8mSl03t-Gk?autoplay=1;rel=0" frameborder="0" allowfullscreen/>
      </div>
    </div>
  )
};