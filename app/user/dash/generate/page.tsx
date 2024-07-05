
import Sidebar from "../../components/Sidebar";
import Generate from "../../components/generate";
import React from "react";

const Dashboard = () => {
    return ( 
        <div className="h-screen">
        <Sidebar/> 
        <div className="sm:pl-24 ">

         <Generate/>
         </div>
        </div>
     );
}
 
export default Dashboard;