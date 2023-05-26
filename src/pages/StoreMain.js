import { useEffect, useState } from "react";
import Banner from "components/Banner.js";
import CouponList from "components/CouponList.js";
import MintCouponBox from "components/MintCouponBox.js";
import { getPinList } from "utils/pinata.js";
import { getCouponList } from "utils/contract.js";
import { WalletMode } from "../types";

const StoreMain = ({walletAddress}) => {
    const [couponList, setCouponList] = useState([]);

    useEffect(async () => {
        const pinataResponse = await getPinList(walletAddress);
        if (pinataResponse.success) {
            setCouponList(pinataResponse.pinList);
        } else {
            console.log(pinataResponse.message)
        }

        const contractResponse = await getCouponList(walletAddress);
        if (contractResponse.success) {
            console.log("success")
            console.log(contractResponse.userAddresses)
            console.log(contractResponse.couponURIs)
            // setCouponList(contractResponse.couponList);
        } else {
            console.log(contractResponse.message)
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