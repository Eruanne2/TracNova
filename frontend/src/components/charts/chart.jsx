import React from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Brush,
  XAxis, YAxis,
  ReferenceLine,
  Line, Bar, Area,
  Tooltip, Legend
} from 'recharts';
// add style if orientation is left this color otherwise other color
// import '../../../styles/chart.css'
import * as StatUtil from "../../util/stat_util";
import { SYMBOL_BOOLEAN, SYMBOL_RATING } from '../../util/symbols';

const CustomTooltip = ({ active, payload, label, varName }) => {
	if (active) {
		return (
			<div className="tooltip">
				<p>{`${label.slice(0,5)}`}</p>
				<p>{`L: ${payload[0].value}`}</p>
				<p>{`R: ${payload[1].value}`}</p>
			</div>
		);
	}

	return null;
};


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
    case SYMBOL_BOOLEAN:
    case 'binary': return (
      <YAxis
        key={`y-axis-${varName}`}
        yAxisId="bar"
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
    case SYMBOL_RATING:
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
        domain={['dataMin', 'dataMax']}
      /> 
    );
  }
}

function ChartData({varName, varType, i}){
  // let bool = SYMBOL_BOOLEAN;
  // let rating = SYMBOL_RATING;

  if (i === 0) {
    switch (varType){
      case SYMBOL_BOOLEAN:
      case 'binary': return (
        <Bar
          stackId={1}
          key={varName}
          yAxisId="bar"
          dataKey={varName}
          fill="rgba(250, 250, 0, 0.4)"
          fill="rgba(23,63,247, 0.2)"
          strokeWidth="1"
          stroke="rgb(23,63,247, 0.9)"
          minPointSize={3}
        />
      );
      case SYMBOL_RATING:
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
      case SYMBOL_BOOLEAN:
      case 'binary': return (
        <Bar
          stackId={1}
          key={varName}
          yAxisId="bar"
          dataKey={varName}
          type='Before'
          fill="rgba(20, 170, 170, 0.6)"
          fill="rgba(250, 250, 0, 0.3)"
          strokeWidth="1"
          stroke="rgba(5, 150, 150, 0.9)"
          minPointSize={1}
        />
      );
      case SYMBOL_RATING:
      case 'rating': return (
        <Area
          key={varName}
          yAxisId={varName}
          dataKey={varName}
          type='step'
          stroke="rgba(5, 180, 160, 0.8)"
          dot={false}
          strokeWidth="2"
          fill="rgba(20, 170, 170, 0.6)"
          fill="rgba(250, 250, 0, 0.3)"
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

function LegendPayload(variables){
  let payload = [];
  let firstVar = { value: variables[0].name, type: 'square', color: 'rgb(23,63,247)'};
  payload.push(firstVar);
  if (!!variables[1] && variables[1] !== '') {
    let secVar = { value: variables[1].name, type: 'square', color: 'rgb(3, 180, 165)'};
    payload.push(secVar);
  }
            // payload={[
            //   { value: 'Group A', type: 'square', color: '#112E51' },
            //   { value: 'Group B', type: 'square', color: '#0071bc' },
            //   { value: 'Group C', type: 'square', color: '#00a6d2' },
            // ]}
  return payload;
};


export default function Chart({variables}){
  const [data, metadataObj] = StatUtil.getStatData(...variables); // refactor to two variables?
  const metadataArr = Object.entries(metadataObj);

  return (
    <ResponsiveContainer className="chartPrice" width={"100%"} height={400}>
      <ComposedChart
        barCategoryGap={0.8}
        stackOffset="expand"
        width="100%"
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
        <Tooltip 
          // content={<CustomTooltip />}
        />
        <Legend payload={LegendPayload(variables)} />
        <Brush dataKey="date" height={30} stroke="#8884d8" />
      </ComposedChart>
    </ResponsiveContainer>
  )
}