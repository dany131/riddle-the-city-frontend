'use client';
import axiosInstance from "@/app/utils/axiosInstance";
import { Checkbox, Input, Radio, RadioGroup } from "@nextui-org/react"
import Image from "next/image"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, use, useState } from "react";
import { BsEyeFill, BsEyeSlash } from "react-icons/bs";
import { CiMail } from "react-icons/ci";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { IoIosLock } from "react-icons/io";
import { useMutation } from "react-query";
import { useGoogleLogin } from '@react-oauth/google';
import Cookies from "js-cookie";
import { toast } from "react-toastify";
type LoginData = {
    email?: string,
    password?: string,
    accessType: number,
    accessToken: string
}
export default function Login() {
    const [isVisible, toggleVisibility] = useState(false)
    const router = useRouter()
    const [invalid, setInvalid] = useState(false)
    const [message,setMessage]=useState('')
    const loginMutation = useMutation((data: LoginData): any => axiosInstance.post('/riddle/api/auth/login', data), {
        onSuccess(data: any) {
            if (data.data.data.statusCode != 400) {
                if (data.data.data.user.role == 'User') {
                    setInvalid(false)
                    Cookies.set('accessToken', data.data.data.tokens.access_token)
                    Cookies.set('refreshToken', data.data.data.tokens.refresh_token)
                    Cookies.set('userData', JSON.stringify({ name: data.data.data.user.name, email: data.data.data.user.email, phone: data.data.data.user.phone, role: data.data.data.user.role, id: data.data.data.user._id, profile: data.data.data.user.profilePicture }))
                    router.push('/dashboard')
                }
                else {
                    toast.error('Invalid Credentials', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    })
                }
            }
            console.log(data)
        },
        onError(error: any) {
            if (typeof (error.response.data.message) == 'string') {
                toast.error(error.response.data.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                })
            }
            else {
                toast.error(error.response.data.message.join(','), {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                })
            }
            // setInvalid(true)
            // setMessage(error.response.data.message)
        },
    })


    const login = useGoogleLogin({
        onSuccess: (codeResponse) => {
            const { access_token } = codeResponse
            console.log('google',access_token)
            const loginData: LoginData = {
                accessType: 2,
                accessToken:access_token
            }
            loginMutation.mutate(loginData)
        },
        flow: 'implicit',
    });

    function handleSubmit(e: FormEvent) {
        e.preventDefault()
        const form = e.target as any as HTMLFormElement
        const formData = new FormData(form)
        const dataForLogin: LoginData = {
            email: formData.get('email') as any as string,
            password: formData.get('password') as any as string,
            accessType: 1,
            accessToken: ''
        }
        loginMutation.mutate(dataForLogin)
    }
    return (
        <>
            <form onSubmit={handleSubmit} className="h-auto sm:flex w-full items-center  hidden flex-col gap-4 p-8 !sm:px-16 !sm:py-8">
                <h1 className="text-2xl font-bold">Login</h1>
                {invalid && <p className="text-red-600">{message}</p>}
                <p>Please use your email and password to login</p>
                <Input
                    required
                    name="email"
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
                    {/* <Checkbox>Remember Me</Checkbox> */}
                    <Link href={'/auth/forgot-password'} className="text-blue-600 underline">Forgot Password?</Link>
                </div>
                <button type="submit" className="bg-[#A92223] rounded-lg p-4 text-white w-[80%]">Login</button>
                <div className="flex w-full items-center justify-center gap-4 mt-4">
                    <div className="h-[0.1rem] w-[15%] bg-gray-400 w-full"></div>
                    <p>Or</p>
                    <div className="h-[0.1rem] w-[15%] bg-gray-400 w-full"></div>
                </div>
                <div className="flex gap-4">
                    <button type="button" onClick={() => { login() }} className="flex items-center gap-2 px-4  text-black bg-white py-2 shadow-lg rounded-lg"><FcGoogle className="text-3xl" /><p className="text-lg">Google</p></button>
                    {/* <button className="flex items-center gap-2 px-4 py-2 shadow-lg rounded-lg"><FaFacebook className="text-3xl text-blue-600" /><p className="text-lg">Facebook</p></button> */}
                </div>
                <p className="mt-8">Don't have an account? <Link href={'/auth/register'} className="underline text-blue-600">Register Now</Link></p>
            </form>




            <form onSubmit={handleSubmit} className="h-auto bg-[#160704]  relative sm:hidden w-full ">
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
                    <h1 className="text-2xl font-bold">Login</h1>
                    {invalid && <p className="text-red-600">{message}</p>}
                    <p className="text-gray-400">Please use your email and password to login</p>
                    <Input
                        required
                        className="w-full"
                        name="email"
                        type="email"
                        label="Email"
                        placeholder="you@example.com"
                        labelPlacement="outside"
                        startContent={
                            <CiMail className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                        }
                        classNames={{ label: "!text-white" }}
                    />
                    <Input
                        required
                        name="password"
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

                    <div className="flex w-full justify-between">
                        {/* <Checkbox><p className="text-white">Remember Me</p></Checkbox> */}
                        <Link href={'/auth/forgot-password'} className="text-blue-600 underline">Forgot Password?</Link>
                    </div>
                    <button type="submit" className="bg-[#A92223] rounded-lg p-4 text-white w-full">Login</button>
                    <div className="flex w-full items-center justify-center gap-4 mt-4">
                        <div className="h-[0.1rem] w-[15%] bg-gray-400 w-full"></div>
                        <p>Or</p>
                        <div className="h-[0.1rem] w-[15%] bg-gray-400 w-full"></div>
                    </div>
                    <div className="flex gap-4">
                        <button type="button" onClick={()=>{login()}} className="flex items-center gap-2 px-4  text-black bg-white py-2 shadow-lg rounded-lg"><FcGoogle className="text-3xl" /><p className="text-lg">Google</p></button>
                        {/* <button className="flex items-center gap-2 px-4 text-black bg-white  py-2 shadow-lg rounded-lg"><FaFacebook className="text-3xl text-blue-600" /><p className="text-lg">Facebook</p></button> */}
                    </div>
                    <p className="mt-8 text-gray-400">Don't have an account? <Link href={'/auth/register'} className="underline text-blue-600">Register Now</Link></p>
                </div>
            </form>
        </>
    )
}