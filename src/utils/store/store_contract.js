import { contractAddress } from "types";
const contractABI = require("../../contract-abi.json");
const Web3 = require('web3');
const web3 = new Web3('https://api.baobab.klaytn.net:8651/');

export const getStoreCouponList = async (address) => {
    if (address.trim() == "") {
      return {
        success: false,
        status: "❗Please make sure all fields are completed before minting.",
      };
    }

    window.contract = await new web3.eth.Contract(contractABI, contractAddress);

    const transactionParameters = {
      to: contractAddress, // Required except during contract publications.
      from: window.ethereum.selectedAddress, // must match user's active address.
      data: window.contract.methods
        .getPendingCoupons()
        .encodeABI(),
    };

    try {
      const data = await window.ethereum.request({
        method: "eth_call",
        params: [transactionParameters],
      });
      const parsedData = web3.eth.abi.decodeParameters(['address[]', 'string[]'], data);
      return {
          success: true,
          userAddresses: parsedData[0],
          couponURIs: parsedData[1]
      };
    } catch (error) {
      return {
        success: false,
        status: "😥 Something went wrong: " + error.message,
      };
    }
  };