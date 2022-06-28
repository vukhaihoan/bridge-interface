import { useEffect, useState, useMemo, useRef } from "react";
import { useDispatch } from "react-redux";
import {
  setSelectedNFTList,
  removeFromSelectedNFTList,
} from "../../store/reducers/generalSlice";
import NFTdetails from "./NFTdetails";
import { useSelector } from "react-redux";
import { setupURI } from "../../wallet/helpers";
import { isValidHttpUrl, parseEachNFT } from "../../wallet/helpers";
import { isShown } from "./NFTHelper.js";
import VideoOrImage from "./VideoOrImage";
import VideoAndImage from "./VideoAndImage";
import BrockenUtlGridView from "./BrockenUtlGridView";
import "./NewNFT.css";
import Preload from "./Preload";
import ClaimableCard from "./ClaimableCard";
import NotWhiteListed from "./NotWhiteListed";
import zoomIn from "../../assets/img/icons/zoomInWhite.png";
import ModalImage from "react-modal-image";
import { parseNFT } from "../../wallet/nftParser";

import {ReactComponent as CheckComp} from "../../assets/img/icons/blue_check-small.svg"

export default function NFTcard({ nft, index, claimables }) {
  const dispatch = useDispatch();
  const [detailsOn, setDetailsOn] = useState(false);
  const search = useSelector((state) => state.general.NFTListSearch);
  const testnet = useSelector((state) => state.general.testNet);
  const selectedNFTs = useSelector((state) => state.general.selectedNFTList);
  const [imageErr, setImageErr] = useState(false);
  const [isVisible, setIsVisible] = useState();
  const localhost = window.location.hostname;

  const callBackWhenObserver = (entries) => {
    const [entry] = entries;
    setIsVisible(entry.isIntersecting);
  };
  const cardRef = useRef(null);
  const options = useMemo(() => {
    return {
      root: null,
      tootMargin: "0px",
      threshold: 0.3,
    };
  }, []);

<<<<<<< .merge_file_PUA25X
    let isSelected = selectedNFTs.filter(
        (n) =>
            n.native.tokenId === nft.native.tokenId &&
            n.native.contract === nft.native.contract &&
            n.native.chainId === nft.native.chainId
    )[0];
    function addRemoveNFT(chosen) {
        if (!isSelected) {
            dispatch(setSelectedNFTList(chosen));
        } else {
            dispatch(removeFromSelectedNFTList(nft));
        }
=======
  let isSelected = selectedNFTs.filter(
    (n) =>
      n.native.tokenId === nft.native.tokenId &&
      n.native.contract === nft.native.contract &&
      n.native.chainId === nft.native.chainId
  )[0];

  function addRemoveNFT(chosen) {
    if (!isSelected) {
      dispatch(setSelectedNFTList(chosen));
    } else {
      dispatch(removeFromSelectedNFTList(nft));
>>>>>>> .merge_file_doWLqY
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(callBackWhenObserver, options);
    const currentTarget = cardRef.current;
    if (currentTarget) observer.observe(currentTarget);
    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [cardRef, options]);

  useEffect(() => {
    if (!nft.dataLoaded) {
      if (isVisible) {
        // await parseEachNFT(nft, index, testnet, claimables);

        parseNFT(nft, index, testnet, claimables);
      }
    }
  }, [isVisible]);

  const handleZoomIn = () => {
    console.log("zoom innnn");
  };

<<<<<<< .merge_file_PUA25X
    return (
        <>
            {isShown(search, nft) ? (
                <div className={`nft-box__wrapper`} ref={cardRef}>
                    {!nft?.dataLoaded ? (
                        <Preload />
                    ) : (
                        <div
                            onClick={() =>
                                nft.whitelisted && !detailsOn && !claimables
                                    ? addRemoveNFT(nft, index)
                                    : undefined
                            }
                            className={
                                nft.whitelisted
                                    ? "nft__card--selected"
                                    : "nft__card"
                            }
                        >
                            <div className="nft__main">
                                {nft.uri || imageErr ? (
                                    nft.animation_url && nft.image ? (
                                        <VideoAndImage
                                            index={index}
                                            videoUrl={nft.animation_url}
                                            imageUrl={nft.image}
                                        />
                                    ) : nft.image && !nft.animation_url ? (
                                        <img
                                            loading="lazy"
                                            alt=""
                                            onError={() => setImageErr(true)}
                                            src={setupURI(nft.image)}
                                        />
                                    ) : !nft.image && nft.animation_url ? (
                                        <video
                                            controls={false}
                                            playsInline={true}
                                            autoPlay={true}
                                            loop={true}
                                            muted={true}
                                            src={setupURI(nft.animation_url)}
                                        />
                                    ) : (
                                        [nft.animation_url, nft.image]?.length >
                                            0 && (
                                            <VideoOrImage
                                                urls={[
                                                    nft.animation_url,
                                                    nft.image,
                                                ]}
                                                i={index}
                                            />
                                        )
                                    )
                                ) : (
                                    <BrockenUtlGridView />
                                )}
                                {!claimables && nft.whitelisted ? (
                                    !isSelected ? (
                                        <div className="nft-radio"></div>
                                    ) : (
                                        <div className="nft-radio--selected"><CheckComp className="svgWidget"/></div>
                                    )
                                ) : (
                                    ""
                                )}
                                <div className="zoomDiv">
                                    <ModalImage
                                        className="zoomInBtn"
                                        small={zoomIn}
                                        large={setupURI(nft.image)}
                                        hideDownload={true}
                                        hideZoom={true}
                                    />
                                </div>
                                {!nft.whitelisted && <NotWhiteListed />}
                                {claimables && (
                                    <ClaimableCard nft={nft} index={index} />
                                )}
                            </div>
                            <div className="nft__footer">
                                <span className="nft-name">
                                    <span className="name">
                                        {nft.name || nft.native.name}
                                    </span>
                                    <NFTdetails
                                        details={setDetailsOn}
                                        nftInf={nft}
                                        index={index}
                                        claimables={claimables}
                                    />
                                </span>
                                <span className="nft-number">
                                    {nft.native.tokenId}
                                </span>
                            </div>
                        </div>
                    )}
=======
  return (
    <>
      {isShown(search, nft) ? (
        <div className={`nft-box__wrapper`} ref={cardRef}>
          {!nft?.dataLoaded ? (
            <Preload />
          ) : (
            <div
              onClick={() =>
                nft.whitelisted && !detailsOn && !claimables
                  ? addRemoveNFT(nft, index)
                  : undefined
              }
              className={nft.whitelisted ? "nft__card--selected" : "nft__card"}
            >
              <div className="nft__main">
                {nft.uri || imageErr ? (
                  nft.animation_url && nft.image ? (
                    <VideoAndImage
                      index={index}
                      videoUrl={nft.animation_url}
                      imageUrl={nft.image}
                    />
                  ) : nft.image &&
                    !nft.animation_url &&
                    !nft.imageFormat?.includes("mp4") ? (
                    <img
                      loading="lazy"
                      alt=""
                      onError={() => setImageErr(true)}
                      src={setupURI(nft.image)}
                    />
                  ) : (!nft.image && nft.animation_url) ||
                    nft.imageFormat?.includes("mp4") ? (
                    <video
                      controls={false}
                      playsInline={true}
                      autoPlay={true}
                      loop={true}
                      muted={true}
                      src={setupURI(nft.animation_url || nft.image)}
                    />
                  ) : (
                    [nft.animation_url, nft.image]?.length > 0 && (
                      <VideoOrImage
                        urls={[nft.animation_url, nft.image]}
                        i={index}
                      />
                    )
                  )
                ) : (
                  <BrockenUtlGridView />
                )}
                {!claimables && nft.whitelisted ? (
                  !isSelected ? (
                    <div className="nft-radio"></div>
                  ) : (
                    <div className="nft-radio--selected"></div>
                  )
                ) : (
                  ""
                )}
                <div className="zoomDiv">
                  <ModalImage
                    className="zoomInBtn"
                    small={zoomIn}
                    large={setupURI(nft.image)}
                    hideDownload={true}
                    hideZoom={true}
                  />
>>>>>>> .merge_file_doWLqY
                </div>
                {!nft.whitelisted && <NotWhiteListed />}
                {claimables && <ClaimableCard nft={nft} index={index} />}
              </div>
              <div className="nft__footer">
                {localhost === "localhost" && (
                  <span
                    style={{
                      fontSize: "10px",
                      color: "red",
                    }}
                  >
                    index: {index}
                  </span>
                )}
                <span className="nft-name">
                  <span className="name">{nft.name || nft.native.name}</span>
                  <NFTdetails
                    details={setDetailsOn}
                    nftInf={nft}
                    index={index}
                    claimables={claimables}
                  />
                </span>
                <span className="nft-number">{nft.native.tokenId}</span>
              </div>
            </div>
          )}
        </div>
      ) : null}
    </>
  );
}
