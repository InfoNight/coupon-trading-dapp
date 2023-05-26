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
        <Grid divided='vertically' centered={true} verticalAlign="middle">
            <Grid.Row columns={1}>
            <Grid.Column>
                <Header as='h2'>
                    <Icon.Group size='big'>
                        <Icon name='bell' />
                    </Icon.Group>
                    &nbsp;
                    Receive coupons
                </Header>
            </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}
    
export default ReceiveCouponBox;