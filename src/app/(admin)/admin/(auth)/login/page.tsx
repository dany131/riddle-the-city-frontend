'use client';
import axiosInstance from "@/app/utils/axiosInstance";
import { Checkbox, Input, Radio, RadioGroup } from "@nextui-org/react"
import Image from "next/image"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { BsEyeFill, BsEyeSlash } from "react-icons/bs";
import { CiMail } from "react-icons/ci";
import { IoIosLock } from "react-icons/io";
import { useMutation } from "react-query";
import Cookies from 'js-cookie'
type LoginData = {
    email: string,
    password: string,
    accessType: number,
    accessToken: string
}
export default function Login() {
    const [isVisible, toggleVisibility] = useState(false)
    const router = useRouter()
    const [invalid, setInvalid] = useState(false)
    const [message, setMessage] = useState('')
    const loginMutation = useMutation((data: LoginData): any => axiosInstance.post('/riddle/api/auth/login', data), {
        onSuccess(data: any) {
            if (data.data.data.user.role == 'Admin') {
                setInvalid(false)
                Cookies.set('accessToken', data.data.data.tokens.access_token)
                Cookies.set('refreshToken', data.data.data.tokens.refresh_token)
                Cookies.set('userData', JSON.stringify({ name: data.data.data.user.name, email: data.data.data.user.email, phone: data.data.data.user.phone, role: data.data.data.user.role, id: data.data.data.user._id, profile: data.data.data.user.profilePicture }))
                router.push('/admin/dashboard')
            }
            else {
                setInvalid(true)
                setMessage('Invalid Credentials')
            }
            
            console.log(data)
        },
        onError(error:any) {
            setInvalid(true)
            setMessage(error.response.data.message)
        },
    })

    function handleSubmit(e:FormEvent) {
        e.preventDefault()
        const form = e.target as any as HTMLFormElement
        const formData = new FormData(form)
        const dataForLogin:LoginData = {
            email: formData.get('email') as any as string,
            password: formData.get('password') as any as string,
            accessType: 1,
            accessToken:''
        }
        loginMutation.mutate(dataForLogin)
    }
    return (
        <>
            <form onSubmit={handleSubmit} className="h-full w-full items-center  flex flex-col gap-4 p-8 sm:px-24">
                <h1 className="text-2xl font-bold">Welcome Back!</h1>
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
                <button type="submit" className="bg-[#A92223] rounded-lg p-4 text-white w-[80%]">Login</button>
            </form>
        </>
    )
}