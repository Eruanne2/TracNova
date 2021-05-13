import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import IconButton from "../util/icon_button"
import { faCheckCircle, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import '../../styles/entry_form.css';
import { dateToMDY } from '../../util/converters';
import { SYMBOL_BOOLEAN, SYMBOL_RATING } from '../../util/symbols';


export default function AddEntryForm({updateVariable, variables = {dailylogs: {}}, defaultVar, parentSetToggle}) {
  const [_variable, _setVariable] = useState(defaultVar);
  const [_todayVal, _setTodayVal] = useState(0);
  
  useEffect(() => {
    if (!!defaultVar) _setVariable(Object.assign({}, defaultVar));
  }, [defaultVar]);

  useEffect(() => {
    let allButtons = document.querySelectorAll(".select-button");
    allButtons.forEach(b => b.classList.remove("select-button"));
  }, [_variable]);
  
  const handleSubmit = e => {
    e.preventDefault();
    if (!_variable) return;
    let newVar = Object.assign({}, _variable);
    newVar.dailylogs[getToday()] = _todayVal;
    updateVariable(newVar);
    parentSetToggle(false);
  };

  const submitYesterday = e => {
    e.preventDefault();
    let newVar = Object.assign({}, _variable);
    newVar.dailylogs[getToday()] = _variable.dailylogs[getYesterday()];
    updateVariable(newVar);
  };

  const updateVal = e => {
    e.preventDefault();
    _setTodayVal(e.currentTarget.value);
    let selectedButton = e.currentTarget;
    let allButtons = document.querySelectorAll(".select-button");
    allButtons.forEach(b => b.classList.remove("select-button"));
    selectedButton.classList.add("select-button");
  };

  const getYesterday = () => 
    dateToMDY(new Date(new Date().getTime() - 86400000));

  const getToday = () => 
    dateToMDY(new Date());

  const getCustomInput = variable => {
    if (!variable) return null;
    switch(variable.unit){
      case SYMBOL_BOOLEAN:
      case 'binary':
        return <div>
          <div><button value={1} onClick={updateVal}>Yes</button></div>
          <div><button value={0} onClick={updateVal}>No</button></div>
        </div>
      case SYMBOL_RATING:
      case 'rating':
        return <div>
          <div><button value={1} onClick={updateVal}>😒</button></div>
          <div><button value={2} onClick={updateVal}>😕</button></div>
          <div><button value={3} onClick={updateVal}>🙂</button></div>
          <div><button value={4} onClick={updateVal}>😊</button></div>
          <div><button value={5} onClick={updateVal}>😁</button></div>
        </div>
     
      default:
        return <div>
          <IconButton className="button range-button" 
            onClick={e => _setTodayVal(_todayVal - 1)} title="decrease value" icon={faMinus}
          />
          <input className="input range react-log-input"
              type="range" value={_todayVal} step="1"
              min={Math.max(Math.min(...Object.values(variable.dailylogs)) - 10, 0)}
              max={Math.max(...Object.values(variable.dailylogs)) + 10}
              onChange={updateVal}
            />
          <IconButton className="button range-button" 
            onClick={e => _setTodayVal(parseFloat(_todayVal) + 1)} title="increase value" icon={faPlus}
          />
          <input className="input range react-log-input"
            type="text" value={_todayVal}
            onChange={updateVal}
          /><span> {variable.unit}</span>
        </div>
    }
  };

  return(
    <div className='entry-form-div'>
      {!!defaultVar ? <h1>Update {defaultVar.name}</h1> : <h1>Log a Factor</h1>}
      <form>
       

        {!defaultVar &&
          <select value={_variable ? _variable._id : 0} onChange={e => _setVariable(variables[e.currentTarget.value])}>
            <option value={0}>Select Factor</option>
            {variables && Object.values(variables).map(variable => (
              <option value={variable._id} key={variable._id}>{variable.name}</option>
              ))}
          </select>
        }
        {(!!_variable && !!_variable.dailylogs && !!_variable.dailylogs[getYesterday()]) && <button onClick={submitYesterday}>Repeat yesterday's Entry</button>}
        {!!_variable && getCustomInput(_variable)}
       
        <input type='submit' onClick={handleSubmit} value='Add Entry' />
      </form>
      <p>Need to add an entry for another day? <Link to='/variables'>Head over to the factors page.</Link></p>
    </div>
  )
};