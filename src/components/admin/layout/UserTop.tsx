'use client';
import { GoBell } from "react-icons/go";
import { FaRegUser } from "react-icons/fa";
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, useDisclosure } from "@nextui-org/react";
import { useState } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
type UserData = {
    name: string,
    email: string,
    phone: string,
    role: string,
    id: string
}
export default function UserTopBar() {
    let userData: UserData = { name: '', email: '', id: '', phone: '', role: 'User' }
    if (Cookies.get('userData')!) {
        userData = JSON.parse(Cookies.get('userData')!)
    }
    const { isOpen: isOpen2, onOpen: onOpen2, onOpenChange: onOpenChange2 } = useDisclosure();
    const [changePassword,setChangePassword]=useState(false)
    return (
        <>
            <div className=" border-b-[0.1rem] border-gray-200 flex gap-4 flex-wrap px-4 py-2 justify-between">
                <div>
                    <div className="flex gap-2 items-center">
                        <h1>Welcome Back,</h1>
                        <p className="text-xl font-semibold">{ userData.name}</p>
                    </div>
                    <p className="text-xs text-gray-400">{new Date().toDateString()}</p>
                </div>
                <div className="flex items-center gap-4">
                    <Link href={'/admin/notifications'} className="p-2 relative border-[0.1rem] rounded-full">
                        <GoBell />
                        <div className="w-[0.5rem] absolute top-[0.4rem] right-1/4 h-[0.5rem] bg-red-600 rounded-full"></div>
                    </Link>
                    <div onClick={onOpen2} className="flex items-center gap-2 cursor-pointer ">
                        <FaRegUser className="p-2 border-[0.1rem] text-4xl rounded-full" />
                        <p>{userData.name}</p>
                    </div>
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
                            {!changePassword && <>
                                <ModalHeader className="flex flex-col text-xl gap-1">Account Details</ModalHeader>
                                <ModalBody className="flex flex-col gap-4 pb-8">
                                    <div className="flex justify-between w-full gap-4">
                                        <div className="flex w-1/2 flex-col gap-2">
                                            <p>User Name</p>
                                            <p className="font-bold text-sm">{userData.name}</p>
                                        </div>
                                        <div className="flex w-1/2 flex-col gap-2">
                                            <p>Email Address</p>
                                            <p className="font-bold text-sm">{userData.email}</p>
                                        </div>
                                        {/* <div className="flex w-1/2 flex-col gap-2">
                                            <p>Password</p>
                                            <p className="font-bold text-sm">abcd1234</p>
                                        </div> */}
                                    </div>
                                    <button onClick={()=>{setChangePassword(!changePassword)}} className="px-16 w-max py-2 bg-[#A92223]  rounded text-white">Update Password</button>
                                </ModalBody>
                            </>}

                            {changePassword && <>
                                <ModalHeader className="flex flex-col text-xl gap-1">Change Password</ModalHeader>
                                <ModalBody className="flex flex-col gap-4 pb-8">
                                    <Input
                                        className="w-full"
                                        type="text"
                                        label="Current Password"
                                        placeholder="Enter Current Password"
                                        labelPlacement="outside"
                                    />
                                    <Input
                                        className="w-full"
                                        type="text"
                                        label="New Password"
                                        placeholder="Enter New Password"
                                        labelPlacement="outside"
                                    />
                                    <Input
                                        className="w-full"
                                        type="text"
                                        label="Confirm Password"
                                        placeholder="Confirm New Password"
                                        labelPlacement="outside"
                                    />
                                    <button onClick={()=>{setChangePassword(!changePassword)}} className="px-16 w-max py-2 bg-[#A92223]  rounded text-white">Save Changes</button>
                                </ModalBody>
                            </>}
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}