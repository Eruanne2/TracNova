import React, { useState, useEffect } from 'react';
// import VariablesIndex from './variables/variables_index_container';

function Dashboard({variables, correlations}){
  const [_toggleForm, _setToggleForm] = useState(false);
  const [_currentVar1, _setCurrentVar1] = useState(variables[0]);
  const [_currentVar2, _setCurrentVar2] = useState('');
  
  return(
    <div>
      <aside>
        <h1>Your Habits: </h1>
        {/*<VariablesIndex/>*/}
      </aside>
      <main>
        <section className='toggle-entry-form'>
          {/*<NewEntryForm/>*/}
        </section>
        {/*<CorrelationShow/>*/}
      </main>
    </div>
  )
};

export default Dashboard;