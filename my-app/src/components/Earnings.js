import React from "react";
import loadinfIcon from "./images/Spinner-1s-200px (1).gif";

import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

export default function Earnings(props) {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    fetch("https://www.econdb.com/api/series/M3US/?format=json")
      .then((res) => res.json())
      .then((res) => setData(res));
  }, []);

  console.log(data);

  const content =
    data != "" ? (
      {
        labels: data.data.dates,
        datasets: [
          {
            label: `Money Supply - Scale: Billions`,
            data: data.data.values,
            fill: true,
            backgroundColor: "rgba(75,192,192,0.2)",
            borderColor: "rgba(75,192,192,1)",
          },
        ],
      }
    ) : (
      <h1>Please Search for A Data Set</h1>
    );

  return (
    <div>
      <div className="selction-exchange-head">
        <h3 className="exchange-title money-supply-header">US Money Supply</h3>
      </div>
      {data != "" ? (
        <Line data={content} className="charts-econ" />
      ) : (
        <img src={loadinfIcon} />
      )}
    </div>
  );
}
