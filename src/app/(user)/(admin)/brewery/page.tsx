'use client'
import Image from "next/image";
import { useState } from "react";
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, useDisclosure } from "@nextui-org/react";
import Link from "next/link";
import { CiEdit } from "react-icons/ci";
import { useMutation, useQuery } from "react-query";
import axiosInstance from "@/app/utils/axiosInstance";
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { ImSpinner2 } from "react-icons/im";
import { toast } from "react-toastify";
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import { useRouter } from "next/navigation";
const position = { lat: 53.54992, lng: 10.00678 };
export default function Dashboard(datas: any) {
    const { isOpen: isOpen2, onOpen: onOpen2, onOpenChange: onOpenChange2 } = useDisclosure();
    const { isOpen: isOpen3, onOpen: onOpen3, onOpenChange: onOpenChange3 } = useDisclosure();
    const [nextRiddle, setNextRiddle] = useState(false)
    // const { isLoaded } = useJsApiLoader({
    //     id: 'google-map-script',
    //     googleMapsApiKey: `${process.env.NEXT_PUBLIC_GOOGLEAPI}`
    // })
    const navigate=useRouter()
    // const [searchQuery, setSearchQuery] = useState('')
    const breweryQuery = useQuery(['breweries', datas.searchParams.id], ({ queryKey }) => {
        return axiosInstance.get(`/riddle/api/brewery?breweryId=${queryKey[1]}`)
    }, {
        onSuccess(data) {
            console.log(data)
        },
        onError(err) {
            console.log(err)
        },
    })
    // const huntQuery = useQuery(['hunts', breweryQuery.data?.data.data.hunt], ({ queryKey }) => {
        //     return axiosInstance.get(`/riddle/api/brewery?breweryId=${queryKey[1]}`)
        // }, {
            //     onSuccess(data) {
    //         console.log(data)
    //     },
    //     onError(err) {
    //         console.log(err)
    //     },
    //     enabled:!!breweryQuery.data?.data
    // })

    const startRiddleMutation = useMutation(() => axiosInstance.post(`/riddle/api/hunt/start?breweryId=${datas.searchParams.id}`), {
        onSuccess(data) {
            console.log('start riddle', data.data)
            navigate.push(`/startRiddle`)
            
        },
        onError(error:any) {
            if (typeof (error.response.data.message) == 'string') {
                toast.error(error.response.data.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                })
            }
            else {
                toast.error(error.response.data.message.join(','), {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                })
            }
        },
    })
    return (
        <>
            <div className="flex flex-col gap-4 px-4 h-full">
                {/* <p className="font-semibold text-xl">Dashboard</p> */}
                {breweryQuery.isFetching && <div className="flex justify-center h-full items-center"><ImSpinner2 className="text-4xl animate-spin" /></div>}
                {!breweryQuery.isFetching && <div className="flex flex-col border-1 rounded-lg gap-4 p-4">
                    <div className="flex justify-between">
                        <div className="flex flex-col ">
                            <p className="text-gray-400 text-sm">Brewery Name</p>
                            <p className="font-semibold">{breweryQuery.data?.data.data.brewery.name}</p>
                        </div>
                    </div>

                    {breweryQuery.data?.data.data.brewery.schedule.map((e: any) =>
                        <div className="flex gap-4 ">
                            
                            <div className="flex flex-col">
                                <p className="text-gray-400 text-sm">Day</p>
                                <p className="font-semibold">{e.day}</p>
                            </div>
                            <div className="flex flex-col">
                                <p className="text-gray-400 text-sm">Operational Hours</p>
                                <p className="font-semibold">{parseInt(e.time.start.split(':')[0]) > 12 ? `${parseInt(e.time.start.split(':')[0]) - 12}:${e.time.start.split(':')[1]}` : `${parseInt(e.time.start.split(':')[0])}:${e.time.start.split(':')[1]}`}{parseInt(e.time.start.split(':')[0]) < 12 ? "AM" : "PM"} ----  {parseInt(e.time.end.split(':')[0]) > 12 ? `${parseInt(e.time.end.split(':')[0]) - 12}:${e.time.end.split(':')[1]}` : `${parseInt(e.time.end.split(':')[0])}:${e.time.end.split(':')[1]}`}{parseInt(e.time.end.split(':')[0]) < 12 ? "AM" : "PM"}</p>
                            </div>
                        </div>
                    )}
                    <div className="flex flex-col gap-4 ">
                        {/* <p className="font-semibold">Hunt Details</p> */}
                        <div className="flex flex-col ">
                            <p className="text-gray-400 text-sm">Hunt Name</p>
                            <p className="font-semibold">{breweryQuery.data?.data.data.hunt ? breweryQuery.data?.data.data.hunt.name:"N/A"}</p>
                        </div>
                        <div className="flex flex-col ">
                            <p className="text-gray-400 text-sm">Hunt Description</p>
                            <p className="font-semibold">{breweryQuery.data?.data.data.hunt ? breweryQuery.data?.data.data.hunt.description : "N/A" }</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 ">
                        <p className="font-semibold">Location</p>
                        <div className="h-[20rem] w-full sm:w-[60%]">
                            {/* <GoogleMap
                                onLoad={map => {
                                    const bounds = new window.google.maps.LatLngBounds({ lat: breweryQuery.data?.data.data.brewery.address.location.coordinates[0], lng: breweryQuery.data?.data.data.brewery.address.location.coordinates[1] });
                                    map.fitBounds(bounds);
                                }}
                                onUnmount={map => {
                                    // do your stuff before map is unmounted
                                }}
                            /> */}
                            
                            <APIProvider apiKey={`${process.env.NEXT_PUBLIC_GOOGLEAPI}`}>
                                <Map defaultCenter={{ lat: breweryQuery.data?.data.data.brewery.address.location.coordinates[0], lng: breweryQuery.data?.data.data.brewery.address.location.coordinates[1] }} defaultZoom={3}>
                                    <Marker position={{ lat: breweryQuery.data?.data.data.brewery.address.location.coordinates[0], lng: breweryQuery.data?.data.data.brewery.address.location.coordinates[1] }} />
                                </Map>
                            </APIProvider>
                            {/* <APIProvider apiKey={`${process.env.NEXT_PUBLIC_GOOGLEAPI}`}>
                                <Map
                                    // style={{ width: '100vw', height: '100vh' }}
                                    defaultCenter={{ lat: breweryQuery.data?.data.data.brewery.address.location.coordinates[0], lng: breweryQuery.data?.data.data.brewery.address.location.coordinates[1] }}
                                    defaultZoom={10}
                                    gestureHandling={'greedy'}
                                    disableDefaultUI={true}
                                />
                            </APIProvider> */}
                            {/* <Image className="h-full w-full" src={'/images/user/dashboard/maps.png'} width={200} height={200} alt="google maps" /> */}
                        </div>
                    </div>
                    <button disabled={!breweryQuery.data?.data.data.hunt} onClick={() => {
                        startRiddleMutation.mutate()
                    }} className="px-32 w-max py-2 bg-[#A92223]  rounded text-white">{startRiddleMutation.isLoading ? <ImSpinner2 className="text-xl animate-spin" /> : "Start Riddle"}</button>
                </div>
                }
                {/* {nextRiddle && <div className="flex flex-col border-1 rounded-lg gap-4 p-4 h-full ">
                    <p className="text-xl font-semibold">Riddle 01</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipiscing elit suscipit commodo enim tellus et nascetur at leo accumsan, odio habitanLorem ipsum dolor sit amet consectetur adipiscing elit suscipit commodo enim tellus et nascetur at leo accumsan, odio habitan Lorem ipsum dolor sit amet consectetur adipiscing elit suscipit commodo enim tellus et nascetur at leo accumsan, odio habitanLorem ipsum dolor sit amet consectetur adipiscing elit suscipit commodo enim tellus et nascetur at leo accumsan, odio habitan Lorem ipsum dolor sit amet consectetur adipiscing</p>
                    <button  onClick={() => { onOpen2() }} className="px-32 sm:w-max w-full py-2 bg-[#FFDADA] text-[#A92223] rounded font-semibold">Hint</button>
                    <p className="mt-auto sm:mx-0 mx-auto text-gray-400 text-sm">*** Please Scan QR Code for Next Riddle***</p>
                </div>} */}
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
                                <p className="text-sm ">Lorem ipsum dolor sit amet consectetur adipiscing elit suscipit commodo enim tellus et nascetur at leo accumsan, odio habitanLorem ipsum dolor sit ame</p>
                                <div className="flex w-full gap-4">
                                    <button className="px-16 w-max py-2 bg-[#A92223]  rounded text-white">Okay</button>
                                </div>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
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
                            <ModalBody className="flex flex-col gap-4 pb-8">
                                <p className="text-sm ">Congratulations You successfully solved the riddle. You got Reward: 30% discount on a drink</p>
                                <div className="flex w-full gap-4">
                                    <button className="px-16 w-max py-2 bg-[#A92223]  rounded text-white">Claim Reward</button>
                                    <button className="px-16 w-max py-2 bg-[#A92223]  rounded text-white">Next Riddle</button>
                                </div>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}