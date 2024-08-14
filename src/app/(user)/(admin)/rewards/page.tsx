'use client'

import { ImSpinner2 } from "react-icons/im"
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, useDisclosure } from "@nextui-org/react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axiosInstance from "@/app/utils/axiosInstance";
import { useState } from "react";
type ClaimReward = {
    riddleId: string,
    huntId:string
}
export default function Rewards() {
    const { isOpen: isOpen2, onOpen: onOpen2, onOpenChange: onOpenChange2, onClose: onClose2 } = useDisclosure();
    const { isOpen: isOpen3, onOpen: onOpen3, onOpenChange: onOpenChange3,onClose:onClose3 } = useDisclosure();
    const [page, setPage] = useState(1)
    const [riddleToClaim, setRiddleToClaim] = useState<any>()
    const [awardToClaim,setAwardToClaim]=useState<any>()
    const queryClient=useQueryClient()
    const rewardsQuery = useQuery(['rewards', page], ({ queryKey }) => axiosInstance.get(`/riddle/api/hunt/rewards?page=${queryKey[1]}&limit=10`))
    const claimRewardMutation = useMutation((data: ClaimReward) => axiosInstance.post(`/riddle/api/hunt/claim-rewards?riddleId=${data.riddleId}&huntId=${data.huntId}`), {
        onSuccess(data) {
            queryClient.invalidateQueries('rewards')
            onClose2()
        },
    })
    return (
        <>
            <div className="flex justify-between items-center">
                <p className="text-xl font-semibold">Rewards</p>
                {/* <Link href={'/admin/manage-breweries/create'} className="sm:px-16 px-4 py-2 bg-[#A92223] rounded text-white">Add Brewery</Link> */}
            </div>
            {false && <div className="flex justify-center h-full items-center"><ImSpinner2 className="text-4xl animate-spin" /></div>}
            {/* {breweryQuery.data?.data.data.length == 0 && !breweryQuery.isFetching  && <p className="text-center">No Data Exists</p>} */}
            {!false && <>
                <table className="p-4 w-full block sm:table  overflow-auto mt-4">
                    <thead><tr  className="bg-gray-200">
                        <th className="p-2 rounded-l-md text-left text-sm">S.No</th>
                        <th className="p-2 text-sm text-left">Brewery Name</th>
                        <th className="p-2 text-sm text-left">Location</th>
                        <th className="p-2 text-sm text-left rounded-r-md">Hunt Name</th>
                        {/* <th className="p-2 text-sm text-left rounded-r-md">Action</th> */}
                    </tr>    </thead>
                    <tbody>
                        {rewardsQuery.data?.data.data.map((e: any, index: number) =><>
                            <tr key={index + 1} onClick={() => {
                                setRiddleToClaim(e)
                            onOpen3()
                        }} className="border-b-2 border-solid cursor-pointer hover:bg-gray-100 border-gray-200" >
                                <td className="p-2 text-sm">{index + 1 < 10 ? `0${index + 1}` : `${index + 1}`}</td>
                                <td className="p-2 text-sm">{e.brewery.name}</td>
                                <td className="p-2 text-sm">{e.brewery.address.text}</td>
                                <td className="p-2 text-sm">{e.hunt.name}</td>
                        
                        </tr>
                        </>) 
                        // <tr className="border-b-2 border-solid border-gray-200" key={index + 1} >
                        //     <td className="p-2 text-sm">{index + 1 < 10 ? `0${index + 1}` : `${index + 1}`}</td>
                        //     <td className="p-2 text-sm">{e.name}</td>
                        //     <td className="p-2 text-sm">{e.description}</td>
                        //     <td className="p-2 text-sm">{new Date(e.createdAt).toLocaleDateString()}</td>
                        //     <td className="p-2 text-sm">
                        //         <div className="flex gap-2">
                        //             {/* {downloadPdf.data?.data && 
                        //                     <a className="underline text-red-600" href={`${downloadPdf.data?.data}`}>Download PDF</a>
                        //                 } */}

                        //             {/* <button onClick={() => {
                        //                     downloadPdf.mutate(e._id)
                        //                 }} className="underline text-red-600">Download PDF</button> */}
                        //             <GrView onClick={() => {
                        //                 downloadPdf.mutate(e._id)
                        //                 // setRiddleToView(e)
                        //                 // onOpen3()
                        //             }} className="cursor-pointer border-[0.15rem] text-4xl text-red-600 rounded-lg p-2 border-red-600" />
                        //             <Link href={`/admin/manage-hunts/edit?id=${e._id}`}>
                        //                 <CiEdit
                        //                     // onClick={() => {
                        //                     // setEditRiddle(!editRiddle)
                        //                     // setRiddleToEdit(e)
                        //                     // }}
                        //                     className="cursor-pointer border-[0.15rem] text-4xl text-red-600 rounded-lg p-2 border-red-600" />
                        //             </Link>

                        //             <AiOutlineDelete onClick={() => {
                        //                 setHuntId(e._id)
                        //                 onOpen2()
                        //             }} className="cursor-pointer bg-[#f5d0e1] text-4xl text-red-600 rounded-lg p-2 " />
                        //         </div>
                        //     </td>
                        // </tr>)
                        }
                    </tbody>
                </table>
                <div className="flex flex-wrap gap-4">
                    {!!rewardsQuery.data?.data.lastPage && rewardsQuery.data?.data.lastPage != page && <button className="px-16 py-2 bg-[#A92223] flex justify-center rounded text-white w-max " type="button" onClick={() => {
                        setPage((prev) => prev + 1)
                    }}>Next Page</button>}

                    {
                        page != 1 && <button className="px-16 py-2 bg-[#A92223] flex justify-center rounded text-white w-max " type="button" onClick={() => {
                            setPage((prev) => prev - 1)
                        }}>Previous Page</button>
                    }
                </div>

                {/* {<div className="flex flex-wrap gap-4">
                    {breweryQuery.data?.data.lastPage != page && <button className="px-16 py-2 bg-[#A92223] sm:w-max w-full rounded text-white m-auto" type="button" onClick={() => {
                        setPage((prev) => prev + 1)
                    }}>Next Page</button>}

                    {
                        page != 1 && <button className="px-16 py-2 bg-[#A92223] sm:w-max w-full rounded text-white m-auto" type="button" onClick={() => {
                            setPage((prev) => prev - 1)
                        }}>Previous Page</button>
                    }
                </div>} */}
            </>}

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
                                    {riddleToClaim.riddle.map((e: any) =>
                                        <>
                                            <div className="flex flex-col gap-2 shadow-lg rounded-lg p-4">
                                                <div className="flex flex-col gap-1">
                                                    <div className="flex flex-col gap-2">
                                                        <p >Riddle Name: <span className="font-semibold">{e.name}</span></p>
                                                        {/* <p>{e.name}</p> */}
                                                    </div>
                                                    <div className="flex flex-col gap-2">
                                                        <p >Riddle Reward: <span className="font-semibold">{e.rewards}</span></p>
                                                        {/* <p>{e.rewards}</p> */}
                                                    </div>
                                                    {e.claimed && <div className="flex flex-col gap-2">
                                                        <p >Claimed Reward: <span className="font-semibold">{e.claimed?'Yes':"No"}</span></p>
                                                        {/* <p>{e.rewards}</p> */}
                                                    </div>}
                                                {/* <p className="font-semibold">{e.name}</p>
                                                <p className="font-semibold">{e.rewards}</p> */}
                                                </div>
                                                {/* <p className="text-sm ">Congratulations You successfully solved the riddle. You got Reward:</p> */}
                                                <div className="flex w-full justify-center gap-4">
                                                    {e.claimed != true && <button
                                                        onClick={() => {
                                                            setAwardToClaim(
                                                                {
                                                                    huntId: riddleToClaim.hunt._id,
                                                                    riddleId: e._id
                                                                }
                                                            )
                                                            onOpen2()
                                                            onClose3()
                                                        }}
                                                        className="px-1 w-max py-1 bg-[#A92223] text-xs rounded text-white">Claim Reward</button>}
                                            </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                                {/* <div className="flex flex-col items-center gap-2">
                                    <p className="text-sm font-semibold">Are You Sure You Want To Claim These Rewards?</p>
                                    <button type="button" className="px-16 py-2 bg-[#A92223] w-max rounded flex justify-center text-white">Yes</button>
                                </div> */}
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
                            <ModalHeader className="flex flex-col items-center gap-1">Are You Sure You Want To Claim This Reward?</ModalHeader>
                            <ModalBody className="flex flex-col gap-4 pb-8">
                                <button className="px-16 py-2 bg-[#A92223] w-max m-auto rounded flex justify-center text-white" onClick={() => {
                                    claimRewardMutation.mutate(awardToClaim)
                                }}>{claimRewardMutation.isLoading ? <ImSpinner2 className="text-xl animate-spin" /> : "Yes"}</button>
                                {/* <p className="text-sm text-gray-400">Your Rewards have been claimed successfully</p> */}
                                {/* <button className="px-16 w-max py-2 bg-[#A92223]  rounded text-white">Okay</button> */}
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}