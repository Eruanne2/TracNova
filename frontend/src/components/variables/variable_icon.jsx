import React from 'react';

export default function VariableIcon({variable, handleClick}){
  const {name} = variable;
  let abbreviation;
  const match = name.match(/(\w[^\ ^\t^\n]+)/g);

  if (match && match.length > 1)
    abbreviation = name.split(/[\ \t\n]/).slice(0, 2).map(x => x[0]).join('')
  else
    abbreviation = name.substring(0, 2);

  return (
    <div className='icon-wrapper variable' onClick={handleClick}>
      <div className='icon'>
        {abbreviation}
      </div>
      <div className='name'>
        {name}
      </div>
    </div>
  )
}