import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import brand from "../../images/public/logo512.png"
import logo from '../../images/logo-black.png'
import '../../styles/session.css'

function LoginForm({
  history,
  currentUser, errors,
  login, clearSessionErrors
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

  const handleClose = (e) => {
    e.preventDefault();
    clearSessionErrors();
  }

  const demoLogin = (e) => {
    e.preventDefault();
    login({email: 'demo@example.com', password: 'password'});
  }

  const renderErrors = () => {
    return (
      <div>
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
          <Link to="#" className="close-modal" onClick={handleClose}>{`\u2715`}</Link>
        </section>
        <div className="modal-background"></div>

      </div>
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
            <Link to="/meet-the-team">Meet the Team</Link>
          </figure>
          
          <section className="login-section">
            <div className="login-form">
              <div className="login-form-head">
                <h1>Welcome Back User</h1>
                <p>Dive In</p>
              </div>
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
              <div className="demo-user">
                <p>-------- Or --------</p>
                <p className="demo-user-button" onClick={demoLogin}>Login with Demo User</p>
              </div>
            </div>
            <div className="go-to-signup">
              Don't have an account?
              <Link className="session redirect-link" to="/signup">
                Sign Up
              </Link>
            </div>


          </section>

          {errorKeys.length ? renderErrors() : null}

        </section>
        
      </section>
    </section>
  );
}

export default withRouter(LoginForm);