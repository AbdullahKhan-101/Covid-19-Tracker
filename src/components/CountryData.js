import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Paper } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { NumericFormat } from "react-number-format";
import BarChart from "./Chart";

const CountryData = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [age, setAge] = useState("");
  const [country, setCountry] = useState("");

  useEffect(() => {
    const countryAPI = async () => {
      const response = await fetch("https://covid19.mathdro.id/api/countries");
      const jsonData = await response.json();
      setCountry(jsonData);
    };
    const apiCall = async () => {
      setLoading(true);
      const response = await fetch(
        "https://covid19.mathdro.id/api/countries/US"
      );
      const jsonData = await response.json();
      setData(jsonData);
      setLoading(false);
    };
    apiCall();
    countryAPI();
  }, []);

  const handleChange = (e) => {
    setAge(e.target.value);
    const getCountryData = async () => {
      setLoading(true);
      const response = await fetch(
        `https://covid19.mathdro.id/api/countries/${e.target.value}`
      );
      const jsonData = await response.json();
      setData(jsonData);
      setLoading(false);
    };
    getCountryData();
  };

  if (loading) {
    return (
      <div>
        <Box sx={{ flexGrow: 1, textAlign: "center" }}>
          <Grid container spacing={2} sx={{ padding: 2 }}>
            <Grid item xs={12}>
              <Paper elevation={3}>
                <FormControl variant="standard" sx={{ width: "100%" }}>
                  <span
                    style={{
                      transform: !age ? "translateY(22px)" : "",
                      zIndex: "10",
                    }}
                  >
                    Select country
                  </span>
                  <Select
                    sx={{ background: "white", padding: 1 }}
                    id="demo-simple-select-standard"
                    value={age}
                    onChange={handleChange}
                  >
                    {country &&
                      country.countries.map((item, index) => (
                        <MenuItem key={index} value={item.iso2}>
                          {item.name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper sx={{ padding: 0.2 }} elevation={3}>
                <h2>Loading...</h2>
                <h3>CONFIRMED</h3>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={3} sx={{ padding: 0.2, color: "green" }}>
                <h2>Loading...</h2>
                <h3>RECOVERED</h3>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={3} sx={{ padding: 0.2, color: "red" }}>
                <h2>Loading...</h2>
                <h3>FATALITIES</h3>
              </Paper>
            </Grid>
          </Grid>
        </Box>
        {/* <Chart /> */}
      </div>
    );
  }

  return (
    <div>
      <Box sx={{ flexGrow: 1, textAlign: "center" }}>
        <Grid container spacing={2} sx={{ padding: 2 }}>
          <Grid item xs={12}>
            <Paper elevation={3}>
              <FormControl variant="standard" sx={{ width: "100%" }}>
                <span
                  style={{
                    transform: !age ? "translateY(22px)" : "",
                    zIndex: "10",
                  }}
                >
                  Select country
                </span>
                <Select
                  sx={{ background: "white", padding: 1 }}
                  id="demo-simple-select-standard"
                  value={age}
                  onChange={handleChange}
                >
                  {country &&
                    country.countries.map((item, index) => (
                      <MenuItem key={index} value={item.iso2}>
                        {item.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ padding: 0.2 }} elevation={3}>
              <h2>
                <NumericFormat
                  value={data && data.confirmed.value}
                  displayType={"text"}
                  thousandSeparator=","
                />
              </h2>

              <h3>CONFIRMED</h3>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ padding: 0.2, color: "green" }}>
              <h2>
                <NumericFormat
                  value={data && data.recovered.value}
                  displayType={"text"}
                  thousandSeparator=","
                />
              </h2>
              <h3>RECOVERED</h3>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ padding: 0.2, color: "red" }}>
              <h2>
                <NumericFormat
                  value={data && data.deaths.value}
                  displayType={"text"}
                  thousandSeparator=","
                />
              </h2>
              <h3>FATALITIES</h3>
            </Paper>
          </Grid>
        </Grid>
      </Box>
      <BarChart data={data} country={age} />
    </div>
  );
};

export default CountryData;
