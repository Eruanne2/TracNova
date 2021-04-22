import React from "react";
import AddCorrelationContainer from "./add_correlation_container";
import CorrelationChart from "./correlation_chart"
import CorrelationButtons from "./correlation_buttons"
import CorrelationChartContainer from "./correlation_chart_container";
import VariableContainer from "../variables/variable_container";
import LogsWrapperContainer from "../variables/logs_wrapper_container";

const nullCorrelation = {};

function VariableDropArea(){
  return (
    <div 
      onDrop={e => {console.log(e.dataTransfer.getData('text/plain'));}}
      onDragOver={e => {e.preventDefault()}
    }>
      <div style={{width: 100, height: 100, background: "#ddd"}}>Drop</div>
    </div>
  );
}

function CorrelationPage({
  variables = [],
  correlation = nullCorrelation,
  correlations,
  createCorrelation, updateCorrelation
}){
  return (
    <section className="page correlation">
      <section>
        <section>
          <section className='drop-area variables-drop-area'>
            <VariableDropArea />
          </section>
          {variables.length}
          {/* <figure>
            <CorrelationButtons />
            <CorrelationChart />
          </figure> */}

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
        
        <AddCorrelationContainer />
      </section> 
    </section>
  )
}

export default CorrelationPage;