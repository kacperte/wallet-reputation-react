import React, { useState } from "react";

export default function InfoBox(props) {
  const [info, setInfo] = useState(false);

  function toggleInfo() {
    setInfo(!info);
  }

  return (
    <div className="infobox">
      <div className="infobox--balancenc">
        <h2>$ {props.balance}</h2>
        <div>NC Balance</div>
      </div>
      <div className="infobox--balancelp">
        <h2>$ {props.lpBalance}</h2>
        <div>LP Token Balance</div>
      </div>
      <div className="infobox--paperHands">
        <h2>{props.paperHands ? <>True</> : <>False</>}</h2>
        <div>Paper Hands?</div>
        <img
          className="icon-info"
          src="https://i.ibb.co/4tCNDVX/OOjs-UI-icon-info-svg.png"
          alt="info-icon"
          onClick={toggleInfo}
        />
        {info ? (
          <div>
            <div className="info_cloud_arrow" />
            <p className="info_cloud">
              This means that the person has sold his tokens. The opposite
              meaning is diamond hands if you have never sold your tokens.
            </p>{" "}
          </div>
        ) : (
          <></>
        )}
      </div>
      {props.paperHands ? (
        <div className="infobox--soldNc">
          <h2>$ {props.soldNC}</h2>
          <div>Sold NC</div>
        </div>
      ) : (
        <></>
      )}
      <div className="infobox--earn">
        <h2>$ {props.earn}</h2>
        <div>Earn NC from Yield Farming</div>
      </div>
    </div>
  );
}
