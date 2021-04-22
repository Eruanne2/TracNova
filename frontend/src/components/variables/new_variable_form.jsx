import React from 'react';

export default function NewVariableForm({nameState, typeState, unitState}){
  const [_name, _setName] = nameState;
  const [_type, _setType] = typeState;
  const [_unit, _setUnit] = unitState;

  return (
    <>
      <input className="variable input"
        type="text" value={_name} placeholder="Name of the variable"
        onChange={e => _setName(e.currentTarget.value)}
      />
      <select className="variable input select"
        value={_type}
        onChange={e => _setType(e.currentTarget.value)}
      >
        <option value="boolean">Boolean</option>
        <option value="metric">Metric</option>
      </select>
      { _type === 'boolean' ? null :
        <input className="variable input"
          type="text" value={_unit} placeholder="Unit"
          onChange={e => _setUnit(e.currentTarget.value)}
        />
      }
    </>
  )
}