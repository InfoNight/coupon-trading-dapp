import { useEffect, useState } from "react";
import Banner from "components/Banner.js";
import CouponList from "components/CouponList.js";
import MintCouponBox from "components/MintCouponBox.js";
import { getPinList } from "utils/pinata.js";
import { WalletMode } from "../types";

const StoreMain = ({walletAddress}) => {
    const [couponList, setCouponList] = useState([]);

    useEffect(async () => {
        const response = await getPinList(walletAddress);
        if (response.success) {
            setCouponList(response.pinList);
        } else {
            console.log(response.message)
        }
    }, []);

    return (
        <div>
            <Banner mode={WalletMode.STORE} walletAddress={walletAddress} />
            <MintCouponBox couponList={couponList}/>
            <CouponList walletAddress={walletAddress} couponList={couponList}/>
        </div>
    );
}

export default StoreMain;