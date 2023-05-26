import { useEffect, useState } from "react";
import {
    Container,
    Image,
    Icon,
    Grid,
    Card,
    Header
  } from 'semantic-ui-react'

const ReceiveCouponBox = () => {
    return (
        <Header as='h3' verticalAlign="middle">
            <Icon.Group size='big'>
                <Icon name='bell' />
            </Icon.Group>
        </Header>
    )
}
    
export default ReceiveCouponBox;