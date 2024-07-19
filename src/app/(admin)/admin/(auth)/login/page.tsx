'use client';
import { Checkbox, Input, Radio, RadioGroup } from "@nextui-org/react"
import Image from "next/image"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BsEyeFill, BsEyeSlash } from "react-icons/bs";
import { CiMail } from "react-icons/ci";
import { IoIosLock } from "react-icons/io";
export default function Login() {
    const [isVisible, toggleVisibility] = useState(false)
    const router=useRouter()
    return (
        <>
            <form className="h-full w-full items-center  flex flex-col gap-4 p-8 sm:p-24">
                <h1 className="text-2xl font-bold">Welcome Back!</h1>
                <p>Please use your email and password to login</p>
                <Input
                    required
                    className="w-full"
                    type="email"
                    label="Email"
                    placeholder="you@example.com"
                    labelPlacement="outside"
                    startContent={
                        <CiMail className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                />
                <Input
                    required
                    label="Password"
                    className={'w-full'}
                    placeholder="Enter your password"
                    labelPlacement="outside"
                    startContent={
                        <IoIosLock className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    endContent={
                        <button className="focus:outline-none" type="button" onClick={()=>{toggleVisibility(!isVisible)}}>
                            {isVisible ? (
                                <BsEyeSlash className="text-2xl text-default-400 pointer-events-none" />
                            ) : (
                                    <BsEyeFill className="text-2xl text-default-400 pointer-events-none" />
                            )}
                        </button>
                    }
                    type={isVisible ? "text" : "password"}
                />

                <div className="flex w-full justify-between">
                    <Checkbox>Remember Me</Checkbox>
                    <Link href={'/admin/forgot-password'} className="text-blue-600 underline">Forgot Password?</Link>
                </div>
                <button onClick={() => {
                    router.push('/admin/dashboard')
                }} type="submit" className="bg-[#A92223] rounded-lg p-4 text-white w-[80%]">Login</button>
            </form>
        </>
    )
}