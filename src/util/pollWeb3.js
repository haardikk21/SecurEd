import Web3 from "web3";
import store from "../store";

let pollWeb3 = function() {
  let web3 = window.web3;
  web3 = new Web3(web3.currentProvider);

  setInterval(() => {
    if (web3 && store.state.web3.web3Instance) {
      web3.eth.getCoinbase((err, coinbase) => {
        if (err) {
          console.log(err);
        } else {
          if (coinbase !== store.state.web3.coinbase) {
            store.dispatch("pollWeb3", {
              coinbase: coinbase
            });
          }
        }
      });
    }
  }, 500);
};

export default pollWeb3;
