import { useEffect, useState } from "react";
import { WalletMode } from "../types";
import {
    connectWallet,
    getCurrentWalletConnected
  } from "../utils/wallet.js";
import { Button } from "semantic-ui-react";



const LoginButton = ({walletAddress, setWalletAddress, setMode, setStatus}) => {
    useEffect(async () => {
        const { address, status } = await getCurrentWalletConnected()
        setWalletAddress(address)
        setStatus(status)
        setMode(WalletMode.NONE)
        addWalletListener()
    }, []);

    function addWalletListener() {
        if (window.ethereum) {
          window.ethereum.on("accountsChanged", (accounts) => {
            if (accounts.length > 0) {
                setWalletAddress(accounts[0])
                setMode(WalletMode.NONE)
            } else {
                setWalletAddress("")
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
        setWalletAddress(walletResponse.address)
        setMode(WalletMode.NONE)
    };

      
    return (
        <div>
            {walletAddress.length > 0 ? (
                <Button class="ui primary button" onClick={connectWalletPressed}>
                    {"Connected: " +
                    String(walletAddress).substring(0, 6) +
                    "..." +
                    String(walletAddress).substring(38)}
                </Button>
            ) : ( 
                <Button class="ui secondary button">
                    Connect Wallet
                </Button>
            )}
        </div>
    )
}

export default LoginButton;