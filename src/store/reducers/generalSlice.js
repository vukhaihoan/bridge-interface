import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  step: 1,
  selectedNFTList: [],
  NFTListView: false,
  approvedNFTList: [],
  nftsToWhitelist: [],
  txnHashArr: [],
  fees: 0,
  currentTx: 0,
  bigLoader: true,
  wsettings: false,
  // approved: ''
};

const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    setTo(state, action) {
      state.to = action.payload;
    },
    setFrom(state, action) {
      state.from = action.payload;
    },
    setChainModal(state, action) {
      state.showChainModal = action.payload;
    },
    setDepartureOrDestination(state, action) {
      state.departureOrDestination = action.payload;
    },
    setChainSearch(state, action) {
      state.chainSearch = action.payload;
    },
    setStep(state, action) {
      state.step = action.payload;
    },
    setMetaMask(state, action) {
      state.MetaMask = action.payload;
    },
    setWidget(state, action) {
      state.widget = action.payload;
    },
    setWSettings(state, action) {
      state.wsettings = action.payload;
    },
    setAccount(state, action) {
      state.account = action.payload;
    },
    setNFTList(state, action) {
      state.NFTList = action.payload;
    },
    setSelectedNFTList(state, action) {
      state.selectedNFTList = [...state.selectedNFTList, action.payload];
    },
    cleartSelectedNFT(state, action) {
      state.selectedNFTList = [];
    },
    cleanSelectedNFTList(state, action) {
      state.selectedNFTList = [];
    },
    removeFromSelectedNFTList(state, action) {
      const { tokenId, contract, chainId } = action.payload.native;
      state.selectedNFTList = state.selectedNFTList.filter(
        (n) =>
          !(
            n.native.tokenId === tokenId &&
            n.native.contract === contract &&
            n.native.chainId === chainId
          )
      );
    },
    setSearchNFTList(state, action) {
      state.NFTListSearch = action.payload;
    },
    allSelected(state) {
      state.selectedNFTList = state.NFTList;
    },
    setNFTsListView(state) {
      state.NFTListView = !state.NFTListView;
    },
    clearApprovedNFTs(state, action) {
      state.approvedNFTList = [];
    },
    updateApprovedNFTs(state, action) {
      const { tokenId, contract, chainId } = action.payload?.native;
      const isInApprovedNFTs = state.approvedNFTList.filter(
        (n) =>
          n.native.tokenId === tokenId &&
          n.native.contract === contract &&
          chainId === n.native.chainId
      )[0];
      if (!isInApprovedNFTs)
        state.approvedNFTList = [...state.approvedNFTList, action.payload];
    },
    setApproved(state, action) {
      state.approved = action.payload;
    },
    setReceiver(state, action) {
      state.receiver = action.payload;
    },
    clearTxnHash(state, action) {
      state.txnHashArr = [];
    },
    setTxnHash(state, action) {
      const { nft, txn } = action.payload;
      const { tokenId, contract, chainId } = nft.native;
      state.txnHashArr = [...state.txnHashArr, action.payload.txn];

      state.selectedNFTList = state.selectedNFTList.map((n) => {
        const { native } = n;
        if (
          native.tokenId === tokenId &&
          native.contract === contract &&
          native.chainId === chainId
        ) {
          n.txn = txn;
        }
        return n;
      });
    },
    setWrongNetwork(state, action) {
      state.wrongNetwork = action.payload;
    },
    setMetaMaskActive(state, action) {
      state.metaMaskActive = action.payload;
    },
    setReset(state) {
      return {
        ...initialState,
        widget: state.widget,
        wsettings: state.wsettings,
      };
    },
    setElrondAccount(state, action) {
      state.elrondAccount = action.payload;
    },
    setMaiarProvider(state, action) {
      state.maiarProvider = action.payload;
    },
    removeAlgorandClaimable(state, action) {
      state.algorandClaimables = state.algorandClaimables.filter(
        (n) => n.nftId !== action.payload
      );
    },
    setOnMaiar(state, action) {
      state.onMaiar = action.payload;
    },
    setTronWallet(state, action) {
      state.tronWallet = action.payload;
    },
    setConfirmMaiarMob(state, action) {
      state.confirmMaiarMob = action.payload;
    },
    setSwitchDestination(state, action) {
      state.switchDestination = action.payload;
    },
    setAccountModal(state, action) {
      state.accountModal = action.payload;
    },
    setBigLoader(state, action) {
      state.bigLoader = action.payload;
    },
    setApproveLoader(state, action) {
      state.approveLoader = action.payload;
    },
    setTronLink(state, action) {
      state.tronLink = action.payload;
    },
    setOnWC(state, action) {
      state.WalletConnect = action.payload;
    },
    setWC(state, action) {
      state.WCProvider = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setTronPopUp(state, action) {
      state.tronPopUp = action.payload;
    },
    setBigNumFees(state, action) {
      state.bigNumberFees = action.payload;
    },
    setTronLoginError(state, action) {
      state.tronLoginError = action.payload;
    },
    setTrustWallet(state, action) {
      state.trustWallet = action.payload;
    },
    setFactory(state, action) {
      state.factory = action.payload;
    },
    connectAlgorandWalletClaim(state, action) {
      state.connectClaimAlgorand = action.payload;
    },
    claimAlgorandPopup(state, action) {
      // claim from success popup
      state.algorandClaimPopup = action.payload;
    },
    setAlgoSigner(state, action) {
      state.AlgoSigner = action.payload;
    },
    setAlgorandAccount(state, action) {
      state.algorandAccount = action.payload;
    },
    setShowAbout(state, action) {
      state.about = action.payload;
    },
    setShowVideo(state, action) {
      state.video = action.payload;
    },
    setAlgorandClaimables(state, action) {
      state.algorandClaimables = action.payload;
    },
    setAlgorandWallet(state, action) {
      state.AlgorandWallet = action.payload;
    },
    setMyAlgo(state, action) {
      state.MyAlgo = action.payload;
    },
    setNFTsToWhitelist(state, action) {
      state.nftsToWhitelist = [...state.nftsToWhitelist, action.payload];
    },
    removeFromNotWhiteListed(state) {
      state.nftsToWhitelist.shift();
    },
    setTransferLoaderModal(state, action) {
      state.transferModalLoader = action.payload;
    },
    setValidatorsInf(state, action) {
      state.validatorsInfo = action.payload;
    },
    setGetFeaturedModal(state, action) {
      state.featuredModal = action.payload;
    },
    setTransactionStep(state, action) {
      state.transactionStep = action.payload;
    },
    setTezosAccount(state, action) {
      state.tezosAccount = action.payload;
    },
    setKukaiWallet(state, action) {
      state.kukaiWallet = action.payload;
    },
    setTempleWallet(state, action) {
      state.templeWallet = action.payload;
    },
  },
});

export const {
  setTempleWallet,
  setKukaiWallet,
  setTezosAccount,
  setGetFeaturedModal,
  setTransactionStep,
  setValidatorsInf,
  setTransferLoaderModal,
  toggleNFTInfo,
  removeFromNotWhiteListed,
  setNFTsToWhitelist,
  setReset,
  setTo,
  claimAlgorandPopup,
  setAlgorandClaimables,
  setFrom,
  setChainModal,
  setDepartureOrDestination,
  setChainSearch,
  setStep,
  setAccount,
  setMetaMask,
  setNFTList,
  setFactory,
  setSelectedNFTList,
  cleanSelectedNFTList,
  removeFromSelectedNFTList,
  setSearchNFTList,
  allSelected,
  setNFTsListView,
  updateApprovedNFTs,
  setApproved,
  setReceiver,
  setTxnHash,
  setWrongNetwork,
  setMetaMaskActive,
  setElrondAccount,
  removeAlgorandClaimable,
  setMaiarProvider,
  setOnMaiar,
  connectAlgorandWalletClaim,
  setTronWallet,
  setConfirmMaiarMob,
  setSwitchDestination,
  setAccountModal,
  setBigLoader,
  setApproveLoader,
  setTronLink,
  setOnWC,
  setWC,
  setWidget,
  setError,
  setBigNumFees,
  setTronPopUp,
  setTronLoginError,
  setTrustWallet,
  setAlgoSigner,
  setAlgorandAccount,
  setShowAbout,
  setShowVideo,
  setAlgorandWallet,
  setMyAlgo,
  clearTxnHash,
  clearApprovedNFTs,
  cleartSelectedNFT,
  setWSettings,
} = generalSlice.actions;

export default generalSlice.reducer;
