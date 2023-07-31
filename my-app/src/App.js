import "./App.css";
import Header from "./components/Header";
import React from "react";
import Body from "./components/body";
import Nav from "./components/Nav";
import { Routes, Route } from "react-router-dom";
import Categories from "./components/Categories";
import News from "./components/News";
import CurrencyRates from "./components/CurrencyRates";
import CoinSearch from "./components/CoinSearch";
import Earnings from "./components/Earnings";
import Indices from "./components/indices";
import Cpi from "./components/Cpi";
import Yield from "./components/Yield";
import ChartsEcon from "./components/ChartsEcon";
import Exchanges from "./components/Exchanges";
import Derivatives from "./components/Derivatives";

function App() {
  const screen = window.screen; // or const { width } = window.screen;
  const width = screen.width;
  //5 most pop state
  const [fiveMost, setFiveMost] = React.useState(null);
  //Body List state
  const [bodyList, setBodyList] = React.useState([]);

  React.useEffect(() => {
    /*
    //Tredning Searches
    fetch("https://api.coingecko.com/api/v3/search/trending")
      .then((res1) => res1.json())
      .then((res1) => console.log(res1));
      */
    //Body List
    fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
    )
      .then((res3) => res3.json())
      .then((res3) => setBodyList(res3));
  }, []);
  return (
    <div className={width > 500 ? "App" : "app-phone"}>
      <div className="parent">
        <div className="div1">
          <Header />{" "}
        </div>
        <div className="div2">
          <Nav />{" "}
        </div>
        <div className="div3">
          <Routes>
            <Route path="/" element={<Body data={bodyList} />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/news" element={<News />} />
            <Route path="/currency-rates" element={<CurrencyRates />} />
            <Route path="/coin-search" element={<CoinSearch />} />
            <Route path="/money-supply" element={<Earnings />} />
            <Route path="/crypto-charts" element={<Indices />} />
            <Route path="/consumer" element={<Cpi />} />
            <Route path="/yield" element={<Yield />} />
            <Route path="/econ-charts" element={<ChartsEcon />} />
            <Route path="/exchange-data" element={<Exchanges />} />
            <Route path="/derivatives" element={<Derivatives />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
//          <Body data={bodyList} />
