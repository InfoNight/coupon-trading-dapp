import { useEffect, useState } from "react";
import MessageAlert from "components/MessageAlert.js";
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
    const [hovered, setHovered] = useState(false);
    const [openRegister, setOpenRegister] = useState(false)
    const [loading, setLoading] = useState(false);
    const [alertVisible, setAlertVisible] = useState(false)
    const [alertMessage, setAlertMessage] = useState("")
    const [status, setStatus] = useState(false);


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
        const data = await pinFileToIPFS(file, walletAddress, couponName, couponUnit, couponDescription);
        setLoading(false);
        setOpenRegister(false);
        setImage(null);
        if (data.success) {
            setStatus(true)
            setAlertMessage("Coupon registered successfully!")
        } else {
            setStatus(false)
            setAlertMessage("Coupon registration failed!")
        }

        setAlertVisible(true)
    };

    return (
        <div>
            {alertVisible ? (
                <MessageAlert message={alertMessage} success={status} alertVisible={alertVisible} setAlertVisible={setAlertVisible}></MessageAlert>
            ) : (
                <div></div>
            )}
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
        </div>
    );
}

export default RegisterCouponBox;