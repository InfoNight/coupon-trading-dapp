import { useEffect, useState } from "react";
import { gatewayAddress, gatewayToken } from "types";
import MintCouponBox from "components/store/MintCouponBox.js";
import {
    Container,
    Image,
    Icon,
    Button,
    Card,
    Grid
} from 'semantic-ui-react'

const Coupon = ({walletAddress, coupon, idx}) => {
    return (
        <div style={{marginBottom: "5px"}}>
            <Card centered={true}>
                <Image src={`${gatewayAddress}${coupon.ipfs_pin_hash}/?pinataGatewayToken=${gatewayToken}`} crossOrigin="anonymous" alt={coupon.name} />
                <Card.Content textAlign="center">
                    <Card.Header>{coupon.metadata.name}</Card.Header>
                    <Card.Description textAlign="left">
                        {coupon.metadata.keyvalues.couponDescription}
                    </Card.Description>
                </Card.Content>
                <Card.Content extra textAlign="left">
                    Redemption unit: {coupon.metadata.keyvalues.couponUnit}
                </Card.Content>
                <MintCouponBox walletAddress={walletAddress} coupon={coupon}/>
            </Card>
        </div>
    )
}
    
export default Coupon;