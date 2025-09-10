'use client';
import Image from "next/image";
import {useState} from "react";
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
import Link from "next/link";
import {CiEdit} from "react-icons/ci";
import {useMutation, useQuery} from "react-query";
import axiosInstance from "@/app/utils/axiosInstance";
import {ImSpinner2} from "react-icons/im";
import {toast} from "react-toastify";
import {APIProvider, Map, Marker} from '@vis.gl/react-google-maps';
import {useRouter} from "next/navigation";
import {IoLocationSharp} from "react-icons/io5";


const BreweryDetails = ({brewery}: { brewery: any }) => (
    <div className="flex flex-col">
        <p className="text-gray-400 text-sm">Location Name</p>
        <p className="font-semibold">{brewery.name}</p>
    </div>
);

const ScheduleDetails = ({schedule}: { schedule: any[] }) => (
    <>
        {schedule.map((e) => (
            <div key={e.day} className="flex flex-col gap-2">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex flex-col">
                        <p className="text-gray-400 text-sm">Day</p>
                        <p className="font-semibold">{e.day}</p>
                    </div>
                    <div className="flex flex-col">
                        <p className="text-gray-400 text-sm">Operational Hours</p>
                        <p className="font-semibold">
                            {`${parseInt(e.time.start.split(':')[0]) % 12 || 12}:${e.time.start.split(':')[1]}${parseInt(e.time.start.split(':')[0]) < 12 ? "AM" : "PM"} - 
              ${parseInt(e.time.end.split(':')[0]) % 12 || 12}:${e.time.end.split(':')[1]}${parseInt(e.time.end.split(':')[0]) < 12 ? "AM" : "PM"}`}
                        </p>
                    </div>
                </div>
            </div>
        ))}
    </>
);

const HuntDetails = ({hunts,setHuntId,huntId}: { hunts: any,setHuntId:any,huntId:string|null }) => (
    <div className="flex flex-col gap-4">
        <Select
      isRequired
      label="Select Hunt"
      placeholder="Select a Hunt"
      defaultSelectedKeys={["cat"]}
      className="max-w-xs"
      labelPlacement="outside"
      selectedKeys={huntId?[huntId]:[]}
      onSelectionChange={(e)=>{
        // console.log('select',e)
        setHuntId(Object.values(e)[0])
      }}
      classNames={{label:"!font-semibold"}}
    >
      {hunts.map((animal:any) => (
        <SelectItem key={animal._id}>
          {animal.name}
        </SelectItem>
      ))}
    </Select>

        {/* <div className="flex flex-col">
            <p className="text-gray-400 text-sm">Hunt Name</p>
            <p className="font-semibold">{hunt?.name || "N/A"}</p>
        </div> */}
        {huntId && <div className="flex flex-col">
            <p className="text-gray-400 text-sm">Hunt Description</p>
            <p className="font-semibold">{hunts.find((e:any)=>e._id==huntId).description || "N/A"}</p>
        </div>}
    </div>
);

const LocationMap = ({coordinates}: { coordinates: [number, number] }) => (
    <div className="h-[20rem] w-full sm:w-[60%]">
        <APIProvider apiKey={`${process.env.NEXT_PUBLIC_GOOGLEAPI}`}>
            <Map
                defaultCenter={{lat: coordinates[1], lng: coordinates[0]}}
                defaultZoom={13}
                disableDefaultUI={true}
                mapId={"roadmap"}
            >
                <Marker position={{lat: coordinates[1], lng: coordinates[0]}}/>
            </Map>
        </APIProvider>
    </div>
);

const StartRiddleButton = ({isHuntAvailable, startRiddleMutation,huntId}: {
    isHuntAvailable: boolean,
    startRiddleMutation: any,
    huntId:string|null
}) => (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
        <button
            disabled={!isHuntAvailable || !huntId}
            onClick={() => startRiddleMutation.mutate(huntId)}
            className={`px-8 sm:px-32 w-full sm:w-max py-2 rounded text-white ${isHuntAvailable ? 'bg-[#A92223]' : 'bg-gray-400 cursor-not-allowed'}`}
        >
            {startRiddleMutation.isLoading ? <ImSpinner2 className="text-xl animate-spin"/> : "Start Riddle"}
        </button>
        {!huntId &&  <p className="text-red-500">Select A Hunt To Start Riddle</p>}
        {!isHuntAvailable && (
            <p className="text-red-500">No hunt active for this brewery</p>
        )}
    </div>
);

const Dashboard = (datas: any) => {
    const [huntId,setHuntId]=useState(null)
    const {isOpen: isOpenHint, onOpen: onOpenHint, onOpenChange: onOpenChangeHint} = useDisclosure();
    const {isOpen: isOpenReward, onOpen: onOpenReward, onOpenChange: onOpenChangeReward} = useDisclosure();
    const navigate = useRouter();
    let googleMapUrl: string = "https://www.google.com/maps/place";

    const breweryQuery = useQuery(['breweries', datas.searchParams.id], ({queryKey}) => {
        return axiosInstance.get(`/brewery?breweryId=${queryKey[1]}`);
    });

    console.log('huntid',huntId)
    const startRiddleMutation = useMutation((data:string) => axiosInstance.post(`/hunt/start?breweryId=${datas.searchParams.id}&huntId=${data}`), {
        onSuccess(data) {
            navigate.push(`/startRiddle`);
        },
        onError(error: any) {
            const errorMessage = Array.isArray(error.response.data.message)
                ? error.response.data.message.join(',')
                : error.response.data.message;

            toast.error(errorMessage, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light"
            });
        }
    });

    const isHuntAvailable = breweryQuery.data?.data.data.hunts.length;

    const encodedAddress = encodeURIComponent(breweryQuery.data?.data.data.brewery.address.text || "");
    googleMapUrl = `${googleMapUrl}/${encodedAddress}`;

    if (breweryQuery.isFetching) {
        return (
            <div className="flex justify-center h-full items-center">
                <ImSpinner2 className="text-4xl animate-spin"/>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4 px-4 h-full">
            <div className="flex flex-col border-1 rounded-lg gap-4 p-4">
                <div className="flex justify-between">
                    <BreweryDetails brewery={breweryQuery.data?.data.data.brewery}/>
                </div>
                <ScheduleDetails schedule={breweryQuery.data?.data.data.brewery.schedule}/>
                {/* <HuntDetails huntId={huntId} hunts={breweryQuery.data?.data.data.hunts} setHuntId={setHuntId}/> */}
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col gap-4">
                    <p className="text-gray-400 text-sm">Location</p>
                    <a
                        href={googleMapUrl}
                        target="_blank"
                        rel="noreferrer"
                        className=" text-crystal-blue-dark underline flex items-center">
                        <IoLocationSharp className="text-crystal-blue-dark"/>
                        <span>{` ${breweryQuery.data?.data.data.brewery.address.text}`}</span>
                    </a>
                    <LocationMap coordinates={breweryQuery.data?.data.data.brewery.address.location.coordinates}/>
                    </div>
                <HuntDetails huntId={huntId} hunts={breweryQuery.data?.data.data.hunts} setHuntId={setHuntId}/>
                <StartRiddleButton huntId={huntId} isHuntAvailable={isHuntAvailable} startRiddleMutation={startRiddleMutation}/>
                </div>
            </div>

            <Modal
                size={"xl"}
                isOpen={isOpenHint}
                backdrop="blur"
                onOpenChange={onOpenChangeHint}
                placement="center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col text-xl gap-1">Hint</ModalHeader>
                            <ModalBody className="flex flex-col gap-4 pb-8">
                                <p className="text-sm">Lorem ipsum dolor sit amet consectetur adipiscing elit suscipit
                                    commodo enim tellus et nascetur at leo accumsan, odio habitanLorem ipsum dolor sit
                                    ame</p>
                                <div className="flex w-full gap-4">
                                    <button className="px-16 w-max py-2 bg-[#A92223] rounded text-white">Okay</button>
                                </div>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>

            <Modal
                size={"xl"}
                isOpen={isOpenReward}
                backdrop="blur"
                onOpenChange={onOpenChangeReward}
                placement="center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col text-xl gap-1">Reward</ModalHeader>
                            <ModalBody className="flex flex-col gap-4 pb-8">
                                <p className="text-sm">Congratulations! You successfully solved the riddle. You got a
                                    reward: 30% discount on a drink</p>
                                <div className="flex w-full gap-4">
                                    <button className="px-16 w-max py-2 bg-[#A92223] rounded text-white">Claim Reward
                                    </button>
                                    <button className="px-16 w-max py-2 bg-[#A92223] rounded text-white">Next Riddle
                                    </button>
                                </div>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
};

export default Dashboard;