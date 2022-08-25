import {
    TESTNET_CHAIN_INFO,
    CHAIN_INFO,
    chainsConfig,
} from "../../../components/values.js";
import store from "../../../store/store.js";
import { getFactory } from "../../../wallet/helpers";
import {
    setError,
    setTransferLoaderModal,
    setTxnHash,
} from "../../../store/reducers/generalSlice";
import BigNumber from "bignumber.js";

export async function switchNetwork(chain) {
    const {
        general: { testNet, bitKeep, from },
    } = store.getState();

    const info = testNet
        ? TESTNET_CHAIN_INFO[chain?.key]
        : CHAIN_INFO[chain?.key];
    const chainId = `0x${info.chainId.toString(16)}`;
    switch (true) {
        case bitKeep:
            try {
                await window.bitkeep.ethereum.request({
                    method: "wallet_switchEthereumChain",
                    params: [{ chainId: chainId }],
                });
                return true;
            } catch (error) {
                console.log(error);
                return false;
            }
        default:
            try {
                await window.ethereum.request({
                    method: "wallet_switchEthereumChain",
                    params: [{ chainId }],
                });
                return true;
            } catch (error) {
                const c = testNet ? chain?.tnChainId : chain?.chainId;
                await window.ethereum.request({
                    method: "wallet_addEthereumChain",
                    params: [{ chainId: c }],
                });
                console.log(error);
                return false;
            }
    }
}

export const transferNFTFromEVM = async ({
    to,
    from,
    nft,
    signer,
    receiver,
    fee,
    index,
    txnHashArr,
    chainConfig,
    testnet,
}) => {
    debugger;
    const factory = await getFactory();
    const toChain = await factory.inner(chainsConfig[to.text].Chain);
    const fromChain = await factory.inner(chainsConfig[from.text].Chain);
    const fromNonce = CHAIN_INFO[from.text].nonce;
    const toNonce = CHAIN_INFO[to.text].nonce;
    const wrapped = await factory.isWrappedNft(nft, fromNonce);
    const {
        native: { contract, tokenId },
        amountToTransfer,
    } = nft;
    let mintWith;
    if (!wrapped) {
        mintWith = await factory.getVerifiedContract(
            contract,
            toNonce,
            fromNonce,
            tokenId && !isNaN(Number(tokenId)) ? tokenId.toString() : undefined
        );
    }
    let result;
    try {
        switch (true) {
            case to.type === "Cosmos" && !mintWith:
                const contractAddress =
                    chainConfig?.secretParams?.bridge?.contractAddress;
                const codeHash = chainConfig?.secretParams?.bridge?.codeHash;
                let mw = `${contractAddress},${codeHash}`;
                result = await factory.transferNft(
                    fromChain,
                    toChain,
                    nft,
                    signer,
                    receiver,
                    fee,
                    mw
                );
                break;
            case !mintWith && !testnet:
                store.dispatch(
                    setError(
                        "Transfer has been canceled. The NFT you are trying to send will be minted with a default NFT collection"
                    )
                );
                if (txnHashArr.length) {
                    store.dispatch(setTxnHash({ txn: "failed", nft }));
                }
                break;
            default:
                result = await transfer(
                    fromChain,
                    toChain,
                    nft,
                    signer,
                    receiver,
                    amountToTransfer,
                    fee,
                    mintWith,
                    factory
                );
                break;
        }
        console.log("Transfer result: ", result, "index: ", index);
        store.dispatch(setTxnHash({ txn: result, nft }));
    } catch (error) {
        console.log(error);
    }
    store.dispatch(setTransferLoaderModal(false));
    return result ? true : false;
};

const transfer = async (
    fromChain,
    toChain,
    nft,
    signer,
    receiver,
    amount,
    fee,
    mintWith,
    factory
) => {
    let result;
    try {
        switch (true) {
            case amount > 0:
                result = await factory.transferSft(
                    fromChain,
                    toChain,
                    nft,
                    signer,
                    receiver,
                    new BigNumber(amount),
                    fee,
                    mintWith
                );
                return result;
            default:
                result = await factory.transferNft(
                    fromChain,
                    toChain,
                    nft,
                    signer,
                    receiver,
                    fee,
                    mintWith
                );
                return result;
        }
    } catch (error) {
        console.log(error);
    }
};
