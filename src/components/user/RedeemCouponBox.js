import { useEffect, useState } from "react";
import { redeemCoupon } from "utils/user/user_contracts"; 
import { 
    Grid,
    Header,
    Icon,
    Dropdown,
    Form,
    Input,
    Modal,
    Button
} from "semantic-ui-react";

const RedeemCouponBox = ({coupon}) => {
    const [storeAddress, setStoreAddress] = useState("");
    const [couponNumber, setCouponNumber] = useState(0);
    const [loading, setLoading] = useState(false);
    const [openRedeemInfo, setOpenRedeemInfo] = useState(false);
    const []

    useEffect(async () => {
        setStoreAddress("");
    }, []);

    const onChangeStoreAddress = (e) => {
        setStoreAddress(e.target.value);
    };

    const onChangeCouponNumber = (e) => {
        setCouponNumber(e.target.value);
    }

    const onRedeemPressed = async () => {
        setLoading(true)
        console.log(Number(couponNumber))
        console.log(coupon.couponIds.slice(0, Number(couponNumber)))
        const useCouponResponse = await redeemCoupon(storeAddress, coupon.couponIds.slice(0, Number(couponNumber)));
        if (!useCouponResponse.success) {
            console.log(useCouponResponse.status);
        }
        setLoading(false)
        setOpenRedeemInfo(false)
    };

    return (
        <div>
            <Modal
                closeIcon
                onClose={() => setOpenRedeemInfo(false)}
                onOpen={() => setOpenRedeemInfo(true)}
                open={openRedeemInfo}
                trigger={loading ? (
                    <Button color='green' style={{width: "100%"}}>
                        <Icon name='circle notch' loading /> Redeem
                    </Button>
                ) : (
                    <Button color='green' style={{width: "100%"}}>
                    <Icon name='checkmark' /> Redeem
                    </Button>
                )}
                centered={true}
                style={{width: "50%"}}
                >
                <Header icon='add' content='Redeem coupon' />
                <Modal.Content>
                <Form>
                    <Form.Field
                        id='form-input-control-name'
                        control={Input}
                        label='Store address'
                        placeholder='Store address'
                        required={true}
                        onChange={onChangeStoreAddress}
                    />
                    <Form.Field
                        id='form-input-control-name'
                        control={Input}
                        label='Number of coupons'
                        placeholder={
                            coupon.couponUnit === undefined
                            ? "Redemption Unit : 1"
                            : "Redemption Unit : " + coupon.couponUnit
                        }
                        required={true}
                        onChange={onChangeCouponNumber}
                    />
                </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='red' onClick={() => setOpenRedeemInfo(false)}>
                    <Icon name='remove' /> Cancel
                    </Button>
                    {loading ? (
                        <Button color='green'>
                            <Icon name='circle notch' loading /> Redeem
                        </Button>
                    ) : (
                        <Button color='green' onClick={onRedeemPressed}>
                        <Icon name='checkmark' /> Redeem
                        </Button>
                    )}
                </Modal.Actions>
            </Modal>
        </div>
    );
}

export default UseCouponBox;