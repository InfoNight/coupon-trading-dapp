import { useEffect, useState } from "react";
import { 
    mintNFT
  } from "utils/store/nft.js"; 
import _ from 'lodash'
import QRCode from 'qrcode.react';
import { 
    Grid,
    Header,
    Icon,
    Popup,
    Form,
    Input,
    Modal,
    Button
} from "semantic-ui-react";


const MintCouponBox = ({walletAddress, coupon}) => {
    const [userAddress, setUserAddress] = useState("");
    const [mintDisable, setMintDisable] = useState(false);
    const [loading, setLoading] = useState(false);
    const [openMintInfo, setOpenMintInfo] = useState(false)
    const [openTxInfo, setOpenTxInfo] = useState(false)
    const [status, setStatus] = useState("");
    const [rand, setRand] = useState("");

    useEffect(async () => {
        setUserAddress("");
    }, []);


    const onChangeUserAddress = (e) => {
        if (String(e.target.value).toLowerCase().valueOf() === String(walletAddress).toLowerCase().valueOf()) {
            setMintDisable(true)
        }
        setUserAddress(e.target.value);
    };

    const onMintPressed = async () => {
        if (!mintDisable) {
            setLoading(true)
            const { rand, status } = await mintNFT(coupon, userAddress)
            setLoading(false)
            setStatus(status)
            setRand(rand)
            setOpenTxInfo(true)
            setOpenMintInfo(false)
    
            console.log(rand)
            console.log(status)
        }
    };

    return (
        <div>
            <Modal
                closeIcon
                onClose={() => setOpenMintInfo(false)}
                onOpen={() => setOpenMintInfo(true)}
                open={openMintInfo}
                trigger={loading ? (
                    <Button color='green' style={{width: "100%"}}>
                        <Icon name='circle notch' loading /> Mint
                    </Button>
                ) : (
                    <Button color='green' style={{width: "100%"}}>
                    <Icon name='checkmark' /> Mint
                    </Button>
                )}
                centered={true}
                style={{width: "50%"}}
                >
                <Header icon='add' content='Mint coupon' />
                <Modal.Actions style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                    <Form.Field
                        id='form-input-control-name'
                        control={Input}
                        placeholder='User address'
                        required={true}
                        onChange={onChangeUserAddress}
                        />
                    {mintDisable ? (
                        <Popup content='You cannot self mint a coupon.' 
                        trigger={
                            <Button color='grey'>
                                Disabled
                            </Button>} 
                        />
                    ) : loading ? (
                        <Button color='green'>
                            <Icon name='circle notch' loading /> Mint
                        </Button>
                    ) : (
                        <Button color='green' onClick={() => {
                            setOpenTxInfo(false)
                            onMintPressed()
                        }}>
                        <Icon name='checkmark' /> Mint
                        </Button>
                    )}
                </Modal.Actions>
            </Modal>
            <Modal
                closeIcon
                onClose={() => setOpenTxInfo(false)}
                onOpen={() => setOpenTxInfo(true)}
                open={openTxInfo}
                centered={true}
                >
                <Header icon='archive' content='Transaction result' />
                <Modal.Content style={{textAlign: 'center'}}>
                    <QRCode value={rand} />
                    <Modal.Description>
                        <p>{status}</p>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='red' onClick={() => setOpenTxInfo(false)}>
                    <Icon name='remove' /> Close
                    </Button>
                </Modal.Actions>
            </Modal>
        </div>
    );
}

export default MintCouponBox;