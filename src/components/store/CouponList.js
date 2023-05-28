import { useEffect, useState } from "react";
import Coupon from 'components/store/Coupon.js';
import RegisterCouponBox from 'components/store/RegisterCouponBox.js';
import {
    Container,
    Image,
    Icon,
    Header,
    Button,
    Modal,
    Grid,
    Segment
  } from 'semantic-ui-react'

const CouponList = ({walletAddress, couponList}) => {
    return (
        <Grid divided='vertically'>
            <Grid.Row columns={1}>
            <Grid.Column>
                <Header as='h3'style={{textAlign: "center"}}>
                    <RegisterCouponBox walletAddress={walletAddress} />
                    &nbsp;
                    Coupon types
                </Header>
            </Grid.Column>
            </Grid.Row>
            {couponList.length === 0 ? (
                <Container width="100%" style={{margin: "10px"}}>
                    <Header as='h3' style={{textAlign: "center"}}>
                        <i>Try add your own coupon type!</i>
                    </Header>
                </Container>
            ) : (
                couponList.map((coupon) => (
                    <Coupon walletAddress={walletAddress} coupon={coupon} />
            )))}
        </Grid>
    )
}

export default CouponList;