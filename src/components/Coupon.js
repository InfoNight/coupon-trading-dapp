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
    console.log(coupon.metadata.keyvalues);
    return (
        <Grid.Column>
            <Card centered={true}>
                <Image src={`https://gateway.pinata.cloud/ipfs/${coupon.ipfs_pin_hash}`} alt={coupon.name} />
                <Card.Content textAlign="center">
                    <Card.Header>{coupon.metadata.name}</Card.Header>
                    <Card.Description>
                        {coupon.metadata.keyvalues.couponDescription}
                    </Card.Description>
                </Card.Content>
            </Card>
        </Grid.Column>
    )
}
    
export default Coupon;