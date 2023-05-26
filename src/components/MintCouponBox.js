import { useEffect, useState } from "react";
import { 
    mintNFT
  } from "../utils/nft.js"; 
import _ from 'lodash'
import Coupon from 'components/Coupon.js';
import { 
    Grid,
    Header,
    Icon,
    Dropdown,
    Form,
    Input
} from "semantic-ui-react";


const MintCouponBox = ({couponList}) => {
    const [couponName, setCouponName] = useState("");
    const [userAddress, setUserAddress] = useState("");
    const [hovered, setHovered] = useState(false);
    const [status, setStatus] = useState("");

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
        const coupon = _.filter(couponList, (coupon) => coupon.metadata.name === couponName)[0];
        console.log(coupon);
        console.log(userAddress);
        // const { status } = await mintNFT(coupon, address)
        // setStatus(status)
    };

    return (
        <Grid divided='vertically' centered={true} verticalAlign="middle">
            <Grid.Row columns={1}>
            <Grid.Column>
                <Header as='h2'>
                    <Icon.Group size='big'>
                        <Icon name='bell' />
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
                        {hovered ? (
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
        </Grid>
        //     <form>
        //         <h2>Coupon type: </h2>
        //         <input
        //         type="text"
        //         placeholder="e.g. Chicken A"
        //         onChange={(event) => setCouponType(event.target.value)}
        //         />
        //         <h2>User address: </h2>
        //         <input
        //         type="text"
        //         placeholder="e.g. 0x...."
        //         onChange={(event) => setAddress(event.target.value)}
        //         />
        //     </form>
        //     <button id="mintButton" onClick={onMintPressed}>
        //         Mint NFT
        //     </button>
        //     <p className="status">
        //         {status}
        //     </p>
        // </div>
    );
}

export default MintCouponBox;