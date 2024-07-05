import Head from "@/app/user/components/Head";
import Sidebar from "@/app/user/components/Sidebar";
import DownloadPage from "@/app/user/components/DownloadPY"
const Download = () => {
    return ( 
        <div className="h-screen">
        <Sidebar/> 
        <div className="sm:pl-24 ">
        <Head/>
         <DownloadPage/>
         </div>
        </div>
     );
}
 
export default Download;