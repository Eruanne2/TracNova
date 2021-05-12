// This will be for the shared datapoint scatter chart.
// It will show the correlation line (a reference line).

import React from 'react';
import {
  ResponsiveContainer,
  ScatterChart,
  Brush,
  XAxis,
  YAxis,
  ReferenceLine,
  Scatter,
  Tooltip,
  ComposedChart,
  Baseline
} from 'recharts';

// import '../../../styles/chart.css'
import * as StatUtil from "../../util/stat_util";

export default function ScatteredChart({variables}){
  const [data, metadataObj] = StatUtil.getStatData(...variables);
  const metadataArr = Object.entries(metadataObj);
  let min1 = Math.min(...Object.values(variables[0].dailylogs));
  let max1 = Math.max(...Object.values(variables[0].dailylogs));
  let min2, max2;
  if (!!variables[1]) {
    min2 = Math.min(...Object.values(variables[1].dailylogs));
    max2 = Math.max(...Object.values(variables[1].dailylogs));
  }

  if (variables[0].unit === 'binary') {
    min1 -= 1;
    max1 += 1;
  }
  if (variables[1] && variables[1].unit === 'binary') {
    min2 -= 1;
    max2 += 1;
  }

  return (
    <ResponsiveContainer className="chartPrice" width={800} height={400}>
      <ScatterChart 
        key={Math.random()}
        width={400}
        height={400}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
      >
        <XAxis 
          dataKey={metadataArr[0][0]}
          name={metadataArr[0][0]}
          type="number"
          unit={metadataArr[0][2] || ""}
          domain={[min1, max1]}         
        />
        <YAxis 
          dataKey={metadataArr[1][0]}
          name={metadataArr[1][0]}
          type="number"
          unit={metadataArr[1][2] || ""}
          domain={[min2, max2]}
        />
        <Tooltip />
        <Scatter name="yoloswaggins" data={data} fill="#8884d8" />
        {/* <ReferenceLine ifOverflow="extendDomain" label="" stroke="green" strokeDasharray="3 3" segment={[{ x: 22 , y: 22 }, { x: 33, y: 33 }]} /> */}
      </ScatterChart>
    </ResponsiveContainer>
  )
}