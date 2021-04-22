import React, { useState, useRef, useEffect } from "react";

import Log from "./log";

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

export default function VariablePage({
  variable = MOCK_DATA // {}
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
  const [_dailylogs, _setDailylogs] = useState(variable.dailylogs || {});
  const [_range, _setRange] = useState({min: 0, max: 1});
  const [_edit, _setEdit] = useState();
  
  useEffect(() => {
    const valArr = Object.values(_dailylogs || {});

    _setRange({
      min: Math.min(...valArr),
      max: Math.max(...valArr)
    })
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({name: _name, unit: _unit, dailylogs: _dailylogs});
  }

  const handleChangeLogCreator = date => ({date: newDate, value}) => {
    const logs = {...(_dailylogs || {})};

    if (date !== newDate && logs[newDate] !== undefined)
      if (!window.confirm(
        `You are about to overwrite a previous log on ${newDate}.\nCurrent value: ${logs[newDate]}\nNew value: ${value}\nAre you sure?`
      )) return false;

    delete logs[date];
    logs[newDate] = Math.max(value, 0);

    const valArr = Object.values(logs);

    _setRange({ min: Math.min(...valArr), max: Math.max(...valArr) });
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
    _setEdit(undefined);
  }

  return (
    <section className="page variable">
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

        <section className="logs-wrapper">
          <ul className="logs">
            { Object.entries(_dailylogs)
                .sort((a, b) => new Date(a[0]) - new Date(b[0]))
                .map(([date, count]) => (
                  <Log key={date} 
                    {...{date, count}}
                    editMode={_edit === date}
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
        </section>

        <input type="submit" value="Save habit data!"/>
      </form>
    </section>
  )
}