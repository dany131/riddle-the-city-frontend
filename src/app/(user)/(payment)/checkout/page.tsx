'use client';
import { RangeCalendar, Input } from "@nextui-org/react";
import Link from "next/link";
import { useState } from "react";
import { RadioGroup, Radio } from "@nextui-org/react";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, useDisclosure } from "@nextui-org/react";
import Image from "next/image";
export default function Checkout() {
    const [checkoutPage, setCheckoutPage] = useState(0)
    const { isOpen: isOpen2, onOpen: onOpen2, onOpenChange: onOpenChange2 } = useDisclosure();
    return (
        <>
            {checkoutPage == 0 && <>
                <div className="flex flex-col gap-4 sm:px-16 px-4 py-8 h-full">
                    <p className="font-semibold text-xl">Checkout</p>
                    <div className="flex sm:flex-row flex-col border-1 rounded-lg gap-16 p-4">
                        <div className="sm:w-[60%] w-full flex flex-col gap-4">
                            <div className="flex flex-col ">
                                <p className="font-semibold">South Nashville Brew Hunt</p>
                                <p className="text-gray-400 text-sm">South Nashville</p>
                            </div>
                            <div className="flex flex-col ">
                                <p className="text-gray-400 text-sm">Package Name</p>
                                <p className="font-semibold">Single Brewery Pass</p>
                            </div>
                            <div className="flex flex-col ">
                                <p className="text-gray-400 text-sm">For Family</p>
                                <p className="font-semibold">$20 for a family with 2 adults, for one brewery.</p>
                            </div>
                            <div className="flex flex-col ">
                                <p className="text-gray-400 text-sm">Price</p>
                                <p className="font-semibold">$ 10 per person</p>
                            </div>
                            <div className="flex flex-col gap-2">
                                <p className="font-semibold">Total Amount</p>
                                <div className="flex flex-col gap-2">
                                    <div className="flex flex-col gap-2">
                                        <div className="flex justify-between">
                                            <p>Price</p>
                                            <p className="font-semibold">$25.00</p>
                                        </div>
                                        <div className="w-[98%] h-[0.1rem] bg-gray-400"></div>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <div className="flex justify-between">
                                            <p>Tax</p>
                                            <p className="font-semibold">$2.30</p>
                                        </div>
                                        <div className="w-[98%] h-[0.1rem] bg-gray-400"></div>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <div className="flex justify-between">
                                            <p>Subtotal (Incl.VAT)</p>
                                            <p className="font-semibold">$27.30</p>
                                        </div>
                                        <div className="w-[98%] h-[0.1rem] bg-gray-400"></div>
                                    </div>
                                </div>
                            </div>
                            <button type="button" onClick={() => {
                                setCheckoutPage(1)
                            }} className="sm:px-32 sm:w-max px-8 w-full py-2 bg-[#A92223]  rounded text-white">Pay Now</button>
                        </div>
                        <div className="sm:w-[40%] w-full order-first sm:order-last flex flex-col gap-8">
                            <div className="flex flex-col gap-2">
                                <p className="font-semibold">Choose Date</p>
                                <RangeCalendar classNames={{base:"!w-full",content:"w-[21rem] sm:w-[28rem] "}} calendarWidth={3330000}  aria-label="Date (No Selection)" className="!w-full" />
                            </div>
                            <Input
                                className="sm:w-1/2 w-full"
                                type="text"
                                label="Schedule Date"
                                // placeholder="Lorem Ipsum Odor" 
                                defaultValue="12/April/24"
                                labelPlacement="outside"
                                classNames={{ label: "font-semibold" }}
                            />
                        </div>
                    </div>
                </div>
            </>}
            {checkoutPage == 1 && <>
                <div className="flex flex-col gap-4 sm:px-16 px-4 py-8 h-full">
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
                        <div className="flex flex-wrap sm:w-[70%] w-full gap-8">
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
                        <button onClick={() => { onOpen2() }} className="sm:px-32 px-8 sm:w-max w-full py-2 bg-[#A92223]  rounded text-white">Pay Now</button>
                    </div>
                </div>
            </>}

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
                            <ModalHeader className="flex flex-col text-xl gap-1">Payment Successfull</ModalHeader>
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