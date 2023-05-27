import { useEffect, useState } from "react";
import Banner from "components/Banner.js";
import CouponList from "components/store/CouponList.js";
import { getPinList } from "utils/store/store_pinata.js";
import { getStoreCouponList } from "utils/store/store_contract.js";
import { WalletMode } from "../types";
import { Segment } from "semantic-ui-react";

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
            setCouponUsageList(contractResponse.couponUsageList)
        } else {
            console.log(contractResponse.message)
        }
    }, []);

    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            backgroundColor: "#F8E8EE"
        }}>
            <Segment style={{
                width: "50%"
            }}>
                <Banner mode={WalletMode.STORE} walletAddress={walletAddress} couponUsageList={couponUsageList} setCouponUsageList={setCouponUsageList}/>
                <CouponList walletAddress={walletAddress} couponList={couponList}/>
            </Segment>
        </div>
    );
}

export default StoreMain;