import { useEffect, useState } from "react";
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
        </Card>
    )
}
    
export default Coupon;