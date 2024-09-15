'use client'
import Image from "next/image"
import StarRatings from 'react-star-ratings';
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, Textarea, useDisclosure } from "@nextui-org/react";
import { FormEvent, useRef, useState } from "react";
import { useMutation } from "react-query";
import axiosInstance from "@/app/utils/axiosInstance";
import { ImSpinner2 } from "react-icons/im";
type FeedbackData = {
    "rating": number,
    "description": string
}
export default function Feedback() {
    const [rating, setRating] = useState(0)
    const formRef:any=useRef()
    const { isOpen: isOpen2, onOpen: onOpen2, onOpenChange: onOpenChange2,onClose:onClose2 } = useDisclosure();
    const feedbackMutation = useMutation((data: FeedbackData) => axiosInstance.post('/riddle/api/platform/feedback', data), {
        onSuccess(data, variables, context) {
            console.log(data)
            onOpen2()
            const form = formRef.current as HTMLFormElement
            form.reset()
            setRating(0)

        },
    })
    function handleSubmit(e:FormEvent) {
        e.preventDefault()
        const form = e.target as any as HTMLFormElement
        const formData = new FormData(form)
        const data:FeedbackData = {
            description: formData.get('description') as any as string,
            rating
        }
        feedbackMutation.mutate(data)

    }
    return (
        <>
            <div className="flex flex-col gap-4 px-4 h-full">
                <p className="font-semibold text-xl">Feedback</p>
                <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col border-1 rounded-lg gap-8 p-4">
                    <p className="font-semibold">Provide Feedback About Your Hunt Experience</p>
                    <div className="flex flex-col gap-2 ">
                        <p className="font-semibold">Provide Rating</p>
                        <div className="flex gap-2">
                            <StarRatings
                                rating={rating}
                                starRatedColor="orange"
                                numberOfStars={5}
                                name='rating'
                                changeRating={(r: number) => {
                                    setRating(r)
                                    console.log('rating',r)
                                }}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col ">
                        <p className="font-semibold">Share What You Loved About The Hunts</p>
                        <Textarea
                            name="description"
                            // label="Riddle Description"
                            required
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

                    <button
                        type="submit"
                        // onClick={() => { onOpen2() }}
                        className="px-16 py-2 bg-[#A92223] flex justify-center rounded text-white w-max ">{feedbackMutation.isLoading ? <ImSpinner2 className="text-xl animate-spin" /> : "Submit Feedback"}</button>
                </form>
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
                                    <button onClick={() => {
                                        onClose2()
                                    }} className="px-16 w-max py-2 bg-[#A92223]  rounded text-white">Okay</button>
                                </div>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}