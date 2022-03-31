import React from "react";
import { useSelector } from "react-redux";
import { connectTronlink } from "./ConnectWalletHelper";
import Tron from "../../assets/img/wallet/TronLink.svg";

export default function TronWallet({close}) {
  const from = useSelector((state) => state.general.from);
  const OFF = { opacity: 0.6, pointerEvents: "none" };

  const connectHandler = () => {
    connectTronlink()
    close()
  }

  const getStyle = () => {
    if(!from){
      return {}
    }
    else if(from && from.text === "Tron"){
      return {}
    }
    else return OFF
  }

  return (
    <li style={getStyle()} onClick={connectHandler} data-wallet="TronLink" className="wllListItem">
      <img src={Tron} alt="Tron Icon" /><p>TronLink</p>
    </li>
  );
}
