import { useEffect, useState } from "react";
import { WalletMode } from "../types";
import ReceiveCouponBox from "components/store/ReceiveCouponBox";

import {
    Header,
    Icon,
    Grid
  } from 'semantic-ui-react'

const Banner = ({mode, walletAddress, couponUsageList, setCouponUsageList}) => {
    const reload = () => {
        window.location.reload();
    }

    return (
        <Grid divided='vertically'>
            <Grid.Row verticalAlign="bottom">
            <Grid.Column float="left" width={3}>
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
                </Header>
            </Grid.Column>
            <Grid.Column float="left" width={10}>
                <Header as='h3' style={{textAlign: "center"}}>
                    Welcome &nbsp;
                    {String(walletAddress).substring(0, 6) +
                    ".." +
                    String(walletAddress).substring(40)}
                </Header>
            </Grid.Column>
            {mode === WalletMode.STORE ? (
                <Grid.Column float="right" width={3} textAlign="right">
                    <ReceiveCouponBox walletAddress={walletAddress} couponUsageList={couponUsageList} setCouponUsageList={setCouponUsageList}/>
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