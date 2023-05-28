import { useEffect, useState } from "react";
import { Message } from "semantic-ui-react";

const MessageAlert = ({message, success, alertVisible, setAlertVisible}) => {
    return (
        <Message success={success}
                hidden={!alertVisible}
                onDismiss={() => setAlertVisible(false)}
                style={{
                    width: '20%',
                    position: 'fixed', 
                    top: '0%', 
                    left: '50%', 
                    transform: 'translate(-50%, 0%)',
                    verticalAlign: 'middle',
                    textAlign: 'left'
                }}>
            <Message.Header>
                {success ? "Success" : "Error"}
            </Message.Header>
            <p>
            {message}
            </p>
        </Message>
    )
}

export default MessageAlert;