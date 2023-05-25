import CouponList from "components/CouponList.js";
import MintCouponBox from "components/MintCouponBox.js";
import RegisterCouponBox from "components/RegisterCouponBox.js";
import {
    Grid,
    Image,
    Header
  } from 'semantic-ui-react'

const StoreMain = ({walletAddress}) => {
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
                <CouponList walletAddress={walletAddress}/>            
            </Grid.Column>
            </Grid.Row>

            <Grid.Row columns={2}>
            <Grid.Column>
                <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
            </Grid.Column>
            <Grid.Column>
                <MintCouponBox />
            </Grid.Column>
            </Grid.Row>
        </Grid>
    );
}

export default StoreMain;