import {
  ResponsiveContainer,
  // Container,
  BarChart,
  Bar,
  Brush,
  XAxis,
  YAxis,
  Legend,
  ReferenceLine,
  Tooltip,
} from 'recharts';
import '../../../styles/chart.css'


export default function ChartBooleans(){

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
    nums1: Math.floor(0.5 + (Math.random())),
  })

  const fakestData = [];
  for (let i = 0; i < 20; i++)
  fakestData.push({
    date: i, 
    nums1: Math.floor(0.5 + (Math.random())),
    nums2: Math.floor(0.5 + (Math.random())),
  })

  
return (
    // <ResponsiveContainer 
    //   className="chart-container"
    //   width="100%" 
    //   height="100vh"
    // >
        <BarChart
        className="chart-container"
          width={800}
          height={400}
          data={fakestData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
        <YAxis 
          type="number"
          dataKey="nums1"
          strokeWidth="2"
          domain={[0, 2]}
        />
        <XAxis 
          type="number"
          dataKey="date"
          hide={false}
        />  
          <Tooltip />
          <Legend />
          <Bar type="number" dataKey="nums1" stackId="a" fill="#8884d8" isAnimationActive={false}/>
          <Bar type="number" dataKey="nums2" stackId="a" fill="#82ca9d" isAnimationActive={false}/>
        </BarChart>
    //   </ResponsiveContainer>
  // <ResponsiveContainer className="chartPrice" width={800} height={400}>
  //   <BarChart data={fakeData2, fakeData3}>
  //     <XAxis 
  //       type="number"
  //       dataKey="date"
  //       hide={false}
  //       // allowDuplicatedCategories={false}
  //     />
  //       <YAxis 
  //       type="number"
  //       dataKey="value"
  //       axisLine={false}
  //       tickLine={false}
  //       hide={false}
  //       allowDuplicatedCategories={false}
  //       strokeWidth="2"
  //       height="2"
  //       stroke='rgb(5, 200, 0)'
  //     />
  //     <Tooltip backgroundColor="inherit" />
  //     <Tooltip formatter={number => `$${number.toFixed(2)}`} />
  //     <Bar 
  //       // stackId="a"
  //       data={fakeData2} gaps={3} 
  //       fill='rgba(5, 0, 200, 0.7)' 
  //       className="shademe"
  //     /> 
  //     <Bar 
  //       // stackId="a"
  //       data={fakeData3} 
  //       dataKey='nums' 
  //       fill='rgb(225, 0, 200)' 
  //     /> 

  //     <Brush dataKey="date" height={30} stroke="#8884d8" />
  //   </BarChart>
  // </ResponsiveContainer>
)
}