import React, {useState} from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Brush,
  XAxis,
  YAxis,
  ReferenceLine,
  Area,
  Tooltip,
  ComposedChart,
  Label,
  Bar,
} from 'recharts';
import '../../../styles/chart.css'
// import CUSTOM_LABEL from './chart_ratings_label'

export default function ChartBooleanRating(){

  




   
  const fakeData = [];
  for (let i = 0; i < 20; i++)
  fakeData.push({
    date: i, 
    nums1: Math.floor(0.5 + (Math.random()) * 5),
    nums2: Math.floor(0.5 + (Math.random())),
    nums3: i
  })
    for (let i = 0; i < 20; i++)
    fakeData[i].nums3 = (fakeData[i].nums1 + fakeData[i].nums2) / 2
  
  // console.log(fakeRating)

  // const CUSTOM_LABEL = (e) => {
  //   if (e === 0) {
  //     return ""
  //   } else if (e === 1) {
  //     return "😒"
  //   } else if (e === 2) {
  //     return "😕"
  //   } else if (e === 3) {
  //     return "🙂"
  //   } else if (e === 4) {
  //     return "😊"
  //   } else {
  //     return "😁"
  // }}

  return (
    <ResponsiveContainer className="chartPrice" width={800} height={400}>
      <ComposedChart data={fakeData}>
        <XAxis 
          type="number"
          dataKey="date"
          ticks={1}
        />
        <YAxis
          yAxisId="yLeft" 
          orientation='left'
          type="number"
          label={"rating"}
          ticks={[0, 1, 2, 3, 4, 5]}
          // label={<CUSTOM_LABEL />}
          dataKey="nums1"
          strokeWidth="2"
          domain={[0, 5]}
        />
        <YAxis
          yAxisId="yRight" 
          orientation='right'
          type="number"
          dataKey="nums2"
          strokeWidth="2"
          ticks={["a","b"]}
          domain={[0, 2]}
        > 
          <Label value="Did Neither" offset={0} position="insideBottomRight"/>
          <Label value="Did One" offset={0} position="insideRight"/>
          <Label value="Did Both" offset={0} position="insideTopRight"/>
        </YAxis>
        {/* <Area yAxisId='yLeft' type='step' dataKey="nums1" stroke="rgba(5, 160, 0, 0.8)" dot={false} strokeWidth="4" fill="rgba(5, 200, 0, 0.3)"/> */}
        <Area yAxisId='yLeft' type='step' dataKey="nums1" stroke="rgba(5, 0, 250, 0.6)" dot={false} strokeWidth="2" fill="rgba(5, 0, 220, 0.3)"/>
        <Bar type="number" type='Before' dataKey="nums2" yAxisId="yRight" barSize={30}  fill="rgba(250, 250, 0, 0.5)" isAnimationActive={false} strokeWidth="1" stroke="gold" minPointSize={3} />
        {/* <Tooltip backgroundColor="inherit" /> */}
        {/* <ReferenceLine type="linear" isFront={true} dataKey="nums3" label="the average" stroke="black" strokeWidth="5"strokeDasharray="3 3"/> */}
      </ComposedChart>
    </ResponsiveContainer>
  )
}


//  <BarChart
//         className="chart-container"
//           width={800}
//           height={400}
//           data={fakestData}
//           margin={{
//             top: 20,
//             right: 30,
//             left: 20,
//             bottom: 5,
//           }}
//         >
//         <YAxis 
//           type="number"
//           dataKey="nums1"
//           strokeWidth="2"
//           domain={[0, 2]}
//         >
//           <Label value="Did Neither" offset={-20} position="insideBottomLeft"/>
//           <Label value="Did One" offset={-20} position="insideLeft"/>
//           <Label value="Did Both" offset={-20} position="insideTopLeft"/>
//         </YAxis>
//         <XAxis 
//           type="number"
//           dataKey="date"
//           hide={false}
//         />  
//           <Tooltip />
//           <Legend />
//           <Bar type="number" dataKey="nums1" stackId="a" fill="#8884d8" isAnimationActive={false} minPointSize={6} />
        
//           <Bar type="number" dataKey="nums2" stackId="a" fill="#82ca9d" isAnimationActive={false} minPointSize={3} />
     
//         </BarChart>


// type='basis' | 'basisClosed' | 'basisOpen' | 'linear' | 'linearClosed' | 'natural' | 'monotoneX' | 'monotoneY' | 'monotone' | 'step' | 'stepBefore' | 'stepAfter'