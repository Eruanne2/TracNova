import React, { useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import AddCorrelationContainer from './add_correlation_container';

function CorrelationsPage({history, correlations}){
  useEffect(() => {
    correlations.length && 
      history.push(`/correlations/${correlations[0]._id}`);
  }, [correlations])

  const handleClick = (e) => {
    e.preventDefault();
    
  };

  return (
    <section>
      <h2>Create your first correlation</h2>
      <AddCorrelationContainer />
    </section>
  );
}

export default withRouter(CorrelationsPage);