'use client'
import Image from "next/image";
import { useState } from "react";
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, useDisclosure } from "@nextui-org/react";
export default function Dashboard() {
    const { isOpen: isOpen2, onOpen: onOpen2, onOpenChange: onOpenChange2 } = useDisclosure();
    const [nextRiddle,setNextRiddle]=useState(false)
    return (
        <>
            <div className="flex flex-col gap-4 px-4 h-full">
                <p className="font-semibold text-xl">Dashboard</p>
                {!nextRiddle && <div className="flex flex-col border-1 rounded-lg gap-4 p-4">
                    <div className="flex flex-col ">
                        <p className="font-semibold">South Nashville Brew Hunt</p>
                        <p className="text-gray-400 text-sm">South Nashville</p>
                    </div>
                    <div className="flex flex-col ">
                        <p className="text-gray-400 text-sm">Package Name</p>
                        <p className="font-semibold">Single Brewery Pass</p>
                    </div>
                    <div className="flex flex-col ">
                        <p className="text-gray-400 text-sm">Operational Hours</p>
                        <p className="font-semibold">06:00 pm ----  09:00 am</p>
                    </div>
                    <div className="flex flex-col gap-4 ">
                        <p className="font-semibold">Location</p>
                        <div className="h-[20rem] w-[60%]">
                            <Image className="h-full w-full" src={'/images/user/dashboard/maps.png'} width={200} height={200} alt="google maps" />
                        </div>
                    </div>
                    <button onClick={() => { setNextRiddle(!nextRiddle) }} className="px-32 w-max py-2 bg-[#A92223]  rounded text-white">Start Riddle</button>
                </div>}
                {nextRiddle && <div className="flex flex-col border-1 rounded-lg gap-4 p-4 h-full ">
                    <p className="text-xl font-semibold">Riddle 01</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipiscing elit suscipit commodo enim tellus et nascetur at leo accumsan, odio habitanLorem ipsum dolor sit amet consectetur adipiscing elit suscipit commodo enim tellus et nascetur at leo accumsan, odio habitan Lorem ipsum dolor sit amet consectetur adipiscing elit suscipit commodo enim tellus et nascetur at leo accumsan, odio habitanLorem ipsum dolor sit amet consectetur adipiscing elit suscipit commodo enim tellus et nascetur at leo accumsan, odio habitan Lorem ipsum dolor sit amet consectetur adipiscing</p>
                    <button onClick={() => { onOpen2() }} className="px-32 w-max py-2 bg-[#FFDADA] text-[#A92223] rounded font-semibold">Hint</button>
                    <p className="mt-auto text-gray-400 text-sm">*** Please Scan QR Code for Next Riddle***</p>
                </div>}
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
                            <ModalHeader className="flex flex-col text-xl gap-1">Hint</ModalHeader>
                            <ModalBody className="flex flex-col gap-4 pb-8">
                                <p className="text-sm ">Lorem ipsum dolor sit amet consectetur adipiscing elit suscipit commodo enim tellus et nascetur at leo accumsan, odio habitanLorem ipsum dolor sit ame</p>
                                <div className="flex w-full gap-4">
                                    <button className="px-16 w-max py-2 bg-[#A92223]  rounded text-white">Okay</button>
                                </div>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
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
                            <ModalHeader className="flex flex-col text-xl gap-1">Reward</ModalHeader>
                            <ModalBody className="flex flex-col gap-4 pb-8">
                                <p className="text-sm ">Congratulations You successfully solved the riddle. You got Reward: 30% discount on a drink</p>
                                <div className="flex w-full gap-4">
                                    <button className="px-16 w-max py-2 bg-[#A92223]  rounded text-white">Claim Reward</button>
                                    <button className="px-16 w-max py-2 bg-[#A92223]  rounded text-white">Next Riddle</button>
                                </div>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}