import React from "react";
import {NavLink} from "react-router-dom";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import VariableIcon from "./variable_icon";

const MOCK_DATA = [{_id: 1, name: '🐨 koala'}, {_id: 2 ,name: 'お前はもう死んでいる'}, {_id: 3, name: "Check In"}];

export default function VariablesIndex({variables}){
  if (!variables || !variables.length) variables = MOCK_DATA;
  const handleDeleteVariable = (id) => {
    console.log(id);
  }

  return (
    <section className="index variables-index">
      Habits
      <ul className="variables">
        { variables.map(variable => (
            <li key={variable._id}>
              <NavLink activeClassName="selected" 
                to={`/variables/${variable._id}`}
              >
                <VariableIcon variable={variable}/>
              </NavLink>
              <div onClick={e => handleDeleteVariable(variable._id)}>Delete</div>
            </li>
          ))
        }
        <NavLink className="button variable-button" activeClassName="selected"
          to="/variables/new"
        >
          <FontAwesomeIcon className="icon" icon={faPlus}/>
          Track a new habit!
        </NavLink>
      </ul>
    </section>
  )
}