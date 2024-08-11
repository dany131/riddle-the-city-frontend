'use client';
import { Input } from "@nextui-org/react"
import { FormEvent, useState } from "react";
import { BsEyeFill, BsEyeSlash } from "react-icons/bs"
import { IoIosLock } from "react-icons/io"
import { Montserrat } from "next/font/google"
import Image from "next/image"
import { useMutation } from "react-query";
import axiosInstance from "@/app/utils/axiosInstance";
import { useRouter } from "next/navigation";
import { ImSpinner2 } from "react-icons/im";
const montesserat = Montserrat({
    weight: "600",
    subsets: ['latin']

})

type NewPasswordData = {
    email: string,
    verificationCode: string,
    password:string
}
export default function NewPassword(data: any) {
    // console.log(data)
    const navigate = useRouter()
    const [isVisible1, toggleVisibility1] = useState(false)
    const [isVisible2, toggleVisibility2] = useState(false)
    const [code, setCode] = useState<string>('')
    const [message, setMessage] = useState<string>('')
    const [notMatch, setNotMatch] = useState(false)
    const [newPass, setNewPass] = useState<string>('')
    const [confirmPass, setConfirmPass] = useState<string>('')
    const newPasswordMutation = useMutation((data: NewPasswordData) => axiosInstance.post('/riddle/api/auth/forgot-password/change-password', data), {
        onSuccess(data) {
            console.log(data)
            setNotMatch(false)
            navigate.replace('/admin/login')
        },
        onError(error:any) {
            console.log('error', error)
            setNotMatch(true)
            setMessage(error.response.data.message)
        },
    })
    function handleSubmit(e:FormEvent) {
        e.preventDefault()
        console.log('check',newPass,confirmPass)
        if (newPass == confirmPass) {
            setNotMatch(false)
            const passwordData:NewPasswordData = {
                email: data.searchParams.email,
                verificationCode: code,
                password:newPass
            }
            newPasswordMutation.mutate(passwordData)
        }
        else {
            setNotMatch(true)
            setMessage('Passwords Do Not Match')
        }
    }

    console.log('code', code)
    console.log(newPass,confirmPass)
    return (
        <>
            <form onSubmit={handleSubmit} className="h-full w-full items-center  flex flex-col gap-8 p-8 sm:p-24">
                <h1 className="text-2xl font-bold">Set New Password</h1>
                {notMatch && <p className="text-red-600">{ message}</p>}
                <Input
                    required
                    onChange={(e) => {
                        setNewPass(e.target.value)
                    }}
                    label="New Password"
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
                    required
                    onChange={(e) => {
                        setConfirmPass(e.target.value)
                    }}
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
                <p className="self-start">Enter Verification Code</p>
                <div className="flex flex-wrap relative gap-4">
                    {/* <input required onChange={(e) => {
                        setCode((prev)=>prev+e.target.value)
                    }} className="absolute z-1 bg-red-900 w-full h-full invisible" type="text" name="" id="" /> */}
                    <input required onChange={(e) => {
                        setCode((prev) => prev + e.target.value)
                    }} className={`p-4 ${montesserat.className} w-[4rem] h-[4rem] border-2 border-gray-200 text-center font-semibold text-xl rounded-xl`}/>
                    <input required onChange={(e) => {
                        setCode((prev) => prev + e.target.value)
                    }} className={`p-4 ${montesserat.className} w-[4rem] h-[4rem] border-2 border-gray-200 text-center font-semibold text-xl rounded-xl`}/>
                    <input required onChange={(e) => {
                        setCode((prev) => prev + e.target.value)
                    }} className={`p-4 ${montesserat.className} w-[4rem] h-[4rem] border-2 border-gray-200 text-center font-semibold text-xl rounded-xl`}/>
                    <input required onChange={(e) => {
                        setCode((prev) => prev + e.target.value)
                    }} className={`p-4 ${montesserat.className} w-[4rem] h-[4rem]  border-2 border-gray-200 text-center font-semibold text-xl rounded-xl`}/>
                    <input required onChange={(e) => {
                        setCode((prev) => prev + e.target.value)
                    }} className={`p-4 ${montesserat.className} w-[4rem] h-[4rem] border-2 border-gray-200 text-center font-semibold text-xl rounded-xl`}/>
                    <input required onChange={(e) => {
                        setCode((prev) => prev + e.target.value)
                    }} className={`p-4 ${montesserat.className} w-[4rem] h-[4rem] border-2 border-gray-200 text-center font-semibold text-xl rounded-xl`}/>
                </div>
                <button type="submit" className="bg-[#A92223] rounded-lg p-4 flex justify-center text-white w-[80%]">{newPasswordMutation.isLoading ? <ImSpinner2 className="text-xl animate-spin" /> :"Save Password"}</button>
            </form>
        </>
    )
}