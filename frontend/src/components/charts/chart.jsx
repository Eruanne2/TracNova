import React from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Brush,
  XAxis, YAxis,
  ReferenceLine,
  Line, Bar, Area,
  Tooltip,
} from 'recharts';
// add style if orientation is left this color otherwise other color
// import '../../../styles/chart.css'
import * as StatUtil from "../../util/stat_util";

  const renderCustomTick = (e) => {
    switch (true) {
      case (e === 0):
        return "";
      case (e === 1) :
        return "😒";
      case (e === 2) :
        return "😕";
      case (e === 3) :
        return "🙂";
      case (e === 4) :
        return "😊";
      case (e === 5):
        return "😁"; 
      default:
        return '';
  }
}
  const renderCustomTickBool = (e) => {
    switch (true) {
      case (e === 0):
        return "No";
      case (e === 1) :
        return "Yes";
      case (e === 2) :
        return "Both Yes";
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
        domain={[0, 'dataMax']}
        orientation={orientation}
        tick={ orientation === 'left' ? {fill: 'rgb(23,63,247)', fontWeight: 600} : {fill: "rgb(3, 180, 165)", fontWeight: 600}}
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
          stackId='a'
          key={varName}
          yAxisId={varName}
          dataKey={varName}
          type="number"
          barSize={30}
          fill="rgba(250, 250, 0, 0.4)"
          fill="rgba(23,63,247, 0.2)"
          strokeWidth="1"
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
          stroke="rgb(23,63,247)"
          dot={false}
          strokeWidth="1"
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
          stackId='a'
          key={varName}
          yAxisId={varName}
          dataKey={varName}
          type="number"
          type='Before'
          barSize={30}
          fill="rgba(20, 220, 220, 0.4)"
          strokeWidth="1"
          stroke="rgba(5, 220, 200, 0.9)"
          fill="rgba(250, 250, 0, 0.2)"
          minPointSize={3}
          // stackOffset
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