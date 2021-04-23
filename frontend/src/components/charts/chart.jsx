import React, {useState} from 'react';
import {
  ResponsiveContainer,
  ComposedChart, LineChart, 
  Brush,
  XAxis, YAxis,
  ReferenceLine,
  Line, Bar, Area,
  Tooltip,
  Baseline
} from 'recharts';

// import '../../../styles/chart.css'
import * as StatUtil from "../../util/stat_util";

function YAxisData({varName, varType, varUnit = '', orientaion = 'left'}){
  switch (varType){
    case 'binary': return (
      <YAxis
        key={`y-axis-${varName}`}
        yAxisId={varName}
        dataKey={varName}
        type="number"
        ticks={["a","b"]}
        domain={[0, 1]}
        orientation={orientaion}
        strokeWidth="2"
      />  
    );
    case 'rating': return (
      <YAxis
        key={`y-axis-${varName}`}
        yAxisId={varName}
        dataKey={varName}
        type="number"
        label={"rating"}
        ticks={[0, 1, 2, 3, 4, 5]}
        domain={[0, 5]}
        orientation={orientaion}
        strokeWidth="2"
      /> 
    );
    default: return (
      <YAxis
        key={`y-axis-${varName}`}
        yAxisId={varName}
        dataKey={varName}
        type="number"
        label={varUnit}
        orientation={orientaion}
        strokeWidth="2"
        domain={['dataMin' - 1, 'dataMax']}
      /> 
    );
  }
}

function ChartData({varName, varType}){
  switch (varType){
    case 'binary': return (
      <Bar
        key={varName}
        yAxisId={varName}
        dataKey={varName}
        type="number"
        type='Before'
        barSize={30}
        fill="rgba(250, 250, 0, 0.4)"
        isAnimationActive={false}
        strokeWidth="2"
        stroke="gold"
        minPointSize={3}
      />
    );
    case 'rating': return (
      <Area
        key={varName}
        yAxisId={varName}
        dataKey={varName}
        type='step'
        stroke="rgba(5, 0, 250, 0.6)"
        dot={false}
        strokeWidth="3"
        fill="rgba(5, 0, 220, 0.5)"
      />
    );
    default: return (
      <Line
        key={varName}
        yAxisId={varName}
        dataKey={varName}
        stroke="rgb(5, 0, 200)"
        strokeWidth="6"
        dot={false}
      />
    );
  }
}


export default function Chart({variables}){
  const [data, metadataObj] = StatUtil.getStatData(...variables);
  const metadataArr = Object.entries(metadataObj);

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
        { metadataArr.map(([varName, varType], i) => 
            YAxisData({key: i, varName, varType, orientaion: i === 1 ? 'right' : 'left'})
          )
        }
        { metadataArr.map(([varName, varType], i) => 
            ChartData({key: i, varName, varType})
          )
        }
        <Tooltip />
        <Brush dataKey="date" height={30} stroke="#8884d8" />
      </ComposedChart>
    </ResponsiveContainer>
  )
}

// rating:

{/* 
<YAxis
  yAxisId={variable.name}
  dataKey={variable.name}
  type="number"
  label={"rating"}
  ticks={[0, 1, 2, 3, 4, 5]}
  domain={[0, 5]}
  orientation={orientaion}
  strokeWidth="2"
/> 
<Area
  yAxisId={variable.name}
  dataKey={variable.name}
  type='step'
  stroke="rgba(5, 0, 250, 0.6)"
  dot={false}
  strokeWidth="3"
  fill="rgba(5, 0, 220, 0.5)"
/>
*/}

// binary
{/* 
<YAxis
  yAxisId={variable.name}
  dataKey={variable.name}
  type="number"
  ticks={["a","b"]}
  domain={[0, 1]}
  orientation={orientaion}
  strokeWidth="2"
/>  
<Bar
  yAxisId={variable.name}
  dataKey={variable.name}
  type="number"
  type='Before'
  barSize={30}
  fill="rgba(250, 250, 0, 0.4)"
  isAnimationActive={false}
  strokeWidth="2"
  stroke="gold"
  minPointSize={3}
/>
*/}

// metric
{/*
<YAxis
  yAxisId={variable.name}
  dataKey={variable.name}
  type="number"
  label={variable.unit || ""}
  orientation={orientaion}
  strokeWidth="2"
  domain={['dataMin' - 1, 'dataMax']}
/> 
<Line
  yAxisId={variable.name}
  dataKey={variable.name}
  stroke="rgb(5, 0, 200)"
  strokeWidth="6"
  dot={false}
/>
*/}