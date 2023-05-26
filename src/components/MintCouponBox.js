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
    const [hovered, setHovered] = useState(false);
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
        <Grid divided='vertically' centered={true} verticalAlign="middle">
            <Grid.Row columns={1}>
            <Grid.Column>
                <Header as='h2'>
                    <Icon.Group size='big'>
                        <Icon name='send' />
                    </Icon.Group>
                    &nbsp;
                    Mint coupons
                </Header>
            </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={3} centered={true}>
                <Grid.Column textAlign="center" width={3}>
                    {/* <Coupon coupon={couponList[0]} /> */}
                    <Dropdown placeholder='Select coupon' search selection options={stateOptions} onChange={onChangeCoupon}/>
                </Grid.Column>
                <Grid.Column width={1}>
                    <Icon.Group size='huge'
                        onMouseOver={() => setHovered(true)} 
                        onMouseLeave={() => setHovered(false)}
                        style={{cursor: 'grabbing'}}
                        onClick={onMintPressed}
                    >
                        <Icon name='right arrow' />
                        {loading ? (
                            <Icon corner loading name='hourglass one'/>
                        ) : hovered ? (
                            <Icon corner loading name='add'/>
                        ) : (
                            <Icon corner name='add'/>
                        )}
                    </Icon.Group>
                </Grid.Column>
                <Grid.Column width={5}>
                    <Form>
                        <Form.Field
                        id='form-input-control-name'
                        control={Input}
                        placeholder='User address'
                        required={true}
                        onChange={onChangeUserAddress}
                        />
                    </Form>
                </Grid.Column>
            </Grid.Row>
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