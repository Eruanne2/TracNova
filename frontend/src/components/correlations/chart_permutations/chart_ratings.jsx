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
} from 'recharts';
import '../../../styles/chart.css'
import CUSTOM_LABEL from './chart_ratings_label'

export default function ChartRatings(){

  




   
  const fakeRating = [];
  for (let i = 0; i < 20; i++)
  fakeRating.push({
    date: i, 
    nums1: Math.floor(0.5 + (Math.random()) * 5),
    nums2: Math.floor(0.5 + (Math.random()) * 5),
    nums3: i
  })
    for (let i = 0; i < 20; i++)
    fakeRating[i].nums3 = (fakeRating[i].nums1 + fakeRating[i].nums2) / 2
  
  // console.log(fakeRating)

  // const RATING_EMOJIS = [undefined, '😡', '😞', '😐', '😊', '😁'];
  // const RATING_EMOJIS = [undefined, '😡', '😞', '😐', '😊', '😁'];
  const RATING_EMOJIS = [
    undefined,
    "😒",
    "😕",
    "🙂",
    "😊",
    "😁"
  ]


  return (
    <ResponsiveContainer className="chartPrice" width={800} height={400}>
      <AreaChart data={fakeRating}>
        <XAxis 
          type="number"
          dataKey="date"
        />
        <YAxis 
          type="number"
          ticks={[0, 1, 2, 3, 4, 5]}
          label={<CUSTOM_LABEL />}
          dataKey="nums1"
          strokeWidth="2"
          domain={[0, 5]}
        />
        <Area 
          type='stepBefore' 
          dataKey="nums2" 
          stroke="rgba(5, 160, 0, 0.8)" 
          dot={false} 
          strokeWidth="4" 
          fill="rgba(5, 200, 0, 0.3)"
        />
        <Area 
          type='stepBefore' 
          dataKey="nums1" 
          stroke="rgba(5, 0, 250, 0.5)" 
          dot={false} 
          strokeWidth="2" 
          fill="rgba(5, 0, 220, 0.3)"
        />
        <Tooltip backgroundColor="inherit" />
        <ReferenceLine type="linear" isFront={true} dataKey="nums3" label="the average" stroke="black" strokeWidth="5"strokeDasharray="3 3"/>
      </AreaChart>
    </ResponsiveContainer>
  )
}

// type='basis' | 'basisClosed' | 'basisOpen' | 'linear' | 'linearClosed' | 'natural' | 'monotoneX' | 'monotoneY' | 'monotone' | 'step' | 'stepBefore' | 'stepAfter'