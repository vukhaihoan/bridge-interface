import store from "../../../store/store.js";
import { getAddEthereumChain } from "../../../wallet/chains.js";

export async function switchNetwork(chain) {
  // eslint-disable-next-line no-debugger

  const {
    general: { testNet, bitKeep },
  } = store.getState();

  const id = (testNet ? chain.tnChainId : chain.chainId).toString();
  const ethereumChainsParams = getAddEthereumChain();

  const params = ethereumChainsParams[id];

  const copyParams = {
    chainName: params.name || params.chainName,
    chainId: `0x${Number(id).toString(16)}`,
    nativeCurrency: params.nativeCurrency,
    rpcUrls: params.rpcUrls,
  };

  const chainId = `0x${Number(id).toString(16)}`;

  switch (true) {
    case bitKeep:
      try {
        await window.bitkeep.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: +chainId }],
        });
        const currentChainId = await window.ethereum.request({
          method: "eth_chainId",
        });
        return currentChainId == chainId;
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
        const currentChainId = await window.ethereum.request({
          method: "eth_chainId",
        });

        return currentChainId == chainId;
      } catch (error) {
        console.log(error);
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [copyParams],
        });

        return false;
      }
  }
}

/*export const transferNFTFromEVM = async ({
    to,
    from,
    nft,
    signer,
    receiver,
    fee,
    chainConfig,
    discountLeftUsd,
}) => {
    fee = discountLeftUsd ? fee - fee * 0.25 : fee;
    const {
        general: { factory },
    } = store.getState();
    const toChain = await factory.inner(b[to.text].Chain);
    const fromChain = await factory.inner(chainsConfig[from.text].Chain);
    const fromNonce = CHAIN_INFO[from.text].nonce;
    const toNonce = CHAIN_INFO[to.text].nonce;
    const wrapped = await factory.isWrappedNft(nft, fromNonce);

    const {
        native: { contract, tokenId },
        amountToTransfer,
    } = nft;
    const {
        general: { account },
    } = store.getState();
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

    switch (true) {
        case to.type === "Cosmos" && !mintWith && !wrapped:
            result = await factory.transferNft(
                fromChain,
                toChain,
                nft,
                signer,
                receiver,
                fee,
                `${chainConfig?.secretParams?.bridge?.contractAddress},${chainConfig?.secretParams?.bridge?.codeHash}`
            );
            break;
        /*case !wrapped &&
      !mintWith &&
      !testnet &&
      (to.key === "Elrond" || to.type === "EVM"):
      store.dispatch(
        setError({
          message:
            "Transfer has been canceled. The NFT you are trying to send will be minted with a default NFT collection",
        })
      );
      if (txnHashArr[0]) {
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
                factory,
                account
            );
            break;
    }
    //if (result) patchRealizedDiscount(account, fee * 0.25)
    return result || false;
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
    factory,
    account
) => {
    let result;
    const {
        general: { from, to },
    } = store.getState();
    try {
        switch (true) {
            case amount > 0:
                result = await factory.transferSft(
                    fromChain,
                    toChain,
                    nft,
                    signer,
                    receiver,
                    BigInt(amount),
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
        if (
            typeof error.message === "string" &&
            amount < 1 &&
            error.message.includes('method="estimateGas"')
        ) {
            return await factory.transferNft(
                fromChain,
                toChain,
                nft,
                signer,
                receiver,
                fee,
                mintWith,
                BigNumber.from(100000)
            );
        }

        store.dispatch(setError(error));
        const date = new Date();
        const errBogy = {
            type: "Transfer",
            walletAddress: account,
            time: date.toString(),
            fromChain: from.text,
            toChain: to.text,
            message: error,
            nfts: nft.native,
        };
        errorToLog(errBogy);
    }
};
*/
