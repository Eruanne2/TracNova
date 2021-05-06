import React, {PureComponent} from 'react';
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
// add style if orientation is left this color otherwise other color
// import '../../../styles/chart.css'
import * as StatUtil from "../../util/stat_util";

  const renderCustomTick = (e) => {
    switch (true) {
      case (e === 0):
        return "";
        break;
      case (e === 1) :
        return "😒";
        break;
      case (e === 2) :
        return "😕";
        break;
      case (e === 3) :
        return "🙂";
        break;
      case (e === 4) :
        return "😊";
        break;
      case (e === 5):
        return "😁";
        break; 
      default:
        return '';
  }
}
  const renderCustomTickBool = (e) => {
    switch (true) {
      case (e === 0):
        return "No";
        break;
      case (e === 1) :
        return "Yes";
        break;
      default:
        return '';
  }
}
const ratingsFormatter = (value) => `${renderCustomTick(value)}`;
const booleanFormatter = (value) => `${renderCustomTickBool(value)}`;


function YAxisData({varName, varType, varUnit = '', orientation = 'left'}){
  
  switch (varType){
    case 'binary': return (
      <YAxis
        key={`y-axis-${varName}`}
        yAxisId={varName}
        dataKey={varName}
        type="number"
        ticks={[0, 1]}
        tickFormatter={booleanFormatter}
        domain={[0, 1]}
        orientation={orientation}
        strokeWidth="1"
      />  
    );
    case 'rating': return (
      <YAxis
        key={`y-axis-${varName}`}
        yAxisId={varName}
        dataKey={varName}
        type="number"
        label={""}
        interval={0}
        ticks={[1, 2, 3, 4, 5]}
        tickFormatter={ratingsFormatter}
        domain={[1, 5]}
        orientation={orientation}
        strokeWidth="1"
        dy={0.1}
      />
    );
    default: return (
      <YAxis
        key={`y-axis-${varName}`}
        yAxisId={varName}
        dataKey={varName}
        type="number"
        label={varUnit}
        orientation={orientation}
        strokeWidth="1"
        domain={['dataMin' - 1, 'dataMax']}
      /> 
    );
  }
}

function ChartData({varName, varType, i}){
  console.log(i === 1)
  if (i === 0) {
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
          fill="rgba(23,63,247, 0.2)"
          // isAnimationActive={false}
          strokeWidth="1"
          stroke="gold"
          stroke="rgb(23,63,247, 0.9)"
          minPointSize={3}
        />
      );
      case 'rating': return (
        <Area
          key={varName}
          yAxisId={varName}
          dataKey={varName}
          type='step'
          // stroke="rgba(5, 0, 250, 0.6)"
          stroke="rgb(23,63,247)"
          dot={false}
          strokeWidth="1"
          // fill="rgba(100, 100, 255, 0.3)"
          fill="rgba(250, 250, 0, 0.4)"
          fill="rgba(23,63,247, 0.4)"
        />
      );
      default: return (
          <Line
            key={varName}
            yAxisId={varName}
            dataKey={varName}
            stroke="rgb(5, 0, 200)"
            stroke="rgb(23,63,247)"
            strokeWidth="2"
            dot={false}
            type="monotone"
          />
        
      );
    }
  } else {
    switch (varType){
      case 'binary': return (
        <Bar
          key={varName}
          yAxisId={varName}
          dataKey={varName}
          type="number"
          type='Before'
          barSize={30}
          fill="rgba(20, 220, 220, 0.4)"
          // isAnimationActive={false}
          strokeWidth="1"
          stroke="rgba(5, 220, 200, 0.9)"
          fill="rgba(250, 250, 0, 0.2)"
          minPointSize={3}
        />
      );
      case 'rating': return (
        <Area
          key={varName}
          yAxisId={varName}
          dataKey={varName}
          type='step'
          stroke="rgba(5, 180, 160, 0.8)"
          dot={false}
          strokeWidth="2"
          // fill="rgba(10, 180, 140, 0.5)"
          // fill="rgba(180, 0, 140, 0.5)"
          fill="rgba(250, 250, 0, 0.4)"
        />
      );
      default: return (
          <Line
            key={varName}
            yAxisId={varName}
            dataKey={varName}
            stroke="rgb(3, 180, 165)"
            strokeWidth="2"
            dot={false}
            type="monotone"
            text-shadow="0px 4px 4px #0000001f"
          />
        
      );
    }
  }
}


export default function Chart({variables}){
  const [data, metadataObj] = StatUtil.getStatData(...variables); // refactor to two variables?
  const metadataArr = Object.entries(metadataObj);

  return (
    <ResponsiveContainer className="chartPrice" width={"100%"} height={400}>
      <ComposedChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 15,
          right: 30,
          left: 20,
          bottom: 15
        }}
      >
        <XAxis dataKey="date" />
        { metadataArr.map(([varName, varType], i) => 
            YAxisData({key: i, varName, varType, orientation: i === 1 ? 'right' : 'left'})
          )
        }
        { metadataArr.map(([varName, varType], i) => 
            ChartData({key: i, varName, varType, i})
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
  // isAnimationActive={false}
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
  // dot={false}
/>
*/}