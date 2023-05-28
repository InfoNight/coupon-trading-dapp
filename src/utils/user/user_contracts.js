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
    } catch (error) {
      return {
        success: false,
        status: "😥 Something went wrong with getUserCouponList: " + error.message,
      };
    }
}

export const claimCoupon = async (couponCode) => {
  if (couponCode.trim() == "") {
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
      .claimCoupon(couponCode)
      .encodeABI(),
  };

  try {
    const data = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    });
    const parsedData = web3.eth.abi.decodeParameters(['uint256'], data);

    return {
        success: true,
        couponId: parsedData
    };
  } catch (error) {
    return {
      success: false,
      status: "😥 Something went wrong with claimCoupon: " + error.message,
    };
  }
}

export const redeemCoupon = async (address, couponIds) => {
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
      .useCoupon(address, couponIds)
      .encodeABI(),
  };

  try {
    await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    });

    return {
        success: true,
    };
  } catch (error) {
    return {
      success: false,
      status: "😥 Something went wrong with claimCoupon: " + error.message,
    };
  }
}