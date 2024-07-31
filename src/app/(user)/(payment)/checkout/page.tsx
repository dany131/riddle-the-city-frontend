import { RangeCalendar,Input } from "@nextui-org/react";
import Link from "next/link";
export default function Checkout() {
    return (
        <>
            <div className="flex flex-col gap-4 px-16 py-8 h-full">
                <p className="font-semibold text-xl">Checkout</p>
                <div className="flex border-1 rounded-lg gap-16 p-4">
                    <div className="w-[60%] flex flex-col gap-4">
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
                        <Link href={'/payment'}  className="px-32 w-max py-2 bg-[#A92223]  rounded text-white">Pay Now</Link>
                    </div>
                    <div className="w-[40%] flex flex-col gap-8">
                        <div className="flex flex-col gap-2">
                            <p className="font-semibold">Choose Date</p>
                            <RangeCalendar  classNames={{ grid: "w-full", base: "!bg-gray-400" }} className="w-full" aria-label="Date (No Selection)" />
                        </div>
                        <Input
                            className="w-1/2"
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
        </>
    )
}