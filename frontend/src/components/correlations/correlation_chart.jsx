import React from "react";
// import {
//   ResponsiveContainer,
//   ComposedChart,
//   Bar,
//   LineChart,
//   BarChart,
//   Brush,
//   Area,
//   XAxis,
//   YAxis,
//   ReferenceLine,
//   Line,
//   Tooltip,
// } from 'recharts';
// import '../../styles/chart.css'
import ChartMetrics from './chart_permutations/chart_metrics'
import ChartBooleans from './chart_permutations/chart_booleans'
import ChartScatter from './chart_permutations/chart_scatter_correlation'
import ChartRatings from './chart_permutations/chart_ratings'

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
    // <figure className="react-chart correlation">
    //   <svg>
    //     <path d={``} />
    //     <path d={``} />
    //   </svg>
    // </figure>
    <div className="charts">

    <div className="chart metrics">
        <ChartMetrics/>            
    </div>
    <div className="chart booleans">     
        <ChartBooleans/>            
    </div>
    <div className="chart scatter">     
        <ChartScatter/>            
    </div>
    <div className="chart rating">     
        <ChartRatings/>            
    </div>
        
      <footer>🥴</footer>
    </div>

  )
}