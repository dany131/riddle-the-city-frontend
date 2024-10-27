'use client';

import {ImSpinner2} from "react-icons/im";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    Progress,
    useDisclosure
} from "@nextui-org/react";
import {useMutation, useQuery, useQueryClient} from "react-query";
import axiosInstance from "@/app/utils/axiosInstance";
import {useState, useEffect} from "react";
import {FaTrophy} from "react-icons/fa";
import Image from "next/image";


type ClaimReward = {
    riddleId: string;
    riddleCompletionId: string;
};

export enum RiddleCompletionStatus {
    InProgress = 1,
    Completed,
    Expired
}

export default function Rewards() {
    const {isOpen: isOpen2, onOpen: onOpen2, onClose: onClose2} = useDisclosure();
    const {isOpen: isOpen3, onOpen: onOpen3, onClose: onClose3} = useDisclosure();
    const {isOpen: isOpen4, onOpen: onOpen4, onClose: onClose4} = useDisclosure();
    const [page, setPage] = useState(1);
    const [riddleToClaim, setRiddleToClaim] = useState<any>(null);
    const [awardToClaim, setAwardToClaim] = useState<any>(null);
    const [countdown, setCountdown] = useState(60);
    const queryClient = useQueryClient();

    const rewardsQuery = useQuery(['rewards', page], () =>
        axiosInstance.get(`/hunt/rewards?page=${page}&limit=10`)
    );

    const claimRewardMutation = useMutation(
        (data: ClaimReward) =>
            axiosInstance.post(`/hunt/claim-reward?riddleId=${data.riddleId}&riddleCompletionId=${data.riddleCompletionId}`),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('rewards');
                // onClose2();
            }
        }
    );

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (countdown > 0 && isOpen2) {
            timer = setTimeout(() => setCountdown(countdown - 1), 1000);
        } else if (countdown === 0) {
            // claimRewardMutation.mutate(awardToClaim);
            onClose2();
        }
        return () => clearTimeout(timer);
    }, [countdown, isOpen2]);

    const handlePreviousPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const handleNextPage = () => {
        if (rewardsQuery.data?.data?.data?.length > 0) {
            setPage(page + 1);
        }
    };

    console.log('award to claim', riddleToClaim);
    return (
        <>
            <div className="flex justify-between items-center">
                <p className="text-xl font-semibold">All Rewards</p>
            </div>

            {rewardsQuery.isLoading ? (
                <div className="flex justify-center h-full items-center">
                    <ImSpinner2 className="text-4xl animate-spin"/>
                </div>
            ) : (
                rewardsQuery.data?.data?.data?.length ? (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                            {rewardsQuery.data?.data.data.map((reward: any) => (
                                <Card
                                    key={reward.id}
                                    isPressable
                                    onClick={() => {
                                        setRiddleToClaim(reward);
                                        onOpen3();
                                    }}
                                    className={`shadow-lg transition-all duration-300 ${reward.claimed ? 'opacity-50' : 'opacity-100'}`}
                                >
                                    <CardHeader>
                                        <div className="flex justify-between w-full">
                                            <p className="text-sm font-semibold">{reward.hunt.name}</p>
                                            <FaTrophy className="text-yellow-500"/>
                                        </div>
                                    </CardHeader>
                                    <CardBody>
                                        <p className="text-sm">Brewery: {reward.brewery.name}</p>
                                        <p className="text-sm">Location: {reward.brewery.address.text}</p>
                                        <p className="text-sm">Hunt Status:
                                            <span
                                                className={`text-sm ${
                                                    reward.status === RiddleCompletionStatus.Completed
                                                        ? "text-green-600"
                                                        : reward.status === RiddleCompletionStatus.InProgress
                                                            ? "text-orange-500"
                                                            : "text-red-500"
                                                }`}
                                            >
                                              {reward.status === RiddleCompletionStatus.Completed
                                                  ? " Completed"
                                                  : reward.status === RiddleCompletionStatus.InProgress
                                                      ? " In Progress"
                                                      : " Expired"}
                                            </span>
                                        </p>
                                    </CardBody>
                                    <CardFooter className="flex justify-center">
                                        <p className="text-sm text-orange-500 font-semibold">Rewards
                                            Claimed: {reward.riddle.filter((e: any) => e.claimed)?.length}</p>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>

                        <div className="flex justify-between mt-4 gap-2">
                            <button
                                className="px-4 py-2 sm:px-8 lg:px-16 w-full sm:w-max bg-[#A92223] rounded text-white"
                                hidden={page === 1}
                                onClick={handlePreviousPage}
                            >
                                Previous
                            </button>
                            <button
                                className="px-4 py-2 sm:px-8 lg:px-16 w-full sm:w-max bg-[#A92223] rounded text-white"
                                hidden={rewardsQuery.data?.data?.data?.length < 10}
                                onClick={handleNextPage}
                            >
                                Next
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                        <p className="font-semibold text-red-600">No Rewards found</p>
                    </div>
                )
            )}

            <Modal size="xl" isOpen={isOpen3} backdrop="blur" onClose={onClose3} placement="center">
                <ModalContent>
                    <ModalHeader className="flex flex-col text-xl gap-1">Reward</ModalHeader>
                    <ModalBody className="pb-4">
                        <div className="flex flex-col gap-4 pb-8">
                            {riddleToClaim?.riddle.map((riddle: any) => (
                                <div key={riddle.id}
                                     className={(riddle.claimed) ? "flex flex-col gap-2 shadow-lg rounded-lg p-4  relative" : "flex flex-col gap-2 shadow-lg rounded-lg p-4"}>
                                    <p>Riddle Name: <span className="font-semibold"
                                                          dangerouslySetInnerHTML={{__html: riddle.name}}></span></p>
                                    <p>Riddle Reward: <span className="font-semibold"
                                                            dangerouslySetInnerHTML={{__html: riddle.rewards}}></span>
                                    </p>
                                    {riddle.claimed && (
                                        <Image src={'/images/layout/claimed.png'} alt="claimed"
                                               className="absolute top-0 left-0 w-full h-full object-contain "
                                               width={200} height={200}/>
                                        // <p>Claimed Reward: <span className="font-semibold">Yes</span></p>
                                    )}
                                    {!riddle.claimed && (
                                        <div className="flex w-full justify-center gap-4">
                                            <button
                                                onClick={() => {
                                                    setAwardToClaim({
                                                        riddleCompletionId: riddleToClaim._id,
                                                        riddleId: riddle._id,
                                                        rewards: riddle.rewards
                                                    });
                                                    onOpen4();
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

            <Modal size="xl" isOpen={isOpen2} backdrop="blur" onClose={onClose2} placement="center">
                <ModalContent>
                    <ModalHeader className="flex flex-col items-center gap-1">
                        Claiming Reward in {countdown} seconds
                    </ModalHeader>
                    <ModalBody className="flex flex-col items-center gap-4 pb-8">
                        <p>Reward: <span className="font-semibold"
                                         dangerouslySetInnerHTML={{__html: awardToClaim?.rewards}}></span></p>
                        <Progress
                            value={countdown}
                            maxValue={60}
                            color="danger"
                            size="lg"
                            className="w-full"
                        />
                    </ModalBody>
                </ModalContent>
            </Modal>

            <Modal size="xl" isOpen={isOpen4} backdrop="blur" onClose={onClose4} placement="center">
                <ModalContent>
                    <ModalHeader className="flex flex-col items-center gap-1">
                        Are You Sure You Want To Claim This Reward?
                    </ModalHeader>
                    <ModalBody className="flex flex-col gap-4 pb-8">
                        <p className="text-sm text-red-600">If you click on yes, 1 minute timer will begin to claim the
                            rewards. Make sure you are ready to show your rewards to the bartender</p>
                        <button
                            className="px-16 py-2 bg-[#A92223] w-max m-auto rounded flex justify-center text-white"
                            onClick={() => {
                                claimRewardMutation.mutate(awardToClaim);
                                onOpen2();
                                onClose4();
                            }}
                        >
                            Yes
                        </button>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}