import Web3 from "web3";
import { address, ABI } from "./contracts/securedContract";
let getContract = new Promise(function(resolve) {
  let web3 = new Web3(window.web3.currentProvider);
  let securedContractInstance = new web3.eth.Contract(ABI, address);
  resolve(securedContractInstance);
});
export default getContract;
