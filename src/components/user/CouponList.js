import { useEffect, useState } from "react";
import Coupon from 'components/user/Coupon.js';
import RegisterCouponBox from 'components/user/RegisterCouponBox.js';
import {
    Container,
    Image,
    Icon,
    Header,
    Button,
    Modal,
    Grid
  } from 'semantic-ui-react'

const CouponList = ({walletAddress, couponList}) => {
    return (
        <Grid divided='vertically'>
            <Grid.Row columns={1}>
            <Grid.Column>
                <Header as='h3'>
                    <RegisterCouponBox walletAddress={walletAddress} />
                    &nbsp;
                    My coupons
                </Header>
            </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                {couponList.map((coupon) => (
                    <Coupon coupon={coupon} />
                    ))}
            </Grid.Row>  
        </Grid>
    )
}

export default CouponList;