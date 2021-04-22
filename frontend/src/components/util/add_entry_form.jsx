import React, { useState, useEffect } from 'react';

export default function AddEntryForm({updateVariable, variables, defaultVar}) {
  const [_variable, _setVariable] = useState(defaultVar || undefined);
  
  useEffect(() => {
    if (!!defaultVar) _setVariable(defaultVar)
  }, [defaultVar]);
  
  const handleSubmit = e => {
    e.preventDefault();
    updateVariable(_variable)
  };

  const submitYesterday = e => {
    e.preventDefault();
    let newVar = Object.assign({}, _variable);
    newVar[getToday()] = _variable[getYesterday()];
    updateVariable(newVar);
  };

  const getYesterday = () => {
    let date = new Date();
    let dateString = ('0' + (date.getMonth() + 1)).slice(-2) + '/' + ('0' + (date.getDate() - 1)).slice(-2) + '/' + date.getFullYear();
    return dateString;
  };

  const getToday = () => {
    let date = new Date();
    let dateString = ('0' + (date.getMonth() + 1)).slice(-2) + '/' + ('0' + date.getDate()).slice(-2) + '/' + date.getFullYear();
    return dateString;
  }

  const getCustomInput = variable => {
    if (!variable) return null;
    switch(variable.unit){
      case 'binary':
        return <div>
          <button>Yes</button>
          <button>No</button>
        </div>
      case 'rating':
        return <div>
          <button>😡</button>
          <button>😞</button>
          <button>😐</button>
          <button>😊</button>
          <button>😁</button>
        </div>
      default:
        return <div>
          <input type='text'/><p>{variable.unit}</p>
        </div>
    }
  };

  console.log('variables', variables);
  return(
    <div className='entry-form-div'>
      {!!defaultVar ? <h1>Update {defaultVar.name}</h1> : <h1>Log a Habit</h1>}
      <form>
        {!defaultVar &&
          <select value={_variable} onChange={e => _setVariable(e.currentTarget.value)}>
            <option value={0}>Select Habit</option>
            {variables && Object.values(variables).map((variable, idx) => (
              <option value={variable} key={idx}>{variable.name}</option>
            ))}
          </select>
        }
        {(!!_variable && !!_variable.dailylogs[getYesterday()]) && <button onClick={submitYesterday}>Repeat yesterday's Entry</button>}
        {getCustomInput(_variable)}
        <input type='submit' onClick={handleSubmit} value='Add Entry' />
      </form>
    </div>
  )
};