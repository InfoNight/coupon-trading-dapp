import { useEffect, useState } from "react";
import RedeemCouponBox from "components/user/RedeemCouponBox.js";
import { gatewayToken } from "types";
import {
    Container,
    Image,
    Icon,
    Grid,
    Card,
    Segment
  } from 'semantic-ui-react'


const Coupon = ({coupon}) => {
    return (
        <div style={{marginBottom: "5px"}}>
            <Card centered={true}>
                <Image src={`${coupon.image}/?pinataGatewayToken=${gatewayToken}`} alt={coupon.couponName} crossOrigin="anonymous" />
                <Card.Content textAlign="center">
                    <Card.Header>{coupon.couponName}</Card.Header>
                    <Card.Description style={{textAlign: "left"}}>
                        {coupon.couponDescription}
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    Coupon count: {coupon.couponCount} / <b>{
                        coupon.couponUnit === undefined
                        ? 1
                        : coupon.couponUnit
                    }</b>
                </Card.Content>
                <RedeemCouponBox coupon={coupon}/>
            </Card>
        </div>
    )
}

export default Coupon;