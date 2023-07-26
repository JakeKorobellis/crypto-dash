import React from "react";
import { nanoid } from "nanoid";

export default function Categories(props) {
  //Crypto Category Info State
  const [exchangeData, setExchangeData] = React.useState([]);
  console.log(exchangeData);
  React.useEffect(() => {
    fetch("https://api.coingecko.com/api/v3/coins/categories")
      .then((res) => res.json())
      .then((res) => setExchangeData(res));
  }, []);

  const render =
    exchangeData != []
      ? exchangeData.map((curr) => {
          return (
            <div className="exchange-data-holder" key={nanoid()}>
              <div className="cat-name" key={nanoid()}>
                {curr.name}
              </div>
              <div key={nanoid()} className="cat-mc">
                {curr.market_cap === null ? "N/A" : curr.market_cap.toFixed(0)}
              </div>
              <div key={nanoid()} className="cat-mc-change">
                {curr.market_cap_change_24h === null
                  ? "N/A"
                  : curr.market_cap_change_24h.toFixed(2)}
                %
              </div>
              <div key={nanoid()} className="cat-vol">
                {curr.volume_24h === null ? "N/A" : curr.volume_24h.toFixed(0)}
              </div>
              <div key={nanoid()} className="cat-top-three">
                {curr.top_3_coins.map((currImg) => {
                  return (
                    <img src={currImg} key={nanoid()} className="cat-img" />
                  );
                })}
              </div>
              <div key={nanoid()} className="cat-update">
                {curr.updated_at}
              </div>
            </div>
          );
        })
      : console.log("loading");

  return (
    <div>
      <div className="header-body-list">
        <div className="cat-name-collum">Name</div>
        <div className="cat-mc-collum">Market Cap (USD)</div>
        <div className="cat-mc-change-collum">Change (24hr)</div>
        <div className="cat-vol-collum">Volume (USD)</div>
        <div className="cat-top-three-collum">Top Three Coins</div>
        <div className="cat-update-collum">Updated</div>
      </div>
      <div className="popular-items ">{render}</div>
    </div>
  );
}
