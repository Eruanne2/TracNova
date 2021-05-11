import React, {useState} from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Brush,
  XAxis,
  YAxis,
  ReferenceLine,
  Line,
  Tooltip,
  ComposedChart,
  Baseline
} from 'recharts';
import '../../../styles/chart.css'
import * as StatUtil from "../../../util/stat_util";

export default function ChartMetrics({variables}){
  const [data, dataType] = StatUtil.getStatData(...variables);
// console.log(data, dataType);
  return (
    <ResponsiveContainer className="chartPrice" width={800} height={400}>
      <ComposedChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
        <XAxis dataKey="date" />
        { (() => (
          <>
            <YAxis 
              yAxisId="yLeft"
            />
            
          </>
        ))()
        
      }
      <YAxis 
          yAxisId="yRight"
          orientation='right'
        />
      { (() => (
          <>
        
          </>
        ))()
        
      }
      
        <Line 
          yAxisId="yLeft" 
          dataKey={variables[0] && variables[0].name} 
          stroke="rgb(5, 200, 0)" 
          dot={false} 
          strokeWidth="6"
        />
        <Line 
          yAxisId="yRight"
          dataKey={variables[1] && variables[1].name} 
          stroke="rgb(5, 0, 200)" 
          dot={false} 
          strokeWidth="6"
        />
        <Tooltip />
        <Brush dataKey="date" height={30} stroke="#8884d8" />
      </ComposedChart>
    </ResponsiveContainer>
  )
}