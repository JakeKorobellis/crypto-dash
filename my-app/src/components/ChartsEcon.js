import searchable from "./searchable";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import loadinfIcon from "./images/Spinner-1s-200px (1).gif";

import React from "react";
import { nanoid } from "nanoid";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

export default function ChartsEcon(props) {
  const [tempData, setTempData] = React.useState("");

  React.useEffect(() => {
    fetch("https://www.econdb.com/api/series/CPIUS/?format=json")
      .then((res) => res.json())
      .then((res) => setTempData(res));
  }, []);

  console.log(tempData);

  const content =
    tempData != "" ? (
      {
        labels: tempData.data.dates,
        datasets: [
          {
            label: tempData.description,
            data: tempData.data.values,
            fill: true,
            backgroundColor: "rgba(75,192,192,0.2)",
            borderColor: "rgba(75,192,192,1)",
          },
        ],
      }
    ) : (
      <h1>Please Search for A Data Set</h1>
    );

  const items = searchable;

  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    console.log(string, results);
  };

  const handleOnHover = (result) => {
    // the item hovered
    console.log(result);
  };

  const handleOnSelect = (item) => {
    // the item selected
    fetch(`https://www.econdb.com/api/series/${item.value}/?format=json`)
      .then((res) => res.json())
      .then((res) => setTempData(res));
  };

  const handleOnFocus = () => {
    console.log("Focused");
  };

  const formatResult = (item) => {
    return (
      <>
        <span style={{ display: "block", textAlign: "left" }}>{item.name}</span>
      </>
    );
  };

  return (
    <div>
      <div className="header-body-list cpi-adjust yield-adjust extra-room-top">
        <h1>Econ Charts</h1>
        <div style={{ width: 400 }}>
          <ReactSearchAutocomplete
            items={items}
            onSearch={handleOnSearch}
            onHover={handleOnHover}
            onSelect={handleOnSelect}
            onFocus={handleOnFocus}
            autoFocus
            formatResult={formatResult}
          />
        </div>
      </div>

      {tempData != "" ? (
        <Line data={content} className="charts-econ" />
      ) : (
        <img src={loadinfIcon} />
      )}
    </div>
  );
}
