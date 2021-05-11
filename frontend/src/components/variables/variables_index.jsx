import React, {useEffect} from "react";
import {NavLink, withRouter} from "react-router-dom";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../styles/var_index.css";
import VariableIcon from "./variable_icon";
import IconButton from "../util/icon_button";
import { completed } from '../../util/converters';

function VariablesIndex({history, variables = {}, destroyVariable}){

  useEffect(() => {
    history.location.pathname === '/variables' && variables.length && 
      history.push(`/variables/${variables[0]._id}`);
  }, [history.location.pathname, variables]);
  
  const handleDeleteVariable = (id) => {
    destroyVariable(id);
    history.push(`/variables/${variables[0]._id}`);
  }

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData('text/plain', id);
  }

  const disableScroll = e => {
    // console.log("event happened");
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    window.onscroll = function() {
      window.scrollTo(scrollLeft, scrollTop);
    };
  }

  const enableScroll = e => {
    window.onscroll = function() {};
  }

  // this is only here because --activeClassName="selected"-- on line 60 is not working.
  const activeWorkaround = e => {
    e.preventDefault();
    document.querySelectorAll('.selected').forEach(el => el.classList.remove('selected'));
    e.currentTarget.classList.add('selected');
  }

  return (
    <aside className="index variables-index">
      <h1>Factors</h1>
      <NavLink className="button variable-button" activeClassName="selected"
        to="/variables/new"
      >
        <FontAwesomeIcon className="icon" icon={faPlus}/>
        <p>Track a new factor!</p>
      </NavLink>
      <div className="var-list-wrap factor-wrap" onMouseEnter={() => disableScroll()} onMouseLeave={() => enableScroll()}>
        <ul className="variables">
          { variables.map(variable => (
              <li key={variable._id} className={`${completed(variable) ? 'complete' : 'incomplete'}`}>
                <NavLink exact to={`/variables/${variable._id}`} onClick={activeWorkaround}
                  activeClassName="selected" className="var-item-link" as="div"
                >
                  <VariableIcon variable={variable} completed={completed(variable)} onDragStart={e => handleDragStart(e, variable._id)} draggable={true}/>
                  <IconButton icon={faTrash} onClick={e => handleDeleteVariable(variable._id)} title="Delete"/>
                </NavLink>
              </li>
            ))
          }
        </ul>
      </div>
    </aside>
  )
}

export default withRouter(VariablesIndex);