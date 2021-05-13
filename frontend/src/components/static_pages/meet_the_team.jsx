import React from 'react';
import githubLogo from '../../images/github-logo.png';
import linkedinLogo from '../../images/linked-in-logo.png';
import charisGinn from '../../images/charis-ginn.jpg';
import chrisHong from '../../images/chris-hong.jpg';
import wenchongLai from '../../images/wenchong-lai.jpg';
import justinCheasty from '../../images/justin-cheasty.jpeg';
import '../../styles/meet_the_team.css';
import {Link} from 'react-router-dom';
import logo from '../../images/tracnova3.png';

export default function MeetTheTeam() {
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

      <div className='meet-the-team'>
        <h1>The TracNova Team</h1>
        <ul>
          <li>
            <img src={charisGinn} className="member-photo" alt="Charis Ginn, Team Lead" height="200"/>
            <h2>Charis Ginn</h2>
            <h3>Team Lead</h3>
            <div>
              <a href="https://github.com/Eruanne2" target="_blank"><img src={githubLogo} className="social-logo" alt="Github Logo" height="60"/></a>
              <a href="www.linkedin.com/in/charis-ginn-9abb93173" target="_blank"><img src={linkedinLogo} className="social-logo" alt="LinkedIn Logo" height="61"/></a>
            </div>
          </li>

          <li>
            <img src={chrisHong} className="member-photo" alt="Chris Hong, Backend Lead" height="200"/>
            <h2>Chris Hong</h2>
            <h3>Backend Lead</h3>
            <div>
              <a href="https://github.com/hongchris96" target="_blank"><img src={githubLogo} className="social-logo" alt="Github Logo" height="60"/></a>
              <a href="https://www.linkedin.com/in/chen-wei-christopher-hong-4b189162/" target="_blank" target="_blank"><img src={linkedinLogo} className="social-logo" alt="LinkedIn Logo" height="61"/></a>
            </div>
          </li>

          <li>
            <img src={wenchongLai} className="member-photo" alt="Wenchong Lai, Frontend Lead" height="200"/>
            <h2>Wenchong Lai</h2>
            <h3>Frontend Lead</h3>
            <div>
              <a href="https://github.com/wenchonglai" target="_blank"><img src={githubLogo} className="social-logo" alt="Github Logo" height="60"/></a>
              <a href="https://www.linkedin.com/in/wenchong-lai-4296424b/" target="_blank"><img src={linkedinLogo} className="social-logo" alt="LinkedIn Logo" height="61"/></a>
            </div>
          </li>

          <li>
            <img src={justinCheasty} className="member-photo" alt="Justin Cheasty, Design Lead" height="200"/>
            <h2>Justin Cheasty</h2>
            <h3>Design Lead</h3>
            <div>
              <a href="https://github.com/justinnnnnnnn" target="_blank"><img src={githubLogo} className="social-logo" alt="Github Logo" height="60"/></a>
              <a href="https://www.linkedin.com/in/justin-cheasty-2a521a14/" target="_blank"><img src={linkedinLogo} className="social-logo" alt="LinkedIn Logo" height="61"/></a>
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
};