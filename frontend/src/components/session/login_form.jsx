import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import brand from "../../images/public/logo512.png"
import logo from '../../images/tracnova3.png'
import '../../styles/session.css'

function LoginForm({
  history,
  currentUser, errors,
  login,
}){
  const [_email, _setEmail] = useState('');
  const [_password, _setPassword] = useState('');
  const [_errors, _setErrors] = useState({});
  const errorKeys = Object.keys(_errors);

  useEffect(() => {
    if (currentUser === true)
      history.push('/');
  }, [currentUser, history]);

  useEffect(() => {
    _setErrors(errors);
  }, [errors])

  const handleSubmit = (e) => {
    e.preventDefault();
    login({email: _email, password: _password});
  }

  const renderErrors = () => {
    return (
      <section className="session lightbox error-message">
        <h4 className="error-title">Error</h4>
        <ul className="error-messages">
          { errorKeys.map((key, i) => (
              <li className="error-message" key={`error-${i}`}>
                <div className="error-text"></div>
                {_errors[key]}
              </li>
            ))
          }
        </ul>
      </section>
    )
  };

  return (
    <section className="session-background">
      <div style={{ backgroundImage: `(${process.env.PUBLIC_URL + 'images/stars.png'})` }} className="stars"/>
      <div style={{ backgroundImage: `(${process.env.PUBLIC_URL + 'images/twinkling.png'})` }} className="twinkling"/>
      <div style={{ backgroundImage: `(${process.env.PUBLIC_URL + 'images/clouds.png'})` }} className="clouds"/>
      
      <section className="session login">
        <section className="login-or-signup">
          
          <figure className="logo-wrapper">
            <img src={logo} className="logo" alt="TracNova icon"/>
          </figure>
          
          <section className="login-form">
            <form onSubmit={handleSubmit}>
              <input className="session-input" 
                type="text" placeholder="Enter email" value={_email}
                onChange={e => _setEmail(e.target.value)}
                />
                
              <input className="session-input" 
                type="password" placeholder="Enter password" value={_password}
                onChange={e => _setPassword(e.target.value)}
                />
              <input className="button session-button" type="submit" value="Log in"/>

            </form>
            <Link className="session redirect-link" to="/signup">
            <section className='redirect-text'>
              Sign up <br></br>New user 
              
            </section>
            </Link>
          </section>

          {renderErrors()}

        </section>
        <img className="brand" src={brand}/>
      </section>
    </section>
  );
}

export default withRouter(LoginForm);