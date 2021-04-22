import React, { useState, useEffect } from 'react';
import * as StatUtil from '../../util/stat_util';
// import NewEntryForm from 'wherever';

function Dashboard({variables}){
  const [_toggleForm, _setToggleForm] = useState(false);
  const [_currentVar1, _setCurrentVar1] = useState('');
  const [_currentVar2, _setCurrentVar2] = useState('');

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

  window.StatUtil = StatUtil;
  if (!!_currentVar1 && !!_currentVar2) debugger //console.log(StatUtil.numDataPoints(_currentVar1, _currentVar2));
  // debugger
  return(
    <div>
      <aside>
        <h1>Your Habits: </h1>
        <ul className='variables-list'>
          {Object.values(variables).map((variable, idx) => (
            <li 
              key={idx} 
              className={_completed(variable) ? 'complete' : 'incomplete'}
              onClick={handleLiClick(variable)}
            >
              {variable.name}
            </li>
          ))}
        </ul>
      </aside>
      <main>
        <section className='toggle-entry-form'>
          <button onClick={e => _setToggleForm(!_toggleForm)} >Add Today's Entry</button>
          {_toggleForm && <div>Dummy entry form</div>}
          {/*_toggleForm && <NewEntryForm/>*/}
        </section>
        <section className='correlation-preview'>

          <h1>Habit 1: {_currentVar1.name} and Habit 2: {_currentVar2.name}</h1>
          {!!_currentVar2 && <h2>Correlation Coefficient: {StatUtil.getCorrelationCoefficient(_currentVar1, _currentVar2)}</h2>}
          
          {!!_currentVar2 && 
            <h3>
              You have {StatUtil.numDataPoints(_currentVar1, _currentVar2)} X entries for this correlation.
              { ({} < 7) && <p>We need at least 7 day's worth of data to be able to look for a correlation.</p> }
              { ({} > 7 && {} < 14) && <p><span>Warning: we don't have much data yet, so this could be misleading.</span>For better accuracy, log these two habits daily for at least two weeks.</p>}
              { ({} > 13 && {} < 30) && <p>Nice! You've logged these two habits for at least two weeks. It's still a pretty small sample - for even better results, try to log these habits daily for a whole month.</p>}
              { ({} > 30) && <p>Wow! With such consistent logging, we can be pretty certain that your results are accurate.</p>}
            </h3>
          }
          graph goes here
          {/* make a graph using currentVar1 and currentVar2 */}
        </section>
      </main>
    </div>
  )
};

export default Dashboard;