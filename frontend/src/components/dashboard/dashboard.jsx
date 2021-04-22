import React, { useState, useEffect } from 'react';
// import NewEntryForm from 'wherever';

function Dashboard({variables}){
  const [_toggleForm, _setToggleForm] = useState(false);
  const [_currentVar1, _setCurrentVar1] = useState(variables[0]);
  const [_currentVar2, _setCurrentVar2] = useState('');
  
  const _completed = (variable) => {
    let date = new Date();
    let dateString = ('0' + (date.getMonth() + 1)).slice(-2) + '/' + ('0' + date.getDate()).slice(-2) + '/' + date.getFullYear();
    return (!!variable.dailylogs[dateString]);
  };


  return(
    <div>
      <aside>
        <h1>Your Habits: </h1>
        <ul className='variables-list'>
          {Object.values(variables).map((variable, idx) => {
            return <li key={idx} className={_completed(variable) ? 'complete' : 'incomplete'}>{variable.name}</li>;
          })}
        </ul>
      </aside>
      <main>
        <section className='toggle-entry-form'>
          <button onClick={e => _setToggleForm(!_toggleForm)} >Add Today's Entry</button>
          {_toggleForm && <div>Dummy entry form</div>}
          {/*_toggleForm && <NewEntryForm/>*/}
        </section>
        <section className='correlation-preview'>

          <h1>Var1 and Var2</h1>
          <h2>Correlation Coefficient: {}</h2>
          <h3>
            You have {} entries for this correlation.
            { ({} < 14) && <p><span>Warning: we don't have much data yet, so this could be misleading.</span>For better accuracy, log these two habits daily for at least two weeks.</p>}
            { ({} > 13 && {} < 30) && <p>Nice! You've logged these two habits for at least two weeks. It's still a pretty small sample - for even better results, try to log these habits daily for a whole month.</p>}
            { ({} > 30) && <p>Wow! With such consistent logging, we can be pretty certain that your results are accurate.</p>}
          </h3>
          {/* make a graph using currentVar1 and currentVar2 */}
        </section>
      </main>
    </div>
  )
};

export default Dashboard;