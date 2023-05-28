import { useEffect, useState } from "react";
import { gatewayAddress } from "types";
import MintCouponBox from "components/store/MintCouponBox.js";
import {
    Container,
    Image,
    Icon,
    Button,
    Card,
    Segment
  } from 'semantic-ui-react'
  
const Coupon = ({walletAddress, coupon}) => {
    return (
        <Card centered={true}>
            <Image src={`${gatewayAddress}/${coupon.ipfs_pin_hash}`} alt={coupon.name} />
            <Card.Content textAlign="center">
                <Card.Header>{coupon.metadata.name}</Card.Header>
                <Card.Description style={{textAlign: "left"}}>
                    {coupon.metadata.keyvalues.couponDescription}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                Redemption unit: {coupon.metadata.keyvalues.couponUnit}
            </Card.Content>
            <MintCouponBox walletAddress={walletAddress} coupon={coupon}/>
        </Card>
    )
}
    
export default Coupon;