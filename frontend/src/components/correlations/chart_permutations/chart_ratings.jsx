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


export default function ChartRatings(){


   
  const fakeRating = [];
  for (let i = 0; i < 20; i++)
  fakeRating.push({
    date: i, 
    nums1: Math.floor(0.5 + (Math.random()) * 5),
    nums2: Math.floor(0.5 + (Math.random()) * 5),
  })
 


  return (
    
    <ResponsiveContainer className="chartPrice" width={800} height={400}>
      <LineChart data={fakeRating}>
        <XAxis 
          type="number"
          dataKey="date"
        />
        <YAxis 
          type="number"
          dataKey="nums1"
          strokeWidth="2"
          domain
        />
        <Line dataKey="nums1" stroke="rgb(5, 0, 220)" dot={false} strokeWidth="6" />
        <Line dataKey="nums2" stroke="rgb(5, 200, 0)" dot={false} strokeWidth="6" />
        <Tooltip backgroundColor="inherit" />
      </LineChart>
    </ResponsiveContainer>
  )
}