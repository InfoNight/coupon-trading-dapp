import { useEffect, useState } from "react";
import CouponList from "components/CouponList.js";
import MintCouponBox from "components/MintCouponBox.js";
import { getPinList } from "utils/pinata.js";
import {
    Grid,
    Image,
    Header
  } from 'semantic-ui-react'

const StoreMain = ({walletAddress}) => {
    const [couponList, setCouponList] = useState([]);

    useEffect(async () => {
        const response = await getPinList(walletAddress);
        if (response.success) {
            setCouponList(response.pinList);
        } else {
            console.log(response.message)
        }
    }, []);

    return (
        <Grid divided='vertically'>
            <Grid.Row columns={1}>
            <Grid.Column>
                <Header as='h1'>Welcome {
                    String(walletAddress).substring(0, 6) +
                      "..." +
                    String(walletAddress).substring(38)}
                </Header>     
            </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={1}>
            <Grid.Column>
                <CouponList walletAddress={walletAddress} couponList={couponList}/>            
            </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={1}>
            <Grid.Column>
                <MintCouponBox couponList={couponList}/>
            </Grid.Column>
            </Grid.Row>
        </Grid>
    );
}

export default StoreMain;