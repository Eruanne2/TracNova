import React from 'react';
import doge from '../../images/doge404.png'
import '../../styles/page404.css';

export default function Splash() {
  return(
    <div className="page-404">
      <h1>404</h1>
      <p>Wow! Such Lost in Space ~~</p>
      <img src={doge} alt="doge"/>
    </div>
  )
};