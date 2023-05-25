import { useEffect, useState } from "react";
import { getPinList } from "../utils/pinata.js";

const CouponList = ({walletAddress}) => {
    const [couponList, setCouponList] = useState([]);

    useEffect(async () => {
        const response = await getPinList(walletAddress);
        if (response.success) {
            console.log(response.pinList);
            setCouponList(response.pinList);
        } else {
            console.log(response.message)
        }
    }, []);

    return (
        <div>
            <h1>Coupon List</h1>
            {couponList.map((coupon) => (
                <img key={coupon.ipfs_pin_hash} src={`https://gateway.pinata.cloud/ipfs/${coupon.ipfs_pin_hash}`} alt={coupon.name} />
            ))}
        </div>
    )
}

export default CouponList;