'use client';

import axiosInstance from "@/app/utils/axiosInstance";
import Image from "next/image";
import Link from "next/link";
import {useState} from "react";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Select,
    SelectItem,
    useDisclosure
} from "@nextui-org/react";
import {ImSpinner2} from "react-icons/im";
import {useRouter} from "next/navigation";


export default function Completion(datas: any) {
    const navigate = useRouter();
    console.log(datas);
    const {isOpen: isOpen3, onOpen: onOpen3, onOpenChange: onOpenChange3} = useDisclosure();
    const {isOpen: isOpen2, onOpen: onOpen2, onOpenChange: onOpenChange2} = useDisclosure();

    const scanMutation=useMutation(()=>axiosInstance.post(`/hunt/scan?riddleId=${datas.params.ids[1]}&huntId=${datas.params.ids[0]}`),{
        onError(error, variables, context) {
        },
    })
    const riddleQuery = useQuery(['getRiddle'], () => axiosInstance.get("/hunt/current-riddle"),
        {
            onError(err) {
                console.log('im hereee');
                // navigate.replace('/dashboard')
                
            },
            onSuccess(data) {
            },
            refetchOnWindowFocus:false
            // enabled: !!scanMutation.data?.data
        }
    );

    console.log('errorrrrr',scanMutation.error)

    const huntQuery = useQuery(['individualHunt'], () => axiosInstance.get(`/hunt?huntId=${datas.params.ids[0]}`),
    {
        onSuccess(data) {
            scanMutation.mutate()
        },
        // enabled: riddleIsCompleted
        
        refetchOnWindowFocus:false
    }
);


console.log('fetching',riddleQuery.isFetching)
console.log('scan mutation',scanMutation.data?.data,scanMutation.status)
return (
        <>
            <div className="flex flex-col gap-4 px-4 h-full">
                {riddleQuery.isFetching && (!scanMutation.isSuccess || !scanMutation.isError) && <div className="flex justify-center h-full items-center"><ImSpinner2
                    className="text-4xl animate-spin"/></div>}
                {!riddleQuery.isFetching && (scanMutation.isSuccess || (scanMutation.isError && (scanMutation.error as any).response.data.statusCode!=409)) && <div className="flex items-center flex-col gap-4">
                    <div className="w-1/2 h-[15rem]">
                        <Image className="w-full h-full" src={`/images/user/congratulations.gif`} alt="congrats"
                               width={100} height={100}/>
                    </div>
                    <div className="flex gap-4">
                        {scanMutation.data?.data && (scanMutation.data?.data.data.status as any)!=2 && <Link href={`/startRiddle`}
                            className="px-16 py-2 bg-[#A92223] w-max rounded flex justify-center text-white">Next
                            Riddle</Link>}
                        {(!riddleQuery.isLoading) && <button onClick={() => {
                            // navigate.replace('/rewards');
                            onOpen3();
                        }} className="px-16 py-2 bg-[#A92223] w-max rounded flex justify-center text-white">Claim
                            Reward</button>}
                    </div>

                    {/* {riddleIsCompleted && <button onClick={() => {
                        navigate.replace('/rewards');
                        // onOpen3();
                    }} className="px-16 py-2 bg-[#A92223] w-max rounded flex justify-center text-white">Claim
                        Reward</button>} */}
                </div>}
                {!riddleQuery.isFetching && scanMutation.isError && (scanMutation.error as any).response.data.statusCode==409 && <div className="flex items-center flex-col gap-4">
                    <p className="text-red-500 text-2xl">Riddle Not In Sequence</p>
                    <div className="flex gap-4">
                        <Link href={`/startRiddle`}
                            className="px-16 py-2 bg-[#A92223] w-max rounded flex justify-center text-white">Start Riddle</Link>
                       
                    </div>
                    </div>}
            </div>

            <Modal
                size={"xl"}
                isOpen={isOpen3}
                backdrop="blur"
                onOpenChange={onOpenChange3}
                placement="center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col text-xl gap-1">{riddleQuery.data?.data.data.riddle.hasReward?"Reward":"No Reward For This Riddle"}</ModalHeader>
                            <ModalBody className="pb-4">
                                <div className="flex flex-col gap-4 pb-8">

                                        <>
                                            <div className="flex flex-col gap-2 shadow-lg rounded-lg p-4">
                                                {riddleQuery.data?.data.data.riddle.hasReward &&  <p className="font-semibold" dangerouslySetInnerHTML={{__html:riddleQuery.data?.data.data.riddle.reward}}></p> }
                                                {/* <p className="text-sm ">Congratulations You successfully solved the riddle. You got Reward:</p> */}
                                                {!riddleQuery.data?.data.data.riddle.hasReward && <p className="font-semibold">You're right on track! While there's no treasure here this time, keep exploring. You never know what surprises await after the next riddle.</p>}
                                                {/* <div className="flex w-full gap-4">
                                                <button className="px-16 w-max py-2 bg-[#A92223]  rounded text-white">Claim Reward</button>
                                            </div> */}
                                            </div>
                                        </>

                                </div>
                                {riddleQuery.data?.data.data.riddle.hasReward && <div className="flex flex-col items-center gap-2">
                                    <p className="text-sm font-semibold">Are You Sure You Want To Claim These
                                        Rewards?</p>
                                    <button
                                        type="button"
                                        onClick={() => navigate.replace('/rewards')}
                                        className="px-16 py-2 bg-[#A92223] w-max rounded flex justify-center text-white">Yes
                                    </button>
                                </div>}
                                
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
                // onClose={() => {
                //     navigate.push('/admin/manage-breweries')
                //     // setAddBrewery(!addBrewery)
                // }}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col text-xl gap-1">Rewards Claimed
                                Successfuly</ModalHeader>
                            <ModalBody className="flex flex-col gap-4 pb-8">
                                <p className="text-sm text-gray-400">Your Rewards have been claimed successfully</p>
                                {/* <button className="px-16 w-max py-2 bg-[#A92223]  rounded text-white">Okay</button> */}
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}