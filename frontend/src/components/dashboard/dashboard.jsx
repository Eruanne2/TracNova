import React, { useState, useEffect } from 'react';
// import VariablesIndex from './variables/variables_index_container';

function Dashboard({variables}){
  const [_toggleForm, _setToggleForm] = useState(false);
  const [_currentVar1, _setCurrentVar1] = useState(variables[0]);
  const [_currentVar2, _setCurrentVar2] = useState('');
  
  const _completed = (variable) => {
    let date = new Date();
    let dateString = ('0' + (date.getMonth() + 1)).slice(-2) + '/' + ('0' + date.getDate()).slice(-2) + '/' + date.getFullYear();
    debugger
    console.log(dateString);
    console.log(variable.dailylogs);
    console.log(variable.dailylogs[dateString]);
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
          <button>Add Today's Entry</button>
          {/*<NewEntryForm/>*/}
        </section>
          {/* make a graph using currentVar1 and currentVar2 */}
      </main>
    </div>
  )
};

export default Dashboard;