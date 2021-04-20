import React, {useState, useEffect} from 'react';
import {withRouter} from "react-router-dom";

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
    <div className="signup-form-container">
      <form onSubmit={e => handleSubmit(e)}>
        <div className="signup-form">
          <input type="text" value={_username} onChange={(e) => _setUsername(e.target.value)} placeholder="Username"/>
          <br/>
          <input type="text" value={_email} onChange={(e) => _setEmail(e.target.value)} placeholder="Email"/>
          <br/>
          <input type="password" value={_password} onChange={(e) => _setPassword(e.target.value)} placeholder="Password"/>
          <br/>
          <input type="password" value={_password2} onChange={(e) => _setPassword2(e.target.value)} placeholder="Confirm Password"/>
          <br/>
          <input type="submit" value="submit" />
          {renderErrors()}
        </div>
      </form>
    </div>
  )
}

export default withRouter(SignupForm);