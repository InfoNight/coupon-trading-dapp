import { getUserCouponList } from "utils/user/user_contracts.js";
import { getPinJsonByURI } from "utils/pinata.js";

const load_coupons = async () => {
    const contractResponse = await getUserCouponList();
    if (contractResponse.success) {
        console.log("success")
        console.log(contractResponse.tokenIds)
        console.log(contractResponse.couponURIs)
        
        let couponInfo = {};
        // let couponIdList = {};
        let couponURIList = [];
        for (let i=0; i<contractResponse.couponURIs.length; i++) {
            if (contractResponse.couponURIs[i] in couponInfo) {
                couponInfo[contractResponse.couponURIs[i]][0] += 1;
                couponInfo[contractResponse.couponURIs[i]][1].push(contractResponse.tokenIds[i]);
            } else {
                couponInfo[contractResponse.couponURIs[i]] = [1, [contractResponse.tokenIds[i]]];
                couponURIList.push(contractResponse.couponURIs[i]);
            }
        }

        let couponJsons = [];
        for (let i=0; i<couponURIList.length; i++) {
            try {
                const pinataResponse = await getPinJsonByURI(couponURIList[i]);
                if (pinataResponse.success) {
                    let newJson = pinataResponse.pinJson;
                    newJson.couponCount = couponInfo[couponURIList[i]][0];
                    newJson.couponIds = couponInfo[couponURIList[i]][1];
                    couponJsons.push(newJson);
                } else {
                    console.log("Error during getting json from uri: " + pinataResponse.message);
                }
            } catch (error) {
                console.log("pinataResponse error: " + error);
            }
        }

        return {
            success: true,
            couponList: couponJsons
        }
    } else {
        return {
            success: false,
            status: contractResponse.status
        }
    }
}

export default load_coupons;