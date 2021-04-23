import React, { useState, useEffect } from 'react';
import * as StatUtil from '../../util/stat_util';
import VariableIcon from '../variables/variable_icon';
import AddEntryFormContainer from '../util/add_entry_form_container';
import "../../styles/dashboard.css";
import Chart from '../charts/chart';
import ScatteredChart from '../charts/scattered_chart';

export default function Dashboard({variables}){
  const [_toggleForm, _setToggleForm] = useState(false);
  const [_selectedVar, _setSelectedVar] = useState('');
  const [_draggedVar, _setDraggedVar] = useState('');
  const [_coefficient, _setCoefficient] = useState(0);
  const [_whichTab, _setWhichTab] = useState(1);

  useEffect(() => {
    if (
      !!_selectedVar 
      && !!_draggedVar 
      && _selectedVar !== _draggedVar
      && StatUtil.numDataPoints(_selectedVar, _draggedVar) > 6
      ) _setCoefficient(StatUtil.getCorrelationCoefficient(_selectedVar, _draggedVar).toFixed(3))
  }, [_draggedVar]);

  useEffect(() => {
    _setSelectedVar(Object.values(variables)[0] || '')
  }, [variables]);
  
  const _completed = (variable) => {
    let date = new Date();
    let dateString = ('0' + (date.getMonth() + 1)).slice(-2) + '/' + ('0' + date.getDate()).slice(-2) + '/' + date.getFullYear();
    return (variable.dailylogs[dateString] !== undefined);
  };

  const handleLiClick = (variable) => {
    return e => {
      _setSelectedVar(variable);
      _setDraggedVar('');
    }
  }

  const getCorrelationStrength = r => {
    if (r <= -.9) return " very strong negative ";
    if (r <= -.7) return " strong negative ";
    if (r <= -.5) return " moderate negative ";
    if (r <= -.3) return " weak negative ";
    if (r <= -.1) return " very weak negative ";
    if (r < .1) return ""
    if (r < .3) return " very weak positive ";
    if (r < .5) return " weak positive ";
    if (r < .7) return " moderate positive ";
    if (r < .9) return " strong positive ";
    if (r <= 1) return " very strong positive ";
  }

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData('text/plain', id);
  };

  const handleReceiveDrop = e => {
    let id = e.dataTransfer.getData('text/plain');
    if (!(id === _selectedVar._id)) _setDraggedVar(variables[id]);
  };

  let numPoints = 0;
  if (!!_selectedVar && !!_draggedVar) numPoints = StatUtil.numDataPoints(_selectedVar, _draggedVar);
  
  return(
    <div className="dashboard-div">
      <aside>
        <h1>Your Habits: </h1>
        <ul className='variables-list'>
          {Object.values(variables).map((variable, idx) => (
            <li key={idx} onClick={handleLiClick(variable)}
                className={
                  `${_completed(variable) ? 'complete' : 'incomplete'} 
                  ${variable._id === _selectedVar._id && 'selected-var'}`
                }>
              <VariableIcon variable={variable} draggable={true} onDragStart={e => handleDragStart(e, variable._id)}/>
            </li>
          ))}
        </ul>
      </aside>
      <main>
        <section className='toggle-entry-form'>
          <button onClick={e => _setToggleForm(!_toggleForm)} >Add Today's Entry</button>
          {_toggleForm && <AddEntryFormContainer defaultVar={_draggedVar || null} parentSetToggle={_setToggleForm.bind(this)}/>}
        </section>
        <section className='correlation-preview'>
          {!!_draggedVar ? <h1>"{_selectedVar.name}" vs "{_draggedVar.name}"</h1> : <h1>{_selectedVar.name}</h1>}
          {(!!_draggedVar && numPoints > 6) && 
            <div className='correlation-info'>
              <h2>Correlation Coefficient: {_coefficient}</h2>
              <p>There is 
                {(_coefficient <= -.1 || _coefficient >= .1)  ? ' a ' : ''} 
                {getCorrelationStrength(_coefficient)} 
                correlation betwen {_selectedVar.name} and {_draggedVar.name}.
              </p>
            </div>
          }
          {!!_draggedVar && 
            <h3>
              You have {numPoints} {parseInt(numPoints) === 1 ? 'entry' : 'entries'} for this correlation.
              { (parseInt(numPoints) < 7) && <p>We need at least 7 day's worth of data to be able to look for a correlation.</p> }
              { (parseInt(numPoints) > 7 && parseInt(numPoints) < 14) && <p><span>Warning: we don't have much data yet, so this could be misleading.</span> For better accuracy, log these two habits daily for at least two weeks.</p>}
              { (parseInt(numPoints) > 13 && parseInt(numPoints) < 30) && <p>You've logged these two habits for over two weeks. Nice! In statistics, it's still a pretty small sample - for even better results, try to log these habits daily for a whole month.</p>}
              { (parseInt(numPoints) > 30) && <p>Wow! With such consistent logging, we can be pretty certain that your results are accurate.</p>}
            </h3>
          }

          <section className='droppable-graph-box'
                  onDragOver={e => e.preventDefault()}
                  onDrop={handleReceiveDrop}>
            <ul className='tab-headers'>
              <h2 onClick={e => _setWhichTab(1)} className={_whichTab === 1 ? 'selected-tab' : ''}>Habits over Time</h2>
              {_draggedVar && <h2 onClick={e => _setWhichTab(2)} className={_whichTab === 2 ? 'selected-tab' : ''}>Scatterplot</h2>}
            </ul>
            {_whichTab === 1 && 
              <div className='tab-one'>
                <div className='graph-container'>
                  <Chart variables={[_selectedVar, _draggedVar]}/>
                </div>
              </div>
            }
            {_whichTab === 2 && 
              <div className='tab-two'>
                <div className='graph-container'>
                  <ScatteredChart variables={[_selectedVar, _draggedVar]}/>
                </div>
              </div>
            }
          </section>
        </section>
      </main>
    </div>
  )
};