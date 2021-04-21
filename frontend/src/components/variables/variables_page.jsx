import React from "react";
import {Link} from "react-router-dom";

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
  return (
    <section className="page variables">
      Variables Page (Index Page)
      <section className="wrapper variables-wrapper">
        <ul className="variables">
          { variables.map(variable => (
              <li key={variable._id}>
                <Link to={`/variables/${variable._id}`}>
                  <VariableIcon variable={variable} />
                </Link>
              </li>
            ))
          }
        </ul>
      </section>
    </section>
  )
}