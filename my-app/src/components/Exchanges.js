import React from "react";
import { nanoid } from "nanoid";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import exchangeData from "./dataExchanges";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

export default function Exchanges(props) {
  const [exchangeDataOne, setExchangeData] = React.useState("");
  const [chartData, setChartData] = React.useState("");
  console.log(chartData);
  const items = exchangeData;

  const handleOnSelect = (item) => {
    //Will call on select
    fetch(`https://api.coingecko.com/api/v3/exchanges/${item.id}`)
      .then((res) => res.json())
      .then((res) => setExchangeData(res));

    fetch(
      `https://api.coingecko.com/api/v3/exchanges/${item.id}/volume_chart?days=180`
    )
      .then((res) => res.json())
      .then((res) => setChartData(res));
  };

  const formatResult = (item) => {
    return (
      <>
        <span className="search-result-crypto-charts">
          <img src={item.image} className="img-prev-exchange" />
          {item.name}
        </span>
      </>
    );
  };

  console.log(exchangeDataOne);
  const renderExchangeInfoOne =
    exchangeDataOne != "" ? (
      <div class="parent-exchange-info">
        <div class="div1-exchange-info">
          {" "}
          <img src={exchangeDataOne.image} /> <div>{exchangeDataOne.name}</div>{" "}
          {exchangeDataOne.country}
        </div>
        <div class="div2-exchange-info">
          {" "}
          <div>Volume 24hr (BTC):</div>{" "}
          {exchangeDataOne.trade_volume_24h_btc.toFixed(2)}{" "}
        </div>
        <div class="div3-exchange-info">
          {" "}
          <div className="trustscore-exchange">
            <div>Trust Score</div>
            <div>Trust Rank</div> <div>Year Created</div>
          </div>
          <div className="trustscore-render">
            <div>{exchangeDataOne.trust_score}</div>{" "}
            <div>{exchangeDataOne.trust_score_rank}</div>{" "}
            {exchangeDataOne.year_established}
          </div>
        </div>
        <div class="div4-exchange-info">
          {" "}
          <a
            href={exchangeDataOne.url}
            target="_blank"
            className="a-exhcange-links-website"
          >
            Visit!
          </a>
        </div>
      </div>
    ) : (
      console.log("loading")
    );

  const renderTheCoins =
    exchangeDataOne != ""
      ? exchangeDataOne.tickers.map((curr) => {
          return (
            <div className="holder-coins-exchange">
              <div className="span-titles-exchange">{curr.base}</div>
              <div className="span-titles-exchange">
                {curr.converted_last.usd}
              </div>
              <div className="span-titles-exchange">
                {curr.converted_volume.usd}
              </div>
              <div className="span-titles-exchange">
                {curr.bid_ask_spread_percentage.toFixed(2)}
              </div>
              <div className="span-titles-exchange">
                <a
                  href={curr.trade_url}
                  target="_blank"
                  className="a-exhcange-links"
                >
                  Trade
                </a>
              </div>
            </div>
          );
        })
      : console.log("error retreviving");

  const content =
    chartData != "" ? (
      {
        labels: chartData.map((curr) => curr.indexOf(curr[0])),
        datasets: [
          {
            label: `The past ${chartData.length} Days`,
            data: chartData.map((curr) => curr[1]),
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
    <div className="holder-total-exchange">
      <div className="header-body-list cpi-adjust yield-adjust extra-room-top">
        <h1>Exchange Data</h1>
        <div style={{ width: 400 }}>
          <ReactSearchAutocomplete
            items={items}
            onSelect={handleOnSelect}
            autoFocus
            formatResult={formatResult}
          />
        </div>
      </div>
      {chartData != "" ? (
        <div class="parent-exchange">
          <div class="div1-exchange">
            {" "}
            <div className="title-coins-exchanges">
              <span className="span-titles-exchange">Coin</span>
              <span className="span-titles-exchange">Last</span>
              <span className="span-titles-exchange">Volume</span>
              <span className="span-titles-exchange">Spread %</span>
              <span className="span-titles-exchange">Trade</span>
            </div>
            {renderTheCoins}
          </div>
          <div class="div2-exchange">{renderExchangeInfoOne}</div>
          <div class="div3-exchange">
            <h2 className="volume-chart-exchange">Volume Chart</h2>{" "}
            {chartData != "" ? (
              <Line data={content} className="charts-econ" />
            ) : (
              <h3 className="preview-chart-crypto">
                Please Select an Exchange!
              </h3>
            )}
          </div>
        </div>
      ) : (
        <h2 className="preview-chart-crypto">Please Select an Exchange</h2>
      )}
    </div>
  );
}
