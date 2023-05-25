import 'semantic-ui-css/semantic.min.css'
import { useEffect, useState } from "react";
import { WalletMode } from "../types";
import StoreMain from "pages/StoreMain.js";
import LoginButton from "components/LoginButton.js";
import ModeSelector from "components/ModeSelector.js";
import main_img from './test.jpeg'

import {
  Container,
  Image,
  Icon,
  List,
} from 'semantic-ui-react'
const App = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [status, setStatus] = useState("");
  const [mode, setMode] = useState("");
  const state = { animation: "browse", duration: 500, open: false }
 
  useEffect(async () => {
    setStatus(status)
    setMode(WalletMode.LOGOUT)
  }, []);

  return (
    <Container>
      <div style={{
            "background-color": "black",
            "border-radius": "35px",
      }}>
          <Image src={main_img} alt="Main Image" style={{
              "border-radius": "35px",
              "min-height": "140px",
              "opacity": "0.9",
              "brightness": "0.5"
          }} />
      </div>
      <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
      }}>
          {mode === WalletMode.LOGOUT ? (
            <LoginButton setWalletAddress={setWalletAddress} setMode={setMode} setStatus={setStatus} />
          ) : mode === WalletMode.NONE ? (
            <ModeSelector setMode={setMode} />
          ) : mode === WalletMode.STORE ? (
            <StoreMain walletAddress={walletAddress} />
          ) : (
            <div></div>
          )}
      </div>
      <div style={{
          position: 'absolute',
          top: '10%',
          left: '0',
          color: 'black',
          textAlign: 'center',
          width: '100%'
      }}>
          <p style={{fontSize: '40px', fontWeight: 'bold'}}>Make your own <span style={{color: 'red'}}>NFT</span> coupon!</p>
          <List size='huge' horizontal>
            <List.Item>
              <Icon name='computer' />
              <List.Content>
                <List.Header>Free yourself from offline coupon</List.Header>
              </List.Content>
            </List.Item>
            <List.Item>
              <Icon name='world' />
              <List.Content>
                <List.Header>No contracts with centralized platforms</List.Header>
              </List.Content>
            </List.Item>
            <List.Item>
              <Icon name='wi-fi' />
              <List.Content>
                <List.Header>Promote your brand using NFT</List.Header>
              </List.Content>
            </List.Item>
          </List>
      </div>
    </Container>
  );
}

export default App;
