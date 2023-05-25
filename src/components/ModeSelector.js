import { WalletMode } from "../types"; 
import { Dimmer, Loader, Card, Icon, Image, Grid } from "semantic-ui-react";

const ModeSelector = ({setMode}) => {
    const onStorePressed = () => {
        setMode(WalletMode.STORE)
    };

    const onUserPressed = () => {
        setMode(WalletMode.USER)
    };

    return (
        <Grid>
            <Grid.Column key={1} width={8}>                
                <Card onClick={onStorePressed} centered={true}>
                    <div style={{
                        "text-align": "center",
                        "padding-top": "30px",
                        "padding-bottom": "30px"
                    }}>
                        <Icon.Group size='huge'>
                            <Icon size='big' color='black' name='circle outline' />
                            <Icon color='black' name='home'/>
                        </Icon.Group>
                    </div>
                    <Card.Content textAlign="center">
                        <Card.Header>Store</Card.Header>
                        <Card.Description>
                            Stores who will issue NFT coupons go here
                        </Card.Description>
                    </Card.Content>
                </Card>
            </Grid.Column>

            <Grid.Column key={2} width={8}>
                <Card onClick={onUserPressed} centered={true}>
                    <div style={{
                        "text-align": "center",
                        "padding-top": "30px",
                        "padding-bottom": "30px"
                    }}>
                        <Icon.Group size='huge'>
                            <Icon size='big' color='black' name='circle outline' />
                            <Icon color='black' name='child'/>
                        </Icon.Group>
                    </div>
                    <Card.Content textAlign="center">
                       <Card.Header>User</Card.Header>
                        <Card.Description>
                            Users who will use NFT coupons go here
                        </Card.Description>
                    </Card.Content>
                </Card>
            </Grid.Column>
        </Grid>
        // <div>
        //     <button className="setModeButton" onClick={onStorePressed}>
        //         Store
        //     </button>
        //     <button className="setModeButton" onClick={onUserPressed}>
        //         User
        //     </button>
        // </div>
    );
}

export default ModeSelector;