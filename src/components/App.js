import 'semantic-ui-css/semantic.min.css'
import { useEffect, useState } from "react";
import { WalletMode } from "../types";
import StoreMain from "pages/StoreMain.js";
import LoginButton from "components/LoginButton.js";
import Banner from "components/Banner.js";
import ModeSelector from "components/ModeSelector.js";
import { Container, Transition } from 'semantic-ui-react';

const App = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [status, setStatus] = useState("");
  const [mode, setMode] = useState("");
 
  useEffect(async () => {
    setStatus(status)
    setMode(WalletMode.LOGOUT)
  }, []);

  return (
    <Container>
      <Transition transitionOnMount duration={3000}>
        <Banner />
      </Transition>
      {mode === WalletMode.LOGOUT ? (
        <LoginButton walletAddress={walletAddress} setWalletAddress={setWalletAddress} setMode={setMode} setStatus={setStatus} />
      ) : mode === WalletMode.NONE ? (
        <ModeSelector setMode={setMode} />
      ) : mode === WalletMode.STORE ? (
        <StoreMain walletAddress={walletAddress} />
      ) : (
        <div></div>
      )}
    </Container>
  );
}

export default App;
