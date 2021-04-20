import React from "react";
import AppMenu from "../util/app_menu";
import AddCorrelationChartContainer from "./add_correlation_container";
import CorrelationChartContainer from "./correlation_chart_container";

function CorrelationPage({logout, history, variables, correlation, correlations}){
  return (
    <section className="page correlation">
      <section>
        <section>
          <figure>
            Correlation Chart
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
        <AddCorrelationChartContainer />
      </section> 
    </section>
  )
}

export default CorrelationPage;