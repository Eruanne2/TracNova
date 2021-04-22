import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';

function VariablesPage({history, variables}){

  useEffect(() => {
    variables.length && 
      history.push(`/variables/${variables[0]._id}`);
  }, [variables])


  return (
    <section>
      <h2>Create your first variable</h2>
      {/* <AddCorrelationContainer /> */}
    </section>
  );
}

export default withRouter(VariablesPage);