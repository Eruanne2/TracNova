import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom'
import logo from "../../images/public/logo512.png"
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
      history.push('/correlations');
  }, [currentUser]);

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
        <Link to="#">OK</Link>
      </section>
    )
  };

  return (
    <section className="session login">
      <figure className="logo-wrapper">
        <img src={logo} className="logo" alt="TracNova icon"/>
      </figure>
      <form onSubmit={handleSubmit}>
        <input className="session-input" 
          type="text" placeholder="Enter email" value={_email}
          onChange={e => _setEmail(e.target.value)}
        />
        <input className="session-input" 
          type="password" placeholder="Enter password" value={_password}
          onChange={e => _setPassword(e.target.value)}
        />
        <input className="button session button" type="submit" value="Log in"/>
      </form>

      {renderErrors()}
      
      <section className='redirect-text'>
        Don't have an account? 
        <Link className="session redirect-link" to="/signup">Sign up</Link>
      </section>
    </section>
  );
}

export default withRouter(LoginForm);