import { useEffect, useState } from "react";
import Banner from "components/Banner.js";
import CouponList from "components/user/CouponList.js";
import { getUserCouponList } from "utils/user/user_contracts.js";
import { getPinJsonByURI } from "utils/pinata.js";
import { WalletMode } from "../types";

const UserMain = ({walletAddress}) => {
    const [couponList, setCouponList] = useState([]);

    useEffect(async () => {
        const contractResponse = await getUserCouponList();
        if (contractResponse.success) {
            console.log("success")
            console.log(contractResponse.userAddresses)
            console.log(contractResponse.couponURIs)
            
            let couponCounts = {};
            let couponURIList = [];
            for (let i=0; i<contractResponse.couponURIs.length; i++) {
                if (contractResponse.couponURIs[i] in couponCounts) {
                    couponCounts[contractResponse.couponURIs[i]] += 1;
                } else {
                    couponCounts[contractResponse.couponURIs[i]] = 1;
                    couponURIList.push(contractResponse.couponURIs[i]);
                }
            }

            let couponJsons = [];
            for (let i=0; i<couponURIList.length; i++) {
                try {
                    const pinataResponse = await getPinJsonByURI(couponURIList[i]);
                    if (pinataResponse.success) {
                        couponJsons.push(pinataResponse.pinJson);
                    } else {
                        console.log("Error during getting json from uri: " + pinataResponse.message);
                    }
                } catch (error) {
                    console.log("pinataResponse error: " + error);
                }
            }
            console.log(couponJsons);
            setCouponList(couponJsons);
        } else {
            console.log(contractResponse.status)
        }
    }, []);

    return (
        <div>
            <Banner mode={WalletMode.USER} walletAddress={walletAddress} />
            <CouponList couponList={couponList}/>
        </div>
    );
}

export default UserMain;