import React from "react";
import { nanoid } from "nanoid";
import { render } from "react-dom";
import loadinfIcon from "./images/Spinner-1s-200px (1).gif";

export default function Yield(props) {
  const [longTerm, setLongTerm] = React.useState("");
  const [shortTerm, setShortTerm] = React.useState("");

  React.useEffect(() => {
    fetch("https://www.econdb.com/api/series/Y10YDUS/?format=json")
      .then((res) => res.json())
      .then((res) => setLongTerm(res));
  }, []);

  React.useEffect(() => {
    setTimeout(() => {
      fetch("https://www.econdb.com/api/series/M3YDUS/?format=json")
        .then((res) => res.json())
        .then((res) => setShortTerm(res));
    }, 500);
  }, []);

  const renderLongTerm =
    longTerm != ""
      ? longTerm.data.dates[0] != "1953-04-01"
        ? longTerm.data.dates.map((curr) => {
            return (
              <div key={nanoid()} className="cpi-date-render">
                {curr}
              </div>
            );
          })
        : longTerm.data.dates.reverse().map((curr) => {
            return (
              <div key={nanoid()} className="cpi-date-render">
                {curr}
              </div>
            );
          })
      : console.log("loading");

  const renderLongTermData =
    longTerm != ""
      ? longTerm.data.values[0] != 2.83
        ? longTerm.data.values.map((curr) => {
            return (
              <div key={nanoid()} className="cpi-data-render">
                {curr}
              </div>
            );
          })
        : longTerm.data.values.reverse().map((curr) => {
            return (
              <div key={nanoid()} className="cpi-data-render">
                {curr}
              </div>
            );
          })
      : console.log("loading");
  console.log(longTerm);
  const renderShortTermDate =
    shortTerm != ""
      ? shortTerm.data.dates[0] != "1981-09-01"
        ? shortTerm.data.dates.map((curr) => {
            return (
              <div key={nanoid()} className="cpi-date-render">
                {curr}
              </div>
            );
          })
        : shortTerm.data.dates.reverse().map((curr) => {
            return (
              <div key={nanoid()} className="cpi-date-render">
                {curr}
              </div>
            );
          })
      : console.log("div");

  const renderShortTermData =
    shortTerm != ""
      ? shortTerm.data.values[0] != 15.61
        ? shortTerm.data.values.map((curr) => {
            return (
              <div key={nanoid()} className="cpi-data-render">
                {curr}
              </div>
            );
          })
        : shortTerm.data.values.reverse().map((curr) => {
            return (
              <div key={nanoid()} className="cpi-data-render">
                {curr}
              </div>
            );
          })
      : console.log("loading");

  return (
    <div>
      <div className="header-body-list cpi-adjust">
        <h1>Yield History</h1>
      </div>
      {shortTerm != "" ? (
        <div className="yield-grid-holder">
          <div class="parent-yield">
            <div class="div1-yield">
              {" "}
              <h2 className="no-margin-no-padding">{longTerm.description} </h2>
              <h3 className="no-margin-no-padding">{longTerm.ticker}</h3>
            </div>
            <div class="div2-yield">
              <h2 className="no-margin-no-padding">{shortTerm.description} </h2>
              <h3 className="no-margin-no-padding">{shortTerm.ticker}</h3>
            </div>
            <div class="div3-yield">
              <div className="cid-data-render-holder">
                <div>{renderLongTermData}</div>
                <div>{renderLongTerm}</div>
              </div>
            </div>
            <div class="div4-yield">
              <div className="cid-data-render-holder">
                <div>{renderShortTermData}</div>
                <div>{renderShortTermDate}</div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <img src={loadinfIcon} />
      )}
    </div>
  );
}
