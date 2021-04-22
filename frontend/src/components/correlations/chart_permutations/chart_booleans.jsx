import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  LineChart,
  BarChart,
  Brush,
  Area,
  XAxis,
  YAxis,
  ReferenceLine,
  Line,
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
    nums: Math.floor(0.5 + (Math.random())),
  })
return (

  <ResponsiveContainer className="chartPrice" width={800} height={400}>
  <ComposedChart data={fakeData2, fakeData3}>
  <defs>
  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
  <stop offset="5%" stopColor="#129a74" stopOpacity={0.1}/>
  <stop offset="95%" stopColor="#FFFFFF" stopOpacity={0.1}/>
  </linearGradient>
  </defs>
  <XAxis 
  type="number"
  dataKey="date"
  hide={false}
  allowDuplicatedCategories={false}
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
  // dy={-50}
  // domain={[-0.1, 1.1]}
  />
  <Tooltip backgroundColor="inherit" />
  <YAxis 
  // dy={-50}
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
  // domain={[-0.1, 1.1]}
  />
  <Tooltip formatter={number => `$${number.toFixed(2)}`} />
  <Bar yAxisId="yRight" data={fakeData2} gaps={3} classname="linear" dataKey='nums' minPointSize={4} strokeWidth="2" stroke="teal" barSize={28} fill='rgba(5, 0, 200, 0.7)' background={{ fill: '#eee' }} className="shademe"/> 
  {/* <Bar yAxisId="yLeft" data={fakeData3} gaps={3} classname="linear" dataKey='nums' barSize={14} fill='rgb(225, 0, 200)' />  */}
  <Line yAxisId="yLeft" data={fakeData} classname="linear" dataKey="value" stroke="rgb(5, 200, 0)" dot={false} strokeWidth="6" />
  {/* <Area type="monotone" data={fakeData} dataKey="value" stroke={false} strokeWidth={2}
fillOpacity={1} fill="url(#colorUv)" /> */}
{/* <Line yAxisId="yRight" data={fakeData2} classname="linear" dataKey="nums" stroke="rgb(5, 0, 220)" dot={false} strokeWidth="2" /> */}
<Brush dataKey="date" height={30} stroke="#8884d8" />
          </ComposedChart>
          </ResponsiveContainer>
)
}