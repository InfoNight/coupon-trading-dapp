import { pinJSONToIPFS } from "./pinata.js";
require("dotenv").config();
const contractABI = require("../contract-abi.json");
const contractAddress = "0x95c1B523395A333cb5Be120142EFBAa0c022717a";
const Web3 = require('web3');
const web3 = new Web3('https://api.baobab.klaytn.net:8651/');



async function loadContract() {
  return new web3.eth.Contract(contractABI, contractAddress);
}

export const mintNFT = async (coupon, address) => {
  if (address.trim() == "") {
    return {
      success: false,
      status: "❗Please make sure all fields are completed before minting.",
    };
  }


  // make metadata
  const metadata = new Object();
  metadata.couponName = coupon.metadata.name;
  metadata.couponDescription = coupon.metadata.keyvalues.couponDescription;
  metadata.image = `https://gateway.pinata.cloud/ipfs/${coupon.ipfs_pin_hash}`;

  const pinataResponse = await pinJSONToIPFS(metadata);
  if (!pinataResponse.success) {
    return {
      success: false,
      status: "😢 Something went wrong while uploading your tokenURI.",
    };
  }
  const tokenURI = pinataResponse.pinataUrl;
  const rand = Math.random().toString(36)

  window.contract = await new web3.eth.Contract(contractABI, contractAddress);

  const transactionParameters = {
    to: contractAddress, // Required except during contract publications.
    from: window.ethereum.selectedAddress, // must match user's active address.
    data: window.contract.methods
      .issueCoupon(address, rand, tokenURI)
      .encodeABI(),
  };

  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    });
    return {
      success: true,
      rand: rand,
      status:
        "✅ Check out your transaction on Etherscan: https://baobab.scope.klaytn.com/tx/" +
        txHash,
    };
  } catch (error) {
    return {
      success: false,
      status: "😥 Something went wrong: " + error.message,
    };
  }
};
