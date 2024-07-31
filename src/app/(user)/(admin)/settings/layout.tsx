import Sidebar from "@/components/user/layout/AdminSideBar"
import UserTopBar from "@/components/user/layout/UserTop"
import { Montserrat } from "next/font/google"
const montesserat = Montserrat({
    weight: "100",
    subsets: ['latin']

})
export default function SettingsMainLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div className="flex flex-col gap-4 px-4 h-full">
                <p className="font-semibold text-xl">Settings</p>
                {children}
            </div>
        </>
    )
}