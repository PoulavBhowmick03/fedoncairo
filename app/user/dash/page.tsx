import HeadElement from "@/app/user/components/Head";
import Sidebar from "@/app/user/components/Sidebar";
import Body from "@/app/user/components/body";
import { StarknetProvider } from "@/components/StarknetProvider";

const Dashboard = () => {
    return (
        <div className="h-screen">
            <StarknetProvider>
                <Sidebar />
                <div className="sm:pl-24 ">
                    <HeadElement />
                    <Body />
                </div>
            </StarknetProvider>
        </div>
    );
}

export default Dashboard;