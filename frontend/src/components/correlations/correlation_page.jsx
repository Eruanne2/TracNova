import React, { useEffect, useState } from "react";
import AddCorrelationContainer from "./add_correlation_container";
import CorrelationChart from "./correlation_chart"
import CorrelationButtons from "./correlation_buttons"
import CorrelationChartContainer from "./correlation_chart_container";
import LogsWrapperContainer from "../variables/logs_wrapper_container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import VariableIcon from "../variables/variable_icon";
import ChartMetrics from "./chart_permutations/chart_metrics";
import * as StatUtil from "../../util/stat_util";

const nullCorrelation = {};

function VariableDropArea({handleReceiveVarId, variable}){
  return (
    <div className="variable-drop"
      onDrop={handleReceiveVarId}
      onDragOver={e => {e.preventDefault()}}
      style={{width: 100, height: 100, background: "#ddd"}}
    > { variable ? 
          <VariableIcon variable={variable}/> :
          <FontAwesomeIcon icon={faPlus} />
    }</div>
  );
}

function CorrelationPage({
  allVariables,
  variables = [],
  correlation = nullCorrelation,
  correlations,
  createCorrelation, updateCorrelation
}){

  const [_vars, _setVars] = useState([]);

  useEffect(() => {
    const vars = [..._vars];
    const allVarArrs = Object.values(allVariables);

    for (let i = 0, len = vars.length; i < len; i++){
      if (!allVarArrs.includes(vars[i])){
        vars[i] = undefined;
        _setVars(vars)
      }
    }
  }, [allVariables]);

  const handleReceiveVarIdCreator = i => e => {
    const variable = allVariables[e.dataTransfer.getData('text/plain')];
    const arr = [..._vars];

    if (variable && !arr.includes(variable)){
      arr[i] = variable;
      _setVars(arr)
    }
  }

  return (
    <section className="page correlation">
      <section>
        <section>
          { [0, 1].map(i => (
              <section key={i} className='drop-area variables-drop-area'>
                <VariableDropArea 
                  handleReceiveVarId={handleReceiveVarIdCreator(i)}
                  variable={_vars[i]}
                />
              </section>
            ))
          }
        </section>
        { _vars.length !== 2 ? null : 
          <section className="analysis">
            <h2 className="title"></h2>
            <h3 className="summary">
              Correlation Level: {
                StatUtil.getCorrelationCoefficient(..._vars)
              }
            </h3>
            <ChartMetrics variables={_vars}/>
          </section>
        }

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