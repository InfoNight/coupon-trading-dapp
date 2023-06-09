import { gatewayAddress } from "types";

require('dotenv').config();
const key = process.env.REACT_APP_PINATA_KEY;
const secret = process.env.REACT_APP_PINATA_SECRET;
const axios = require('axios');

const getPinList = async (walletAddress) => {
    const keyvalues = new Object({
        "walletAddress": {
            value : walletAddress,
            op: "eq",
        }
    });

    const stringKeyValues = JSON.stringify(keyvalues);
    const url = `https://api.pinata.cloud/data/pinList?status=pinned&metadata[keyvalues]=${stringKeyValues}`;

    return axios
        .get(url, {
            headers: {
                pinata_api_key: key,
                pinata_secret_api_key: secret,
            }
        })
        .then(function (response) {
            return {
                success: true,
                pinList: response.data.rows,
            };
        })
        .catch(function (error) {
            console.log(error)
            return {
                success: false,
                message: error.message,
            }
        });
};

const pinFileToIPFS = async (file, walletAddress, couponName, couponUnit, couponDescription) => {
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
    let data = new FormData();
    data.append('file', file);
    data.append('pinataMetadata', JSON.stringify({
        'name': couponName,
        keyvalues: {
            'walletAddress': walletAddress,
            'couponUnit': couponUnit,
            'couponDescription': couponDescription,
        }
    }));

    return axios
        .post(url, data, {
            maxBodyLength: 'Infinity',
            headers: {
                'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                pinata_api_key: key,
                pinata_secret_api_key: secret,
            }   
        })
        .then(function (response) {
            return {
                success: true,
                pinataUrl: gatewayAddress + response.data.IpfsHash
            };
        })
        .catch(function (error) {
            console.log(error)
            return {
                success: false,
                message: error.message,
            } 
        });
};

const pinJSONToIPFS = async(JSONBody) => {
    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
    return axios
        .post(url, JSONBody, {
            headers: {
                'Content-Type': 'application/json',
                pinata_api_key: key,
                pinata_secret_api_key: secret,
            }
        })
        .then(function (response) {
           return {
               success: true,
               pinataUrl: gatewayAddress + response.data.IpfsHash
           };
        })
        .catch(function (error) {
            console.log(error)
            return {
                success: false,
                message: error.message,
            }
           
        });
};

export { getPinList, pinFileToIPFS, pinJSONToIPFS };