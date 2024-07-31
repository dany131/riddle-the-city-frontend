import { Montserrat } from "next/font/google"
import Image from "next/image"
const montesserat = Montserrat({
    weight: "100",
    subsets: ['latin']

})
export default function UserAuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div className={`min-h-[100vh]  flex sm:flex-row flex-col `}>
                <div className="h-auto sm:block hidden w-full sm:w-[40%]">
                    <Image className="w-full h-full" src={'/images/admin/auth/left-image.png'} alt="auth" width={400} height={1000} />
                </div>
                <div className="h-full w-full sm:w-[60%]">
                    {children}
                </div>
            </div>
        </>
    )
}