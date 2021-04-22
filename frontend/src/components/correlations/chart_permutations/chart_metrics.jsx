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

const MOCK_DATA_1 = Array(20).fill(0).map((x, i) => ({
  date: i,
  value: 0.5 + Math.random() + i,
}));

const MOCK_DATA_2 = Array(20).fill(0).map((x, i) => ({
  date: i + 3,
  value: Math.floor(0.5 + Math.random())
}));

const MOCK_DATA_3 = Array(20).fill(0).map((x, i) => ({
  date: i + 6,
  value: 20 + Math.floor(0.5 + Math.random()) + Math.abs(15 - i)
}));

const mergeData = (...datasets) => {
  const obj = {};

  for (let i in datasets){
    for (let {date, value} of Object.values(datasets[i])){
      if (!obj[date]) obj[date] = {date}
      obj[date][`var${i}`] = value;
    }
  }

  return Object.values(obj);
}

const MOCK_DATA = mergeData(MOCK_DATA_1, MOCK_DATA_2, MOCK_DATA_3);

export default function ChartMetrics(){
  // const {startIndex, endIndex} = useState;
  // const [indices, setIndices] = useState({})
  // let {startIndex, endIndex} = indices
  const brushChange = (e) => {

    console.log(e)

  };

  // useEffect(() => {
  //   {startIndex, endIndex} = indices

  // }, [indices] )
  
  // handleChange({startIndex: Number(e.target.value), endIndex: Number(e.target.value)})
  // onChange={e => handleChange({startIndex: Number(e.target.value), endIndex: Number(e.target.value)})}

  return (
    <ResponsiveContainer className="chartPrice" width={800} height={400}>
      {/* <LineChart data={MOCK_DATA[0]}>
        <XAxis 
          type="number"
          dataKey="date"
          hide={false}
          allowDuplicatedCategories={false}
          syncId="sup"
        />
        
        <YAxis 
          yAxisId="yLeft"
          type="number"
          dataKey="value"
          axisLine={false}
          tickLine={false}
          hide={false}
          allowDuplicatedCategories={false}
          strokeWidth="2"
          stroke='rgb(5, 200, 0)'
          margin={{top: 20, right: 0, bottom: 20, left: 0}} 
        />
        <Tooltip backgroundColor="inherit" />
        
        <YAxis 
          yAxisId="yRight"
          type="number"
          dataKey="nums"
          axisLine={false}
          tickLine={false}
          hide={false}
          orientation='right'
          allowDuplicatedCategories={false}
          stroke='rgb(5, 0, 200)'
          strokeWidth="2"
          margin={{top: 20, right: 0, bottom: 20, left: 0}} 
        />
        
      <Brush
        dataKey="date"
        height={20} 
        stroke="#000000" 
        // startIndex={indices.startIndex}
        // endIndex={indices.endIndex}
        // onChange={brushChange}
        syncId="sup"
      />
        
        <Line yAxisId="yLeft" data={MOCK_DATA[0]} classname="linear" dataKey="value" stroke="rgb(5, 200, 0)" dot={false} strokeWidth="6" />
        <Line yAxisId="yRight" data={MOCK_DATA[1]} classname="linear" dataKey="value" stroke="rgb(5, 0, 220)" dot={false} strokeWidth="6" />
        
        <Tooltip />
        

      </LineChart> */}
      <LineChart
        width={500}
        height={300}
        data={MOCK_DATA}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
        <XAxis dataKey="date" />
        <YAxis 
          yAxisId="yLeft"
          
        />
        <YAxis 
          yAxisId="yRight"
          
          orientation='right'
          
        />
        <Brush dataKey="date" height={30} stroke="#8884d8" />
        <Line yAxisId="yLeft" dataKey="var0" stroke="rgb(5, 200, 0)" dot={false} strokeWidth="6"/>
        <Line yAxisId="yRight" dataKey="var2" stroke="rgb(5, 0, 200)" dot={false} strokeWidth="6"/>
      </LineChart>
    </ResponsiveContainer>
  )
}