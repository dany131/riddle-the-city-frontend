'use client';
import axiosInstance from "@/app/utils/axiosInstance";
import { Checkbox, CheckboxGroup, Input, Radio, RadioGroup } from "@nextui-org/react"
import Image from "next/image"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useRef, useState } from "react";
import { BiPhone } from "react-icons/bi";
import { BsEyeFill, BsEyeSlash } from "react-icons/bs";
import { CiMail } from "react-icons/ci";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { IoIosLock } from "react-icons/io";
import { useMutation } from "react-query";

type LoginData = {
    accessType: number,
    accessToken: string,
    internal: {
        name: string,
        email: string,
        phone: string,
        password: string
    }
}
export default function Register() {
    const [isVisible1, toggleVisibility1] = useState(false)
    const [isVisible2, toggleVisibility2] = useState(false)
    const [message, setMessage] = useState('')
    const [noMatch, setNoMatch] = useState(false)
    const [selected, setSelected] = useState([]);
    const formRef=useRef()
    const router = useRouter()

    const registerMutation = useMutation((data: LoginData) => axiosInstance.post('/riddle/api/auth/signup', data), {
        onSuccess(data) {
            console.log('success', data)
            router.push(`/auth/verify?userid=${data.data.data.user._id}`)
        },
        onError(error:any) {
            console.log('success', error)
            setNoMatch(true)
            setMessage(error.response.data.message)
        },
    })
    function handleSubmit(e:FormEvent) {
        e.preventDefault()
        const form = e.target as any as HTMLFormElement
        const formData = new FormData(form)
        const password = formData.get('password')! as any as string
        const confirmPass = formData.get('confirm-password')! as any as string
        const loginData: LoginData = {
            accessType: 1,
            accessToken: '',
            internal: {
                name: formData.get('name')! as any as string,
                email: formData.get('email')! as any as string,
                password,
                phone: formData.get('phone')! as any as string
            }
        }

        if (password == confirmPass) {
            if (selected.length != 1) {
                setMessage('The Terms & Conditions is not checked')
                setNoMatch(true)
            }
            else {
                setNoMatch(false)
                registerMutation.mutate(loginData)
            }
        }
        else {
            setMessage('Passwords Do Not Match')
            setNoMatch(true)
        }
    }
    return (
        <>
            <form ref={formRef as any} onSubmit={handleSubmit} className="h-full hidden w-full items-center  sm:flex flex-col gap-4 p-8 sm:p-8">
                <h1 className="text-2xl font-bold">Registration</h1>
                {noMatch && <p className="text-red-600">{message}</p>}
                <Input
                    required
                    name="name"
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
                    name="email"
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
                    name="phone"
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
                    name="password"
                    required
                    label="Password"
                    className={'w-full'}
                    placeholder="Enter your password"
                    labelPlacement="outside"
                    startContent={
                        <IoIosLock className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    endContent={
                        <button className="focus:outline-none" type="button" onClick={() => { toggleVisibility1(!isVisible1) }}>
                            {isVisible1 ? (
                                <BsEyeSlash className="text-2xl text-default-400 pointer-events-none" />
                            ) : (
                                <BsEyeFill className="text-2xl text-default-400 pointer-events-none" />
                            )}
                        </button>
                    }
                    type={isVisible1 ? "text" : "password"}
                />
                <Input
                    name="confirm-password"
                    required
                    label="Confirm Password"
                    className={'w-full'}
                    placeholder="Enter your password"
                    labelPlacement="outside"
                    startContent={
                        <IoIosLock className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    endContent={
                        <button className="focus:outline-none" type="button" onClick={() => { toggleVisibility2(!isVisible2) }}>
                            {isVisible2 ? (
                                <BsEyeSlash className="text-2xl text-default-400 pointer-events-none" />
                            ) : (
                                <BsEyeFill className="text-2xl text-default-400 pointer-events-none" />
                            )}
                        </button>
                    }
                    type={isVisible2 ? "text" : "password"}
                />

                <div className="flex w-full justify-between">
                    <CheckboxGroup onValueChange={(e:any) => {
                        console.log(e)
                        setSelected(e)
                    }}>
                    <Checkbox  value={'yes'}>I accept <span className="underline">Terms & Conditions</span> and <span className="underline">Privacy Policy</span></Checkbox>

                    </CheckboxGroup>
                </div>
                <button  type="submit" className="bg-[#A92223] rounded-lg p-4 text-white w-[80%]">SignUp</button>
                <div className="flex w-full items-center justify-center gap-4 mt-4">
                    <div className="h-[0.1rem] w-[15%] bg-gray-400 w-full"></div>
                    <p>Or</p>
                    <div className="h-[0.1rem] w-[15%] bg-gray-400 w-full"></div>
                </div>
                <div className="flex gap-4">
                    <button className="flex items-center gap-2 px-4 py-2 shadow-lg rounded-lg"><FcGoogle className="text-3xl" /><p className="text-lg">Google</p></button>
                    {/* <button className="flex items-center gap-2 px-4 py-2 shadow-lg rounded-lg"><FaFacebook className="text-3xl text-blue-600" /><p className="text-lg">Facebook</p></button> */}
                </div>
            </form>



            <form className="h-auto bg-[#160704]  relative sm:hidden w-full ">
                <Image
                    priority
                    className="absolute top-0 h-full w-full"
                    style={{ opacity: "0.5" }}
                    src={"/images/home/home-banner.png"}
                    alt="home-banner"
                    width={1000}
                    height={500}
                />
                <div className="h-full relative z-[1] text-white flex w-full items-center flex-col gap-4 p-8 !sm:px-16 !sm:py-8 ">
                    <div className="flex justify-center">
                        <div className="w-[7rem] h-[7rem]">

                            <Image className="w-full h-full object-contain" src={'/images/admin/main/layout/ridde.png'} alt="auth" width={200} height={200} />
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold">Registration</h1>
                    {noMatch && <p className="text-red-600">{message}</p>}
                    <Input
                        required
                        name="name"
                        className="w-full"
                        type="text"
                        label="Full Name"
                        placeholder="John Gordon"
                        labelPlacement="outside"
                        startContent={
                            <CiMail className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                        }
                        classNames={{ label: "!text-white" }}   
                    />
                    <Input
                        name="email"
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
                        name="phone"
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
                        name="password"
                        required
                        label="Password"
                        className={'w-full'}
                        placeholder="Enter your password"
                        labelPlacement="outside"
                        startContent={
                            <IoIosLock className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                        }
                        endContent={
                            <button className="focus:outline-none" type="button" onClick={() => { toggleVisibility1(!isVisible1) }}>
                                {isVisible1 ? (
                                    <BsEyeSlash className="text-2xl text-default-400 pointer-events-none" />
                                ) : (
                                    <BsEyeFill className="text-2xl text-default-400 pointer-events-none" />
                                )}
                            </button>
                        }
                        type={isVisible1 ? "text" : "password"}
                        classNames={{ label: "!text-white" }}
                    />
                    <Input
                        name="confirm-password"
                        required
                        label="Confirm Password"
                        className={'w-full'}
                        placeholder="Enter your password"
                        labelPlacement="outside"
                        startContent={
                            <IoIosLock className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                        }
                        classNames={{label:"!text-white"}}
                        endContent={
                            <button className="focus:outline-none" type="button" onClick={() => { toggleVisibility2(!isVisible2) }}>
                                {isVisible2 ? (
                                    <BsEyeSlash className="text-2xl text-default-400 pointer-events-none" />
                                ) : (
                                    <BsEyeFill className="text-2xl text-default-400 pointer-events-none" />
                                )}
                            </button>
                        }
                        type={isVisible2 ? "text" : "password"}
                    />

                    <div className="flex w-full justify-between">
                        <CheckboxGroup onValueChange={(e: any) => {
                            console.log(e)
                            setSelected(e)
                        }}>
                            <Checkbox value={'yes'}><span className="text-white">I accept</span> <span className="underline text-white">Terms & Conditions</span> <span className="text-white">and</span> <span className="underline text-white">Privacy Policy</span></Checkbox>

                        </CheckboxGroup>
                    </div>
                    <button type="submit" className="bg-[#A92223] rounded-lg p-4 text-white w-[80%]">SignUp</button>
                    <div className="flex w-full items-center justify-center gap-4 mt-4">
                        <div className="h-[0.1rem] w-[15%] bg-gray-400 w-full"></div>
                        <p>Or</p>
                        <div className="h-[0.1rem] w-[15%] bg-gray-400 w-full"></div>
                    </div>
                    <div className="flex gap-4">
                        <button className="flex items-center gap-2 px-4 py-2 shadow-lg rounded-lg bg-white text-black"><FcGoogle className="text-3xl" /><p className="text-lg">Google</p></button>
                        {/* <button className="flex items-center gap-2 px-4 py-2 shadow-lg rounded-lg"><FaFacebook className="text-3xl text-blue-600" /><p className="text-lg">Facebook</p></button> */}
                    </div>
                </div>
            </form>
        </>
    )
}