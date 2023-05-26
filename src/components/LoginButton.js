import { useEffect, useState } from "react";
import { WalletMode } from "../types";
import {
    connectWallet,
    getCurrentWalletConnected
  } from "../utils/wallet.js";
import { Dimmer, Loader, Card, Icon, Image } from "semantic-ui-react";



const LoginButton = ({setWalletAddress, setMode, setStatus}) => {
    const [isLoading, setIsLoading] = useState(false);

    useEffect(async () => {
        const { address, status } = await getCurrentWalletConnected()
        setWalletAddress(address)
        setStatus(status)

        if (address !== "") {
            setMode(WalletMode.NONE)
        }

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
    
    const connectWalletPressed = async () => {
        setIsLoading(true);
        const walletResponse = await connectWallet()
        setIsLoading(false);
        setStatus(walletResponse.status)
        setWalletAddress(walletResponse.address)
        if (walletResponse.address !== "") {
            setMode(WalletMode.NONE)
        }
    };

      
    return (
      <div>
          <Card onClick={connectWalletPressed} centered={true}>
            <div style={{
              "textAlign": "center",
              "paddingTop": "30px",
              "paddinBbottom": "30px"
            }}>
              {isLoading ? (
                <div>
                  <Icon.Group size='huge'>
                    <Icon loading size='big' color='black' name='circle notch' />
                    <Icon color='black' name='user'/>
                  </Icon.Group>
                </div>
              ) : (
                <div>
                  <Icon.Group size='huge'>
                    <Icon size='big' color='black' name='circle outline' />
                    <Icon color='black' name='user'/>
                  </Icon.Group>
                </div>
              )}
            </div>
            <Card.Content textAlign="center">
              <Card.Header>Welcome!</Card.Header>
              <Card.Description>
                Log-in with your wallet 
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <a>
                <Icon name='users' />
                22 users logged-in
              </a>
            </Card.Content>
          </Card>
      </div>
    )
}

export default LoginButton;