import React from "react";
import { nanoid } from "nanoid";
import CurrencyRates from "./CurrencyRates";
import loadinfIcon from "./images/Spinner-1s-200px (1).gif";

//Validate, just like in confData.data.date all of the other datasets to ensure the closest date is first

export default function Cpi(props) {
  //CPI DATA
  const [cpiData, setCpiData] = React.useState("");

  //Confidecne Data
  const [confData, setConfData] = React.useState("");

  //Sentiment Data
  const [sentData, setSentData] = React.useState("");

  React.useEffect(() => {
    setTimeout(() => {
      fetch("https://www.econdb.com/api/series/SENTUS/?format=json")
        .then((res2) => res2.json())
        .then((res2) => setSentData(res2));
    }, 0);
  }, []);

  React.useEffect(() => {
    setTimeout(() => {
      fetch("https://www.econdb.com/api/series/CPIUS/?format=json")
        .then((res) => res.json())
        .then((res) => setCpiData(res));
    }, 1200);
  }, []);

  React.useEffect(() => {
    setTimeout(() => {
      fetch("https://www.econdb.com/api/series/CONFUS/?format=json")
        .then((res1) => res1.json())
        .then((res1) => setConfData(res1));
    }, 1000);
  }, []);

  console.log(cpiData);
  console.log(confData);
  console.log(sentData);

  const renderCpiData =
    cpiData != ""
      ? cpiData.data.values.reverse().map((curr) => {
          return (
            <div key={nanoid()} className="cpi-data-render">
              {curr}
            </div>
          );
        })
      : console.log("laoding");

  const renderCpidDates =
    cpiData != ""
      ? cpiData.data.dates.reverse().map((curr) => {
          return (
            <div key={nanoid()} className="cpi-date-render">
              {curr}
            </div>
          );
        })
      : console.log("laoding");

  const renderConfData =
    confData != ""
      ? confData.data.values[0] != 107.6
        ? confData.data.values.map((curr) => {
            return (
              <div key={nanoid()} className="cpi-data-render">
                {curr}
              </div>
            );
          })
        : confData.data.values.reverse().map((curr) => {
            return (
              <div key={nanoid()} className="cpi-data-render">
                {curr}
              </div>
            );
          })
      : console.log("loading");

  const renderConfDates =
    confData != ""
      ? confData.data.dates[0] != "1960-01-01"
        ? confData.data.dates.map((curr) => {
            return (
              <div key={nanoid()} className="cpi-date-render">
                {curr}
              </div>
            );
          })
        : confData.data.dates.reverse().map((curr) => {
            return (
              <div key={nanoid()} className="cpi-date-render">
                {curr}
              </div>
            );
          })
      : console.log("laoding");

  const renderSentData =
    sentData != ""
      ? sentData.data.values.reverse().map((curr) => {
          return (
            <div key={nanoid()} className="cpi-data-render">
              {curr}
            </div>
          );
        })
      : console.log("loading");

  const renderSentDates =
    sentData != ""
      ? sentData.data.dates.reverse().map((curr) => {
          return (
            <div key={nanoid()} className="cpi-date-render">
              {curr}
            </div>
          );
        })
      : console.log("loading");

  return (
    <div>
      <div className="header-body-list cpi-adjust yield-adjust">
        <h1>Consumer History</h1>
      </div>
      {sentData != "" && cpiData != "" && confData != "" ? (
        <div className="grid-holder-cpi">
          <div class="parent-consumer">
            <div class="div1-consumer">
              <h3 className="no-margin-no-padding">{confData.description}</h3>
              <h4 className="no-margin-no-padding">
                {confData != "" ? "Classification: " : null} {confData.ticker}
              </h4>
              <h4 className="no-margin-no-padding">
                {confData != "" ? "Frequency: " : null}
                {confData.frequency}
              </h4>
            </div>
            <div className="div2-consumer">
              <h3 className="no-margin-no-padding">{cpiData.description}</h3>
              <h4 className="no-margin-no-padding">
                {confData != "" ? "Classification: " : null} {cpiData.ticker}
              </h4>
              <h4 className="no-margin-no-padding">
                {confData != "" ? "Frequency: " : null} {cpiData.frequency}
              </h4>
            </div>
            <div className="div3-consumer">
              <h3 className="no-margin-no-padding">{sentData.description}</h3>
              <h4 className="no-margin-no-padding">
                {confData != "" ? "Classification: " : null} {sentData.ticker}
              </h4>
              <h4 className="no-margin-no-padding">
                {confData != "" ? "Frequency: " : null} {sentData.frequency}
              </h4>
            </div>
            <div className="div4-consumer">
              <div className="cid-data-render-holder">
                <div>{renderConfData}</div>
                <div>{renderConfDates}</div>
              </div>
            </div>
            <div className="div5-consumer">
              <div className="cid-data-render-holder">
                <div>{renderCpiData}</div>
                <div>{renderCpidDates}</div>
              </div>
            </div>
            <div className="div6-consumer">
              <div className="cid-data-render-holder">
                <div>{renderSentData}</div>
                <div>{renderSentDates}</div>
              </div>{" "}
            </div>
          </div>
        </div>
      ) : (
        <img src={loadinfIcon} />
      )}
    </div>
  );
}
