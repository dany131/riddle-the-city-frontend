import Sidebar from "@/components/admin/layout/Sidebar"
import { Montserrat } from "next/font/google"
import { GoBell } from "react-icons/go";
import { FaRegUser } from "react-icons/fa";
const montesserat = Montserrat({
    weight: "100",
    subsets: ['latin']

})
export default function AdminMainLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div className={`min-h-[100vh] h-[100vh] flex sm:flex-row flex-col `}>
                <Sidebar/>
                <div className="sm:w-[80%] w-full flex flex-col gap-4 p-4">
                    <div className=" border-b-[0.1rem] border-gray-200 flex gap-4 flex-wrap px-4 py-2 justify-between">
                        <div>
                            <div className="flex gap-4 items-center">
                                <h1>Welcome Back</h1>
                                <p className="text-xl font-semibold">John</p>
                            </div>
                           <p className="text-xs text-gray-400">22 September 2024</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="p-2 relative border-[0.1rem] rounded-full">
                                <GoBell />
                                <div className="w-[0.5rem] absolute top-[0.4rem] right-1/4 h-[0.5rem] bg-red-600 rounded-full"></div>
                            </div>
                            <div className="p-2 border-[0.1rem] rounded-full">
                                <FaRegUser />
                            </div>
                            <p>John Marshall</p>
                        </div>
                    </div>
                    {children}
                </div>
            </div>
        </>
    )
}