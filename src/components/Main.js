import React, { useState, useEffect } from "react";
import InfoBox from "./InfoBox";

export default function Home(props) {
  const [wallet, setWallet] = useState({
    address: "",
    isOk: false,
  });

  const [walletData, setwalletData] = useState({
    address: "",
    paperHands: false,
    ncBalance: "",
    earn: "",
    lp: "",
  }); 

  function handleChange(event) {
    event.preventDefault();
    const { name, value } = event.target;
    setWallet((prevWallet) => ({
      ...prevWallet,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    fetch(`https://wallet-reputation.herokuapp.com/wallet/${wallet.address}`)
        .then((response) => {
          if (response.ok) {
            setWallet((prevWallet) => ({
              ...prevWallet,
              isOk: true,
            }));
            return response.json();
          }
          throw response;
        })
        .then((data) => {
          console.log(data);
          setwalletData((prevData) => ({
            ...prevData,
            address: data.adress,
            paperHands: data.paper_hands,
            ncBalance: data.nc_balance,
            earn: data.claim_balance,
            lp: data.lp_balance,
          }));
        });
  }

  function removeAddress() {
    document.getElementById("address").value = "";
    setWallet((prevWallet) => ({
      isOk: false,
      address: "",
    }));
  }

  var inputs = document.querySelectorAll("input");

  inputs.forEach((input) => {
    input.addEventListener("invalid", function (e) {
      e.target.setCustomValidity(`Wrong address: ${wallet.address}`);
    });

    input.addEventListener("input", function (e) {
      e.target.setCustomValidity("");
    });
  });

  return (
    <main className={props.darkMode ? "dark" : ""}>
      <h1 className={props.darkMode ? "title-dark" : "title"}>
        Check Natluk Coin Reputation{" "}
      </h1>
      <div className={props.darkMode ? "box-dark" : "box"}>
        <p>Enter your wallet address (ie, 0xd5c...)</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="address"
            id="address"
            value={wallet.address}
            onChange={handleChange}
            placeholder=" "
            className={props.darkMode ? "form__input-dark" : "form__input"}
            required
            minLength="42"
            maxLength="42"
          />
          <label
            className={props.darkMode ? "form__label-dark" : "form__label"}
          >
            Wallet Number
          </label>
          {wallet.address !== "" ? (
            <span className="form__span" onClick={removeAddress}>
              X
            </span>
          ) : null}
          <button>Submit</button>
        </form>
      </div>
      {wallet.isOk ? (
        <InfoBox
          balance={walletData.ncBalance}
          time={walletData.timeInNc}
          earn={walletData.earn}
          lpBalance={walletData.lp}
        />
      ) : (
        <div className="empty-result"></div>
      )}
    </main>
  );
}
