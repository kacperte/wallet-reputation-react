import React from "react";

export default function InfoBox(props) {
  return (
    <div className="infobox">
      <div className="infobox--balancenc">
        <h2>$ {props.balance}</h2>
        <div>NC Balance</div>
      </div>
      <div className="infobox--balancelp">
        <h2>$ {props.lpBalance}</h2>
        <div>LP Balance</div>
      </div>
      <div className="infobox--time">
        <h2>{props.time} days</h2>
        <div>How long hold NC?</div>
      </div>
      <div className="infobox--earn">
        <h2>$ {props.earn}</h2>
        <div>How many NC earn?</div>
      </div>
    </div>
  );
}
