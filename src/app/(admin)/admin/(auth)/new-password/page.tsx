'use client';
import { Input } from "@nextui-org/react"
import { useState } from "react";
import { BsEyeFill, BsEyeSlash } from "react-icons/bs"
import { IoIosLock } from "react-icons/io"
export default function NewPassword() {
    const [isVisible1, toggleVisibility1] = useState(false)
    const [isVisible2, toggleVisibility2] = useState(false)
    return (
        <>
            <div className="h-full w-full items-center  flex flex-col gap-4 p-8 sm:p-24">
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
                <button className="bg-[#A92223] rounded-lg p-4 text-white w-[80%]">Save Password</button>
            </div>
        </>
    )
}