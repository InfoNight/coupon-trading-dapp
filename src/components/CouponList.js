import { useEffect, useState } from "react";
import Coupon from 'components/Coupon.js';
import RegisterCouponBox from 'components/RegisterCouponBox.js';
import { getPinList } from "utils/pinata.js";
import {
    Container,
    Image,
    Icon,
    Header,
    Button,
    Modal,
    Grid
  } from 'semantic-ui-react'

const CouponList = ({walletAddress}) => {
    const [couponList, setCouponList] = useState([]);
    const [numColumns, setNumColumns] = useState(1);

    useEffect(async () => {
        const response = await getPinList(walletAddress);
        if (response.success) {
            setCouponList(response.pinList);
        } else {
            console.log(response.message)
        }
        setNumColumns(response.pinList.length)
    }, []);

    return (
        <Grid divided='vertically'>
            <Grid.Row columns={1}>
            <Grid.Column>
                <Header as='h2'>
                    <RegisterCouponBox walletAddress={walletAddress} />
                    &nbsp;
                    My coupons
                </Header>
            </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={numColumns}>
                {couponList.map((coupon) => (
                    <Coupon coupon={coupon} />
                    ))}
            </Grid.Row>  
        </Grid>
    )
}

export default CouponList;