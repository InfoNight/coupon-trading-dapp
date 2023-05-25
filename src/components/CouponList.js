import { useEffect, useState } from "react";
import Coupon from 'components/Coupon.js';
import RegisterCouponBox from 'components/RegisterCouponBox.js';
import { getPinList } from "utils/pinata.js";
import {
    Container,
    Image,
    Icon,
    Header,
    Button,
    Modal,
    Grid
  } from 'semantic-ui-react'

const CouponList = ({walletAddress}) => {
    const [couponList, setCouponList] = useState([]);
    const [numColumns, setNumColumns] = useState(1);
    const [hovered, setHovered] = useState(false);
    const [openRegister, setOpenRegister] = useState(false)

    useEffect(async () => {
        const response = await getPinList(walletAddress);
        if (response.success) {
            setCouponList(response.pinList);
        } else {
            console.log(response.message)
        }
        setNumColumns(response.pinList.length)
    }, []);

    return (
        <Grid divided='vertically'>
            <Grid.Row columns={1}>
            <Grid.Column>
                <Header as='h2'>
                    <Modal
                        closeIcon
                        open={openRegister}
                        trigger={
                            <Icon.Group size='big'
                                onMouseOver={() => setHovered(true)} 
                                onMouseLeave={() => setHovered(false)}
                                style={{cursor: 'grabbing'}}
                            >
                                <Icon name='ticket' />
                                {hovered ? (
                                    <Icon corner loading name='add'/>
                                ) : (
                                    <Icon corner name='add'/>
                                )}
                            </Icon.Group>
                        }
                        onClose={() => setOpenRegister(false)}
                        onOpen={() => setOpenRegister(true)}
                        >
                        <Header icon='archive' content='Archive Old Messages' />
                        <Modal.Content>
                            <p>
                            Your inbox is getting full, would you like us to enable automatic
                            archiving of old messages?
                            </p>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button color='red' onClick={() => setOpenRegister(false)}>
                            <Icon name='remove' /> No
                            </Button>
                            <Button color='green' onClick={() => setOpenRegister(false)}>
                            <Icon name='checkmark' /> Yes
                            </Button>
                        </Modal.Actions>
                    </Modal>
                    
                    &nbsp;
                    My coupons
                </Header>
            </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={numColumns}>
                {couponList.map((coupon) => (
                    <Coupon coupon={coupon} />
                    ))}
            </Grid.Row>  
        </Grid>
    )
}

export default CouponList;