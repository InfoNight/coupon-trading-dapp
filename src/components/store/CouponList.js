import { useEffect, useState } from "react";
import Coupon from 'components/store/Coupon.js';
import RegisterCouponBox from 'components/store/RegisterCouponBox.js';
import RefreshCouponList from 'components/user/RefreshCouponList.js';
import { getPinList } from "utils/store/store_pinata.js";
import { getStoreCouponList } from "utils/store/store_contract.js";
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

const CouponList = ({ walletAddress, couponList, setCouponList, setCouponUsageList }) => {
    const refreshCallback = async () => {
        const pinataResponse = await getPinList(walletAddress);
        if (pinataResponse.success) {
            setCouponList(pinataResponse.pinList);
        } else {
            console.log(pinataResponse.message)
        }

        const contractResponse = await getStoreCouponList(walletAddress);
        if (contractResponse.success) {
            setCouponUsageList(contractResponse.couponUsageList)
        } else {
            console.log(contractResponse.message)
        }
    }

    return (
        <div>
        <Grid divided='vertically'>
            <Grid.Row columns={1}>
                <Grid.Column>
                    <Header as='h3' style={{ display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                            <RegisterCouponBox walletAddress={walletAddress} />
                            &nbsp;
                            Coupon types
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
                        <i>Try add your own coupon type!</i>
                    </Header>
                </Container>
            ) : (
                couponList.map((coupon) => (
                    <Coupon walletAddress={walletAddress} coupon={coupon} />
                )))}
        </Grid>
        </div>
    )
}

export default CouponList;