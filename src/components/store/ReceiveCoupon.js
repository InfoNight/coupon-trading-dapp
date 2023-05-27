import { useEffect, useState } from "react";
import { getPinJsonByURI } from "utils/pinata.js";
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


const ReceiveCoupon = ({couponUsage}) => {
    const [coupon, setCoupon] = useState(null);
    const [loading, setLoading] = useState(false);
    useEffect(async () => {
        const data = await getPinJsonByURI(couponUsage.couponURI);
        setCoupon(data.pinJson)
    });

    const clickReceiveCoupon = async () => {
        setLoading(true);
        console.log("receive coupon")
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
        // <Grid>
        //     <Grid.Column width={8} floated="left">
                
        //     </Grid.Column>
        //     <Grid.Column width={8} floated="right">
        //         <Button size="small" style={{verticalAlign: "middle"}}>Receive</Button>
        //     </Grid.Column>
        // </Grid>     
    )
};

export default ReceiveCoupon;