import React from 'react'
import PropTypes from 'prop-types'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, ReferenceLine,
  ReferenceDot, Tooltip, CartesianGrid, Legend, Brush, ErrorBar, AreaChart, Area,
  Label, LabelList } from 'recharts';

const Chart = (props) => {
  return (
    <div>


        <LineChart width={600} height={250} data={props.data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="High" stroke="#8884d8" />
          <Line type="monotone" dataKey="Low" stroke="#82ca9d" />
        </LineChart>
    </div>
  )
}

export default Chart
