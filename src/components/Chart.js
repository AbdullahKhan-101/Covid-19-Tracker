import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const BarChart = ({ data, country }) => {
  return (
    <div>
      <Bar
        style={{ maxHeight: 400 }}
        data={{
          labels: ["Infected", "Recovered", "Deaths"],
          datasets: [
            {
              label: "People",
              backgroundColor: [
                "rgba(0, 0, 255, 0.5)",
                "rgba(0, 255, 0, 0.5)",
                "rgba(255, 0, 0, 0.5)",
              ],
              data: [
                data?.confirmed.value,
                data?.recovered.value,
                data?.deaths.value,
              ],
              // data: [2002, 100, 300],
            },
          ],
        }}
        options={{
          legend: { display: false },
          title: {
            display: true,
            text: `Current state in ${country && country}`,
          },
        }}
      />
      {/* <Bar
        data={{
          labels: ["Infected", "Recovered", "Deaths"],
          datasets: [
            {
              label: "People",
              backgroundColor: [
                "rgba(0, 0, 255, 0.5)",
                "rgba(0, 255, 0, 0.5)",
                "rgba(255, 0, 0, 0.5)",
              ],
              // data: [confirmed.value, recovered.value, deaths.value],
              data: [2002, 100, 300],
            },
          ],
        }}
        options={{
          legend: { display: false },
          title: { display: true, text: `Current state in ${"country"}` },
        }}
      /> */}
    </div>
  );
};

export default BarChart;
