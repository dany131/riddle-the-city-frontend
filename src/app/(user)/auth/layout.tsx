import { Montserrat } from "next/font/google"
import Image from "next/image"
const montesserat = Montserrat({
    weight: "100",
    subsets: ['latin']

})
import { GoogleOAuthProvider } from '@react-oauth/google';
export default function UserAuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <GoogleOAuthProvider clientId={`${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`}>
            <div className={`h-[100vh]   flex sm:flex-row flex-col `}>
                <div className="h-full sm:block hidden w-full sm:w-[50%]">
                        <Image className="w-full h-full object-cover" src={'/images/admin/auth/image 9 (2).svg'} alt="auth" width={400} height={1000} />
                </div>
                <div className="h-auto overflow-auto w-full sm:w-[50%]">
                    {children}
                </div>
            </div>
            </GoogleOAuthProvider>
        </>
    )
}