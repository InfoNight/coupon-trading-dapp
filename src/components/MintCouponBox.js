import { useEffect, useState } from "react";
import { 
    mintNFT
  } from "../utils/nft.js"; 


const MintCouponBox = () => {
    const [couponType, setCouponType] = useState("");
    const [address, setAddress] = useState("");
    const [status, setStatus] = useState("");

    useEffect(async () => {
        setCouponType("");
        setAddress("");
    }, []);

    const onMintPressed = async () => {
        const { status } = await mintNFT(couponType, address)
        setStatus(status)
    };

    return (
        <div>
            <form>
                <h2>Coupon type: </h2>
                <input
                type="text"
                placeholder="e.g. Chicken A"
                onChange={(event) => setCouponType(event.target.value)}
                />
                <h2>User address: </h2>
                <input
                type="text"
                placeholder="e.g. 0x...."
                onChange={(event) => setAddress(event.target.value)}
                />
            </form>
            <button id="mintButton" onClick={onMintPressed}>
                Mint NFT
            </button>
            <p className="status">
                {status}
            </p>
        </div>
    );
}

export default MintCouponBox;