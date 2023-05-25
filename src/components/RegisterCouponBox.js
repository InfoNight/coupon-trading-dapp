import { useEffect, useState } from "react";
import { useDropzone } from 'react-dropzone'
import { pinFileToIPFS } from "../utils/pinata.js";


const RegisterCouponBox = () => {
    const [couponType, setCouponType] = useState("");
    const [couponName, setCouponName] = useState("");
    const [image, setImage] = useState(null);
    const [status, setStatus] = useState("");
    
    useEffect(async () => {
        setCouponType("");
        setCouponName("");
    }, []);
    
    
    const onDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];
        const reader = new FileReader();
        reader.readAsArrayBuffer(file)

        reader.onloadend = async () => {
            const buffer = Buffer.from(reader.result);
            setImage(buffer)
        };    
    };
    
    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    const onRegisterPressed = async () => {
        console.log(image)
        const file = new Blob([image], {type: 'image/jpeg'})
        await pinFileToIPFS(file, couponType, couponName);
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
                <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    {image ? (
                        <img src={image} alt="uploaded image" />
                    ) : (
                        <p>Drag and drop an image here or click to select an image</p>
                    )}
                </div>
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