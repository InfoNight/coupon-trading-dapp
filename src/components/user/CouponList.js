import { useEffect, useState } from "react";
import Coupon from 'components/user/Coupon.js';
import ClaimCouponBox from 'components/user/ClaimCouponBox.js';
import RefreshCouponList from 'components/user/RefreshCouponList.js';
import load_coupons from "utils/user/load_coupons";
import {
    Container,
    Image,
    Icon,
    Header,
    Button,
    Modal,
    Grid
} from 'semantic-ui-react'

const CouponList = ({ couponList, setCouponList }) => {
    const refreshCallback = async () => {
        const loadResponse = await load_coupons();
        if (loadResponse.success) {
            setCouponList(loadResponse.couponList);
        } else {
            console.log(loadResponse.status);
        } 
    }
    return (
        <div>
        <Grid divided='vertically'>
            <Grid.Row columns={1}>
                <Grid.Column>
                    <Header as='h3' style={{ display: "flex", alignItems: "center", justifyContent: "center", position: "relative"}}>
                        <div>
                            <ClaimCouponBox setCouponList={setCouponList} />
                            &nbsp;
                            My coupons
                        </div>
                        <view style={{ position: 'absolute', right: '5%' }}>
                            <RefreshCouponList refreshCallback={refreshCallback} />
                        </view>
                    </Header>
                </Grid.Column>
            </Grid.Row>
        </Grid>
        <Grid centered={true}>
            {couponList.length === 0 ? (
                <Container width="100%" style={{ margin: "10px" }}>
                    <Header as='h3' style={{ textAlign: "center" }}>
                        <i>Try add your own coupon!</i>
                    </Header>
                </Container>
            ) : (
                couponList.map((coupon) => (
                    <Coupon coupon={coupon} />
                    )))}
        </Grid>
        </div>
    )
}

export default CouponList;