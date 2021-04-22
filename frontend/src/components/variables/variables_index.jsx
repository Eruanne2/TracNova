import React, {useEffect} from "react";
import {NavLink, withRouter} from "react-router-dom";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../styles/var_index.css";
import VariableIcon from "./variable_icon";

function VariablesIndex({history, variables = {}, destroyVariable}){
  useEffect(() => {
    variables.length && 
      history.push(`/variables/${variables[0]._id}`);
  }, [variables]);
  
  const handleDeleteVariable = (id) => {
    destroyVariable(id);
  }

  return (
    <section className="index variables-index">
      <h1>Habits</h1>
      <ul className="variables">
        <NavLink className="button variable-button" activeClassName="selected"
          to="/variables/new"
        >
          <FontAwesomeIcon className="icon" icon={faPlus}/>
          <p>Track a new habit!</p>
        </NavLink>
        { variables.map(variable => (
            <li key={variable._id}>
              <NavLink activeClassName="selected" className="var-item-link"
                to={`/variables/${variable._id}`}
              >
                <VariableIcon variable={variable}/>
              </NavLink>
              <div onClick={e => handleDeleteVariable(variable._id)}>Delete</div>
            </li>
          ))
        }
      </ul>
    </section>
  )
}

export default withRouter(VariablesIndex);