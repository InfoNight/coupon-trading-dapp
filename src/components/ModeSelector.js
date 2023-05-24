import { WalletMode } from "../types"; 

const ModeSelector = ({setMode}) => {
    const onStorePressed = () => {
        setMode(WalletMode.STORE)
    };

    const onUserPressed = () => {
        setMode(WalletMode.USER)
    };

    return (
        <div>
            <button className="setModeButton" onClick={onStorePressed}>
                Store
            </button>
            <button className="setModeButton" onClick={onUserPressed}>
                User
            </button>
        </div>
    );
}

export default ModeSelector;