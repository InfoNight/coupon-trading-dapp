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
            <Image src={`${coupon.image}`} alt={coupon.couponName} />
            <Card.Content textAlign="center">
                <Card.Header>{coupon.couponName}</Card.Header>
                <Card.Description style={{textAlign: "left"}}>
                    {coupon.couponDescription}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                Coupon count: {coupon.couponCount} / <b>{coupon.couponUnit}</b>
            </Card.Content>
        </Card>
    )
}
    
export default Coupon;