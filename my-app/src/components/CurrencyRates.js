import React from "react";

export default function CurrencyRates(props) {
  //Currency Rates
  const [currecny, setCurrecny] = React.useState([]);

  React.useEffect(() => {
    fetch("https://api.coinstats.app/public/v1/fiats")
      .then((res) => res.json())
      .then((res) => setCurrecny(res));
  }, []);

  const render =
    currecny != [] ? (
      currecny.map((curr) => {
        return (
          <div className="curr-currency-holder">
            <div className="multi-holder-curr-img-and-name">
              <div className="currimage-holder">
                <div>
                  <img src={curr.imageUrl} className="img-curr-rate" />{" "}
                </div>
              </div>
              <div className="curr-currency-name">{curr.name}</div>
            </div>
            <div className="curr-currency-rate">
              <div>
                {curr.symbol} {curr.rate.toFixed(2)}{" "}
              </div>
            </div>
          </div>
        );
      })
    ) : (
      <div></div>
    );

  return (
    <div className="holder-currecny-rate">
      <div className="header-body-list title-two">
        <div className="curr-title-move"> Currency rates against the USD </div>
        <div className="curr-currency-rate-collumns">
          <div className="curr-currency-rate-country">Country</div>
          <div className="curr-currency-rate-USD">Against the USD</div>
        </div>
      </div>

      {render}
    </div>
  );
}
