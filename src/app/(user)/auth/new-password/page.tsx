'use client';
import { Input } from "@nextui-org/react"
import { FormEvent, useState } from "react";
import { BsEyeFill, BsEyeSlash } from "react-icons/bs"
import { Button,Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, Textarea, useDisclosure } from "@nextui-org/react";
import { IoIosLock } from "react-icons/io"
import Image from "next/image";
import ReactInputVerificationCode from "react-input-verification-code";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useRouter } from "next/navigation";
import { useMutation } from "react-query";
import axiosInstance from "@/app/utils/axiosInstance";
import { toast } from "react-toastify";

type NewPasswordData = {
    email: string,
    verificationCode: string,
    password: string
}


export default function NewPassword(data: any) {
    const navigate = useRouter()
    const [isVisible1, toggleVisibility1] = useState(false)
    const [isVisible2, toggleVisibility2] = useState(false)
    const [code, setCode] = useState<string>('')
    const [message, setMessage] = useState<string>('')
    const [notMatch, setNotMatch] = useState(false)
    const [newPass, setNewPass] = useState<string>('')
    const [confirmPass, setConfirmPass] = useState<string>('')
    const [disabled, setDisabled] = useState(true)
    const [isPlaying, setIsPlaying] = useState(0)
    const { isOpen: isOpen1, onOpen: onOpen1, onOpenChange: onOpenChange1, onClose: onClose1, } = useDisclosure();
    const newPasswordMutation = useMutation((data: NewPasswordData) => axiosInstance.post('/riddle/api/auth/forgot-password/change-password', data), {
        onSuccess(data) {
            console.log(data)
            setNotMatch(false)
            onOpen1()
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
            // console.log('error', error)
            // setNotMatch(true)
            // setMessage(error.response.data.message)
        },
    })
    function handleSubmit(e:FormEvent) {
        e.preventDefault()
        console.log('check', newPass, confirmPass)
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
            // setNotMatch(true)
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
            // setMessage('Passwords Do Not Match')
        }
    }
    return (
        <>
            <form onSubmit={handleSubmit} className="h-full overflow-auto w-full items-center hidden sm:flex flex-col gap-4 p-8 sm:p-24">
                <h1 className="text-2xl font-bold">Set New Password</h1>
                {notMatch && <p className="text-red-600">{message}</p>}
                <Input
                    onChange={(e) => {
                        setNewPass(e.target.value)
                    }}
                    label="New Password"
                    className={'w-full'}
                    placeholder="Enter your password"
                    classNames={{ label:"font-semibold"}}
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
                    onChange={(e) => {
                        setConfirmPass(e.target.value)
                    }}
                    label="Confirm Password"
                    className={'w-full'}
                    classNames={{ label: "font-semibold" }}
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
                <ReactInputVerificationCode onChange={(value) => {
                    console.log(value)
                    setCode(value)
                }} length={4} />
                {/* <CountdownCircleTimer
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
                </CountdownCircleTimer> */}
                <button onClick={() => {
                    onOpen1()
                }} type="button" className="bg-[#A92223] rounded-lg p-4 text-white w-[80%]">Save Password</button>
            </form>



            <div className="h-full overflow-auto w-full bg-[#160704] text-white sm:hidden relative">
                <Image
                    priority
                    className="absolute top-0 h-full w-full"
                    style={{ opacity: "0.5" }}
                    src={"/images/home/home-banner.png"}
                    alt="home-banner"
                    width={1000}
                    height={500}
                />
                <div className="h-[100vh] relative z-[1] w-full items-center  flex flex-col gap-4 p-8 sm:p-24">
                    <h1 className="text-2xl font-bold">Set New Password</h1>
                    {notMatch && <p className="text-red-600">{message}</p>}
                    <Input
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
                        classNames={{ label: "!text-white font-semibold" }}
                    />
                    <Input
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
                        classNames={{ label: "!text-white font-semibold" }}
                    />
                    <ReactInputVerificationCode onChange={(value) => {
                        console.log(value)
                        setCode(value)
                    }} length={4} />
                    <button type="submit" className="bg-[#A92223] w-full rounded-lg p-4 text-white ">Save Password</button>
                </div>
            </div>
            <Modal
                size={"xl"}
                isOpen={isOpen1}
                backdrop="blur"
                onOpenChange={onOpenChange1}
                placement="center"
                onClose={() => {
                    console.log('im gay')
                    navigate.replace('/auth/login')
                }}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col text-xl gap-1">Password Changed</ModalHeader>
                            <ModalBody className="flex flex-col gap-4 pb-8">
                                <p className="text-sm text-gray-400">Your password has been changed successfully.</p>
                                {/* <button onClick={() => {
                                    onClose1()
                                }} className="px-16 w-max py-2 bg-[#A92223]  rounded text-white">Okay</button> */}
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}