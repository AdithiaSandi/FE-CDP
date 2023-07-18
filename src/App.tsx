import {
  Avatar,
  Button,
  IconButton,
  Stack,
  Switch,
  Tooltip,
  Typography,
} from "@mui/material";
import "./App.css";
import "./assets/links.ts";
import * as links from "./assets/links.ts";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import DateRangeRoundedIcon from "@mui/icons-material/DateRangeRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import { pink } from "@mui/material/colors";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import { useEffect, useState } from "react";
import { REST } from "./assets/interfaces.ts";
import MainChart from "./components/MainChart.tsx";
import ToggledChart from "./components/ToggledChart.tsx";

function App() {
  const [checked, setChecked] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [data, setData] = useState<REST[]>([]);
  const [mode, setMode] = useState(
    window.innerWidth <= 768 ? "mobile" : "default"
  );

  const handleChange = () => {
    setChecked(!checked);
    setTheme((theme) => (theme === "dark" ? "light" : "dark"));
    document.body.style.backgroundColor = theme == "dark" ? "black" : "white";
  };

  const options = { method: "GET" };

  useEffect(() => {
    getData();
    const handelResize = () => {
      setMode(window.innerWidth <= 768 ? "mobile" : "default");
    };
    window.addEventListener("resize", handelResize);
    return () => {
      window.removeEventListener("resize", handelResize);
    };
  }, []);

  function getData() {
    fetch("https://ivanbudianto.github.io/test-json/test.json", options)
      .then((res) => res.json())
      .then((res: REST[]) => {
        setData(res);
      })
      .catch((err) => console.log(err));
  }

  const menu = [
    { name: "Dashboard", icon: HomeRoundedIcon },
    { name: "Task", icon: AssignmentRoundedIcon },
    { name: "Schedule", icon: DateRangeRoundedIcon },
    { name: "Settings", icon: SettingsRoundedIcon },
  ];

  return (
    <div className={"main-container "} style={{ color: pink[200] }}>
      {/* SIDE */}
      <div
        className="side"
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          // paddingTop: "20vh",
        }}
      >
        <Avatar
          alt="profile-picture"
          src={links.profile_picture}
          style={{
            height: "100px",
            width: "100px",
          }}
        />
        <Typography
          style={{
            marginBottom: "2rem",
          }}
        >
          Admin
        </Typography>

        {/* ICONS */}
        <div
          className="menu-container"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            marginBottom: "10rem",
          }}
        >
          {menu.map((items) => {
            return (
              <Button
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "left",
                  width: "100%",
                }}
                sx={{ color: pink[200] }}
              >
                <Tooltip title={items.name} placement="left-start">
                  <IconButton>
                    <items.icon sx={{ color: pink[200] }} />
                  </IconButton>
                </Tooltip>
                <Typography hidden={mode == "mobile" ? true : false}>
                  {items.name}
                </Typography>
              </Button>
            );
          })}
          {/* <Tooltip title="Dashboard" placement="left-start">
            <IconButton>
              <HomeRoundedIcon sx={{ color: pink[200] }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Task" placement="left-start">
            <IconButton>
              <AssignmentRoundedIcon sx={{ color: pink[200] }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Schedule" placement="left-start">
            <IconButton>
              <DateRangeRoundedIcon sx={{ color: pink[200] }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Settings" placement="left-start">
            <IconButton>
              <SettingsRoundedIcon sx={{ color: pink[200] }} />
            </IconButton>
          </Tooltip> */}
        </div>

        {/* SWITCH */}
        <Stack direction="row" alignItems="center">
          <Brightness4Icon sx={{ color: pink[200] }} />
          <Switch
            checked={checked}
            onChange={handleChange}
            inputProps={{ "aria-label": "controlled" }}
          />
        </Stack>
      </div>

      {/* MAIN */}
      <div className="main">
        <div className="header"></div>
        <div className="content">
          <Typography
            style={{
              textAlign: "center",
            }}
          >
            Total Engagement
          </Typography>
          <MainChart data={data} />
          <Typography
            style={{
              textAlign: "center",
            }}
          >
            Daily Engagement
          </Typography>
          <ToggledChart data={data} />
        </div>
        <div className="footer"></div>
      </div>
    </div>
  );
}

export default App;
