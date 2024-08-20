'use client'
import { RadioGroup, Radio } from "@nextui-org/react";
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, useDisclosure } from "@nextui-org/react";
import Image from "next/image";
export default function Payment() {
    const { isOpen: isOpen2, onOpen: onOpen2, onOpenChange: onOpenChange2 } = useDisclosure();
    return (
        <>
            <div className="flex flex-col gap-4 px-16 py-8 h-full">
                <p className="font-semibold text-xl">Payment</p>
                <div className="flex flex-col border-1 rounded-lg gap-4 p-4">
                    <div>
                        <p>Select Billing Method</p>
                        <p className="text-gray-400 text-sm">This will be your primary payment method for all purchases</p>
                    </div>
                    <div>
                        <RadioGroup
                            defaultValue={"master-card"}
                        >
                            <Radio value="master-card"><Image className="w-[3rem] h-[2rem]" src={'/images/user/payment/master.png'} alt="master card" width={50} height={50} /></Radio>
                            <Radio value="visa"><Image className="w-[3rem] h-[2rem]" src={'/images/user/payment/visa.png'} alt="master card" width={50} height={50} /></Radio>
                        </RadioGroup>
                    </div>
                    <p className="underline text-[#A92223]">Add New Payment Method</p>
                    <div className="flex flex-wrap w-[70%] gap-8">
                        <Input
                            className="w-full"
                            type="text"
                            label="Card Number"
                            placeholder="**** **** **** 1234"
                            // defaultValue="12/April/24"
                            labelPlacement="outside"
                            classNames={{ label: "font-semibold" }}
                        />
                        <Input
                            className="w-[40%]"
                            type="text"
                            label="First Name"
                            placeholder="John"
                            // defaultValue="12/April/24"
                            labelPlacement="outside"
                            classNames={{ label: "font-semibold" }}
                        />
                        <Input
                            className="w-[40%]"
                            type="text"
                            label="Last Name"
                            placeholder="Marshall"
                            // defaultValue="12/April/24"
                            labelPlacement="outside"
                            classNames={{ label: "font-semibold" }}
                        />
                        <Input
                            className="w-[40%]"
                            type="text"
                            label="Expiration month"
                            placeholder="MM"
                            // defaultValue="12/April/24"
                            labelPlacement="outside"
                            classNames={{ label: "font-semibold" }}
                        />
                        <Input
                            className="w-[40%]"
                            type="text"
                            label="Expiration year"
                            placeholder="YYYY"
                            // defaultValue="12/April/24"
                            labelPlacement="outside"
                            classNames={{ label: "font-semibold" }}
                        />
                        <Input
                            className="w-[40%]"
                            type="text"
                            label="Security code"
                            placeholder="3 digits"
                            // defaultValue="12/April/24"
                            labelPlacement="outside"
                            classNames={{ label: "font-semibold" }}
                        />

                    </div>
                    <button onClick={()=>{onOpen2()}} className="px-32 w-max py-2 bg-[#A92223]  rounded text-white">Pay Now</button>
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
                            <ModalHeader className="flex flex-col text-xl gap-1">Payment Successful</ModalHeader>
                            <ModalBody className="flex flex-col gap-4 pb-8">
                                <p className="text-sm ">You have successfully booked Brewery Package</p>
                                <div className="flex w-full gap-4">
                                    <button className="px-16 w-max py-2 bg-[#A92223]  rounded text-white">Okay</button>
                                </div>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}