/* eslint-disable no-debugger */
// import { HashConnect } from "hashconnect/dist/cjs/main";
import icon from "./../../../assets/img/icons/XPNET.svg";

export const connectHashPack = async (hashConnect, network) => {
    // debugger;

    let initData;

    let appMetadata = {
        url: location.origin,
        name: "XP.NETWORK Multi-chain NFT bridge",
        description:
            "Seamlessly move assets between chains | The first multichain NFT bridge to connect all major Blockchains into one ecosystem",
        icon: icon,
    };
    try {
        initData = await hashConnect.init(appMetadata, "testnet", network);
        const { pairingString } = initData;
        hashConnect.connectToLocalWallet(pairingString, appMetadata);
        return initData;
    } catch (error) {
        return false;
    }
};
