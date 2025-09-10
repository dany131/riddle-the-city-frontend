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
import { toast } from "react-toastify";
import ReactInputVerificationCode from "react-input-verification-code";
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
    const [error, setError] = useState(false)
    const newPasswordMutation = useMutation((data: NewPasswordData) => axiosInstance.post('/auth/forgot-password/change-password', data), {
        onSuccess(data) {
            console.log(data)
            setNotMatch(false)
            navigate.replace('/admin/login')
        },
        onError(error:any) {
            console.log('error', error)
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
                toast.error(error.response.data.message[0], {
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
        },
    })
    function handleSubmit(e:FormEvent) {
        e.preventDefault()
        console.log('check', newPass, confirmPass)
        if (!newPass || !confirmPass) {
            setError(true)
        }
        else {
            setError(false)
            if (newPass == confirmPass) {
                setNotMatch(false)
                const passwordData: NewPasswordData = {
                    email: data.searchParams.email,
                    verificationCode: code,
                    password: newPass
                }
                newPasswordMutation.mutate(passwordData)
            }
            else {
                toast.error('Passwords Do Not Match', {
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
    }

    console.log('code', code)
    console.log(newPass,confirmPass)
    return (
        <>
            <form onSubmit={handleSubmit} className="w-full overflow-auto items-center  flex flex-col gap-8 p-8 sm:p-24">
                <h1 className="text-2xl font-bold">Set New Password</h1>
                <Input
                    required
                    onChange={(e) => {
                        setNewPass(e.target.value)
                    }}
                    isInvalid={newPass == '' && error}
                    errorMessage="Please Enter New Password"
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
                    isInvalid={confirmPass == '' && error}
                    errorMessage="Please Enter Confirm Password"
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
                    <ReactInputVerificationCode  onChange={(value) => {
                        setCode(value)
                    }} length={4} />
                </div>
                <button type="submit" className="px-16 py-2 bg-[#A92223] flex justify-center rounded text-white w-max ">{newPasswordMutation.isLoading ? <ImSpinner2 className="text-xl animate-spin" /> :"Save Password"}</button>
            </form>
        </>
    )
}