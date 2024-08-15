'use client';

import { ImSpinner2 } from "react-icons/im";
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
import { useMutation, useQuery, useQueryClient } from "react-query";
import axiosInstance from "@/app/utils/axiosInstance";
import { useState } from "react";

type ClaimReward = {
    riddleId: string;
    riddleCompletionId: string;
};

export default function Rewards() {
    const { isOpen: isOpen2, onOpen: onOpen2, onOpenChange: onOpenChange2, onClose: onClose2 } = useDisclosure();
    const { isOpen: isOpen3, onOpen: onOpen3, onOpenChange: onOpenChange3, onClose: onClose3 } = useDisclosure();
    const [page, setPage] = useState(1);
    const [riddleToClaim, setRiddleToClaim] = useState<any>(null);
    const [awardToClaim, setAwardToClaim] = useState<any>(null);
    const queryClient = useQueryClient();

    const rewardsQuery = useQuery(['rewards', page], () =>
        axiosInstance.get(`/riddle/api/hunt/rewards?page=${page}&limit=10`)
    );

    const claimRewardMutation = useMutation(
        (data: ClaimReward) =>
            axiosInstance.post(`/riddle/api/hunt/claim-reward?riddleId=${data.riddleId}&riddleCompletionId=${data.riddleCompletionId}`),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('rewards');
                onClose2();
            }
        }
    );

    return (
        <>
            <div className="flex justify-between items-center">
                <p className="text-xl font-semibold">Rewards</p>
            </div>

            {rewardsQuery.isLoading ? (
                <div className="flex justify-center h-full items-center">
                    <ImSpinner2 className="text-4xl animate-spin" />
                </div>
            ) : (
                <>
                    <table className="p-4 w-full block sm:table overflow-auto mt-4">
                        <thead>
                        <tr className="bg-gray-200">
                            <th className="p-2 rounded-l-md text-left text-sm">S.No</th>
                            <th className="p-2 text-sm text-left">Brewery Name</th>
                            <th className="p-2 text-sm text-left">Location</th>
                            <th className="p-2 text-sm text-left rounded-r-md">Hunt Name</th>
                        </tr>
                        </thead>
                        <tbody>
                        {rewardsQuery.data?.data.data.map((reward: any, index: number) => (
                            <tr
                                key={reward.id}
                                onClick={() => {
                                    setRiddleToClaim(reward);
                                    onOpen3();
                                }}
                                className="border-b-2 border-solid cursor-pointer hover:bg-gray-100 border-gray-200"
                            >
                                <td className="p-2 text-sm">{index + 1 < 10 ? `0${index + 1}` : `${index + 1}`}</td>
                                <td className="p-2 text-sm">{reward.brewery.name}</td>
                                <td className="p-2 text-sm">{reward.brewery.address.text}</td>
                                <td className="p-2 text-sm">{reward.hunt.name}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                    <div className="flex flex-wrap gap-4">
                        {page > 1 && (
                            <button
                                className="px-16 py-2 bg-[#A92223] flex justify-center rounded text-white w-max"
                                type="button"
                                onClick={() => setPage(page - 1)}
                            >
                                Previous Page
                            </button>
                        )}
                        {rewardsQuery.data?.data.lastPage !== page && (
                            <button
                                className="px-16 py-2 bg-[#A92223] flex justify-center rounded text-white w-max"
                                type="button"
                                onClick={() => setPage(page + 1)}
                            >
                                Next Page
                            </button>
                        )}
                    </div>
                </>
            )}

            <Modal size="xl" isOpen={isOpen3} backdrop="blur" onOpenChange={onOpenChange3} placement="center">
                <ModalContent>
                    <ModalHeader className="flex flex-col text-xl gap-1">Reward</ModalHeader>
                    <ModalBody className="pb-4">
                        <div className="flex flex-col gap-4 pb-8">
                            {riddleToClaim?.riddle.map((riddle: any) => (
                                <div key={riddle.id} className="flex flex-col gap-2 shadow-lg rounded-lg p-4">
                                    <div className="flex flex-col gap-1">
                                        <div className="flex flex-col gap-2">
                                            <p>
                                                Riddle Name: <span className="font-semibold">{riddle.name}</span>
                                            </p>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <p>
                                                Riddle Reward: <span className="font-semibold">{riddle.rewards}</span>
                                            </p>
                                        </div>
                                        {riddle.claimed && (
                                            <div className="flex flex-col gap-2">
                                                <p>
                                                    Claimed Reward: <span className="font-semibold">{riddle.claimed ? 'Yes' : 'No'}</span>
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                    {!riddle.claimed && (
                                        <div className="flex w-full justify-center gap-4">
                                            <button
                                                onClick={() => {
                                                    setAwardToClaim({
                                                        riddleCompletionId: riddleToClaim._id,
                                                        riddleId: riddle._id
                                                    });
                                                    onOpen2();
                                                    onClose3();
                                                }}
                                                className="px-1 w-max py-1 bg-[#A92223] text-xs rounded text-white"
                                            >
                                                Claim Reward
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </ModalBody>
                </ModalContent>
            </Modal>

            <Modal size="xl" isOpen={isOpen2} backdrop="blur" onOpenChange={onOpenChange2} placement="center">
                <ModalContent>
                    <ModalHeader className="flex flex-col items-center gap-1">
                        Are You Sure You Want To Claim This Reward?
                    </ModalHeader>
                    <ModalBody className="flex flex-col gap-4 pb-8">
                        <button
                            className="px-16 py-2 bg-[#A92223] w-max m-auto rounded flex justify-center text-white"
                            onClick={() => claimRewardMutation.mutate(awardToClaim)}
                        >
                            {claimRewardMutation.isLoading ? <ImSpinner2 className="text-xl animate-spin" /> : "Yes"}
                        </button>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}