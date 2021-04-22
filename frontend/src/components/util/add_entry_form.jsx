import React, { useState, useEffect } from 'react';
import IconButton from "../util/icon_button"
import { faCheckCircle, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";


export default function AddEntryForm({updateVariable, variables, defaultVar}) {
  const [_variable, _setVariable] = useState(defaultVar || undefined);
  const [_todayVal, _setTodayVal] = useState(0);
  
  useEffect(() => {
    if (!!defaultVar) _setVariable(Object.assign({}, defaultVar));
  }, [defaultVar]);
  
  const handleSubmit = e => {
    e.preventDefault();
    let newVar = Object.assign({}, _variable);
    newVar[getToday()] = _todayVal;
    updateVariable(newVar);
  };

  const submitYesterday = e => {
    e.preventDefault();
    let newVar = Object.assign({}, _variable);
    newVar[getToday()] = _variable[getYesterday()];
    updateVariable(newVar);
  };

  const updateVal = e => {
    e.preventDefault();
    _setTodayVal(e.currentTarget.value);
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
          <button value={0} onClick={updateVal}>Yes</button>
          <button value={0} onClick={updateVal}>No</button>
        </div>
      case 'rating':
        return <div>
          <button value={1} onClick={updateVal}>😞</button>
          <button value={2} onClick={updateVal}>😐</button>
          <button value={3} onClick={updateVal}>😊</button>
          <button value={4} onClick={updateVal}>😡</button>
          <button value={5} onClick={updateVal}>😁</button>
        </div>
      default:
        return <div>
          <IconButton className="button range-button" 
            onClick={e => _setTodayVal(_todayVal - 1)} title="decrease value" icon={faMinus}
          />
          <label>
          <input className="input range react-log-input"
              type="range" value={_todayVal} step="1"
              min={Object.values(variable.dailylogs).min - 10} max={Object.values(variable.dailylogs).min + 10}
              onChange={updateVal}
            />
          </label>
          <IconButton className="button range-button" 
            onClick={e => _setTodayVal(parseFloat(_todayVal) + 1)} title="increase value" icon={faPlus}
          />
          <input className="input range react-log-input"
            type="text" value={_todayVal}
            onChange={updateVal}
          />


        </div>
    }
  };

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