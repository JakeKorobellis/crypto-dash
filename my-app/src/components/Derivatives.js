import React from "react";
import loadinfIcon from "./images/Spinner-1s-200px (1).gif";

export default function Derivatives(props) {
  const [data, setData] = React.useState("");

  React.useEffect(() => {
    fetch("https://api.coingecko.com/api/v3/derivatives/exchanges")
      .then((res) => res.json())
      .then((res) => setData(res));
  }, []);

  const renderData =
    data != "" ? (
      data.map((curr) => {
        return (
          <div className="display-flex-deriv">
            <div className="mimmick-deriv-render">
              <img src={curr.image} />
            </div>
            <div className="even-deriv">{curr.name}</div>
            <div className="even-deriv">{curr.number_of_futures_pairs}</div>
            <div className="even-deriv">{curr.number_of_perpetual_pairs}</div>
            <div className="even-deriv">
              {curr.open_interest_btc != null ? (
                curr.open_interest_btc
              ) : (
                <div>N/A</div>
              )}
            </div>
            <div className="even-deriv">{curr.trade_volume_24h_btc}</div>
            <div className="even-deriv">
              <a href={curr.url} target="_blank" className="a-exhcange-links">
                Visit!
              </a>
            </div>
          </div>
        );
      })
    ) : (
      <div></div>
    );

  return (
    <div>
      <div className="header-body-list cpi-adjust yield-adjust extra-room-top">
        <h1>Derivative Exchanges</h1>
        <div className="display-flex-deriv padding-left-deriv">
          <div className="even-deriv">Name</div>
          <div className="even-deriv">Future Pairs</div>
          <div className="even-deriv">Perpetural Pairs</div>
          <div className="even-deriv">Open Interest (BTC)</div>
          <div className="even-deriv">Trade Volume (BTC)</div>
          <div className="even-deriv padding-right-deriv">Link</div>
        </div>
      </div>
      <div className="derviv-render-align">
        {data != "" ? renderData : <img src={loadinfIcon} />}
      </div>
    </div>
  );
}
