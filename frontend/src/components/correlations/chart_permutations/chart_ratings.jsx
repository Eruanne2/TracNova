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
        <Line type='stepAfter' dataKey="nums2" stroke="rgba(5, 200, 0, 0.5)" dot={false} strokeWidth="5" />
        <Line type='stepBefore' dataKey="nums1" stroke="rgba(5, 0, 220, 0.5)" dot={false} strokeWidth="1" />
        <Tooltip backgroundColor="inherit" />
      </LineChart>
    </ResponsiveContainer>
  )
}

// type='basis' | 'basisClosed' | 'basisOpen' | 'linear' | 'linearClosed' | 'natural' | 'monotoneX' | 'monotoneY' | 'monotone' | 'step' | 'stepBefore' | 'stepAfter'