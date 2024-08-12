'use client';
import { RangeCalendar, Input } from "@nextui-org/react";
import Link from "next/link";
import { useState } from "react";
import { RadioGroup, Radio } from "@nextui-org/react";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, useDisclosure } from "@nextui-org/react";
import Image from "next/image";
import { useMutation, useQuery } from "react-query";
import axiosInstance from "@/app/utils/axiosInstance";
import { ImSpinner2 } from "react-icons/im";
import Cookies from 'js-cookie'
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';


type UserData = {
    name: string,
    email: string,
    phone: string,
    role: string,
    id: string
}
type PaymentData = {
    package:string
}
export default function Checkout(datas: any) {
    console.log(datas.searchParams.id)
    const [checkoutPage, setCheckoutPage] = useState(0)
    const navigate=useRouter()
    let userData: UserData = { name: '', email: '', id: '', phone: '', role: 'User' }
    if (Cookies.get('userData')!) {
        userData = JSON.parse(Cookies.get('userData')!)
    }
    const packagesQuery = useQuery(['packagesIndividual', datas.searchParams.id], ({ queryKey }) => axiosInstance.get(`/riddle/api/package?packageId=${queryKey[1]}`))
    const cardQuery = useQuery(['cardIndividual'], () => axiosInstance.get(`/riddle/api/payment/card`))
    const { isOpen: isOpen2, onOpen: onOpen2, onOpenChange: onOpenChange2 } = useDisclosure();
    const { isOpen: isOpen1, onOpen: onOpen1, onOpenChange: onOpenChange1 } = useDisclosure();
    const paymentMutation = useMutation((data: PaymentData) => axiosInstance.post('/riddle/api/booking', data),
        {
            onSuccess(data) {
                onOpen2()
            },
            onError(error:any) {
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
            },
        }
    )
    return (
        <>
            {checkoutPage == 0 && <>
                <div className="flex flex-col gap-4 sm:px-16 px-4 py-8 h-full">
                    <p className="font-semibold text-xl">Checkout</p>
                    <div className="flex sm:flex-row flex-col border-1 rounded-lg gap-16 p-4">

                        <div className="w-full flex flex-col gap-4">
                            {packagesQuery.isFetching && <div className="flex justify-center h-full items-center"><ImSpinner2 className="text-4xl animate-spin" /></div>}
                            {!packagesQuery.isFetching && <>
                                <div className="flex flex-col ">
                                    <p className="text-gray-400 text-sm">Package Description</p>
                                    <p className="font-semibold">{packagesQuery.data?.data.data.description}</p>
                                </div>
                                <div className="flex flex-col ">
                                    <p className="text-gray-400 text-sm">Package Name</p>
                                    <p className="font-semibold">{packagesQuery.data?.data.data.name}</p>
                                </div>
                                {/* <div className="flex flex-col ">
                                    <p className="text-gray-400 text-sm">For Family</p>
                                    <p className="font-semibold">$20 for a family with 2 adults, for one brewery.</p>
                                </div> */}
                                <div className="flex flex-col ">
                                    <p className="text-gray-400 text-sm">Price</p>
                                    <p className="font-semibold">${packagesQuery.data?.data.data.price }</p>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <p className="font-semibold">Total Amount</p>
                                    <div className="flex flex-col gap-2">
                                        <div className="flex flex-col gap-2">
                                            <div className="flex justify-between">
                                                <p>Price</p>
                                                <p className="font-semibold">${packagesQuery.data?.data.data.price}</p>
                                            </div>
                                            <div className="w-[98%] h-[0.1rem] bg-gray-400"></div>
                                        </div>
                                        {/* <div className="flex flex-col gap-2">
                                            <div className="flex justify-between">
                                                <p>Tax</p>
                                                <p className="font-semibold">$2.30</p>
                                            </div>
                                            <div className="w-[98%] h-[0.1rem] bg-gray-400"></div>
                                        </div> */}
                                        <div className="flex flex-col gap-2">
                                            <div className="flex justify-between">
                                                <p>Subtotal (Incl.VAT)</p>
                                                <p className="font-semibold">${packagesQuery.data?.data.data.price}</p>
                                            </div>
                                            <div className="w-[98%] h-[0.1rem] bg-gray-400"></div>
                                        </div>
                                    </div>
                                </div>
                                <button type="button" onClick={() => {
                                    setCheckoutPage(1)
                                }} className="sm:px-32 sm:w-max px-8 w-full py-2 bg-[#A92223]  rounded text-white">Pay Now</button>
                            </>}
                        </div>
                        {/* <div className="sm:w-[40%] w-full order-first sm:order-last flex flex-col gap-8">
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
                        </div> */}
                    </div>
                </div>
            </>}
            {checkoutPage == 1 && <>
                <div className="flex flex-col gap-4 sm:px-16 px-4 py-8 h-full">
                    <p className="font-semibold text-xl">Payment</p>
                    <div className="flex flex-col border-1 rounded-lg gap-4 p-4">
                        {/* <div>
                            <p>Select Billing Method</p>
                            <p className="text-gray-400 text-sm">This will be your primary payment method for all purchases</p>
                        </div> */}
                        {/* <div>
                            <RadioGroup
                                defaultValue={`${cardQuery.data?.data.data.brand}`}
                            >
                                <Radio value="master-card"><Image className="w-[3rem] h-[2rem]" src={'/images/user/payment/master.png'} alt="master card" width={50} height={50} /></Radio>
                                <Radio value="visa"><Image className="w-[3rem] h-[2rem]" src={'/images/user/payment/visa.png'} alt="master card" width={50} height={50} /></Radio>
                            </RadioGroup>
                        </div> */}
                        <Link href={`/settings/update-card`} className="underline flex justify-start text-[#A92223]">Add New Payment Method</Link>
                        <div className="flex flex-wrap  w-full gap-8">
                            <Input
                                className="w-full"
                                type="text"
                                disabled
                                label="Card Number"
                                placeholder={`**** **** **** ${cardQuery.data?.data.data.last4}`}
                                // defaultValue="12/April/24"
                                labelPlacement="outside"
                                classNames={{ label: "font-semibold" }}
                            />
                            <Input
                                className="w-[47%]"
                                type="text"
                                disabled
                                value={`${userData.name}`}
                                label="Name"
                                placeholder="John"
                                // defaultValue="12/April/24"
                                labelPlacement="outside"
                                classNames={{ label: "font-semibold" }}
                            />
                            {/* <Input
                                className="w-[47%]"
                                type="text"
                                label="Last Name"
                                placeholder="Marshall"
                                // defaultValue="12/April/24"
                                labelPlacement="outside"
                                classNames={{ label: "font-semibold" }}
                            /> */}
                            <Input
                                className="w-[47%]"
                                type="text"
                                label="Expiration month"
                                disabled
                                value={`${cardQuery.data?.data.data.expiryMonth < 10 ? `0${cardQuery.data?.data.data.expiryMonth}`:`${cardQuery.data?.data.data.expiryMonth}`}`}
                                placeholder="MM"
                                // defaultValue="12/April/24"
                                labelPlacement="outside"
                                classNames={{ label: "font-semibold" }}
                            />
                            <Input
                                className="w-[47%]"
                                type="text"
                                disabled
                                value={`${cardQuery.data?.data.data.expiryYear}`}
                                label="Expiration year"
                                placeholder="YYYY"
                                // defaultValue="12/April/24"
                                labelPlacement="outside"
                                classNames={{ label: "font-semibold" }}
                            />
                            {/* <Input
                                className="w-[47%]"
                                type="text"
                                label="Security code"
                                placeholder="3 digits"
                                // defaultValue="12/April/24"
                                labelPlacement="outside"
                                classNames={{ label: "font-semibold" }}
                            /> */}

                        </div>
                        <button onClick={() => { 
                            paymentMutation.mutate({
                                package:datas.searchParams.id
                            })
                         }} className="sm:px-32 px-8 sm:w-max w-full py-2 bg-[#A92223]  rounded text-white">Pay Now</button>
                    </div>
                </div>
            </>}

            <Modal
                size={"xl"}
                isOpen={isOpen2}
                backdrop="blur"
                onOpenChange={onOpenChange2}
                placement="center"
                onClose={() => {
                    navigate.replace('/dashboard')
                }}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col text-xl gap-1">Payment Successfull</ModalHeader>
                            <ModalBody className="flex flex-col gap-4 pb-8">
                                <p className="text-sm ">You have successfully booked Brewery Package</p>
                                {/* <div className="flex w-full gap-4">
                                    <button className="px-16 w-max py-2 bg-[#A92223]  rounded text-white">Okay</button>
                                </div> */}
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
            
        </>
    )
}