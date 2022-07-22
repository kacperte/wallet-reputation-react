import React, { useState, useEffect } from "react";
import InfoBox from "./InfoBox";
import Table from "./Tabel";

export default function Home(props) {
  const [wallet, setWallet] = useState({
    address: "",
    isOk: false,
    error: false,
  });

  const [walletData, setwalletData] = useState({
    address: "",
    paperHands: false,
    soldNC: 0,
    ncBalance: "",
    earn: "",
    lp: "",
  });

  const [tableData, setTableData] = useState();

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
    fetch(
      `https://wallet-reputation.herokuapp.com/wallet/wallet/${wallet.address}`
    )
      .then((response) => {
        if (response.ok) {
          setWallet((prevWallet) => ({
            ...prevWallet,
            isOk: true,
            error: false,
          }));
          return response.json();
        } else {
          setWallet((prevWallet) => ({
            ...prevWallet,
            error: true,
            isOk: false,
          }));
        }
        console.log(wallet);
        throw response;
      })
      .then((data) => {
        setwalletData((prevData) => ({
          ...prevData,
          address: data.adress,
          paperHands: data.paper_hands,
          soldNC: data.sold_nc,
          ncBalance: data.nc_balance,
          earn: data.claim_balance,
          lp: data.lp_balance,
        }));
      });
  }

  useEffect(() => {
    fetch(
      `https://wallet-reputation.herokuapp.com/wallet/transactions/${wallet.address}`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setTableData(data);
      });
  }, [wallet.address]);

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
            //required
            //minLength="42"
            //maxLength="42"
          />
          <label
            className={props.darkMode ? "form__label-dark" : "form__label"}
          >
            Wallet Number
          </label>
          {wallet.error ? (
            <div className="form__error">
              Error with address(s): {wallet.address}
            </div>
          ) : (
            <></>
          )}
          {wallet.address !== "" ? (
            <span className="form__span" onClick={removeAddress}>
              X
            </span>
          ) : null}
          <button>Submit</button>
        </form>
      </div>
      {wallet.isOk ? (
        <div>
          <InfoBox
            balance={walletData.ncBalance}
            paperHands={walletData.paperHands}
            earn={walletData.earn}
            lpBalance={walletData.lp}
            soldNC={walletData.soldNC}
          />
          <Table data={tableData} />
        </div>
      ) : (
        <div className="empty-result"></div>
      )}
    </main>
  );
}

//
