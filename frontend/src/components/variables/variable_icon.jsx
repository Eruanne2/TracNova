import { faChartLine, faStar, faYinYang } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import React from 'react';

export default function VariableIcon({variable, onDragStart, handleClick, draggable}){
  const {name} = variable;
  let abbreviation;
  const match = name.match(/^(\s+)?(\w+\s+)+(\w+)?/g);

  if (match)
    abbreviation = name.split(/[\ \t\n]/).slice(0, 2).map(x => x[0].toUpperCase()).join('')
  else
    abbreviation = name.substring(0, 2);

  return (
    <div className='react-variable-icon icon-wrapper variable' 
      onClick={handleClick} onDragStart={onDragStart} draggable={draggable}
    >
      <div className='icon'>
        <FontAwesomeIcon icon={
          variable.unit === 'binary' ? faYinYang :
            variable.unit === 'rating' ? faStar : faChartLine
        }/>
      </div>
      <div className='name'>
        {name}
      </div>
    </div>
  )
}