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
import '../../../styles/chart.css'


export default function ChartScatter(){

  const fakeData = [];
  for (let i = 0; i < 20; i++)
  fakeData.push({
    date: i, 
    nums: 0.5 + Math.random() + i,
  })
   
  const fakeData2 = [];
  for (let i = 0; i < 20; i++)
  fakeData2.push({
    date: i, 
    nums: Math.floor(0.5 + (Math.random())),
  })
  const fakeData3 = [];
  for (let i = 0; i < 20; i++)
  fakeData3.push({
    date: i, 
    nums: 20 + Math.floor(0.5 + (Math.random())) + Math.abs(15 - (i * 2) + i),
  })
  const data = [];
  for (let i = 0; i < 20; i++)
  data.push({
    date: i, 
    nums: 20 + Math.floor(0.5 + (Math.random())) + Math.abs(15 - (i * 2) + i),
  })

  const dataByDay = [];
  for (let i = 0; i < 20; i++)
  dataByDay.push({
    var1: 20 + Math.floor(0.5 + (Math.random())) + Math.abs(15 - (i * 2) + i),
    var2: 20 + Math.floor(0.5 + (Math.random())) + Math.abs(15 - (i * 2) + i),
    date: i, 
  });

  

  
  

  

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
          type="number"
          dataKey="var1"
          name="var 1"
          unit="chonkers" 
          domain={['dataMin', 'dataMax']}         
        />
        <YAxis 
          type="number"
          dataKey="var2"
          name="var 2"
          unit="hoopties"
          domain={['dataMin', 'dataMax']}
        />
        <Tooltip />
        <Scatter name="yoloswaggins" data={dataByDay} fill="#8884d8" />
      </ScatterChart>
    </ResponsiveContainer>
  )
}