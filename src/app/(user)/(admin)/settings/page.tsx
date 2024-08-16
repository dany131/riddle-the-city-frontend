'use client'
import Link from "next/link";
import { IoIosArrowForward, IoIosLock } from "react-icons/io";
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, useDisclosure } from "@nextui-org/react";
import { FormEvent, useState } from "react";
import axiosInstance from "@/app/utils/axiosInstance";
import { useMutation } from "react-query";
import { BsEyeFill, BsEyeSlash } from "react-icons/bs";
import { toast } from "react-toastify";
import Cookies from 'js-cookie'
type NewPasswordData = {
    oldPassword: string,
    newPassword: string
}

type UserData = {
    name: string,
    email: string,
    phone: string,
    role: string,
    id: string,
    accessType:number
}

export default function Settings() {
    let userData: UserData = { name: '', email: '', id: '', phone: '', role: 'User',accessType:2 }
    if (Cookies.get('userData')!) {
        userData = JSON.parse(Cookies.get('userData')!)
    }
    console.log('user data',userData)
    const { isOpen: isOpen2, onOpen: onOpen2, onOpenChange: onOpenChange2,onClose:onClose2 } = useDisclosure();
    const [message, setMessage] = useState<string>('')
    const [notMatch, setNotMatch] = useState(false)
    const [newPass, setNewPass] = useState<string>('')
    const [confirmPass, setConfirmPass] = useState<string>('')
    const [isVisible, toggleVisibility1] = useState(false)
    const [isVisible2, toggleVisibility2] = useState(false)
    const [isVisible3, toggleVisibility3] = useState(false)
    const newPasswordMutation = useMutation((data: NewPasswordData) => axiosInstance.put('/riddle/api/user/password', data), {
        onSuccess(data) {
            console.log('data',data)
            setNotMatch(false)
            onClose2()
        },
        onError(error: any) {
            console.log('error', error)
            setNotMatch(true)
            setMessage(error.response.data.message)
        },
    })
    function handleSubmit(e: FormEvent) {
        e.preventDefault()
        const form = e.target as any as HTMLFormElement
        const formData=new FormData(form)
        // console.log('check', newPass, confirmPass)
        if (formData.get('new-password') == formData.get('confirm-password')) {
            setNotMatch(false)
            const passwordData: NewPasswordData = {
                oldPassword: formData.get('password') as string,
                newPassword: formData.get('new-password') as string
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
    return (
        <>
            <div className="flex flex-col border-1 rounded-lg gap-4 p-4">
                <div className="flex flex-wrap gap-4 w-full">
                    {userData.accessType != 2 && <button onClick={() => { onOpen2() }} className=" sm:w-max w-full px-8 flex justify-between items-center  py-4 text-white bg-black rounded-lg" ><span className="pr-16">Change Password</span> <IoIosArrowForward /></button>}
                    <Link className="px-8 sm:w-max w-full flex justify-between items-center py-4 text-white bg-black rounded-lg" href={'/settings/privacy-policy'}><span className="pr-16">Privacy Policy</span> <IoIosArrowForward /></Link>
                    <Link className="px-8 sm:w-max w-full flex justify-between items-center py-4 text-white bg-black rounded-lg" href={'/settings/about-us'}><span className="pr-16">About Us</span> <IoIosArrowForward /></Link>
                    <Link className="px-8 sm:w-max w-full flex justify-between items-center py-4 text-white bg-black rounded-lg" href={'/settings/terms-conditions'}><span className="pr-16">Terms & Conditions</span> <IoIosArrowForward /></Link>
                    <Link className="px-8 sm:w-max w-full flex justify-between items-center py-4 text-white bg-black rounded-lg" href={'/settings/update-card'}><span className="pr-16">Payment Methods</span> <IoIosArrowForward /></Link>
                </div>
            </div>
            <Modal
                size={"xl"}
                isOpen={isOpen2}
                backdrop="blur"
                onOpenChange={onOpenChange2}
                placement="center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>

                            <ModalHeader className="flex flex-col text-xl gap-1">Update Password</ModalHeader>
                            <ModalBody className="flex flex-col gap-4 pb-8">
                                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                    {notMatch && <p className="text-red-600 text-center">{message}</p>}
                                    <Input
                                        name="password"
                                        required
                                        label="Current Password"
                                        className={'w-full'}
                                        placeholder="Enter your password"
                                        labelPlacement="outside"
                                        startContent={
                                            <IoIosLock className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                        }
                                        endContent={
                                            <button className="focus:outline-none" type="button" onClick={() => { toggleVisibility1(!isVisible) }}>
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
                                        name="new-password"
                                        required
                                        label="New Password"
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
                                            <button className="focus:outline-none" type="button" onClick={() => { toggleVisibility3(!isVisible3) }}>
                                                {isVisible3 ? (
                                                    <BsEyeSlash className="text-2xl text-default-400 pointer-events-none" />
                                                ) : (
                                                    <BsEyeFill className="text-2xl text-default-400 pointer-events-none" />
                                                )}
                                            </button>
                                        }
                                        type={isVisible3 ? "text" : "password"}
                                    />
                                    {/* <Input
                                        name="new-password"
                                        required
                                        className="w-full"
                                        type="text"
                                        label="New Password"
                                        placeholder="Enter New Password"
                                        labelPlacement="outside"
                                    />
                                    <Input
                                        required
                                        name="confirm-password"
                                        className="w-full"
                                        type="text"
                                        label="Confirm Password"
                                        placeholder="Confirm New Password"
                                        labelPlacement="outside"
                                    /> */}
                                    <button className="px-16 w-max py-2 bg-[#A92223]  rounded text-white">Update Password</button>
                                </form>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}