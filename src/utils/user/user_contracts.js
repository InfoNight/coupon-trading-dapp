import { contractAddress } from "types";
const contractABI = require("../../contract-abi.json");
const Web3 = require('web3');
const web3 = new Web3('https://api.baobab.klaytn.net:8651/');

export const getUserCouponList = async () => {
    window.contract = await new web3.eth.Contract(contractABI, contractAddress);

    const transactionParameters = {
      to: contractAddress, // Required except during contract publications.
      from: window.ethereum.selectedAddress, // must match user's active address.
      data: window.contract.methods
        .getUserCoupons()
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
          tokenIds: parsedData[0],
          couponURIs: parsedData[1]
      };

    // try {
    //     const data = await window.contract.methods.getUserCoupons().call()
    //     return {
    //         success: true,
    //         tokenIds: data[0],
    //         couponURIs: data[1]
    //     };
    } catch (error) {
      return {
        success: false,
        status: "😥 Something went wrong with getUserCouponList: " + error.message,
      };
    }
}