import React, {useState} from 'react';
import {
  ResponsiveContainer,
  Brush,
  XAxis,
  YAxis,
  ReferenceLine,
  Tooltip,
  ComposedChart,
  Label,
  Bar,
  Line
} from 'recharts';
import '../../../styles/chart.css'
// import CUSTOM_LABEL from './chart_ratings_label'

export default function ChartMetricBoolean(){

  




   
  const fakeData = [];
  for (let i = 0; i < 20; i++)
  fakeData.push({
    date: i, 
    nums1: 20 + Math.floor(0.5 + Math.random()) + Math.abs(15 - i),
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
          label={"Amount"}
          // label={<CUSTOM_LABEL />}
          dataKey="nums1"
          strokeWidth="2"
          domain={['dataMin' - 1, 'dataMax']}
        />
        <YAxis
          yAxisId="yRight" 
          orientation='right'
          type="number"
          dataKey="nums2"
          strokeWidth="2"
          ticks={["a","b"]}
          domain={[0, 1]}
        > 
          <Label value="No" offset={0} position="insideBottomRight"/>
          <Label value="Yes" offset={0} position="insideTopRight"/>
        </YAxis>
        {/* <Area yAxisId='yLeft' type='step' dataKey="nums1" stroke="rgba(5, 160, 0, 0.8)" dot={false} strokeWidth="4" fill="rgba(5, 200, 0, 0.3)"/> */}
        <Line yAxisId="yLeft" dataKey="nums1" stroke="rgb(5, 0, 200)" dot={false} strokeWidth="6"/> 0.6)" dot={false} strokeWidth="2" fill="rgba(5, 0, 220, 0.3)"/>
        <Bar type="number" type='Before' dataKey="nums2" yAxisId="yRight" barSize={30}  fill="rgba(20, 250, 0, 0.4)" isAnimationActive={false} strokeWidth="1" stroke="green" minPointSize={3} />
        {/* <Tooltip backgroundColor="inherit" /> */}
        {/* <ReferenceLine type="linear" isFront={true} dataKey="nums3" label="the average" stroke="black" strokeWidth="5"strokeDasharray="3 3"/> */}
      </ComposedChart>
    </ResponsiveContainer>
  )
}