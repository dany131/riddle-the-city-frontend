'use client';
import { Checkbox, Input, Radio, RadioGroup } from "@nextui-org/react"
import Image from "next/image"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BiPhone } from "react-icons/bi";
import { BsEyeFill, BsEyeSlash } from "react-icons/bs";
import { CiMail } from "react-icons/ci";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { IoIosLock } from "react-icons/io";
export default function Register() {
    const [isVisible, toggleVisibility] = useState(false)
    const router = useRouter()
    return (
        <>
            <form className="h-full hidden w-full items-center  sm:flex flex-col gap-4 p-8 sm:p-8">
                <h1 className="text-2xl font-bold">Registration</h1>
                <Input
                    required
                    className="w-full"
                    type="text"
                    label="Full Name"
                    placeholder="John Gordon"
                    labelPlacement="outside"
                    startContent={
                        <CiMail className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                />
                <Input
                    required
                    className="w-full"
                    type="email"
                    label="Email Address"
                    placeholder="you@example.com"
                    labelPlacement="outside"
                    startContent={
                        <CiMail className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                />
                <Input
                    required
                    className="w-full"
                    type="text"
                    label="Phone Number"
                    placeholder="+123456789"
                    labelPlacement="outside"
                    startContent={
                        <BiPhone className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
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
                        <button className="focus:outline-none" type="button" onClick={() => { toggleVisibility(!isVisible) }}>
                            {isVisible ? (
                                <BsEyeSlash className="text-2xl text-default-400 pointer-events-none" />
                            ) : (
                                <BsEyeFill className="text-2xl text-default-400 pointer-events-none" />
                            )}
                        </button>
                    }
                    type={isVisible ? "text" : "password"}
                />
                <Input
                    required
                    label="Confirm Password"
                    className={'w-full'}
                    placeholder="Enter your password"
                    labelPlacement="outside"
                    startContent={
                        <IoIosLock className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    endContent={
                        <button className="focus:outline-none" type="button" onClick={() => { toggleVisibility(!isVisible) }}>
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
                    <Checkbox>I accept <span className="underline">Terms & Conditions</span> and <span className="underline">Privacy Policy</span></Checkbox>
                </div>
                <button onClick={() => {
                    // router.push('/admin/dashboard')
                }} type="submit" className="bg-[#A92223] rounded-lg p-4 text-white w-[80%]">SignUp</button>
                <div className="flex w-full items-center justify-center gap-4 mt-4">
                    <div className="h-[0.1rem] w-[15%] bg-gray-400 w-full"></div>
                    <p>Or</p>
                    <div className="h-[0.1rem] w-[15%] bg-gray-400 w-full"></div>
                </div>
                <div className="flex gap-4">
                    <button className="flex items-center gap-2 px-4 py-2 shadow-lg rounded-lg"><FcGoogle className="text-3xl" /><p className="text-lg">Google</p></button>
                    <button className="flex items-center gap-2 px-4 py-2 shadow-lg rounded-lg"><FaFacebook className="text-3xl text-blue-600" /><p className="text-lg">Facebook</p></button>
                </div>
            </form>



            <form className="h-full w-full bg-[#160704] text-white  relative sm:hidden ">
                <Image
                    priority
                    className="absolute top-0 h-full w-full"
                    style={{ opacity: "0.5" }}
                    src={"/images/home/home-banner.png"}
                    alt="home-banner"
                    width={1000}
                    height={500}
                />
                <div className="h-full flex items-center flex-col gap-4 p-8 sm:p-24 relative z-[1] ">
                    <div className="flex justify-center">
                        <div className="w-[7rem] h-[7rem]">

                            <Image className="w-full h-full object-contain" src={'/images/admin/main/layout/ridde.png'} alt="auth" width={200} height={200} />
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold">Registration</h1>
                    <Input
                        required
                        className="w-full"
                        type="text"
                        label="Full Name"
                        placeholder="John Gordon"
                        labelPlacement="outside"
                        startContent={
                            <CiMail className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                        }
                        classNames={{label:"!text-white"}}
                    />
                    <Input
                        required
                        className="w-full"
                        type="email"
                        label="Email Address"
                        placeholder="you@example.com"
                        labelPlacement="outside"
                        startContent={
                            <CiMail className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                        }
                        classNames={{ label: "!text-white" }}
                    />
                    <Input
                        required
                        className="w-full"
                        type="text"
                        label="Phone Number"
                        placeholder="+123456789"
                        labelPlacement="outside"
                        startContent={
                            <BiPhone className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                        }
                        classNames={{ label: "!text-white" }}
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
                            <button className="focus:outline-none" type="button" onClick={() => { toggleVisibility(!isVisible) }}>
                                {isVisible ? (
                                    <BsEyeSlash className="text-2xl text-default-400 pointer-events-none" />
                                ) : (
                                    <BsEyeFill className="text-2xl text-default-400 pointer-events-none" />
                                )}
                            </button>
                        }
                        type={isVisible ? "text" : "password"}
                        classNames={{ label: "!text-white" }}
                    />
                    <Input
                        required
                        label="Confirm Password"
                        className={'w-full'}
                        placeholder="Enter your password"
                        labelPlacement="outside"
                        startContent={
                            <IoIosLock className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                        }
                        endContent={
                            <button className="focus:outline-none" type="button" onClick={() => { toggleVisibility(!isVisible) }}>
                                {isVisible ? (
                                    <BsEyeSlash className="text-2xl text-default-400 pointer-events-none" />
                                ) : (
                                    <BsEyeFill className="text-2xl text-default-400 pointer-events-none" />
                                )}
                            </button>
                        }
                        type={isVisible ? "text" : "password"}
                        classNames={{ label: "!text-white" }}
                    />

                    <div className="flex w-full justify-between">
                        <Checkbox><p className="text-white">I accept <span className="underline">Terms & Conditions</span> and <span className="underline">Privacy Policy</span></p></Checkbox>
                    </div>
                    <button onClick={() => {
                        // router.push('/admin/dashboard')
                    }} type="submit" className="bg-[#A92223] rounded-lg p-4 text-white w-full">SignUp</button>
                    <div className="flex w-full items-center justify-center gap-4 mt-4">
                        <div className="h-[0.1rem] w-[15%] bg-gray-400 w-full"></div>
                        <p>Or</p>
                        <div className="h-[0.1rem] w-[15%] bg-gray-400 w-full"></div>
                    </div>
                    <div className="flex gap-4">
                        <button className="flex items-center gap-2 px-4 py-2 text-black bg-white shadow-lg rounded-lg"><FcGoogle className="text-3xl" /><p className="text-lg">Google</p></button>
                        <button className="flex items-center gap-2 px-4 py-2 text-black bg-white shadow-lg rounded-lg"><FaFacebook className="text-3xl text-blue-600" /><p className="text-lg">Facebook</p></button>
                    </div>
                </div>
            </form>
        </>
    )
}