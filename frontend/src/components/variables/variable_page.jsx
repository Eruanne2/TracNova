import { faCalendarPlus } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useRef, useEffect } from "react";
import { createVariable } from "../../actions/variables_actions";
import { dateToMDY } from "../../util/converters";
import IconButton from "../util/icon_button";
import '../../styles/var_page.css';

import VariablesIndexContainer from './variables_index_container';

import Log from "./log";
import AddEntryFormContainer from "../util/add_entry_form_container";

const MOCK_DATA = {
  user: 'userId',
  name: 'code written',
  unit: 'boolean',
  dailylogs: {
    '04/01/2021': 35,
    '04/02/2021': 0,
    '04/03/2021': 13
  }
};

const nullVariable = {};

export default function VariablePage({
  variable = nullVariable,
  currentUser, 
  createVariable, updateVariable, addVariableEntry
}){
  const symbolBooleanRef = useRef(Symbol('Boolean'));
  

  if (variable.unit && typeof variable.unit === 'string' &&
      variable.unit.toLowerCase() === 'boolean')
    variable.unit = symbolBooleanRef.current;

  const [_name, _setName] = useState(variable.name || '');
  const [_unit, _setUnit] = useState(variable.unit || symbolBooleanRef.current);
  const [_metricUnit, _setMetricUnit] = useState(
    (variable.unit && variable.unit !== symbolBooleanRef.current) ?
      variable.unit : ''
  );
  const [_dailylogs, _setDailylogs] = useState(Object.assign({}, variable.dailylogs || {}));
  const [_range, _setRange] = useState();
  const [_edit, _setEdit] = useState();
  const [_toggleForm, _setToggleForm] = useState(false);


  const allResolved = _dailylogs[_edit] === undefined
  
  const setRange = () => {
    const valArr = Object.values(_dailylogs || {});

    if (valArr.length === 0) return;

    let min = Math.min(...valArr), max = Math.max(...valArr);
    
    if ( max - min < 10 ){
      min = Math.max(0, min - ((10 - max + min) >> 1));
      max = min + 10;
    }

    _setRange({ min, max });
  }

  useEffect(() => {
    if (_range === undefined) setRange();
  }, [_dailylogs]);

  useEffect(() => {
    _setName(variable.name || '');
    _setUnit(variable.unit || symbolBooleanRef.current);
    _setDailylogs(Object.assign({}, variable.dailylogs || {}));
  }, [variable]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const varData = {
      user: currentUser.id,
      name: _name, 
      unit: typeof _unit === 'symbol' ? 'boolean' : _unit, 
      dailylogs: _dailylogs
    };
    
    if (variable._id)
      updateVariable({...varData, _id: variable._id})
    else
      createVariable(varData);
  }

  const handleChangeLogCreator = date => ({date: newDate, value}) => {
    const logs = {...(_dailylogs || {})};

    if (date !== newDate && logs[newDate] !== undefined)
      if (!window.confirm(
        `You are about to overwrite a previous log on ${newDate}.\nCurrent value: ${logs[newDate]}\nNew value: ${value}\nAre you sure?`
      )) return false;

    if (String(_edit) === date){
      _setEdit(newDate);
    }

    delete logs[date];
    logs[newDate] = Math.max(value, 0);

    setRange();
    _setDailylogs(logs)
  }
  
  const handleDeleteLogCreator = date => () => {
    const logs = {..._dailylogs};
    delete logs[date];
    _setDailylogs(logs);
  }

  const handleLogEditModeCreator = date => () => {
    _setEdit(date);
  }
  
  const handleLogFinishEdit = () => {
    // newEntryRef.current = undefined;
    
    if (_dailylogs[undefined] !== undefined) 
      alert('All records must be properly dated.');
    else {
      _setEdit(undefined)
    }
  }
  
  const handleCreateLog = () => {
    const today = dateToMDY(new Date());
    const date = _dailylogs[today] === undefined ? today : undefined;
    
    _setDailylogs({..._dailylogs, [date]: 0});
    _setEdit(date);
  }

  return (
    <section className="page variable">
        <section className='toggle-entry-form'>
          <button onClick={e => _setToggleForm(!_toggleForm)} >Add Today's Entry</button>
          {_toggleForm && <AddEntryFormContainer defaultVar={variable || null}/>}
        </section>
      <form onSubmit={handleSubmit}>
        <input className="input variable-input variable-name"
          type="text" value={_name} placeholder="Enter habit name"
          onChange={e => _setName(e.currentTarget.value)}
        />

        Select data type:
        <label>
          <input className="input variable-input variable-unit"
            type="radio" name="unit" value="boolean"
            checked={_unit === symbolBooleanRef.current}
            onChange={e => _setUnit(symbolBooleanRef.current)}
          />
          Yes/No
        </label>
        <label>
          <input className="input variable-input variable-unit"
            type="radio" name="unit" value={"metric"} 
            checked={_unit !== symbolBooleanRef.current}
            onChange={e => _setUnit(_metricUnit)}
          />
          Metric (please specify unit)
        </label>
        
        { _unit === symbolBooleanRef.current ? null :
          <input className="input variable-input variable-unit"
            value={_metricUnit}
            onChange={e => {
              _setMetricUnit(e.target.value);
              _setUnit(e.target.value);
            }}
          />
        }

        <section className="logs-wrapper react-logs-wrapper">
          <ul className="logs react-logs">
            { Object.entries(_dailylogs)
                .sort((a, b) => a[0] === String(_edit) ? 1 :
                  ( b[0] === String(_edit) ? -1 :
                    new Date(a[0]) - new Date(b[0])
                  )
                )
                .map(([date, count]) => (
                  <Log key={date} 
                    {...{date, count}}
                    editMode={String(_edit) == date}
                    unit={_unit}
                    range={_range}
                    handleChange={handleChangeLogCreator(date)}
                    handleDelete={handleDeleteLogCreator(date)}
                    handleEditMode={handleLogEditModeCreator(date)}
                    handleFinishEdit={handleLogFinishEdit}
                  />
                ))
            }
          </ul>
          {allResolved ? 
            <IconButton icon={faCalendarPlus} onClick={e => handleCreateLog()}>
              Add a record
            </IconButton> : null
          }
          
        </section>

        <input type="submit" value="Save habit data!"/>
      </form>
    </section>
  )
}