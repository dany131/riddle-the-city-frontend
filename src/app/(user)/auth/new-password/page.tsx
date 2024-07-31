'use client';
import { Input } from "@nextui-org/react"
import { useState } from "react";
import { BsEyeFill, BsEyeSlash } from "react-icons/bs"
import { Button,Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, Textarea, useDisclosure } from "@nextui-org/react";
import { IoIosLock } from "react-icons/io"
import Image from "next/image";
export default function NewPassword() {
    const [isVisible1, toggleVisibility1] = useState(false)
    const [isVisible2, toggleVisibility2] = useState(false)
    const { isOpen: isOpen1, onOpen: onOpen1, onOpenChange: onOpenChange1 } = useDisclosure();
    return (
        <>
            <div className="h-full w-full items-center hidden sm:flex flex-col gap-4 p-8 sm:p-24">
                <h1 className="text-2xl font-bold">Set New Password</h1>
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
                />
                <button onClick={()=>{onOpen1()}} className="bg-[#A92223] rounded-lg p-4 text-white w-[80%]">Save Password</button>
            </div>



            <div className="h-full w-full bg-[#160704] text-white sm:hidden relative">
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
                        classNames={{label:"!text-white"}}
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
                        classNames={{ label: "!text-white" }}
                    />
                    <button onClick={() => { onOpen1() }} className="bg-[#A92223] w-full rounded-lg p-4 text-white ">Save Password</button>
                </div>
            </div>
            <Modal
                size={"xl"}
                isOpen={isOpen1}
                backdrop="blur"
                onOpenChange={onOpenChange1}
                placement="center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col text-xl gap-1">Password Changed</ModalHeader>
                            <ModalBody className="flex flex-col gap-4 pb-8">
                                <p className="text-sm text-gray-400">Your password has been changed successfully.</p>
                                <button className="px-16 w-max py-2 bg-[#A92223]  rounded text-white">Okay</button>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}