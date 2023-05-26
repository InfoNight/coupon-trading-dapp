import { useEffect, useState } from "react";
import { WalletMode } from "../types";
import ReceiveCouponBox from "./ReceiveCouponBox";
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
            <Grid.Row columns={2} verticalAlign="bottom">
            <Grid.Column>
                <Header as='h2'>
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
            <Grid.Column textAlign="right">
                <Header as='h2' verticalAlign="middle">
                    <ReceiveCouponBox />
                </Header>
            </Grid.Column>
            </Grid.Row>
            <Grid.Row>
            </Grid.Row>
        </Grid>
    )
}

export default Banner;