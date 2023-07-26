import React from "react";
import { nanoid } from "nanoid";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import loadinfIcon from "./images/Spinner-1s-200px (1).gif";
import parse from "html-react-parser";

export default function CoinSearch(props) {
  const [searchResult, setSearchResult] = React.useState("");
  const [coinResult, setCoinResult] = React.useState("");

  const items = searchResult;

  const handleOnSearch = (string, results) => {
    //Will call api
    fetch(`https://api.coingecko.com/api/v3/search?query=${string}`)
      .then((res) => res.json())
      .then((res) => setSearchResult(res.coins));
  };

  const handleOnSelect = (item) => {
    //Will call on select
    fetch(
      `https://api.coingecko.com/api/v3/coins/${item.id}?localization=false&tickers=true&market_data=true&community_data=false&developer_data=false&sparkline=false`
    )
      .then((res) => res.json())
      .then((res) => setCoinResult(res));
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

  console.log(coinResult);

  const renderMarketCap =
    coinResult != "" ? (
      <div className="result-render-market-cap">
        <h2 className="title-rendered-search">Market Cap</h2>
        {coinResult.market_data.market_cap_rank != null ? (
          <div>
            <span className="gray-title">Rank:</span> #
            {coinResult.market_data.market_cap_rank}
          </div>
        ) : (
          <div className="gray-title">Rank: N/A</div>
        )}
        <div>
          <span className="gray-title">Market Cap:</span>{" "}
          {coinResult.market_data.market_cap.usd}$
        </div>
        {coinResult.market_data.market_cap_change_percentage_24h != null ? (
          <div>
            <span className="gray-title">Change (24hr):</span>{" "}
            {coinResult.market_data.market_cap_change_percentage_24h.toFixed(2)}
            %
          </div>
        ) : (
          <div className="gray-title">Change (24hr): N/A</div>
        )}
        {coinResult.market_data.market_cap_change_24h_in_currency.usd !=
        null ? (
          <div>
            Change (24hr):{" "}
            {coinResult.market_data.market_cap_change_24h_in_currency.usd.toFixed(
              2
            )}
            $
          </div>
        ) : (
          <div>Change (24hr): N/A</div>
        )}
      </div>
    ) : (
      <div></div>
    );

  const renderQuoteChange =
    coinResult != "" ? (
      <div className="quotes-rendered-search">
        <h2 className="title-rendered-search">Quotes</h2>
        {coinResult.market_data.price_change_percentage_24h != null ? (
          <div>
            Change (24hr):{" "}
            {coinResult.market_data.price_change_percentage_24h.toFixed(2)}%
          </div>
        ) : (
          <div>Change (24hr): N/A</div>
        )}

        {coinResult.market_data.price_change_percentage_7d != null ? (
          <div>
            Change (7d):{" "}
            {coinResult.market_data.price_change_percentage_7d.toFixed(2)}%
          </div>
        ) : (
          <div>Change (7d): N/A</div>
        )}

        {coinResult.market_data.price_change_percentage_14d != null ? (
          <div>
            Change (14d):{" "}
            {coinResult.market_data.price_change_percentage_14d.toFixed(2)}%
          </div>
        ) : (
          <div>Change (14d): N/A</div>
        )}

        {coinResult.market_data.price_change_percentage_30d != null ? (
          <div>
            Change (30d):{" "}
            {coinResult.market_data.price_change_percentage_30d.toFixed(2)}%
          </div>
        ) : (
          <div>Change (30d): N/A</div>
        )}

        {coinResult.market_data.price_change_percentage_60d != null ? (
          <div>
            Change (60d):{" "}
            {coinResult.market_data.price_change_percentage_60d.toFixed(2)}%
          </div>
        ) : (
          <div>Change (60d): N/A</div>
        )}

        {coinResult.market_data.price_change_percentage_200d != null ? (
          <div>
            Change (200d):{" "}
            {coinResult.market_data.price_change_percentage_200d.toFixed(2)}%
          </div>
        ) : (
          <div>Change (200d): N/A</div>
        )}
      </div>
    ) : (
      <div></div>
    );

  const renderDescription =
    coinResult != "" ? (
      <div className="bruh">
        {coinResult.description.en != null ? (
          parse(coinResult.description.en)
        ) : (
          <div>Coin description not available.</div>
        )}
      </div>
    ) : (
      <div>Coin description not available.</div>
    );

  const renderSentiment =
    coinResult != "" ? (
      <div className="sentiment-rank-render">
        <h2 className="title-rendered-search">Interest</h2>{" "}
        {coinResult.public_interest_score != null ? (
          <div>Public Interest: {coinResult.public_interest_score}</div>
        ) : (
          <div>Public Interest: N/A</div>
        )}
        {coinResult.sentiment_votes_up_percentage != null ? (
          <div>
            Bullish Sentiment:{" "}
            {coinResult.sentiment_votes_up_percentage.toFixed(2)}%
          </div>
        ) : (
          <div>Bullish Sentiment: N/A</div>
        )}
        {coinResult.sentiment_votes_down_percentage != null ? (
          <div>
            Bullish Sentiment:{" "}
            {coinResult.sentiment_votes_down_percentage.toFixed(2)}%
          </div>
        ) : (
          <div>Bearish Sentiment: N/A</div>
        )}
        {coinResult.public_interest_stats.alexa_rank != null ? (
          <div>Alexa Rank: #{coinResult.public_interest_stats.alexa_rank}</div>
        ) : (
          <div>Alexa Rank: N/A</div>
        )}
      </div>
    ) : (
      <div></div>
    );

  return (
    <div className="one-three-three">
      <div className="selction-exchange-head custom-coin-search">
        <h1 className="exchange-title">Coin Data</h1>
        <div style={{ width: 400 }}>
          <ReactSearchAutocomplete
            items={items}
            onSearch={handleOnSearch}
            onSelect={handleOnSelect}
            formatResult={formatResult}
          />
        </div>
      </div>

      {coinResult != "" ? (
        <div class="parent-coin-search">
          <div class="div1-coin-search">
            <img src={coinResult.image.thumb} />
            {coinResult.name}{" "}
          </div>
          <div class="div2-coin-search">
            <div>
              Quote: $
              {coinResult.market_data.current_price.usd > 1
                ? coinResult.market_data.current_price.usd.toFixed(2)
                : coinResult.market_data.current_price.usd.toFixed(7)}
            </div>
            <div>Volume: ${coinResult.market_data.total_volume.usd}</div>
          </div>
          <div class="div3-coin-search">
            {" "}
            Updated: {coinResult.market_data.last_updated}
          </div>
          <div class="div4-coin-search"> {renderMarketCap} </div>
          <div class="div5-coin-search"> {renderQuoteChange} </div>
          <div class="div6-coin-search"> {renderDescription} </div>
          <div class="div7-coin-search"> {renderSentiment} </div>
        </div>
      ) : (
        <h2 className="gray-title">Search!</h2>
      )}
    </div>
  );
}
