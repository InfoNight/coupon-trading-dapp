import { useEffect, useState } from "react";
import Banner from "components/Banner.js";
import CouponList from "components/user/CouponList.js";
import load_coupons from "utils/user/load_coupons";
import { pageBackgroundColor } from "types";
import { WalletMode } from "../types";
import { Segment } from "semantic-ui-react";

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
        <div style={{
            display: "flex",
            justifyContent: "center",
            backgroundColor: pageBackgroundColor,
            height: "100vh"
        }}>
            <Segment style={{
                width: "50%"
            }}>
                <Banner mode={WalletMode.USER} walletAddress={walletAddress} />
                <CouponList couponList={couponList} setCouponList={setCouponList}/>
            </Segment>
        </div>
    );
}

export default UserMain;