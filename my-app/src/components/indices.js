import React from "react";
import loadinfIcon from "./images/Spinner-1s-200px (1).gif";

import searchable from "./searchable";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

export default function Indices(props) {
  const [searchResult, setSearchResult] = React.useState("");
  const [chartData, setChartData] = React.useState("");

  const items = searchResult;

  const handleOnSearch = (string, results) => {
    //Will call api
    console.log(string, results);
    fetch(`https://api.coingecko.com/api/v3/search?query=${string}`)
      .then((res) => res.json())
      .then((res) => setSearchResult(res.coins));
  };

  const handleOnSelect = (item) => {
    //Will call on select
    console.log(item);
    fetch(
      `https://api.coingecko.com/api/v3/coins/${item.id}/market_chart?vs_currency=usd&days=1500&interval=daily`
    )
      .then((res) => res.json())
      .then((res) => setChartData(res));
  };

  const formatResult = (item) => {
    return (
      <>
        <span className="search-result-crypto-charts">
          <img src={item.thumb} />
          {item.name}
        </span>
      </>
    );
  };
  console.log(chartData);
  //Chart Data

  const content =
    chartData != "" ? (
      {
        labels: chartData.prices.map((curr) => curr.indexOf(curr[0])),
        datasets: [
          {
            label: `The past ${chartData.prices.length} Days`,
            data: chartData.prices.map((curr) => curr[1]),
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
      <div className="header-body-list cpi-adjust yield-adjust extra-room-top">
        <h1>Crypto Charts</h1>
        <div style={{ width: 400 }}>
          <ReactSearchAutocomplete
            items={items}
            onSearch={handleOnSearch}
            onSelect={handleOnSelect}
            autoFocus
            formatResult={formatResult}
          />
        </div>
      </div>
      {chartData != "" ? (
        <Line data={content} className="charts-econ" />
      ) : (
        <h3 className="preview-chart-crypto">Please Select a Coin!</h3>
      )}
    </div>
  );
}
