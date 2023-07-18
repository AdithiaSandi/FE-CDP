import React from "react";
import {
  Bar,
  BarChart,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { REST } from "../assets/interfaces";

interface props {
  data: REST[];
}

const MainChart: React.FC<props> = ({ data }) => {
  const community = [...new Set(data.map((item) => item.source))];
  const main_data = community.map((category) => {
    let count = 0;
    data.map((item) => (item.source === category ? count++ : null));
    return {
      source: category,
      counter: count,
    };
  });

  return (
    <ResponsiveContainer width="100%" height="50%">
      <BarChart
        data={main_data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <XAxis dataKey="source" tick={{ stroke: "#F48FB1", strokeWidth: 0.1 }} tickLine={false} axisLine={false} />
        <YAxis tickLine={false} />
        <Tooltip />
        <Bar dataKey="counter" fill="#8884d8">
          <LabelList
            dataKey="counter"
            position="center"
            style={{
              fill: "white",
            }}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default MainChart;
