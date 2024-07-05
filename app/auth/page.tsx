import { NavbarDemo } from "@/components/navbar";
import {TypeWriter} from "./components/text";
const Dashboard = () => {
  return (
    <div className="h-screen bg-gradient-to-r from-black via-purple-950 to-purple-800">
      <NavbarDemo />
      <TypeWriter />
    </div>
  );
}

export default Dashboard;
