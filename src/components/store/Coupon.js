import { useEffect, useState } from "react";
import MintCouponBox from "components/store/MintCouponBox.js";
import {
    Container,
    Image,
    Icon,
    Button,
    Card,
    Segment
  } from 'semantic-ui-react'
  
const Coupon = ({coupon}) => {
    return (
        <Card centered={true}>
            <Image src={`https://gateway.pinata.cloud/ipfs/${coupon.ipfs_pin_hash}`} alt={coupon.name} />
            <Card.Content textAlign="center">
                <Card.Header>{coupon.metadata.name}</Card.Header>
                <Card.Description style={{textAlign: "left"}}>
                    {coupon.metadata.keyvalues.couponDescription}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                Redemption unit: {coupon.metadata.keyvalues.couponUnit}
            </Card.Content>
            <MintCouponBox coupon={coupon}/>
        </Card>
    )
}
    
export default Coupon;