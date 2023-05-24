import { useEffect, useState } from "react";
import MintCouponBox from "../components/MintCouponBox.js";
import RegisterCouponBox from "../components/RegisterCouponBox.js";

const StoreMain = () => {
    return (
        <div className="horizontal">
            <RegisterCouponBox />
            <MintCouponBox />
        </div>
    );
}

export default StoreMain;