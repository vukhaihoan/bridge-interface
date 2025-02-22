import { nftGeneralParser } from "nft-parser/dist/src/index";
import store from "../store/store";
import { setEachNFT, setEachClaimables } from "../store/reducers/generalSlice";

import CacheService from "../services/cacheService";

const cache = CacheService();

export const parseNFT = async (
  serviceContainer,
  nft,
  index,
  testnet,
  claimable
) => {
  const { uri } = nft;

  // console.log(serviceContainer);
  const { bridge, whitelistedPool } = serviceContainer;

  let whitelisted = !testnet
    ? nft?.native?.contract === "0xED1eFC6EFCEAAB9F6d609feC89c9E675Bf1efB0a"
      ? false
      : undefined
    : true;

  let nftObj = {
    uri,
    collectionIdent: nft.collectionIdent || undefined,
    native: { ...nft.native },
    dataLoaded: true,
    whitelisted,
    nftId: nft.nftId || undefined,
    appId: nft.appId || undefined,
  };

  const {
    general: { from, NFTList, account },
  } = store.getState();

  if (!claimable) {
    const [nftRes, whitelistedRes] = await Promise.allSettled([
      (async () => {
        const unwraped = await bridge.unwrap(nft);
        const {
          chainId,
          tokenId,
          contract,
          nft: { native },
        } = unwraped;

        const originChain = native.chainId;

        let nftData;

        try {
          if (testnet) throw new Error("Testnet exception");
          nftData = (
            await cache.get({ chainId, tokenId, contract }, unwraped.nft)
          ).data;
          if (!nftData) throw new Error("No data exc");
        } catch (e) {
          nftData = await nftGeneralParser(nft, account, whitelisted);
        }
        if (nftData === "no NFT with that data was found") {
          /*if (!nft.uri) {
            evm.init(factory);
            nft = await evm.getUri(nft, nft.collectionIdent);
          }*/

          nftData = await cache.add(unwraped.nft, account, whitelisted);

          if (
            /(That nft is already caching|key parameter missing)/.test(nftData)
          )
            return undefined;
        }

        return { ...nftData, originChain };
      })(),
      !testnet
        ? !cache.isRestricted(nft.uri)
          ? whitelistedPool.add(bridge.isWhitelisted.bind(bridge))(
              from.nonce,
              nft
            )
          : true
        : true,
    ]);

    const nftData = nftRes.status === "fulfilled" ? nftRes.value : undefined;

    whitelisted =
      whitelistedRes.status === "fulfilled" ? whitelistedRes.value : undefined;

    nftObj = {
      ...nft,
      ...(nftData?.metaData || nftData),
      origin: nft.native.origin,
      wrapped: nftData?.wrapped,
      dataLoaded: true,
      whitelisted,
    };

    if (
      !NFTList[index]?.dataLoaded ||
      !NFTList[index]?.image ||
      !NFTList[index]?.animation_url
    ) {
      store.dispatch(setEachNFT({ nftObj, index }));
    }
  } else {
    const unwraped = await bridge.unwrap(nft);

    const { chainId, tokenId, contract } = unwraped;
    const claimableData = (await cache.get({ chainId, tokenId, contract }, nft))
      .data;

    store.dispatch(
      setEachClaimables({
        nftObj: {
          ...nft,
          ...claimableData,
          native: {},
          dataLoaded: true,
          whitelisted: true,
        },
        index,
      })
    );
  }
};
