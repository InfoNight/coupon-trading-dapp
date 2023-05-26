import { useEffect, useState } from "react";
import { 
    mintNFT
  } from "../utils/nft.js"; 
import _ from 'lodash'
import QRCode from 'qrcode.react';
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


const MintCouponBox = ({couponList}) => {
    const [couponName, setCouponName] = useState("");
    const [userAddress, setUserAddress] = useState("");
    const [loading, setLoading] = useState(false);
    const [openTxInfo, setOpenTxInfo] = useState(false)
    const [status, setStatus] = useState("");
    const [rand, setRand] = useState("");

    useEffect(async () => {
        setCouponName("");
        setUserAddress("");
    }, []);

    const stateOptions = _.map(couponList, (coupon) => ({
        key: coupon.metadata.name,
        text: coupon.metadata.name,
        value: coupon.metadata.name,
    }))

    const onChangeCoupon = (e, data) => {
        setCouponName(data.value);
    };

    const onChangeUserAddress = (e) => {
        setUserAddress(e.target.value);
    };

    const onMintPressed = async () => {
        setLoading(true)
        const coupon = _.filter(couponList, (coupon) => coupon.metadata.name === couponName)[0];
        const { rand, status } = await mintNFT(coupon, userAddress)
        setLoading(false)
        setStatus(status)
        setRand(rand)
        setOpenTxInfo(true)

        console.log(rand)
        console.log(status)
    };

    return (
        <Grid divided='vertically' verticalAlign="middle">
            <Grid.Row>
                <Grid.Column floated='left' width={7}>
                    <Header as='h3'>
                        <Icon.Group size='big'>
                            <Icon name='send' />
                        </Icon.Group>
                        &nbsp;
                        Mint coupons
                    </Header>
                </Grid.Column>
                <Grid.Column floated='right' width={9}>
                    <Grid columns={1}>
                        <Grid.Column>
                            <Form>
                                <Dropdown placeholder='Select coupon' search selection options={stateOptions} onChange={onChangeCoupon}
                                        style={{width: '80%', marginBottom: '5px'}} />
                                <Form.Field
                                id='form-input-control-name'
                                control={Input}
                                placeholder='User address'
                                required={true}
                                onChange={onChangeUserAddress}
                                style={{width: '80%', marginBottom: '5px'}}
                                />
                            </Form>
                            {loading ? (
                                <Button color='green'>
                                    <Icon name='circle notch' loading /> Mint
                                </Button>
                            ) : (
                                <Button color='green' onClick={onMintPressed}>
                                <Icon name='checkmark' /> Mint
                                </Button>
                            )}
                        </Grid.Column>
                    </Grid>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row></Grid.Row>
            <Modal
                closeIcon
                onClose={() => setOpenTxInfo(false)}
                onOpen={() => setOpenTxInfo(true)}
                open={openTxInfo}
                centered={true}
                >
                <Header icon='archive' content='Transaction result' />
                <Modal.Content style={{textAlign: 'center'}}>
                    <QRCode value={rand} />
                    <Modal.Description>
                        <p>{status}</p>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='red' onClick={() => setOpenTxInfo(false)}>
                    <Icon name='remove' /> Close
                    </Button>
                </Modal.Actions>
            </Modal>
        </Grid>
    );
}

export default MintCouponBox;