'use client'

import axiosInstance from "@/app/utils/axiosInstance"
import { ImSpinner2 } from "react-icons/im"
import { useQuery } from "react-query"
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, useDisclosure } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function StartRiddle(datas:any) {
    // console.log('hunt id start riddle', datas.searchParams.id)
    const navigate=useRouter()
    const { isOpen: isOpen2, onOpen: onOpen2, onOpenChange: onOpenChange2 } = useDisclosure();
    const riddleQuery = useQuery(['getRiddle'], () => axiosInstance.get("/hunt/current-riddle"),
        {
            onError(err) {
                navigate.replace('/dashboard')
            },
        }
    )
    return (
        <>
        
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
                                <p className="text-sm ">{riddleQuery.data?.data.data.riddle.hint }</p>
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