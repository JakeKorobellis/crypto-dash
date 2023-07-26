import React from "react";
import { nanoid } from "nanoid";

export default function Body(props) {
  //Rendering the intial body list
  const render =
    props.data != []
      ? props.data.map((curr) => {
          return (
            <div key={nanoid()} className="list-content">
              <div className="icon-holder">
                <img src={curr.image} className="crypto-icons" />
              </div>

              <div className="ticker-holder">{curr.symbol.toUpperCase()}</div>
              <div className="name-holder">{curr.name}</div>
              <div className="price-holder">
                {curr.current_price > 0.001
                  ? curr.current_price.toFixed(2)
                  : curr.current_price.toFixed(6)}
              </div>
              <div className="high-holder">
                {curr.low_24h > 0.001
                  ? curr.low_24h.toFixed(2)
                  : curr.low_24h.toFixed(6)}
              </div>
              <div className="low-holder">
                {curr.high_24h > 0.001
                  ? curr.high_24h.toFixed(2)
                  : curr.high_24h.toFixed(6)}
              </div>
              <div className="twentyfour-change">
                {curr.price_change_percentage_24h.toFixed(2)}%
              </div>
              <div className="all-time-high-change">
                {curr.ath_change_percentage.toFixed(2)}%
              </div>
              <div className="volume">{curr.total_volume}</div>
            </div>
          );
        })
      : console.log("loading");
  //************************************

  return (
    <div>
      <div className="header-body-list">
        <div className="one">Symbol</div>
        <div className="two">Name</div>
        <div className="three">Current Price (USD)</div>
        <div className="four">24hr Low</div>
        <div className="five">24hr High</div>
        <div className="six">Change (24hr)</div>
        <div className="seven">Change (ATH)</div>
        <div className="eight">Current Volume (USD)</div>
      </div>
      <div className="popular-items">{render}</div>
    </div>
  );
}
