import { StarknetProvider } from "@/components/StarknetProvider";
import RewardButton from "../user/components/ClaimButton";
import WalletBar from "@/components/wallet/connect";

RewardButton
const Reward = () => {
    return ( 
        <div>
            <StarknetProvider>
            <WalletBar />
            <RewardButton />
            </StarknetProvider>
        </div>
     );
}
 
export default Reward;