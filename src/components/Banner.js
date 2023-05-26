import { useEffect, useState } from "react";
import { WalletMode } from "../types";
import ReceiveCouponBox from "components/store/ReceiveCouponBox";
import {
    Header,
    Icon,
    Grid
  } from 'semantic-ui-react'

const Banner = ({mode, walletAddress}) => {
    const reload = () => {
        window.location.reload();
    }

    return (
        <Grid divided='vertically'>
            <Grid.Row verticalAlign="bottom">
            <Grid.Column float="left" width={13}>
                <Header as='h3'>
                    <span onClick={reload} style={{ cursor: "grab" }}>
                        {mode === WalletMode.STORE ? (
                            <Icon.Group size='big'>
                                <Icon name='home' />
                            </Icon.Group>
                        ) : (
                            <Icon.Group size='big'>
                                <Icon name='child' />
                            </Icon.Group>
                        )}
                    </span>
                    Welcome &nbsp;
                    {String(walletAddress).substring(0, 6) +
                    ".." +
                    String(walletAddress).substring(40)}                    
                </Header>
            </Grid.Column>
            {mode === WalletMode.STORE ? (
                <Grid.Column float="right" width={3} textAlign="right">
                    <ReceiveCouponBox />
                </Grid.Column>
            ) : (
                <div></div>
            )}
            </Grid.Row>
            <Grid.Row>
            </Grid.Row>
        </Grid>
    )
}

export default Banner;