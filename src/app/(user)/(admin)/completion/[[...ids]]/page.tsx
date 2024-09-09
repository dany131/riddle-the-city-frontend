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
    const queryClient = useQueryClient();
    const [riddleIsCompleted, setRiddleIsCompleted] = useState(false);
    const {isOpen: isOpen3, onOpen: onOpen3, onOpenChange: onOpenChange3} = useDisclosure();
    const {isOpen: isOpen2, onOpen: onOpen2, onOpenChange: onOpenChange2} = useDisclosure();
    const riddleQuery = useQuery(['getRiddle'], () => axiosInstance.get("/riddle/api/hunt/current-riddle"),
        {
            onError(err) {
                console.log('im hereee');
                // navigate.replace('/dashboard')
                setRiddleIsCompleted(true);
            },
            // enabled: !!scanMutation.data?.data
        }
    );

    const scanMutation = useQuery(['scan'], () => axiosInstance.post(`/riddle/api/hunt/scan?riddleId=${datas.params.ids[1]}&huntId=${datas.params.ids[0]}`), {
        onSuccess(data) {
            queryClient.invalidateQueries('getRiddle');
        },
        enabled:!!riddleQuery.data?.data
    });
    const huntQuery = useQuery(['individualHunt'], () => axiosInstance.get(`/riddle/api/hunt?huntId=${datas.params.ids[0]}`),
        {
            enabled: riddleIsCompleted
        }
    );
    return (
        <>
            <div className="flex flex-col gap-4 px-4 h-full">
                {riddleQuery.isFetching && <div className="flex justify-center h-full items-center"><ImSpinner2
                    className="text-4xl animate-spin"/></div>}
                {!riddleQuery.isFetching && <div className="flex items-center flex-col gap-4">
                    <div className="w-1/2 h-[15rem]">
                        <Image className="w-full h-full" src={`/images/user/congratulations.gif`} alt="congrats"
                               width={100} height={100}/>
                    </div>
                    <div className="flex gap-4">
                        {!riddleIsCompleted && <Link href={`/startRiddle`}
                            className="px-16 py-2 bg-[#A92223] w-max rounded flex justify-center text-white">Next
                            Riddle</Link>}
                        {(!riddleIsCompleted || riddleIsCompleted) && <button onClick={() => {
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
                {/* <p>Scan Start</p> */}

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
                            <ModalHeader className="flex flex-col text-xl gap-1">Reward</ModalHeader>
                            <ModalBody className="pb-4">
                                <div className="flex flex-col gap-4 pb-8">

                                        <>
                                            <div className="flex flex-col gap-2 shadow-lg rounded-lg p-4">
                                                {/* <p className="text-sm ">Congratulations You successfully solved the riddle. You got Reward:</p> */}
                                                <p className="font-semibold">{riddleQuery.data?.data.data.riddle.reward}</p>
                                                {/* <div className="flex w-full gap-4">
                                                <button className="px-16 w-max py-2 bg-[#A92223]  rounded text-white">Claim Reward</button>
                                            </div> */}
                                            </div>
                                        </>

                                </div>
                                <div className="flex flex-col items-center gap-2">
                                    <p className="text-sm font-semibold">Are You Sure You Want To Claim These
                                        Rewards?</p>
                                    <button
                                        type="button"
                                        onClick={() => navigate.replace('/rewards')}
                                        className="px-16 py-2 bg-[#A92223] w-max rounded flex justify-center text-white">Yes
                                    </button>
                                </div>
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