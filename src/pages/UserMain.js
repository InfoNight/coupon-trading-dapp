import { useEffect, useState } from "react";
import Banner from "components/Banner.js";
import CouponList from "components/user/CouponList.js";
import load_coupons from "utils/user/load_coupons";
// import { getUserCouponList } from "utils/user/user_contracts.js";
// import { getPinJsonByURI } from "utils/pinata.js";
import { WalletMode } from "../types";

const UserMain = ({walletAddress}) => {
    const [couponList, setCouponList] = useState([]);

    useEffect(async () => {
        const loadResponse = await load_coupons();
        if (loadResponse.success) {
            console.log(loadResponse.couponList);
            setCouponList(loadResponse.couponList);
        } else {
            console.log(loadResponse.status);
        }
    }, []);

    return (
        <div>
            <Banner mode={WalletMode.USER} walletAddress={walletAddress} />
            <CouponList couponList={couponList} setCouponList={setCouponList}/>
        </div>
    );
}

export default UserMain;