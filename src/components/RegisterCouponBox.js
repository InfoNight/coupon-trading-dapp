import { useEffect, useState } from "react";
import CouponDropzone from "./CouponDropzone.js"
import { pinFileToIPFS } from "../utils/pinata.js";
import {
    Input,
    Form,
    Icon,
    Header,
    Button,
    Modal,
    TextArea,
    Image
  } from 'semantic-ui-react'

const RegisterCouponBox = ({walletAddress}) => {
    const [couponName, setCouponName] = useState("");
    const [couponDescription, setCouponDescription] = useState("");
    const [file, setFile] = useState(null);
    const [image, setImage] = useState(null);
    const [status, setStatus] = useState("");
    const [hovered, setHovered] = useState(false);
    const [openRegister, setOpenRegister] = useState(false)

    useEffect(async () => {
        setCouponDescription("");
        setCouponName("");
    }, []);
    
    const onChangeImage = (input_file) => {
        setFile(input_file)
        setImage(URL.createObjectURL(input_file));
    };

    const onRegisterPressed = async () => {
        const hash = await pinFileToIPFS(file, walletAddress, couponName, couponDescription);
        console.log(hash);
        setOpenRegister(false);
    };

    return (
        <Modal
            closeIcon
            open={openRegister}
            trigger={
                <Icon.Group size='big'
                    onMouseOver={() => setHovered(true)} 
                    onMouseLeave={() => setHovered(false)}
                    style={{cursor: 'grabbing'}}
                >
                    <Icon name='ticket' />
                    {hovered ? (
                        <Icon corner loading name='add'/>
                    ) : (
                        <Icon corner name='add'/>
                    )}
                </Icon.Group>
            }
            onClose={() => setOpenRegister(false)}
            onOpen={() => setOpenRegister(true)}
            >
            <Header icon='add' content='Add new coupon' />
            <Modal.Content>
                <Form>
                    <Form.Field
                        id='form-input-control-name'
                        control={Input}
                        label='Coupon name'
                        placeholder='Coupon name'
                        required={true}
                    />
                    <Form.Field
                        id='form-textarea-control-opinion'
                        control={TextArea}
                        label='Description'
                        placeholder='Description'
                        required={true}
                    />
                    {image ? (
                        <Image src={image} />
                    ) : (
                        <CouponDropzone onChangeImage={onChangeImage} />
                    )}
                </Form>
            </Modal.Content>
            <Modal.Actions>
                <Button color='red' onClick={() => setOpenRegister(false)}>
                <Icon name='remove' /> Cancel
                </Button>
                <Button color='green' onClick={onRegisterPressed}>
                <Icon name='checkmark' /> Add
                </Button>
            </Modal.Actions>
        </Modal>
    );
}

export default RegisterCouponBox;