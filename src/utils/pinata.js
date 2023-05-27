require('dotenv').config();
const key = process.env.REACT_APP_PINATA_KEY;
const secret = process.env.REACT_APP_PINATA_SECRET;
const axios = require('axios');

const getPinJsonByURI = async (couponURI) => {
    return axios
        .get(couponURI)
        .then(function (response) {
            return {
                success: true,
                pinJson: response.data,
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

export { getPinJsonByURI };