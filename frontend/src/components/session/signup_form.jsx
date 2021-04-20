import React, {useState, useEffect} from 'react';
import {withRouter} from "react-router-dom";
import {Link} from "react-router-dom";

import logo from "../../images/public/logo512.png"

import '../../styles/session.css'

function SignupForm({signedIn, signup, errors, history}){
  const [_username, _setUsername] = useState('');
  const [_email, _setEmail] = useState('');
  const [_password, _setPassword] = useState('');
  const [_password2, _setPassword2] = useState('');
  const [_errors, _setErrors] = useState({});
  
  useEffect(() => {
    if (signedIn)
      history.push('/login');
  }, [signedIn]);

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

  function renderErrors(){
    return (
      <ul>
        { Object.keys(_errors).map((key, i) => (
            <li key={`error-${i}`}>
              {_errors[key]}
            </li>
          ))
        }
      </ul>
    )
  }

  return (
    <section className="session signin">
      <figure className="logo-wrapper">
        <img src={logo} className="logo" alt="TracNova icon"/>
      </figure>

      <form onSubmit={e => handleSubmit(e)}>
        <div className="signup-form">
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
          <input className="button session button" type="submit" value="submit" />
        </div>
      </form>

      {renderErrors()}

      <section className='redirect-text'>
        Already have an account?
        <Link className="session redirect-link" to="/login">Log in</Link>
      </section>
    </section>
  )
}

export default withRouter(SignupForm);