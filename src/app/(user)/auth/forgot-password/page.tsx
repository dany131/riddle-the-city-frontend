'use client'
import axiosInstance from "@/app/utils/axiosInstance"
import { Input } from "@nextui-org/react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"
import { CiMail } from "react-icons/ci"
import { useMutation } from "react-query"
import { toast } from "react-toastify"
type ForgotPasswordData = {
    email: string
}

export default function ForgotPassword() {
    const navigate = useRouter()
    const [email, setEmail] = useState<string | null>()
    const [invalid, setInvalid] = useState(false)
    const [message, setMessage] = useState('')
    const forgotPasswordMutation = useMutation((data: ForgotPasswordData) => axiosInstance.post('/auth/forgot-password', data), {
        onSuccess(data) {
            console.log(data)
            setInvalid(false)
            navigate.replace(`/auth/new-password?email=${email}`)
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
        },
    })
    function handleSubmit(e: FormEvent) {
        e.preventDefault()
        // const form = e.target as any as HTMLFormElement
        // const formData = new FormData(form)
        const passwordData: ForgotPasswordData = {
            email: email as any as string
        }
        forgotPasswordMutation.mutate(passwordData)
    }
    return (
        <>
            <form onSubmit={handleSubmit} className="h-auto overflow-auto w-full items-center hidden sm:flex flex-col gap-4 p-8 sm:p-8">
                <h1 className="text-2xl font-bold">Forgot Password</h1>
                {invalid && <p className="text-red-600">{ message}</p>}
                <Input
                    onChange={(e) => { setEmail(e.target.value) }}
                    className="w-full"
                    type="email"
                    label="Email Address"
                    placeholder="you@example.com"
                    labelPlacement="outside"
                    classNames={{ label:"font-semibold"}}
                    startContent={
                        <CiMail className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                />
                <button type="submit" className="bg-[#A92223] rounded-lg p-4 text-center text-white w-[80%]">Continue</button>
            </form>


            <form onSubmit={handleSubmit} className=" h-full overflow-auto bg-[#160704] h-[100vh] w-full relative  sm:hidden ">
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
                    {invalid && <p className="text-red-600">{message}</p>}
                    <Input
                        onChange={(e) => { setEmail(e.target.value) }}
                        className="w-full"
                        type="email"
                        label="Email Address"
                        placeholder="you@example.com"
                        labelPlacement="outside"
                        startContent={
                            <CiMail className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                        }
                        classNames={{ label: "!text-white font-semibold" }}
                    />
                    <button type="submit" className="bg-[#A92223] rounded-lg p-4 text-center text-white w-full">Continue</button>
                </div>
            </form>
        </>
    )
}