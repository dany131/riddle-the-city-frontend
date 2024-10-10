'use client'

import axiosInstance from "@/app/utils/axiosInstance"
import { ImSpinner2 } from "react-icons/im"
import { useQuery } from "react-query"
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, useDisclosure } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

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
            <div className="flex flex-col gap-4 px-4 h-full">
                {riddleQuery.isFetching && <div className="flex justify-center h-full items-center"><ImSpinner2 className="text-4xl animate-spin" /></div>}
                {!riddleQuery.isFetching && <div className="flex flex-col border-1 rounded-lg gap-4 p-4 h-full ">
                    <p className="text-xl font-semibold">Riddle {riddleQuery.data?.data.data.riddleNumber < 10 ? `0${riddleQuery.data?.data.data.riddleNumber}` : riddleQuery.data?.data.data.riddleNumber}</p>
                    <div className="flex flex-col ">
                        <p className="text-gray-400 text-sm">Riddle Name</p>
                        <p className="font-semibold" dangerouslySetInnerHTML={{__html:riddleQuery.data?.data.data.riddle.title}}></p>
                    </div>
                    <div className="flex flex-col sm:w-1/2 w-full">
                        <p className="text-gray-400 text-sm">Riddle Description</p>
                        <div className="flex flex-col gap-2 min-h-[10rem] bg-[#f4f4f5] rounded-lg gap-4 p-4">
                                {
                                    riddleQuery.data?.data.data.riddle.description.map((k:any,index:number)=>{
                                        if(k.type==1){
                                            return <div className="flex gap-4 justify-between">
                                                <Input disabled value={k.text} />
                                            </div>
                                        }
                                        return <div className="flex gap-4 justify-between items-center">
                                            <Image src={`${process.env.NEXT_PUBLIC_MEDIA_URL}/${k.media}`} alt="riddleImage" width={200} height={200}/>
                                        </div>
                                    })
                                }
                            </div>
                        {/* <p className="font-semibold" dangerouslySetInnerHTML={{__html:riddleQuery.data?.data.data.riddle.description}}></p> */}
                    </div>
                    {/* <p>Lorem ipsum dolor sit amet consectetur adipiscing elit suscipit commodo enim tellus et nascetur at leo accumsan, odio habitanLorem ipsum dolor sit amet consectetur adipiscing elit suscipit commodo enim tellus et nascetur at leo accumsan, odio habitan Lorem ipsum dolor sit amet consectetur adipiscing elit suscipit commodo enim tellus et nascetur at leo accumsan, odio habitanLorem ipsum dolor sit amet consectetur adipiscing elit suscipit commodo enim tellus et nascetur at leo accumsan, odio habitan Lorem ipsum dolor sit amet consectetur adipiscing</p> */}
                    <button
                        onClick={() => { onOpen2() }}
                        className="px-32 sm:w-max w-full py-2 bg-[#FFDADA] text-[#A92223] rounded font-semibold">Hint</button>
                    <p className="mt-auto sm:mx-0 mx-auto text-gray-400 text-sm">*** Please Scan QR Code for Next Riddle***</p>
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