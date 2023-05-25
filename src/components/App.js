import '../css/App.css';
import { useEffect, useState } from "react";
import { WalletMode } from "../types";
import {
  connectWallet,
  getCurrentWalletConnected
} from "../utils/wallet.js";
import StoreMain from "../pages/StoreMain.js";
import ModeSelector from "./ModeSelector.js";

const App = () => {
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  const [mode, setMode] = useState("");
 
  useEffect(async () => {
    const { address, status } = await getCurrentWalletConnected()
    setWallet(address)
    setStatus(status)
    setMode(WalletMode.NONE)
    
    addWalletListener()
  }, []);

  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0])
        } else {
          setWallet("")
        }
      })
    } else {
      setStatus(
        <p>
          {" "}
          🦊 <a target="_blank" href={`https://metamask.io/download.html`}>
            You must install MetaMask, a virtual Ethereum wallet, in your browser.
          </a>
        </p>
      )
    }
  }

  const connectWalletPressed = async () => { //TODO: implement
    const walletResponse = await connectWallet()
    setStatus(walletResponse.status)
    setWallet(walletResponse.address)
  };

  return (
    <div className="Main">
      <button id="walletButton" onClick={connectWalletPressed}>
        {walletAddress.length > 0 ? (
          "Connected: " +
          String(walletAddress).substring(0, 6) +
          "..." +
          String(walletAddress).substring(38)
        ) : (
          <span>Connect Wallet</span>
        )}
      </button>

      <br></br>
      <h1 id="title"> Coupon Trading App </h1>
      <p>
        Start your own coupon trading business by minting your own NFTs! Connect
      </p>
      {mode === WalletMode.STORE ? (
        <StoreMain walletAddress={walletAddress} />
      ) : mode === WalletMode.USER ? (
        <div> userMain </div>
      ) : (
        <p>Welcome</p>
      )}
      <p className="status">
          {status}
      </p>
      {walletAddress.length > 0 ? (
        <ModeSelector setMode={setMode} />
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default App;
