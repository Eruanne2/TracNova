import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom'

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
      <figure className="logo-container">
        <img className="logo" alt="TracNova icon"/>
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
        <input type="submit" value="Log in"/>
      </form>

      {renderErrors()}

    </section>
  );
}

export default withRouter(LoginForm);