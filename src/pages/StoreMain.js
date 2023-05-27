import { useEffect, useState } from "react";
import Banner from "components/Banner.js";
import CouponList from "components/store/CouponList.js";
import MintCouponBox from "components/store/MintCouponBox.js";
import { getPinList } from "utils/store/store_pinata.js";
import { getStoreCouponList } from "utils/store/store_contract.js";
import { WalletMode } from "../types";

const StoreMain = ({walletAddress}) => {
    const [couponList, setCouponList] = useState([]);
    const [couponUsageList, setCouponUsageList] = useState([]);

    useEffect(async () => {
        const pinataResponse = await getPinList(walletAddress);
        if (pinataResponse.success) {
            setCouponList(pinataResponse.pinList);
        } else {
            console.log(pinataResponse.message)
        }

        const contractResponse = await getStoreCouponList(walletAddress);
        if (contractResponse.success) {
            let couponUsages = [];
            for (let i = 0; i < contractResponse.userAddresses.length; i++) {
                let couponUsage = { address: contractResponse.userAddresses[i], couponURI: contractResponse.couponURIs[i] };
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
                setCouponUsageList([...couponUsageList, {address: key, couponURI: value.couponURI, count: value.count}]);;
            }
        } else {
            console.log(contractResponse.message)
        }
    }, []);

    return (
        <div>
            <Banner mode={WalletMode.STORE} walletAddress={walletAddress} couponUsageList={couponUsageList}/>
            <MintCouponBox couponList={couponList}/>
            <CouponList walletAddress={walletAddress} couponList={couponList}/>
        </div>
    );
}

export default StoreMain;