'use client'
import Sidebar from "@/components/user/layout/AdminSideBar"
import UserTopBar from "@/components/user/layout/UserTop"
import { Montserrat } from "next/font/google"
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
const montesserat = Montserrat({
    weight: "100",
    subsets: ['latin']

})
const stripePromise = loadStripe('pk_test_51PkygCIZASCLbug8qI63eXXhDkNWGwho4ADU1RSxysg8EaLREa361nBHfusl1pYcUXO28xlO2lsMpyhHjxmibjQ100UEAxoxng');
export default function SettingsMainLayout({ children }: { children: React.ReactNode }) {
    const options = {
        // passing the SetupIntent's client secret received from backend
        clientSecret: 'seti_1PlBsMIZASCLbug8QrtDxh4O_secret_QcQjnoKNYGr6CtUmpE2p2NAzpvxV9nE',
        // Fully customizable with appearance API.
        appearance: {/*...*/ }
    };
    return (
        <>
            <div className="flex flex-col gap-4 px-4 h-full">
                <p className="font-semibold text-xl">Settings</p>
                {children}
                </div>
        </>
    )
}