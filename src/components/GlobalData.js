import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { NumericFormat } from "react-number-format";

export default function GlobalData() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const apiCall = async () => {
      setLoading(true);
      const response = await fetch("https://covid19.mathdro.id/api");
      const jsonData = await response.json();
      setData(jsonData);
      setLoading(false);
    };
    apiCall();
  }, []);

  if (loading) {
    return (
      <Box
        style={{ fontWeight: "bold" }}
        sx={{
          "& > :not(style)": {
            m: 2,
            height: 128,
            textAlign: "center",
          },
        }}
      >
        <Paper elevation={3}>
          <Typography variant="h4" gutterBottom>
            Loading...
          </Typography>
          Global Data
        </Paper>
        <Paper elevation={3}>
          <Typography variant="h4" gutterBottom>
            Loading...
          </Typography>
          Global Data
        </Paper>
        <Paper elevation={3} style={{ color: "green" }}>
          <Typography variant="h4" gutterBottom>
            Loading...
          </Typography>
          RECOVERED
        </Paper>
        <Paper elevation={3} style={{ color: "red" }}>
          <Typography variant="h4" gutterBottom>
            Loading...
          </Typography>
          FATALITIES
        </Paper>
      </Box>
    );
  }

  return (
    <Box
      style={{ fontWeight: "bold" }}
      sx={{
        "& > :not(style)": {
          m: 2,
          height: 128,
          textAlign: "center",
        },
      }}
    >
      <Paper elevation={3}>
        <Typography variant="h4" gutterBottom>
          <NumericFormat
            value={data && data.confirmed.value}
            displayType={"text"}
            thousandSeparator=","
          />
        </Typography>
        GLOBAL DATA OF TODAY
      </Paper>
      <Paper elevation={3} style={{ color: "orange" }}>
        <Typography variant="h4" gutterBottom>
          <NumericFormat
            value={data && data.confirmed.value - data.deaths.value}
            displayType={"text"}
            thousandSeparator={true}
          />
        </Typography>
        ACTIVE
      </Paper>
      <Paper elevation={3} style={{ color: "green" }}>
        <Typography variant="h4" gutterBottom>
          <NumericFormat
            value={data && data.recovered.value}
            displayType={"text"}
            thousandSeparator={true}
          />
        </Typography>
        RECOVERED
      </Paper>
      <Paper elevation={3} style={{ color: "red" }}>
        <Typography variant="h4" gutterBottom>
          <NumericFormat
            value={data && data.deaths.value}
            displayType={"text"}
            thousandSeparator={true}
          />
        </Typography>
        FATALITIES
      </Paper>
    </Box>
  );
}
