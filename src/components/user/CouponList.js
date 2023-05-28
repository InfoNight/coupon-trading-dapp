import { useEffect, useState } from "react";
import Coupon from 'components/user/Coupon.js';
import ClaimCouponBox from 'components/user/ClaimCouponBox.js';
import {
    Container,
    Image,
    Icon,
    Header,
    Button,
    Modal,
    Grid
  } from 'semantic-ui-react'

const CouponList = ({couponList, setCouponList}) => {
    return (
        <Grid divided='vertically'>
            <Grid.Row columns={1}>
            <Grid.Column>
                <Header as='h3'style={{textAlign: "center"}}>
                    <ClaimCouponBox setCouponList={setCouponList}/>
                    &nbsp;
                    My coupons
                </Header>
            </Grid.Column>
            </Grid.Row>
            {couponList.map((coupon) => (
                <Coupon coupon={coupon} />
                ))}
        </Grid>
    )
}

export default CouponList;