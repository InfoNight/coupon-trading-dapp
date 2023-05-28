require('dotenv').config();
const key = process.env.REACT_APP_PINATA_KEY;
const secret = process.env.REACT_APP_PINATA_SECRET;
const axios = require('axios');

const getPinJsonByURI = async (couponURI) => {
    const url = `https://api.pinata.cloud/data/pinList?status=pinned&hashContains=${couponURI.substring(34)}`;

    return axios
        .get(url, {
            headers: {
                pinata_api_key: key,
                pinata_secret_api_key: secret,
            }
        })
        .then(function (response) {
            if (response.data.count === 0) {
                return {
                    success: false,
                    message: "No such coupon",
                }
            } else {
                const pinJson = response.data.rows[0]
                console.log(pinJson)
                return {
                    success: true,
                    pinJson: pinJson,
                };
            }
        })
        .catch(function (error) {
            console.log(error)
            return {
                success: false,
                message: error.message,
            }
        });
};


// const getPinJsonByURI = async (couponURI) => {
//     return axios
//         .get(couponURI, {
//             headers: {
//                 'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8',
//                 "Access-Control-Allow-Origin": "https://gateway.pinata.cloud/ipfs/",
//             }
//         })
//         .then(function (response) {
//             return {
//                 success: true,
//                 pinJson: response.data,
//             };
//         })
//         .catch(function (error) {
//             console.log(error)
//             return {
//                 success: false,
//                 message: error.message,
//             }
//         });
// };

export { getPinJsonByURI };