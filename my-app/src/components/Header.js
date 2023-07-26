import React from "react";
import chartImage from "../components/images/bar-chart.png";
import bellImage from "../components/images/bell (1).png";
import userImage from "../components/images/user (1).png";
import Logo from "../components/images/blockchain.png";
import Marquee from "react-fast-marquee";
import parse from "html-react-parser";

export default function Header(props) {
  const [trending, setTrending] = React.useState("");
  const [decentral, setDecentral] = React.useState("");
  const [global, setGlobal] = React.useState("");

  React.useEffect(() => {
    fetch("https://api.coingecko.com/api/v3/search/trending")
      .then((res) => res.json())
      .then((res) => setTrending(res));
  }, []);

  React.useEffect(() => {
    fetch("https://api.coingecko.com/api/v3/global/decentralized_finance_defi")
      .then((res1) => res1.json())
      .then((res1) => setDecentral(res1));
  }, []);

  React.useEffect(() => {
    fetch("https://api.coingecko.com/api/v3/global")
      .then((res) => res.json())
      .then((res) => setGlobal(res));
  }, []);

  console.log(decentral.data);
  //console.log(global);

  const renderDecentral =
    decentral != "" ? (
      <div className="decen-gap">
        <div>${parseInt(decentral.data.defi_market_cap)}</div>
        <div>
          {" "}
          <span className="gray">DeFI/Eth Ratio:</span>{" "}
          {parseInt(decentral.data.defi_to_eth_ratio)}%
        </div>
        <div>
          <span className="gray">DeFi Volume: </span>$
          {parseInt(decentral.data.trading_volume_24h)}
        </div>
        <div>
          <span className="gray">DeFi Top Coin: </span>
          {decentral.data.top_coin_name}
        </div>
      </div>
    ) : (
      console.log("loading")
    );

  const renderTrend =
    trending != ""
      ? trending.coins.map((curr) => {
          return (
            <div className="holder-items-marquee">
              {" "}
              <div className="image-ticker-marqee">
                {" "}
                <img src={curr.item.small} className="style-logo-marquee" />
                {curr.item.symbol}
              </div>{" "}
              <div>{curr.item.name}</div>
            </div>
          );
        })
      : console.log("loading");

  return (
    <div className="header">
      <div className="title">
        <img src={Logo} className="logo" />
        Market Scrape
      </div>
      <div className="style-marquee">
        <Marquee
          style={{
            width: "60vw",
            height: "5vh",
          }}
          gradient={false}
          speed={20}
        >
          <div className="rotate-title">Trending Coins:</div> {renderTrend}{" "}
          <div className="rotate-title-dece">DeFi Market Cap: </div>
          <div>{renderDecentral}</div>
        </Marquee>
      </div>

      <div className="profile-icons">
        <img src={chartImage} className="icons" />
        <img src={bellImage} className="icons" />
        <img src={userImage} className="icons" />
      </div>
    </div>
  );
}
