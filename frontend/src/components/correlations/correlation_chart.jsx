import React from "react";

export default function CorrelationChart({correlation, variables, width = 1000, height = 1000}){
  function varToPath(variable){
    const data = Object.values(variable.dailylogs);
    const max = Math.max(...data.map(x => x.value));
    const min = Math.min(...data.map(x => x.value));
    const delta = max - min;
    const startDate = correlation.startDate;
    const endDate = correlation.endDate;

    
  }

  return (
    <figure className="react-chart correlation">
      <svg>
        <path d={``} />
        <path d={``} />
      </svg>
    </figure>
  )
}