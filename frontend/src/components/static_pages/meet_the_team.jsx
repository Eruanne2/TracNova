import React from 'react';
import githubLogo from '../../images/github-logo.png';
import linkedinLogo from '../../images/linked-in-logo.png';
import charisGinn from '../../images/charis-ginn.jpg';
import chrisHong from '../../images/chris-hong.jpg';
import wenchongLai from '../../images/wenchong-lai.jpg';
import justinCheasty from '../../images/justin-cheasty.jpeg';
import '../../styles/meet_the_team.css';

export default function MeetTheTeam() {
  return(
    <div className='meet-the-team'>
      <h1>The TracNova Team</h1>
      <ul>
        <li>
          <img src={charisGinn} className="member-photo" alt="Charis Ginn, Team Lead" height="200"/>
          <h2>Charis Ginn</h2>
          <h3>Team Lead</h3>
          <div>
            <a href="https://github.com/Eruanne2"><img src={githubLogo} className="social-logo" alt="Github Logo" height="60"/></a>
            <a href="www.linkedin.com/in/charis-ginn-9abb93173"><img src={linkedinLogo} className="social-logo" alt="LinkedIn Logo" height="61"/></a>
          </div>
        </li>

        <li>
          <img src={chrisHong} className="member-photo" alt="Chris Hong, Backend Lead" height="200"/>
          <h2>Chris Hong</h2>
          <h3>Backend Lead</h3>
          <div>
            <a href="https://github.com/hongchris96"><img src={githubLogo} className="social-logo" alt="Github Logo" height="60"/></a>
            <a href="https://www.linkedin.com/in/chen-wei-christopher-hong-4b189162/"><img src={linkedinLogo} className="social-logo" alt="LinkedIn Logo" height="61"/></a>
          </div>
        </li>

        <li>
          <img src={wenchongLai} className="member-photo" alt="Wenchong Lai, Frontend Lead" height="200"/>
          <h2>Wenchong Lai</h2>
          <h3>Frontend Lead</h3>
          <div>
            <a href="https://github.com/wenchonglai"><img src={githubLogo} className="social-logo" alt="Github Logo" height="60"/></a>
            <a href="https://www.linkedin.com/in/wenchong-lai-4296424b/"><img src={linkedinLogo} className="social-logo" alt="LinkedIn Logo" height="61"/></a>
          </div>
        </li>

        <li>
          <img src={justinCheasty} className="member-photo" alt="Justin Cheasty, Design Lead" height="200"/>
          <h2>Justin Cheasty</h2>
          <h3>Design Lead</h3>
          <div>
            <a href="https://github.com/justinnnnnnnn"><img src={githubLogo} className="social-logo" alt="Github Logo" height="60"/></a>
            <a href="https://www.linkedin.com/in/justin-cheasty-2a521a14/"><img src={linkedinLogo} className="social-logo" alt="LinkedIn Logo" height="61"/></a>
          </div>
        </li>
      </ul>
    </div>
  )
};