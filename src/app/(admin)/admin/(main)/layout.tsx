import Sidebar from "@/components/admin/layout/Sidebar"
import { Montserrat } from "next/font/google"
const montesserat = Montserrat({
    weight: "100",
    subsets: ['latin']

})
export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div className={`min-h-[100vh] h-[100vh] flex sm:flex-row flex-col `}>
                <Sidebar/>
                <div className="w-[80%] p-4">
                    {children}
                </div>
            </div>
        </>
    )
}