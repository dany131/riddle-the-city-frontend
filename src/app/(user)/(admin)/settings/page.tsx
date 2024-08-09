'use client'
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, useDisclosure } from "@nextui-org/react";
export default function Settings() {
    const { isOpen: isOpen2, onOpen: onOpen2, onOpenChange: onOpenChange2 } = useDisclosure();
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
                                    <button  className="px-16 w-max py-2 bg-[#A92223]  rounded text-white">Update Password</button>
                                </ModalBody>
                            </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}