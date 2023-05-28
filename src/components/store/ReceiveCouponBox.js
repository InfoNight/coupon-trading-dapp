import { useEffect, useState } from "react";
import "css/blink.css"
import ReceiveCoupon from "components/store/ReceiveCoupon";
import {
    Container,
    Image,
    Icon,
    Modal,
    Button,
    Header
  } from 'semantic-ui-react'

const ReceiveCouponBox = ({walletAddress, couponUsageList, setCouponUsageList}) => {
    console.log(couponUsageList)
    const [openReceive, setOpenReceive] = useState(false);
    const [blink, setBlink] = useState(false);

    useEffect(async () => {
        if (couponUsageList.length > 0) {
            setBlink(true);
        } else {
            setBlink(false);
        }
    }, [couponUsageList]);

    return (
        <Modal
            closeIcon
            open={openReceive}
            trigger={
                <Header as='h3' verticalAlign="middle">
                    {blink ? (
                        <Icon.Group size='big' className="blinking" style={{
                            color: "#FFB84C",
                            cursor: "grab"
                        }}>
                            <Icon name='bell'/>
                        </Icon.Group>
                    ) : (
                        <Icon.Group size='big' style={{
                            cursor: "grab"
                        }}>
                            <Icon name='bell' />
                        </Icon.Group>
                    )}
                </Header>
            }
            onClose={() => setOpenReceive(false)}
            onOpen={() => setOpenReceive(true)}
            >
            <Header icon='archive' content='Coupon usage' />
            <Modal.Content>
                {couponUsageList.map((couponUsage, index) => (
                    <ReceiveCoupon walletAddress={walletAddress} couponUsage={couponUsage} setOpenReceive={setOpenReceive} setCouponUsageList={setCouponUsageList}/>
                ))}
            </Modal.Content>
            <Modal.Actions>
                <Button color='red' onClick={() => setOpenReceive(false)} >
                    <Icon name='remove' /> Close
                </Button>
            </Modal.Actions>
        </Modal>
    )
}
    
export default ReceiveCouponBox;