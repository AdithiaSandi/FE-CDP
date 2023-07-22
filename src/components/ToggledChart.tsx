import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { REST } from "../assets/interfaces";
import { Checkbox, FormControlLabel } from "@mui/material";
import { useEffect, useState } from "react";

interface props {
  data: REST[];
}

interface daily {
  date: string | Date;
  Borderland: number;
  "COD: Cold War": number;
  Amazon: number;
  Overwatch: number;
  Xbox: number;
  Total: number;
}

const ToggledChart: React.FC<props> = ({ data }) => {
  const [showed, setShowed] = useState<string[]>(["Total"]);
  // const [sorted, setSorted] = useState<number>();

  const unique = [...new Set(data.map((item) => item.source))];

  const uniqueDate = [
    ...new Set(data.map((item) => item.datetime.split(" ")[0])),
  ];

  const dailyPost: daily[] = uniqueDate.map((date) => {
    let count = 0;
    let Borderlands = 0;
    let Cold_War = 0;
    let Amazon = 0;
    let Overwatch = 0;
    let Xbox = 0;
    data.map((item) => {
      if (item.datetime.split(" ")[0] == date) {
        count++;
        unique.map((category) => {
          if (item.source == category) {
            switch (category) {
              case "Borderlands":
                Borderlands++;
                break;
              case "CallOfDutyBlackopsColdWar":
                Cold_War++;
                break;
              case "Amazon":
                Amazon++;
                break;
              case "Overwatch":
                Overwatch++;
                break;
              case "Xbox(Xseries)":
                Xbox++;
                break;
              default:
                break;
            }
          }
        });
      }
    });
    return {
      date: date,
      Borderland: Borderlands,
      "COD: Cold War": Cold_War,
      Amazon: Amazon,
      Overwatch: Overwatch,
      Xbox: Xbox,
      Total: count,
    };
  }).sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const options: string[] = [
    "Total",
    "Amazon",
    "Borderland",
    "COD: Cold War",
    "Overwatch",
    "Xbox",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = e.target.id;
    if (showed.includes(id)) {
      setShowed((prev) => prev.filter((item) => item !== id));
    } else {
      const temp = [...showed, id];
      setShowed(temp);
    }
  };

  useEffect(() => {
    const sortedDates = [...dailyPost].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    console.log(sortedDates);
  }, [dailyPost]);

  return (
    <>
      <div
        className="checkbox-container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        {options.map((item) => {
          return (
            <FormControlLabel
              control={
                <Checkbox
                  defaultChecked={item === "Total" ? true : false}
                  onChange={(e) => handleChange(e)}
                  id={item}
                  disabled={
                    (document.getElementById(item) as HTMLInputElement | null)
                      ?.checked === true && showed.length == 1
                  }
                />
              }
              label={item}
            />
          );
        })}
      </div>
      <ResponsiveContainer width="100%" height="50%">
        <LineChart
          width={500}
          height={300}
          data={dailyPost}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          {showed.map((name) => {
            return (
              <Line
                type="monotone"
                dataKey={name}
                stroke={
                  name == "Total"
                    ? "black"
                    : name == "Borderland"
                    ? "red"
                    : name == "COD: Cold War"
                    ? "blue"
                    : name == "Amazon"
                    ? "green"
                    : name == "Overwatch"
                    ? "purple"
                    : "gray"
                }
              />
            );
          })}
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export default ToggledChart;
