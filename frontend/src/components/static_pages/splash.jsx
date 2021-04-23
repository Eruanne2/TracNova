import React from 'react';
import '../../styles/splash.css'
// import strange_space from '../../images/strange_space.jpeg';
import logo from '../../images/logo-black.png'
import {Link} from 'react-router-dom';

export default function Splash() {
  return(
    <div className="splash-div">
      <div style={{ backgroundImage: `(${process.env.PUBLIC_URL + 'images/stars.png'})` }} className="stars"/>
      <div style={{ backgroundImage: `(${process.env.PUBLIC_URL + 'images/twinkling.png'})` }} className="twinkling"/>
      <div style={{ backgroundImage: `(${process.env.PUBLIC_URL + 'images/clouds.png'})` }} className="clouds"/>
      
      <img src={logo}/>
      <Link to="/login" className="go-back">LOG IN HERE</Link>
    </div>
  )
};