'use client'
import axiosInstance from "@/app/utils/axiosInstance"
import { Montserrat } from "next/font/google"
import Image from "next/image"
import { FormEvent, useState } from "react"
import { CountdownCircleTimer } from "react-countdown-circle-timer"
import { useMutation } from "react-query"
import ReactInputVerificationCode from 'react-input-verification-code';
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"
const montesserat = Montserrat({
    weight: "600",
    subsets: ['latin']

})

type EmailVerification = {
    verificationCode:string
}
export default function Verify(datas: any) {
    const navigate=useRouter()
    const [isPlaying, setIsPlaying] = useState(0)
    const resendVerificationQuery = useMutation(() => axiosInstance.get(`/riddle/api/auth/resend-verification-code?userId=${datas.searchParams.userid}`))
    const emailVerificationMutation = useMutation((data: EmailVerification) => axiosInstance.post(`/riddle/api/auth/email-verification?userId=${datas.searchParams.userid}`, data), {
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
        onSuccess(data) {
            setInvalid(false)
            navigate.replace('/auth/login')
        },
    })
    const [disabled, setDisabled] = useState(true)
    const [code, setCode] = useState<string>('')
    const [invalid, setInvalid] = useState(false)
    const [message, setMessage] = useState('')

    function handleSubmit(e:FormEvent) {
        e.preventDefault()
        const verificationData:EmailVerification = {
            verificationCode:code
        }
        emailVerificationMutation.mutate(verificationData)
    }
    return (
        <>
            <form onSubmit={handleSubmit} className="h-full overflow-auto w-full items-center  hidden sm:flex flex-col gap-4 p-8 sm:px-24 sm:py-8 ">
                <h1 className="text-2xl font-bold">Verification</h1>
                {invalid && <p className="text-red-600">{message}</p>}
                <p className="text-center">We have sent you an email containing verification code. Please enter the code to verify your identity</p>
                <ReactInputVerificationCode onChange={(value) => {
                    setCode(value)
                }} length={4}/>
                <CountdownCircleTimer
                    isPlaying
                    key={isPlaying}
                    duration={45}
                    colors="#A30000"
                    onComplete={() => {
                        // do your stuff here
                        // setIsPlaying()
                        setDisabled(false)
                        // return { shouldRepeat: true, delay: 1.5 } // repeat animation in 1.5 seconds
                    }}>
                    {({ elapsedTime, color }) => (
                        <span style={{ color }}>
                            {elapsedTime.toFixed(0)}
                        </span>
                    )}
                </CountdownCircleTimer>
                <button className="bg-[#A92223] rounded-lg px-16 py-2 text-white w-full" type="submit">Submit</button>
                <button onClick={() => {
                    setDisabled(true)
                    setIsPlaying((prev) => prev + 1)
                    // setIsPlaying(true)
                    resendVerificationQuery.mutate()
                }} disabled={disabled} className="bg-[#A92223] rounded-lg px-16 py-2 text-white w-full" type="button">Resend Code</button>
            </form>


            <form className="h-full overflow-auto w-full bg-[#160704] sm:hidden relative">
                <Image
                    priority
                    className="absolute top-0 h-full w-full"
                    style={{ opacity: "0.5" }}
                    src={"/images/home/home-banner.png"}
                    alt="home-banner"
                    width={1000}
                    height={500}
                />
                <div className="flex flex-col relative z-[1] h-[100vh] text-white gap-4 p-8 sm:p-24 items-center">
                    <h1 className="text-2xl font-bold">Verification</h1>
                    {invalid && <p className="text-red-600">{message}</p>}
                    <p className="text-center">We have sent you an email containing verification code. Please enter the code to verify your identity</p>
                    <ReactInputVerificationCode onChange={(value) => {
                        setCode(value)
                    }} length={4} />
                    <CountdownCircleTimer
                        isPlaying
                        key={isPlaying}
                        duration={45}
                        colors="#A30000"
                        onComplete={() => {
                            // do your stuff here
                            // setIsPlaying()
                            setDisabled(false)
                            // return { shouldRepeat: true, delay: 1.5 } // repeat animation in 1.5 seconds
                        }}>
                        {({ elapsedTime, color }) => (
                            <span style={{ color }}>
                                {elapsedTime.toFixed(0)}
                            </span>
                        )}
                    </CountdownCircleTimer>
                    <button className="bg-[#A92223] rounded-lg px-16 py-2 text-white w-full" type="submit">Submit</button>
                    <button onClick={() => {
                        setDisabled(true)
                        setIsPlaying((prev) => prev + 1)
                        // setIsPlaying(true)
                        resendVerificationQuery.mutate()
                    }} disabled={disabled} className="bg-[#A92223] rounded-lg px-16 py-2 text-white w-full" type="button">Resend Code</button>
                </div>
            </form>
        </>
    )
}