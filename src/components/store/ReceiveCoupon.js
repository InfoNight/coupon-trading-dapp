import { useEffect, useState } from "react";
import { getPinJsonByURI } from "utils/pinata.js";
import { receiveCoupon, getStoreCouponList } from "utils/store/store_contract";
import {
    Container,
    Image,
    Icon,
    Grid,
    Card,
    Segment,
    Label,
    Button,
    Header
  } from 'semantic-ui-react'


const ReceiveCoupon = ({walletAddress, couponUsage, setOpenReceive, setCouponUsageList}) => {
    const [coupon, setCoupon] = useState(null);
    const [loading, setLoading] = useState(false);
    useEffect(async () => {
        const data = await getPinJsonByURI(couponUsage.couponURI);
        setCoupon(data.pinJson)
    });

    const clickReceiveCoupon = async () => {
        setLoading(true);
        const data = await receiveCoupon(couponUsage.address);
        if (data.success) {
            setOpenReceive(false);
            const contractResponse = await getStoreCouponList(walletAddress);
            if (contractResponse.success) {
                setCouponUsageList(contractResponse.couponUsageList)
            } else {
                console.log(contractResponse.message)
            }
        } 
        setLoading(false);
    }

    return (
        <Grid>
            <Label size="big" style={{margin: "5px"}}>
                <Icon name='user' />
                {String(couponUsage.address).substring(0, 6) +
                ".." +
                String(couponUsage.address).substring(40)}
                <Label.Detail>
                    {coupon === null ? (
                        "loading..."
                    ) : (
                        " Coupon " + 
                        String(coupon.couponName) +
                        " x " +
                        String(couponUsage.count)
                    )}
                </Label.Detail>
            </Label>
            {loading ? (
                <Button size="small" color='green' style={{margin: "5px"}}>
                    <Icon name='circle notch' loading /> Receive
                </Button>
            ) : (
                <Button size="small" color="green" style={{margin: "5px"}} onClick={clickReceiveCoupon}>
                    Receive
                </Button>
            )}
        </Grid>
    )
};

export default ReceiveCoupon;