import React from 'react';
import '../../styles/splash.css'
// import strange_space from '../../images/strange_space.jpeg';
import logo from '../../images/logo-white.png'
import {Link} from 'react-router-dom';

export default function Splash() {
  return(
    <div className="splash-div"> 
      <div className="splash-inner-div">
        <img src={logo}/>
        <Link to="/login" className="go-back">LOG IN HERE</Link>
      </div>
    </div>
  )
};