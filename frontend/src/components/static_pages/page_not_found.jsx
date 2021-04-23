import React from 'react';
import doge from '../../images/doge404.png'
import '../../styles/page404.css';
import {Link} from 'react-router-dom';

export default function Splash() {
  return(
    <div className="page-404">
      <h1>404</h1>
      <p>Wow! Such Lost in Space ~~</p>
      <Link to="/login" className="go-back">Please take me home!</Link>
      <img src={doge} alt="doge"/>
    </div>
  )
};