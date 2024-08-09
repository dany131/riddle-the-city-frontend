'use client'
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, useDisclosure } from "@nextui-org/react";
import { FormEvent, useState } from "react";
import axiosInstance from "@/app/utils/axiosInstance";
import { useMutation } from "react-query";
type NewPasswordData = {
    oldPassword: string,
    newPassword: string
}
export default function Settings() {
    const { isOpen: isOpen2, onOpen: onOpen2, onOpenChange: onOpenChange2,onClose:onClose2 } = useDisclosure();
    const [message, setMessage] = useState<string>('')
    const [notMatch, setNotMatch] = useState(false)
    const [newPass, setNewPass] = useState<string>('')
    const [confirmPass, setConfirmPass] = useState<string>('')
    const newPasswordMutation = useMutation((data: NewPasswordData) => axiosInstance.put('/riddle/api/user/password', data), {
        onSuccess(data:any) {
            console.log('data', data)
            console.log('data', data.status)
            if (data.status == 400) {
                setNotMatch(true)
                setMessage(data.response.data.message)
            }
            else {
                setNotMatch(false)
                onClose2()  
            }
        }
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
            setNotMatch(true)
            setMessage('Passwords Do Not Match')
        }
    }
    return (
        <>
                <div className="flex flex-col border-1 rounded-lg gap-4 p-4">
                    <div className="flex flex-wrap gap-4 w-full">
                    <button onClick={() => { onOpen2() }} className=" sm:w-max w-full px-8 flex justify-between items-center  py-4 text-white bg-black rounded-lg" ><span className="pr-16">Change Password</span> <IoIosArrowForward /></button>
                    <Link className="px-8 sm:w-max w-full flex justify-between items-center py-4 text-white bg-black rounded-lg" href={'/settings/privacy-policy'}><span className="pr-16">Privacy Policy</span> <IoIosArrowForward /></Link>
                    <Link className="px-8 sm:w-max w-full flex justify-between items-center py-4 text-white bg-black rounded-lg" href={'/settings/about-us'}><span className="pr-16">About Us</span> <IoIosArrowForward /></Link>
                    <Link className="px-8 sm:w-max w-full flex justify-between items-center py-4 text-white bg-black rounded-lg" href={'/settings/terms-conditions'}><span className="pr-16">Terms & Conditions</span> <IoIosArrowForward /></Link>
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
                                <form onSubmit={handleSubmit}>
                                    {notMatch && <p className="text-red-600 text-center">{message}</p>}
                                    <Input
                                        name="password"
                                        required
                                        className="w-full"
                                        type="text"
                                        label="Current Password"
                                        placeholder="Enter Current Password"
                                        labelPlacement="outside"
                                    />
                                    <Input
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
                                    />
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