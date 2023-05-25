import CouponList from "../components/CouponList.js";
import MintCouponBox from "../components/MintCouponBox.js";
import RegisterCouponBox from "../components/RegisterCouponBox.js";

const StoreMain = ({walletAddress}) => {
    return (
        <div>
            <h1>Store Main</h1>
            <CouponList walletAddress={walletAddress}/>
            <div className="horizontal">
                <RegisterCouponBox walletAddress={walletAddress} />
                <MintCouponBox />
            </div>
        </div>
    );
}

export default StoreMain;