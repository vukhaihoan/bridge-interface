import React from "react";

import PropTypes from "prop-types";

import HigherTON from "./HigherTON";

import tonhublogo from "../../../assets/img/wallet/tonhub.svg";

function TonHub({ styles, connectWallet }) {
  const connectHandler = async () => {
    connectWallet("TonHub", window.innerWidth <= 480);
  };

  return (
    <li
      style={styles("TonHub")}
      onClick={connectHandler}
      className="wllListItem"
      data-wallet="TonHub"
    >
      <img style={{ width: "28px" }} src={tonhublogo} alt="" />
      <p>Tonhub</p>
    </li>
  );
}
TonHub.propTypes = {
  styles: PropTypes.func,
  connectWallet: PropTypes.func,
};

export default HigherTON(TonHub);
