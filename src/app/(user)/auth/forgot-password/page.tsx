import { Input } from "@nextui-org/react"
import Link from "next/link"
import { CiMail } from "react-icons/ci"
export default function ForgotPassword() {
    return (
        <>
            <div className="h-full w-full items-center  flex flex-col gap-4 p-8 sm:p-24">
                <h1 className="text-2xl font-bold">Welcome Back!</h1>
                <p>Please use your email and password to login</p>
                <Input
                    className="w-full"
                    type="email"
                    label="Email Address"
                    placeholder="you@example.com"
                    labelPlacement="outside"
                    startContent={
                        <CiMail className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                />
                <Link href={'/admin/login'} className="bg-[#A92223] rounded-lg p-4 text-center text-white w-[80%]">Continue</Link>
            </div>
        </>
    )
}