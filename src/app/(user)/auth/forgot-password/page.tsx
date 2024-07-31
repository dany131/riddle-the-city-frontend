import { Input } from "@nextui-org/react"
import Image from "next/image"
import Link from "next/link"
import { CiMail } from "react-icons/ci"
export default function ForgotPassword() {
    return (
        <>
            <div className="h-full w-full items-center hidden sm:flex flex-col gap-4 p-8 sm:p-24">
                <h1 className="text-2xl font-bold">Forgot Password</h1>
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


            <div className="bg-[#160704] h-[100vh] w-full relative  sm:hidden ">
                <Image
                    priority
                    className="absolute top-0 h-full w-full"
                    style={{ opacity: "0.5" }}
                    src={"/images/home/home-banner.png"}
                    alt="home-banner"
                    width={1000}
                    height={500}
                />
                <div className="h-full text-white w-full items-center relative z-[1] flex-col flex gap-4 p-8 sm:p-24">
                    <div className="flex justify-center">
                        <div className="w-[7rem] h-[7rem]">
                            <Image className="w-full h-full object-contain" src={'/images/admin/main/layout/ridde.png'} alt="auth" width={200} height={200} />
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold">Forgot Password</h1>
                    <Input
                        className="w-full"
                        type="email"
                        label="Email Address"
                        placeholder="you@example.com"
                        labelPlacement="outside"
                        startContent={
                            <CiMail className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                        }
                        classNames={{label:"!text-white"}}
                    />
                    <Link href={'/admin/login'} className="bg-[#A92223] rounded-lg p-4 text-center text-white w-full">Continue</Link>
                </div>
            </div>
        </>
    )
}