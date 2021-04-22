import React, {useState, useEffect} from 'react';
import {withRouter} from "react-router-dom";
import {Link} from "react-router-dom";
import logo from '../../images/logo-black.png'
import brand from '../../images/TracNova.png'
import '../../styles/session.css'

function SignupForm({signup, errors, history, currentUser, clearSessionErrors}){
  const [_username, _setUsername] = useState('');
  const [_email, _setEmail] = useState('');
  const [_password, _setPassword] = useState('');
  const [_password2, _setPassword2] = useState('');
  const [_errors, _setErrors] = useState({});
  const errorKeys = Object.keys(_errors);
  
  useEffect(() => {
    if (currentUser === true)
      history.push('/');
  }, [currentUser, history]);

  useEffect(() => {
    _setErrors(errors);
  }, [errors]);

  function handleSubmit(e){
    e.preventDefault();

    signup({
      username: _username,
      email: _email,
      password: _password,
      password2: _password2
    }, history);
  } 

  const handleClose = (e) => {
    e.preventDefault();
    clearSessionErrors();
  }

  function renderErrors(){
    return (
      <div>
        <section className="session lightbox error-message">
          <h4 className="error-title">Error</h4>
          <ul className="error-messages">
            { errorKeys.map((key, i) => (
                <li key={`error-${i}`}>
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
  }

  return (
     <section className="session-background">
      <div style={{ backgroundImage: `(${process.env.PUBLIC_URL + 'images/stars.png'})` }} className="stars"/>
      <div style={{ backgroundImage: `(${process.env.PUBLIC_URL + 'images/twinkling.png'})` }} className="twinkling"/>
      <div style={{ backgroundImage: `(${process.env.PUBLIC_URL + 'images/clouds.png'})` }} className="clouds"/>
      
      <section className="session signin">
        <section className="login-or-signup">

          <figure className="logo-wrapper">
            <img src={logo} className="logo" alt="TracNova icon"/>
          </figure>
          <section className="login-section">
            <section className="login-form">
              <div className="login-form-head">
                <h1>Create an Account</h1>
                <p>Sign up to see your habits and their correlations</p>
              </div>
              <form onSubmit={e => handleSubmit(e)}>

                  <input className="session-input" 
                    type="text" value={_username} placeholder="Username"
                    onChange={(e) => _setUsername(e.target.value)} 
                    />
                  <input className="session-input" 
                    type="text" value={_email} placeholder="Email"
                    onChange={(e) => _setEmail(e.target.value)} 
                    />
                  <input className="session-input" 
                    type="password" value={_password} placeholder="Password"
                    onChange={(e) => _setPassword(e.target.value)} 
                    />
                  <input className="session-input" 
                    type="password" value={_password2} placeholder="Confirm Password"
                    onChange={(e) => _setPassword2(e.target.value)} 
                    />
                  <input className="button session-button" type="submit" value="Sign Up" />


              </form>
              <p className="signup-undernote">By signing up, you agree to our Terms , Data Policy and Cookies Policy </p>
            </section>
            <div className="go-to-signup">
              Have an account?
              <Link className="session redirect-link" to="/login">
                Log in
              </Link>
            </div>

          </section>

        {errorKeys.length ? renderErrors() : null}

        </section>
      </section>
    </section>
  )
}

export default withRouter(SignupForm);