import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
// import AddCorrelationContainer from './add_correlation_container';

function CorrelationsIndex({history, correlations, variables, createCorrelation, destroyCorrelation}){
  useEffect(() => {
    history.location.pathname === '/correlations' && correlations.length && 
      history.push(`/correlations/${correlations[0]._id}`);
  }, [history.location.pathname, correlations]);

  const handleDeleteCorrelation = (id) => {
    destroyCorrelation(id);
  }

  return ( variables.length >= 2 ?
    <section className="index correlations-index">
      <h1>Relations Made</h1>

      <NavLink className="button correlations-button" activeClassName="selected"
        to="/correlations/new"
      >
        <FontAwesomeIcon className="icon" icon={faPlusSquare}/>
        <p>Relate your factors!</p>
      </NavLink>

      { correlations.map(correlation => (
          <li key={correlation._id}>
            <NavLink activeClassName="selected" className="var-item-link"
              to={`/correlations/${correlation._id}`}
            >
              {/* <CorrelationIcon correlation={correlation}/> */}
            </NavLink>
            <div onClick={e => handleDeleteCorrelation(correlation._id)}>Delete</div>
          </li>
        ))
      }
    </section> : null
  );
}

export default withRouter(CorrelationsIndex);