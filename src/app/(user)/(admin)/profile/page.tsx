'use client'
import Image from "next/image"
import { CiEdit } from "react-icons/ci";
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, useDisclosure } from "@nextui-org/react";
export default function Profile() {
    const { isOpen: isOpen2, onOpen: onOpen2, onOpenChange: onOpenChange2 } = useDisclosure();
    return (
        <>
            <div className="flex flex-col gap-4 px-4 h-full">
                <p className="font-semibold text-xl">My Profile</p>
                <div className="flex flex-col border-1 rounded-lg gap-8 p-4">
                    <div className="flex justify-between">
                        <div className="h-[7rem] w-[7rem]">
                            <Image className="h-full w-full" src={'/images/user/profile/profile.png'} width={200} height={200} alt="google maps" />
                        </div>
                        <button onClick={() => { onOpen2() }} className="px-4 w-max py-2 h-max bg-[#A92223]  rounded text-white flex gap-2 items-center"><CiEdit className="text-lg" /> <span className="sm:inline hidden">Edit Profile</span></button>
                    </div>
                    <div className="flex sm:flex-row flex-col gap-4">
                        <div className="flex flex-col w-[40%]">
                            <p className="text-gray-400 text-sm">Full Name</p>
                            <p className="font-semibold">John Marshall</p>
                        </div>
                        <div className="flex flex-col w-[40%]">
                            <p className="text-gray-400 text-sm">Email Address</p>
                            <p className="font-semibold">john.marshall@gmail.com</p>
                        </div>
                        <div className="flex flex-col w-[40%]">
                            <p className="text-gray-400 text-sm">Phone</p>
                            <p className="font-semibold">+1234567890</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <p className="font-semibold">Past Hunts</p>
                        <div className="flex sm:flex-row flex-col gap-4">
                            <div className="flex flex-col sm:w-[40%] w-full gap-2 rounded-lg shadow-md p-2">
                                <div className="flex w-full items-center justify-between">
                                    <p className="font-semibold">Hunt 01</p>
                                    <p className="bg-[#a1ff8a] p-2 text-xs rounded-full">24/02/2024</p>
                                </div>
                                <div>
                                    <p>Starting Point: Riddle Point 01</p>
                                    <p>Ending Point: Riddle Point 01</p>
                                    <p>Reward: Free Drink</p>
                                </div>
                            </div>
                            <div className="flex flex-col sm:w-[40%] w-full gap-2 rounded-lg shadow-md p-2">
                                <div className="flex w-full items-center justify-between">
                                    <p className="font-semibold">Hunt 01</p>
                                    <p className="bg-[#a1ff8a] p-2 text-xs rounded-full">24/02/2024</p>
                                </div>
                                <div>
                                    <p>Starting Point: Riddle Point 01</p>
                                    <p>Ending Point: Riddle Point 01</p>
                                    <p>Reward: Free Drink</p>
                                </div>
                            </div>
                            <div className="flex flex-col sm:w-[40%] w-full gap-2 rounded-lg shadow-md p-2">
                                <div className="flex w-full items-center justify-between">
                                    <p className="font-semibold">Hunt 01</p>
                                    <p className="bg-[#a1ff8a] p-2 text-xs rounded-full">24/02/2024</p>
                                </div>
                                <div>
                                    <p>Starting Point: Riddle Point 01</p>
                                    <p>Ending Point: Riddle Point 01</p>
                                    <p>Reward: Free Drink</p>
                                </div>
                            </div>
                        </div>
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
                            <ModalHeader className="flex flex-col text-xl gap-1">Edit Profile</ModalHeader>
                            <ModalBody className="flex flex-col gap-4 pb-8">
                                <Input
                                    className="w-full"
                                    type="text"
                                    label="Username"
                                    placeholder="Enter User name"
                                    labelPlacement="outside"
                                    classNames={{
                                        label:"font-semibold"
                                    }}
                                />
                                <Input
                                    className="w-full"
                                    type="text"
                                    label="Phone Number"
                                    placeholder="Enter phone number"
                                    labelPlacement="outside"
                                    classNames={{
                                        label: "font-semibold"
                                    }}
                                />
                                
                                <button onClick={() => {  }} className="px-16 w-max py-2 bg-[#A92223]  rounded text-white">Update Profile</button>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}