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


export default function ChartMetrics(){

  const fakeData = [];
  for (let i = 0; i < 20; i++)
  fakeData.push({
    date: i, 
    value: 0.5 + Math.random() + i,
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
      <LineChart data={fakeData, fakeData3}>
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
        />
        <Tooltip backgroundColor="inherit" />
        
        <YAxis 
          yAxisId="yRight"
          stroke='rgb(5, 0, 200)'
          type="number"
          dataKey="nums"
          axisLine={false}
          tickLine={false}
          hide={false}
          orientation='right'
          allowDuplicatedCategories={false}
          strokeWidth="2"
          margin={{top: 20, right: 0, bottom: 20, left: 0}} 
        />
        
      <Brush
        dataKey='date'
        height={20} 
        stroke="#000000" 
        // startIndex={indices.startIndex}
        // endIndex={indices.endIndex}
        onChange={brushChange}
        syncId="sup"
      />
        
        <Line yAxisId="yLeft" data={fakeData} classname="linear" dataKey="value" stroke="rgb(5, 200, 0)" dot={false} strokeWidth="6" />
        
        <Line yAxisId="yRight" data={fakeData3} classname="linear" dataKey="nums" stroke="rgb(5, 0, 220)" dot={false} strokeWidth="6" />
        
        <Tooltip />
        

      </LineChart>
    </ResponsiveContainer>
  )
}