import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import GlobalData from "./GlobalData";
import CountryData from "./CountryData";

export default function MainGrid() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <GlobalData />
        </Grid>
        <Grid item xs={12} md={9}>
          <CountryData />
        </Grid>
      </Grid>
    </Box>
  );
}
