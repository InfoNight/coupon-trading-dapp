import { useEffect, useState } from "react";
import CouponDropzone from "components/store/CouponDropzone.js"
import { pinFileToIPFS } from "utils/store/store_pinata.js";
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
    const [couponUnit, setCouponUnit] = useState("");
    const [couponDescription, setCouponDescription] = useState("");
    const [file, setFile] = useState(null);
    const [image, setImage] = useState(null);
    const [status, setStatus] = useState("");
    const [hovered, setHovered] = useState(false);
    const [openRegister, setOpenRegister] = useState(false)
    const [loading, setLoading] = useState(false);

    useEffect(async () => {
        setCouponDescription("");
        setCouponName("");
    }, []);

    const onChangeName = (e) => {
        setCouponName(e.target.value);
    };
    const onChangeUnit = (e) => {
        setCouponUnit(e.target.value);
    };
    const onChangeDescription = (e) => {
        setCouponDescription(e.target.value);
    };
    const onChangeImage = (input_file) => {
        setFile(input_file)
        setImage(URL.createObjectURL(input_file));
    };

    const onRegisterPressed = async () => {
        setLoading(true);
        const hash = await pinFileToIPFS(file, walletAddress, couponName, couponUnit, couponDescription);
        console.log(hash);
        setLoading(false);
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
                        onChange={onChangeName}
                    />
                    <Form.Field
                        id='form-input-control-name'
                        control={Input}
                        label='Redemption unit'
                        placeholder='10'
                        required={true}
                        onChange={onChangeUnit}
                    />
                    <Form.Field
                        id='form-textarea-control-description'
                        control={TextArea}
                        label='Description'
                        placeholder='Description'
                        required={true}
                        onChange={onChangeDescription}
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
                {loading ? (
                    <Button color='green'>
                        <Icon name='circle notch' loading /> Add
                    </Button>
                ) : (
                    <Button color='green' onClick={onRegisterPressed}>
                    <Icon name='checkmark' /> Add
                    </Button>
                )}
            </Modal.Actions>
        </Modal>
    );
}

export default RegisterCouponBox;