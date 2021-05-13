import React, { useState, useEffect } from 'react';
import * as StatUtil from '../../util/stat_util';
import VariableIcon from '../variables/variable_icon';
import AddEntryFormContainer from '../util/add_entry_form_container';
import "../../styles/dashboard.css";
import Chart from '../charts/chart';
import ScatteredChart from '../charts/scattered_chart';
import { completed } from '../../util/converters';

export default function Dashboard({variables}){
  const [_toggleForm, _setToggleForm] = useState(false);
  const [_selectedVar, _setSelectedVar] = useState(variables[localStorage.getItem('selectedId')] || '');
  const [_draggedVar, _setDraggedVar] = useState('');
  const [_coefficient, _setCoefficient] = useState(0);
  const [_whichTab, _setWhichTab] = useState(1);

  useEffect(() => {
    _setToggleForm(false);
    _setWhichTab(1);
  }, [_selectedVar]);

  useEffect(() => {
    if (
      !!_selectedVar 
      && !!_draggedVar 
      && _selectedVar !== _draggedVar
      && StatUtil.numDataPoints(_selectedVar, _draggedVar) > 6
      ) _setCoefficient(StatUtil.getCorrelationCoefficient(_selectedVar, _draggedVar).toFixed(3))
  }, [_draggedVar]);

  useEffect(() => {
    _setSelectedVar(variables[localStorage.getItem('selectedId')] || Object.values(variables)[0] || '');
  }, [variables]);

  const handleLiClick = (variable) => {
    return e => {
      _setSelectedVar(variable);
      localStorage.setItem('selectedId', variable._id);
      _setDraggedVar('');
      _setToggleForm(true)
    }
  }

  const getCorrelationStrength = r => {
    if (r <= -.9) return "very strong negative";
    if (r <= -.7) return "strong negative";
    if (r <= -.5) return "moderate negative";
    if (r <= -.3) return "weak negative";
    if (r <= -.1) return "very weak negative";
    if (r < .1) return "none";
    if (r < .3) return "very weak positive";
    if (r < .5) return "weak positive";
    if (r < .7) return "moderate positive";
    if (r < .9) return "strong positive";
    if (r <= 1) return "very strong positive";
  }

  const getUnit = variable => {
    switch(variable.unit){
      case undefined:
        return '';
      case 'boolean':
      case 'binary':
        return '(Y/N)'
      case 'rating':
        return '';
      default:
        return `(${variable.unit})`;
    }
  }

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData('text/plain', id);
  };

  const handleReceiveDrop = e => {
    e.preventDefault();
    e.stopPropagation();
    let id = e.dataTransfer.getData('text/plain');
    if (!(id === _selectedVar._id)) _setDraggedVar(variables[id]);
  };

  const disableScroll = e => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    window.onscroll = function() {
      window.scrollTo(scrollLeft, scrollTop);
    };
  }

  const enableScroll = e => {
    window.onscroll = function() {};
  }

  let numPoints = 0;
  if (!!_selectedVar && !!_draggedVar) numPoints = StatUtil.numDataPoints(_selectedVar, _draggedVar);
  
  return(
    <div className="dashboard-div">
      <aside>
        <h1>Your Factors: </h1>
        <div className="var-list-wrap" onMouseEnter={() => disableScroll()} onMouseLeave={() => enableScroll()}>
          <ul className='variables-list'>
            {Object.values(variables).map((variable, idx) => (
              <li key={idx} onClick={handleLiClick(variable)}
                  className={
                    `${completed(variable) ? 'complete' : 'incomplete'} 
                    ${variable._id === _selectedVar._id && 'selected-var'}`
                  }>
                <VariableIcon variable={variable} draggable={true} completed={completed(variable)} onDragStart={e => handleDragStart(e, variable._id)}/>
              </li>
            ))}
          </ul>
        </div>
        {/* <div class="fadeout"></div> */}
      </aside>
      <main>
        <section className='toggle-entry-form'>
          <button onClick={e => _setToggleForm(!_toggleForm)} >Add Today's Entry</button>
          {_toggleForm && <AddEntryFormContainer defaultVar={ _draggedVar || _selectedVar } parentSetToggle={_setToggleForm.bind(this)}/>}
        </section>
        <section className='correlation-preview'>
          {!!_draggedVar ? 
            <h1><span className="selected-vs">{_selectedVar.name} {getUnit(_selectedVar)}</span> | <span className="dragged-vs">{_draggedVar.name}  {getUnit(_draggedVar)}</span></h1> 
            : <h1 className="selected-vs">{_selectedVar.name}  {getUnit(_selectedVar)}</h1>}

          {(!_draggedVar && <p className='drag-info'>To calculate a correlation, drag a second factor onto the graph below.</p>)}

          <div>
            {(!!_draggedVar && numPoints > 6) && 
              <ul className='correlation-info'>
                <li>Correlation Coefficient: {_coefficient}</li>
                <li>Entries: {numPoints}</li>
                <li>Correlation Strength: {getCorrelationStrength(_coefficient)}</li>
              </ul>
            }
            {!!_draggedVar && 
              <div className='entries-info'>
                { (parseInt(numPoints) < 7) && <p><span>We need at least 7 day's worth of data to be able to look for a correlation.</span></p> }
                { (parseInt(numPoints) > 7 && parseInt(numPoints) < 14) && <p><span>Warning: we don't have much data yet, so this could be misleading.</span> For better accuracy, log these two factorss daily for at least two weeks.</p>}
                { (parseInt(numPoints) > 13 && parseInt(numPoints) < 30) && <p><span>You've logged these two factors for over two weeks.</span> Nice! In statistics, it's still a pretty small sample - for even better results, try to log these factors daily for a whole month.</p>}
                { (parseInt(numPoints) > 30) && <p>Wow! With such consistent logging, we can be pretty certain that your results are accurate.</p>}
              </div>
            }
          </div>

          <section className='droppable-graph-box'
                  onDragOver={e => e.preventDefault()}
                  onDrop={handleReceiveDrop}>
            <ul className='tab-headers'>
              <h2 onClick={e => _setWhichTab(1)} className={_whichTab === 1 ? 'selected-tab' : ''}>Factor over Time</h2>
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