import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import {Link} from "react-router-dom";
import '../../styles/var_index.css';
function VariableIcon({variable}){
  const {name} = variable;
  let abbreviation;
  const match = name.match(/(\w[^\ ^\t^\n]+)/g);

  if (match && match.length > 1)
    abbreviation = name.split(/[\ \t\n]/).slice(0, 2).map(x => x[0]).join('')
  else
    abbreviation = name.substring(0, 2);

  return (
    <div className='icon-wrapper variable'>
      <a>
        <div className='icon'>
          {abbreviation}
        </div>
        <div className='name'>
          {name}
        </div>
      </a>
    </div>
  )
}

export default function VariablesPage({variables}){
  variables = [{id: 1, name: '🐨 koala'}, {id: 2 ,name: 'お前はもう死んでいる'}, {id: 3, name: "Check In"}];

  return (
    <section className="page variables-index">
      Variables Page (Index Page)
      <section className="wrapper variables-wrapper">
        <ul className="variables">
          { variables.map(variable => (
              <li key={variable._id}>
                <Link to={`/variables/${variable._id}`} className="var-item-link">
                  <VariableIcon variable={variable} />
                </Link>
              </li>
            ))
          }
        </ul>
        <div className="variables-wrapper-body">
          <Link className="button variable-button" to="/variables/new">
            <FontAwesomeIcon className="icon" icon={faPlus}/>
            Add Variables
          </Link>
        </div>
      </section>
    </section>
  )
}