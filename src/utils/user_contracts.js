import { contractAddress } from "types";
const contractABI = require("../contract-abi.json");
const Web3 = require('web3');
const web3 = new Web3('https://api.baobab.klaytn.net:8651/');

export const getUserCouponList = async () => {
    window.contract = await new web3.eth.Contract(contractABI, contractAddress);

    try {
        const data = await window.contract.methods.getUserCoupons().call()
        return {
            success: true,
            tokenIds: data[0],
            couponURIs: data[1]
        };
    } catch (error) {
      return {
        success: false,
        status: "😥 Something went wrong with getUserCouponList: " + error.message,
      };
    }
}