import React from "react";
import parse from "html-react-parser";

export default function News(props) {
  //Please add if 'keywords/related-coins' is N/A dont change the formating

  //Crypto News State

  const [cryptoNews, setCryptoNews] = React.useState([]);

  React.useEffect(() => {
    fetch("https://api.coinstats.app/public/v1/news?skip=0&limit=200")
      .then((res) => res.json())
      .then((res) => setCryptoNews(res.news));
  }, []);

  const render =
    cryptoNews != []
      ? cryptoNews.map((curr) => {
          return (
            <div className="news-holder-crypto-two">
              <div className="crypto-news-title-holder-two">
                {curr.title.length > 40
                  ? curr.title.substring(0, 40) + "..."
                  : curr.title}
              </div>
              <div className="crypto-source">
                {curr.source.length > 17
                  ? curr.source.substring(0, 17) + "..."
                  : curr.source}
              </div>

              <div className="crypto-links">
                <a href={curr.link} className="a-crypto" target="_blank">
                  Read More
                </a>
              </div>

              {curr.searchKeyWords.length > 3 ? (
                <div className="search-keywords-crypto">
                  {" "}
                  <div className="indiviual-keywords">
                    {curr.searchKeyWords[1].length > 10
                      ? curr.searchKeyWords[1].substring(0, 10) + ", "
                      : curr.searchKeyWords[1] + ", "}
                  </div>{" "}
                  <div className="indiviual-keywords">
                    {curr.searchKeyWords[2].length > 10
                      ? curr.searchKeyWords[2].substring(0, 10) + ", "
                      : curr.searchKeyWords[2] + ", "}
                  </div>{" "}
                  <div className="indiviual-keywords">
                    {curr.searchKeyWords[3].length > 10
                      ? curr.searchKeyWords[3].substring(0, 10)
                      : curr.searchKeyWords[3]}
                  </div>
                </div>
              ) : (
                console.log("none")
              )}

              <div className="related-coins">
                {curr.coins.map((currCoin) => {
                  return (
                    <div className="individual-related-coins">
                      {currCoin.coinKeyWords.toUpperCase()}{" "}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })
      : console.log("loadin");

  return (
    <div className="news-holder">
      <div className="crypto-news">
        <h2 className="crypto-news-title">Latest Crypto News</h2>
        <div className="crypto-news-columns">
          <h4 className="crypto-news-one">Title</h4>
          <h4 className="crypto-news-two">Source</h4>
          <h4 className="crypto-news-three">Link</h4>
          <h4 className="crypto-news-four">Keywords</h4>
          <h4 className="crypto-news-five">Related Coins</h4>
        </div>
        <div className="news-content-holder">{render}</div>
      </div>
    </div>
  );
}
