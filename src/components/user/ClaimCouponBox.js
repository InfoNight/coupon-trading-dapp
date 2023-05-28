import { useEffect, useState } from "react";
import { claimCoupon } from "utils/user/user_contracts.js";
import load_coupons from "utils/user/load_coupons";
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

const ClaimCouponBox = ({setCouponList}) => {
    const [couponCode, setCouponCode] = useState("");
    const [hovered, setHovered] = useState(false);
    const [addCoupon, setAddCoupon] = useState(false)
    const [loading, setLoading] = useState(false);

    useEffect(async () => {
        setCouponCode("");
    }, []);

    const onChangeCode = (e) => {
        setCouponCode(e.target.value);
    };

    const onClaimPressed = async () => {
        setLoading(true);
        const claimResponse = await claimCoupon(couponCode);
        if (!claimResponse.success) {
            console.log(claimResponse.message)
        }

        const loadResponse = await load_coupons();
        if (loadResponse.success) {
            setCouponList(loadResponse.couponList);
        } else {
            console.log(loadResponse.status);
        }

        setLoading(false);
        setAddCoupon(false);
    };

    return (
        <Modal
            closeIcon
            open={addCoupon}
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
            onClose={() => setAddCoupon(false)}
            onOpen={() => setAddCoupon(true)}
            >
            <Header icon='add' content='Add new coupon' />
            <Modal.Content>
                <Form>
                    <Form.Field
                        id='form-input-control-name'
                        control={Input}
                        label='Coupon code'
                        placeholder='Coupon code'
                        required={true}
                        onChange={onChangeCode}
                    />
                </Form>
            </Modal.Content>
            <Modal.Actions>
                <Button color='red' onClick={() => setAddCoupon(false)}>
                <Icon name='remove' /> Cancel
                </Button>
                {loading ? (
                    <Button color='green'>
                        <Icon name='circle notch' loading /> Add
                    </Button>
                ) : (
                    <Button color='green' onClick={onClaimPressed}>
                    <Icon name='checkmark' /> Add
                    </Button>
                )}
            </Modal.Actions>
        </Modal>
    );
}

export default ClaimCouponBox;