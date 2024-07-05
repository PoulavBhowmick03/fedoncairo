import Sidebar from "@/app/organisation/components/Sidebar"
import UploadPyFile from "../../components/UploadPY"
import Head from "@/app/organisation/components/Head"

export default function page() {
  return (
    <div className="dark:bg-gray-900">
            <div className="h-screen fixed ">
                <Sidebar />
            </div>
            <div className="sm:px-8">
                <Head/>
            </div>
            <UploadPyFile />
        </div>
  )
}
