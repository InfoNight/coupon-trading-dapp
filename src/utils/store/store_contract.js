import { parse } from "dotenv";
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
      let couponUsages = [];
      let couponUsageList = [];

      for (let i = 0; i < parsedData[0].length; i++) {
          let couponUsage = { address: parsedData[0][i], couponURI: parsedData[1][i] };
          couponUsages.push(couponUsage);
      }

      let agg = couponUsages.reduce((acc, cur) => {
          if (acc[cur.address]) {
              acc[cur.address].count = acc[cur.address].count + 1;
          } else {
              acc[cur.address] = {couponURI: cur.couponURI, count: 1};
          }
          return acc;
      }, {})

      for (let[key, value] of Object.entries(agg)) {
          couponUsageList.push({address: key, couponURI: value.couponURI, count: value.count});
      }

      return {
          success: true,
          couponUsageList: couponUsageList
      };
    } catch (error) {
      return {
        success: false,
        status: "😥 Something went wrong: " + error.message,
      };
    }
  };

export const receiveCoupon = async (address) => {
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
      .consumeCoupons(address)
      .encodeABI(),
  };

  try {
    const data = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    });
    const parsedData = web3.eth.abi.decodeParameters(['bool'], data);

    return {
        success: true
    };
  } catch (error) {
    return {
      success: false,
      status: "😥 Something went wrong: " + error.message,
    };
  }
}