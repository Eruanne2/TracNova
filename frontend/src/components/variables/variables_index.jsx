import React from "react";
import {NavLink} from "react-router-dom";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../styles/var_index.css";
import VariableIcon from "./variable_icon";

const MOCK_DATA = [{_id: 1, name: '🐨 koala'}, {_id: 2 ,name: 'お前はもう死んでいる'}, {_id: 3, name: "Check In"}];

export default function VariablesIndex({variables}){
  if (!variables || !variables.length) variables = MOCK_DATA;
  const handleDeleteVariable = (id) => {
    console.log(id);
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