import React, { useState, useEffect } from 'react';
// import VariablesIndex from './variables/variables_index_container';

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
          {/* make a graph using currentVar1 and currentVar2 */}
      </main>
    </div>
  )
};

export default Dashboard;