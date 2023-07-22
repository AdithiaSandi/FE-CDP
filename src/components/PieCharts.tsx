import React, { useEffect, useState } from "react";
import { ResponsiveContainer, PieChart, Pie, Tooltip, Cell } from "recharts";
import { REST } from "../assets/interfaces";

interface props {
  data: REST[];
}

interface Sentiment {
  name: string;
  value: number;
}

const PieCharts: React.FC<props> = ({ data }) => {
  const [Data, setData] = useState<Sentiment[]>([]);

  const uniqueSentiments = [...new Set(data.map((item) => item.sentiment))];
  const sorted = uniqueSentiments.map((type) => {
    let value = 0;
    data.map((item) => {
      item.sentiment === type ? value++ : null;
    });

    return {
      name: type,
      value: value,
    };
  });

  const COLORS = ["limegreen", "#82CA9D", "red", "#e0e033"];

  useEffect(() => {
    setData(
      uniqueSentiments.map((type) => {
        let value = 0;
        data.map((item) => {
          item.sentiment === type ? value++ : null;
        });

        return {
          name: type,
          value: value,
        };
      })
    );
  }, [data]);

  return (
    <ResponsiveContainer width="20%" height="80%">
      <PieChart width={400} height={400}>
        <Pie
          data={sorted}
          dataKey="value"
          cx="50%"
          cy="50%"
          outerRadius={60}
          fill="#8884d8"
          label
        >
          {sorted.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieCharts;
