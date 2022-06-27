import React, { useState, useEffect } from "react";
import InfoBox from "./InfoBox";

export default function Home(props) {
  const [wallet, setWallet] = useState({
    address: "",
    isComplet: false,
  });

  const [walletData, setwalletData] = useState({
    address: "",
    timeInNc: "",
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

  useEffect(
    function () {
      fetch(`https://wallet-reputation.herokuapp.com/wallet/${wallet.address}`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw response;
        })
        .then((data) => {
          setwalletData((prevData) => ({
            ...prevData,
            address: data.adress,
            timeInNc: data.time_in_nc,
            ncBalance: data.nc_balance,
            earn: data.claim_balance,
            lp: data.lp_balance,
          }));
        });
    },
    [wallet]
  );

  function handleSubmit(event) {
    event.preventDefault();
    setWallet((prevWallet) => ({
      ...prevWallet,
      isComplet: true,
    }));
  }

  function removeAddress() {
    document.getElementById("address").value = "";
    setWallet((prevWallet) => ({
      isComplet: false,
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
      <h1>Check Natluk Coin Reputation </h1>
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
            className="form__input"
            required
            minLength="42"
          />
          <label className="form__label">Wallet Number</label>
          {wallet.address !== "" ? (
            <span className="form__`span" onClick={removeAddress}>
              X
            </span>
          ) : null}
          <button>Submit</button>
        </form>
      </div>
      {wallet.isComplet && (
        <InfoBox
          balance={walletData.ncBalance}
          time={walletData.timeInNc}
          earn={walletData.earn}
          lpBalance={walletData.lp}
        />
      )}
    </main>
  );
}
