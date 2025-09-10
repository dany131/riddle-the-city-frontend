import Sidebar from "@/components/admin/layout/Sidebar"
import UserTopBar from "@/components/admin/layout/UserTop"
import { Montserrat } from "next/font/google"
const montesserat = Montserrat({
    weight: "100",
    subsets: ['latin']

})
export default function AdminMainLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div className={`min-h-[100vh]  h-[100vh] flex sm:flex-row flex-col `}>
                <Sidebar/>
                <div className="sm:w-[80%] h-full overflow-auto w-full flex flex-col gap-4 p-4">
                    <UserTopBar/>
                    {children}
                </div>
            </div>
        </>
    )
}