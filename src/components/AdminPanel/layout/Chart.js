import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Chart(props) {
  return (
    <div className="chart">
      <span className="title">{props.title}</span>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={props.data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#cd9a2d" stopOpacity={1} />
              <stop offset="95%" stopColor="#cd9a2d" stopOpacity={0.3} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="1 1" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Total"
            stroke="#cd9a2d"
            fillOpacity={1}
            fill="url(#total)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
