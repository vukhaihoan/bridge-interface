import axios from "axios";
import { ethers } from "ethers";

class WService {
  widgetApi = "http://localhost:3030"; //"https://xpnetwork-widget.herokuapp.com";
  msg = "Please sign in order to see your widgets";

  constructor() {
    this.axios = axios;
    this.axios.defaults.withCredentials = true;
    this.axios.defaults.baseURL = this.widgetApi;
    this.provider = new ethers.providers.Web3Provider(window.ethereum);
  }

  async get(id) {
    return (
      await this.axios.get(`/getWidget?widgetId=${id}`).catch((e) => ({}))
    )?.data;
  }

  async add(address, signature, initialWidget) {
    return (
      await this.axios
        .post(`/addWidget`, {
          address,
          signature,
          widget: initialWidget,
        })
        .catch((e) => ({}))
    ).data;
  }

  async sign(msg) {
    if (window.ethereum) {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x4" }], // chainId must be in hexadecimal numbers
      });

      const signer = this.provider.getSigner();

      const [signature, address] = await Promise.all([
        signer.signMessage(msg || this.msg),
        signer.getAddress(),
      ]);

      return { signature, address };
    } else {
      alert("install metamask");
    }
  }

  async update(wid, settings) {
    try {
      return await this.axios.patch(`/updateWidget`, {
        widgetId: wid,
        settings,
      });
    } catch (e) {
      if (e.response.status === 403 && e.response.data === "no cookies") {
        const { signature, address } = await this.sign();

        return await axios.patch(`/updateWidget`, {
          widgetId: wid,
          settings,
          signature,
          address,
        });
      }
    }
  }
}

export default () => new WService();
