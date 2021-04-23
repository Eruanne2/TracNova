import React, { useState } from "react";
import AddCorrelationContainer from "./add_correlation_container";
import CorrelationChart from "./correlation_chart"
import CorrelationButtons from "./correlation_buttons"
import CorrelationChartContainer from "./correlation_chart_container";
import VariableContainer from "../variables/variable_container";
import LogsWrapperContainer from "../variables/logs_wrapper_container";
import AddEntryFormContainer from '../util/add_entry_form_container';

function CorrelationPage({logout, history, variables, correlation, correlations}){
  const [_toggleForm, _setToggleForm] = useState(false);

  return (
    <section className="page correlation">
        <section className='toggle-entry-form'>
          <button onClick={e => _setToggleForm(!_toggleForm)} >Add Today's Entry</button>
          {_toggleForm && <AddEntryFormContainer defaultVar={null}/>}
        </section>
      <section>
        <section>
          <figure>
            <CorrelationButtons />
            <CorrelationChart />
          </figure>

          <h2 className="title"></h2>
          <h3 className="summary">
            Correlation Level
          </h3>
        </section>

        <section className="variables">{ 
          variables.map(variable => (
            <VariableContainer key={variable._id} variable={variable}/>
          ))
        }</section>

        <LogsWrapperContainer variables={variables}/>
      </section>

      {/* Move below to another separate file eventually */}
      <section className="charts">
        Correlation Charts
        { correlations
            .filter(corr => corr !== correlation)
            .map(corr => (
              <CorrelationChartContainer
                key={corr.id} correlationId={corr.id} editable={false}
              />
            ))
        }
        <AddCorrelationContainer />
      </section> 
    </section>
  )
}

export default CorrelationPage;