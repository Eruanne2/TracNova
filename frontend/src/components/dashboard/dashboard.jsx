import React, { useState, useEffect } from 'react';
import * as StatUtil from '../../util/stat_util';
import VariableIcon from '../variables/variable_icon';
import AddEntryFormContainer from '../util/add_entry_form_container';
import "../../styles/dashboard.css";

export default function Dashboard({variables}){
  const [_toggleForm, _setToggleForm] = useState(false);
  const [_currentVar1, _setCurrentVar1] = useState('');
  const [_currentVar2, _setCurrentVar2] = useState('');
  const [_coefficient, _setCoefficient] = useState(0);

  useEffect(() => {
    if (
      !!_currentVar1 
      && !!_currentVar2 
      && _currentVar1 !== _currentVar2
      && StatUtil.numDataPoints(_currentVar1, _currentVar2) > 6
      ) _setCoefficient(StatUtil.getCorrelationCoefficient(_currentVar1, _currentVar2))
  }, [_currentVar2]);

  useEffect(() => {
    _setCurrentVar1(Object.values(variables)[0] || '')
  }, [variables]);
  
  const _completed = (variable) => {
    let date = new Date();
    let dateString = ('0' + (date.getMonth() + 1)).slice(-2) + '/' + ('0' + date.getDate()).slice(-2) + '/' + date.getFullYear();
    return (!!variable.dailylogs[dateString]);
  };

  const handleLiClick = (variable) => {
    return e => {
      if (!!_currentVar2) _setCurrentVar1(_currentVar2);
      _setCurrentVar2(variable);
    }
  }

  let numPoints = 0;
  if (!!_currentVar1 && !!_currentVar2) numPoints = StatUtil.numDataPoints(_currentVar1, _currentVar2);
  
  return(
    <div className="dashboard-div">
      <aside>
        <h1>Your Habits: </h1>
        <ul className='variables-list'>
          {Object.values(variables).map((variable, idx) => (
            <li 
              key={idx} 
              className={_completed(variable) ? 'complete' : 'incomplete'}
              onClick={handleLiClick(variable)}
            >
              <VariableIcon variable={variable}/>
            </li>
          ))}
        </ul>
      </aside>
      <main>
        <section className='toggle-entry-form'>
          <button onClick={e => _setToggleForm(!_toggleForm)} className='incomplete'>Add Today's Entry</button>
          {_toggleForm && <AddEntryFormContainer defaultVar={_currentVar2 || null}/>}
        </section>
        <section className='correlation-preview'>
          <h1>Habit 1: {_currentVar1.name} and Habit 2: {_currentVar2.name}</h1>
          {(!!_currentVar2 && numPoints > 6) && <h2>Correlation Coefficient: {_coefficient}</h2>}
          
          {!!_currentVar2 && 
            <h3>
              You have {numPoints} {parseInt(numPoints) === 1 ? 'entry' : 'entries'} for this correlation.
              { (parseInt(numPoints) < 7) && <p>We need at least 7 day's worth of data to be able to look for a correlation.</p> }
              { (parseInt(numPoints) > 7 && parseInt(numPoints) < 14) && <p><span>Warning: we don't have much data yet, so this could be misleading.</span> For better accuracy, log these two habits daily for at least two weeks.</p>}
              { (parseInt(numPoints) > 13 && parseInt(numPoints) < 30) && <p>You've logged these two habits over two weeks. Nice! In statistics, it's still a pretty small sample - for even better results, try to log these habits daily for a whole month.</p>}
              { (parseInt(numPoints) > 30) && <p>Wow! With such consistent logging, we can be pretty certain that your results are accurate.</p>}
            </h3>
          }
          graph goes here
          {/* make a graph using currentVar1 and currentVar2 */}
        </section>
      </main>
    </div>
  )
};