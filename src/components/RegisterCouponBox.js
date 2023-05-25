import { useEffect, useState } from "react";
import CouponDropzone from "./CouponDropzone.js"
import { pinFileToIPFS } from "../utils/pinata.js";
const fs = require('fs');

const RegisterCouponBox = ({walletAddress}) => {
    const [couponType, setCouponType] = useState("");
    const [couponName, setCouponName] = useState("");
    const [file, setFile] = useState(null);
    const [image, setImage] = useState(null);
    const [status, setStatus] = useState("");

    useEffect(async () => {
        setCouponType("");
        setCouponName("");
    }, []);
    
    const onChangeImage = (input_file) => {
        setFile(input_file)
        setImage(URL.createObjectURL(input_file));
    };

    const onRegisterPressed = async () => {
        const hash = await pinFileToIPFS(file, walletAddress, couponType, couponName);
        console.log(hash);
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
                <h2>Coupon name: </h2>
                <input
                type="text"
                placeholder="e.g. Gold Olive Chicken"
                onChange={(event) => setCouponName(event.target.value)}
                />
                <h2>image: </h2>
                {image ? (
                    <img src={image} />
                ) : (
                    <CouponDropzone onChangeImage={onChangeImage} />
                )}
            </form>
            <button id="registerButton" onClick={onRegisterPressed}>
                Register coupon
            </button>
            <p className="status">
                {status}
            </p>
        </div>
    );
}

export default RegisterCouponBox;