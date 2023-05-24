import { useEffect, useState } from "react";
import { useDropzone } from 'react-dropzone'


const RegisterCouponBox = () => {
    const [couponType, setCouponType] = useState("");
    const [couponName, setCouponName] = useState("");
    const [image, setImage] = useState({});
    const [status, setStatus] = useState("");
    
    useEffect(async () => {
        setCouponType("");
        setCouponName("");
    }, []);
    
    
    const onDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];
        console.log(file)

        const reader = new FileReader();

        reader.onload = async () => {
            console.log(reader.result)
        }
        reader.readAsArrayBuffer(file)
        // const formData = new FormData();
        // formData.append('file', file);
        // console.log(formData.get('file'))
        // setImage({'formData': formData});

        // console.log(image)
        // console.log(image['formData'])
    };
    
    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    const onRegisterPressed = async () => {
        // const { status } = await mintNFT(couponType, address)
        // setStatus(status)
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