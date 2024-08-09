'use client'
import Image from "next/image"
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, Textarea, useDisclosure } from "@nextui-org/react";
export default function Feedback() {
    const { isOpen: isOpen2, onOpen: onOpen2, onOpenChange: onOpenChange2 } = useDisclosure();
    return (
        <>
            <div className="flex flex-col gap-4 px-4 h-full">
                <p className="font-semibold text-xl">Feedback</p>
                <div className="flex flex-col border-1 rounded-lg gap-8 p-4">
                    <p className="font-semibold">Provide Feedback About Your Hunt Experience</p>
                    <div className="flex flex-col gap-2 ">
                        <p className="font-semibold">Provide Rating</p>
                        <div className="flex gap-2">
                            <div className="w-[3rem] h-[3rem]">
                                <Image className="h-full w-full" src={'/images/user/feedback/star.png'} width={50} height={50} alt="star" />
                            </div>
                            <div className="w-[3rem] h-[3rem]">
                                <Image className="h-full w-full" src={'/images/user/feedback/star.png'} width={50} height={50} alt="star" />
                            </div>
                            <div className="w-[3rem] h-[3rem]">
                                <Image className="h-full w-full" src={'/images/user/feedback/star.png'} width={50} height={50} alt="star" />
                            </div>
                            <div className="w-[3rem] h-[3rem]">
                                <Image className="h-full w-full" src={'/images/user/feedback/star.png'} width={50} height={50} alt="star" />
                            </div>
                            <div className="w-[3rem] h-[3rem]">
                                <Image className="h-full w-full" src={'/images/user/feedback/star.png'} width={50} height={50} alt="star" />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col ">
                        <p className="font-semibold">Provide Descriptive Comment</p>
                        <Textarea
                            // label="Riddle Description"
                            placeholder="Write Comment..."
                            className="sm:w-1/2 w-full"
                            // labelPlacement="outside"
                            size="lg"
                            minRows={10}
                            classNames={{ description: "!h-[15rem]", label: "!font-semibold" }}
                        />
                    </div>
                    {/* <div className="flex flex-col gap-4 ">
                        <p className="font-semibold">Location</p>
                        <div className="h-[20rem] w-[60%]">
                            <Image className="h-full w-full" src={'/images/user/dashboard/maps.png'} width={200} height={200} alt="google maps" />
                        </div>
                    </div> */}
                    <button onClick={() => { onOpen2()}} className="px-32 w-max py-2 bg-[#A92223]  rounded text-white">Submit Feedback</button>
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
                            <ModalHeader className="flex flex-col text-xl gap-1">Feedback Submitted</ModalHeader>
                            <ModalBody className="flex flex-col gap-4 pb-8">
                                <p className="text-sm text-gray-400">Feedback has been submitted successfully.</p>
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