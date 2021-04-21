import React, { useState, useRef, useEffect } from "react";

import LogEditor from "./log_editor";

const DATA = {
  user: 'userId',
  name: 'code written',
  unit: 'boolean',
  dailylogs: {
    '04/01/2021': 35,
    '04/02/2021': 0,
    '04/03/2021': 13,
    '04/04/2021': 124,
    '04/05/2021': 283,
    '04/06/2021': 72,
    '04/07/2021': 82,
    '04/08/2021': 15,
    '04/09/2021': 113,
    '04/10/2021': 154,
    '04/11/2021': 102,
    '04/12/2021': 93,
    '04/14/2021': 37,
    '04/15/2021': 62,
    '04/16/2021': 152,
    '04/17/2021': 0,
    '04/18/2021': 25,
    '04/19/2021': 164,
    '04/19/2015': 164,
  }
};

export default function VariablePage({
  variable = DATA // {}
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

  const handleChangeLogCreator = date => val => {
    const logs = {...(_dailylogs || {}), [date]: Math.max(val, 0)};
    const valArr = Object.values(logs);

    _setRange({ min: Math.min(...valArr), max: Math.max(...valArr) });
    _setDailylogs(logs)
  }

  const handleDeleteLogCreator = date => () => {
    const logs = {..._dailylogs};
    delete logs[date];
    _setDailylogs(logs);
  }

  const handleEditLogCreator = date => () => {
    _setEdit(date);
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
          { _unit === symbolBooleanRef.current ? null :
            <input className="input variable-input variable-unit"
              value={_metricUnit}
              onChange={e => {
                _setMetricUnit(e.target.value);
                _setUnit(e.target.value);
              }}
            />
          }
        </label>

        <section className="logs-wrapper">
          <ul className="logs">
            { Object.entries(_dailylogs)
                .sort((a, b) => new Date(a[0]) - new Date(b[0]))
                .map(([date, count]) => (
                  <LogEditor key={date} 
                    {...{date, count}}
                    editMode={_edit === date}
                    unit={_unit}
                    range={_range}
                    handleChange={handleChangeLogCreator(date)}
                    handleDelete={handleDeleteLogCreator(date)}
                    handleEdit={handleEditLogCreator(date)}
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