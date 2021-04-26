import React from 'react';
import githubLogo from '../../images/github-logo.png';
import linkedinLogo from '../../images/linked-in-logo.png';

export default function MeetTheTeam() {
  return(
    <div>
      <h1>The TracNova Team</h1>
      <ul>
        <li>
          {/* <img src={github-logo} className="member-photo" alt="Charis Ginn, Team Lead"/> */}
          <h2>Charis Ginn</h2>
          <h3>Team Lead</h3>
          <img src={githubLogo} className="social-logo" alt="Github Logo" height="60"/>
          <img src={linkedinLogo} className="social-logo" alt="LinkedIn Logo" height="61"/>
        </li>

        <li>
          <img/>
          <h2>Chris Hong</h2>
          <h3>Backend Lead</h3>
          <img src={githubLogo} className="social-logo" alt="Github Logo" height="60"/>
          <img src={linkedinLogo} className="social-logo" alt="LinkedIn Logo" height="61"/>
        </li>

        <li>
          <img/>
          <h2>Wenchong Lai</h2>
          <h3>Frontend Lead</h3>
          <img src={githubLogo} className="social-logo" alt="Github Logo" height="60"/>
          <img src={linkedinLogo} className="social-logo" alt="LinkedIn Logo" height="61"/>
        </li>

        <li>
          <img/>
          <h2>Justin Cheasty</h2>
          <h3>Graphics Lead</h3>
          <img src={githubLogo} className="social-logo" alt="Github Logo" height="60"/>
          <img src={linkedinLogo} className="social-logo" alt="LinkedIn Logo" height="61"/>
        </li>
      </ul>
    </div>
  )
};