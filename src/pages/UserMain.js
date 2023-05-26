import { useEffect, useState } from "react";
import Banner from "components/Banner.js";
import CouponList from "components/user/CouponList.js";
import { getUserCouponList } from "utils/contract.js";
import { WalletMode } from "../types";

const UserMain = ({walletAddress}) => {
    const [couponList, setCouponList] = useState([]);

    useEffect(async () => {
        const contractResponse = await getUserCouponList(walletAddress);
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
            <Banner mode={WalletMode.USER} walletAddress={walletAddress} />
            <CouponList walletAddress={walletAddress} couponList={couponList}/>
        </div>
    );
}

export default UserMain;