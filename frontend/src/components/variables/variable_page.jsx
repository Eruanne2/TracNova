import { faCalendarPlus } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from "react";
import { dateToMDY } from "../../util/converters";
import IconButton from "../util/icon_button";
import '../../styles/var_page.css';
import Chart from '../charts/chart';
import Log from "./log";
import AddEntryFormContainer from "../util/add_entry_form_container";
import { SYMBOL_BOOLEAN, SYMBOL_RATING } from '../../util/symbols';

const nullVariable = {};

export default function VariablePage({
  history,
  variable = nullVariable,
  currentUser, 
  createVariable, updateVariable
}){
  if (variable.unit && typeof variable.unit === 'string'){
    if (["boolean", "binary"].includes(variable.unit.toLowerCase()))
      variable.unit = SYMBOL_BOOLEAN
    else if (variable.unit.toLowerCase() === 'rating')
      variable.unit = SYMBOL_RATING
  }

  const [_name, _setName] = useState(variable.name || '');
  const [_selectedVar, _setSelectedVar] = useState('');
  const [_id, _setId] = useState(variable.id || '');
  const [_unit, _setUnit] = useState(variable.unit || SYMBOL_BOOLEAN);
  const [_formError, _setFormError] = useState('');
  const [_changed, _setChanged] = useState(false);
  
  const [_metricUnit, _setMetricUnit] = useState(
    (variable.unit && typeof variable.unit !== 'symbol') ?
      variable.unit : ''
  );
  const [_dailylogs, _setDailylogs] = useState(Object.assign({}, variable.dailylogs || {}));
  const [_range, _setRange] = useState();
  const [_edit, _setEdit] = useState();
  const [_toggleForm, _setToggleForm] = useState(false);
  const [_dateMapping, _setDateMapping] = useState({});

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
    _setUnit(variable.unit || SYMBOL_BOOLEAN);
    _setDailylogs(Object.assign({}, variable.dailylogs || {}));
    _setFormError('')
    _setChanged(false);
  }, [variable]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const varData = {
      user: currentUser.id,
      name: _name, 
      unit: _unit === SYMBOL_BOOLEAN ? 'boolean' : 
        (_unit === SYMBOL_RATING ? 'rating' : _unit), 
      dailylogs: _dailylogs
    };

    _setChanged(false);
    
    if (JSON.stringify(varData.dailylogs) === '{}') {
      _setFormError('Please add at least one record for this variable.');
      return;
    }

    if (varData.name === '') {
      _setFormError('Please enter a factor name.');
      return;
    }
    
    if (variable._id)
      updateVariable({...varData, _id: variable._id})
    else
      createVariable(varData).then(res => history.push(`/variables/${res.variable._id}`));

    _setFormError('')
  }

  const handleChangeLogCreator = date => ({date: newDate, value}) => {
    const logs = {...(_dailylogs || {})};

    if (date !== newDate && logs[newDate] !== undefined)
      if (!window.confirm(
        `You are about to overwrite a previous log on ${newDate}.\nCurrent value: ${logs[newDate]}\nNew value: ${value}\nAre you sure?`
      )) return false;

    if (newDate !== date){
      // console.log(_dateMapping)
      let origDate = Object.values(_dateMapping)[0];
      _setDateMapping({[newDate]: origDate || date});
    }

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
    if (Object.keys(logs).length > 1) {
        delete logs[date];
      _setDailylogs(logs);
    } else {
      _setFormError("Factor must have at least one date record.");
    }
  }

  const handleLogEditModeCreator = date => () => {
    _setEdit(date);
  }
  
  const handleLogFinishEdit = () => {
    // newEntryRef.current = undefined;
    
    if (_dailylogs[undefined] !== undefined) 
    alert('All records must be properly dated.');
    else {
      _setDateMapping({});
      _setEdit(undefined)
    }

    _setChanged(true);
  }
  
  const handleCreateLog = () => {
    const today = dateToMDY(new Date());
    const date = _dailylogs[today] === undefined ? today : undefined;
    _setDateMapping({[date]: '1/1/1900'});
    _setDailylogs({..._dailylogs, [date]: 0});
    _setEdit(date);
  }

  return (
    <section className="page variable">
      <section className='toggle-entry-form'>
        <button onClick={e => _setToggleForm(!_toggleForm)} >Add Today's Entry</button>
        {_toggleForm && <AddEntryFormContainer defaultVar={variable || null} parentSetToggle={_setToggleForm.bind(this)}/>}
      </section>
      {!!variable._id &&
        <section className='var-graph-holder'>
          <Chart variables={[variable]}/>
        </section>
      }

      <form onSubmit={handleSubmit}>
        {!!variable._id ?
         <h1>"{_name}" History</h1>
         : 
         <div>
          <input className="input variable-input variable-name"
            type="text" value={_name} placeholder="Enter factor name"
            onChange={e => _setName(e.currentTarget.value)}
          />
            Select data type:
            <label>
              <input className="input variable-input variable-unit"
                type="radio" name="unit" value="boolean"
                checked={_unit === SYMBOL_BOOLEAN}
                onChange={e => _setUnit(SYMBOL_BOOLEAN)}
              />
              Yes/No
            </label>
            <label>
              <input className="input variable-input variable-unit"
                type="radio" name="unit" value="rating"
                checked={_unit === SYMBOL_RATING}
                onChange={e => _setUnit(SYMBOL_RATING)}
              />
              Rating
            </label>
            <label>
              <input className="input variable-input variable-unit"
                type="radio" name="unit" value={"metric"} 
                checked={typeof _unit !== 'symbol'}
                onChange={e => _setUnit(_metricUnit)}
              />
              Metric (please specify unit)
            </label>
            
            { typeof _unit === "symbol" ? null :
              <input className="input variable-input variable-unit"
                value={_metricUnit}
                onChange={e => {
                  _setMetricUnit(e.target.value);
                  _setUnit(e.target.value);
                }}
              />
            }
          </div>
        }

        <section className="logs-wrapper react-logs-wrapper">
        <p className="delete_err hidden">Factor must have at least one date record.</p>
            {allResolved ? 
              <IconButton icon={faCalendarPlus} onClick={e => handleCreateLog()}>
                &nbsp; Add a record
              </IconButton> : null
            }
          <ul className="logs react-logs">
            { Object.entries(_dailylogs)
                .sort((a, b) => 
                (new Date(_dateMapping[a[0]] || a[0] ).getTime() || 0) - 
                (new Date(_dateMapping[b[0]] || b[0] ).getTime() || 0)
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
          <p className="delete_err hidden">Factor must have at least one date record.</p>
          
        </section>

        <span>{_formError}</span>
        <input type="submit" className="submit" value="Save factor data!"/>
      </form>
    </section>
  )
}