import React from "react";

export default function InfoBox(props) {
  return (
    <div className="infobox">
      <div className="infobox--balancenc">
        <h2>$ {props.balance}</h2>
        <div>Natluk Coin Balance</div>
      </div>
      <div className="infobox--balancelp">
        <h2>$ {props.lpBalance}</h2>
        <div>LP Token Balance</div>
      </div>
      <div className="infobox--time">
        <h2>{props.time ? <>True</> : <>False</>}</h2>
        <div>Paper Hands?</div>
      </div>
      <div className="infobox--earn">
        <h2>$ {props.earn}</h2>
        <div>Earn NC from Yield Farming</div>
      </div>
    </div>
  );
}
