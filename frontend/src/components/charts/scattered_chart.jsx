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
          domain={['dataMin', 'dataMax']}         
        />
        <YAxis 
          dataKey={metadataArr[1][0]}
          name={metadataArr[1][0]}
          type="number"
          unit={metadataArr[1][2] || ""}
          domain={['dataMin', 'dataMax']}
        />
        <Tooltip />
        <Scatter name="yoloswaggins" data={data} fill="#8884d8" />
        <ReferenceLine ifOverflow="extendDomain" label="pretend I'm correlation" stroke="green" strokeDasharray="3 3" segment={[{ x: 22 , y: 22 }, { x: 33, y: 33 }]} />
      </ScatterChart>
    </ResponsiveContainer>
  )
}