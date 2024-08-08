'use client';
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import { Autocomplete, AutocompleteItem, Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, useDisclosure } from "@nextui-org/react";
import { FormEvent, useState } from "react";
import { SiGooglemaps } from "react-icons/si";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axiosInstance from "@/app/utils/axiosInstance";
import Cookies from "js-cookie";
import { TimeInput } from "@nextui-org/date-input";
import axios from "axios";
import { useRouter } from "next/navigation";
const selections = [
    { label: 'Open', key: 1 },
    { label: 'Closed', key: 2 }
]

const data = [
    { key: 1 },
    { key: 1 },
    { key: 1 },
    { key: 1 },
    { key: 1 },
    { key: 1 },
    { key: 1 }
]

type Status = '1' | '2'

const users = [
    {
        id: 0, name: 'Sunday'
    },
    {
        id: 1, name: 'Monday'
    },
    {
        id: 2, name: 'Tuesday'
    },
    {
        id: 3, name: 'Wednesday'
    },
    {
        id: 4, name: 'Thursday'
    },
    {
        id: 5, name: 'Friday'
    },
    {
        id: 6, name: 'Saturday' 
        
    }
]


const initialBrewery = {
    "name": "",
    "address": {
        "latitude": 0,
        "longitude": 0,
        "text": ""
    },
    "schedule": [
        {
            "day": "Monday",
            "time": {
                "start": "09:30",
                "end": "10:30"
            },
            "status": 1
        }
    ]
}
export default function ManageBreweries() {
    const { isOpen: isOpen1, onOpen: onOpen1, onOpenChange: onOpenChange1 } = useDisclosure();
    const { isOpen: isOpen2, onOpen: onOpen2, onOpenChange: onOpenChange2 } = useDisclosure();
    const { isOpen: isOpen3, onOpen: onOpen3, onOpenChange: onOpenChange3 } = useDisclosure();
    const [breweryToAdd, setBreweryToAdd] = useState<any>()
    const [breweryLocationToAdd, setBreweryLocationToAdd] = useState<any>()
    const [breweryToAddDay, setBreweryToAddDay] = useState<string>()
    const [breweryToAddStartTime, setBreweryToAddStartTime] = useState<any>()
    const [breweryToAddEndTime, setBreweryToAddEndTime] = useState<any>()
    const [breweryToAddStatus, setBreweryToAddStatus] = useState<any>()
    const [message,setMessage]=useState('')
    const [location,setLocation]=useState('')
    const[status,setStatus]=useState<Status>()
    const [addBrewery, setAddBrewery] = useState(false)
    const [page, setPage] = useState(1)
    const [googleData, setGoogleData] = useState<any>()
    const [breweryName, setBreweryName] = useState('')
    const queryClient=useQueryClient()
    // {
        // "name": "string",
        //     "address": {
        //     "latitude": 91,
        //         "longitude": 120,
        //             "text": "string"
        // },
        // "schedule": [
        //     {
        //         "day": "Monday",
        //         "time": {
        //             "start": "09:30",
        //             "end": "10:30"
        //         },
        //         "status": 1
        //     }
        // ]
    // }
    const googleMapsQuery = useQuery(['googlemapsGeocode', location], ({queryKey}) => axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${queryKey[1]}&components=country:de&key=${process.env.NEXT_PUBLIC_GOOGLEAPI}`), {
        onSuccess(data) {
            const datas=data.data.results.map((e: any) => {
                return { label: e.formatted_address, geometry: e.geometry }
            })
            setGoogleData(datas)
        },
        enabled:!!location
    })
    const breweryQuery = useQuery(['breweries', page], ({ queryKey }) => {
        return axiosInstance.get(`/riddle/api/brewery/all?page=${queryKey[1]}&limit=20`)
    }, {
        onSuccess(data) {
            console.log(data)
        },
        onError(err) {
            console.log(err)
        },
    })

    const addBreweryMutation = useMutation((data:any) => axiosInstance.post('/riddle/api/brewery', data), {
        onSuccess(data) {
            console.log(data)
            queryClient.invalidateQueries('breweries')
            onOpen3() 
        },
    })

    function handleSubmit(e:FormEvent) {
        e.preventDefault()
        if (breweryToAdd && breweryLocationToAdd && breweryToAddDay && breweryToAddEndTime && breweryToAddStartTime && breweryToAddStatus) {
            const breweryData = {
                "name": breweryToAdd,
                "address": breweryLocationToAdd,
                "schedule": [
                    {
                        "day": breweryToAddDay,
                        "time": {
                            "start": breweryToAddStartTime,
                            "end": breweryToAddEndTime
                        },
                        "status": breweryToAddStatus
                    }
                ]
            }
            console.log(breweryData)
            setMessage('')
            addBreweryMutation.mutate(breweryData)
        }
        else {
            setMessage('All Fields Must Be Filled')
        }
    }
    console.log('google',googleData)
    return (
        <>
            {!addBrewery &&
                <>
                <div className="flex justify-between">
                    <p className="text-xl font-semibold">Manage Breweries</p>
                    <button onClick={()=>{setAddBrewery(!addBrewery)}} className="px-16 py-2 bg-[#A92223] rounded text-white">Add Brewery</button>
                </div>
                {breweryQuery.isFetching && <p className="text-center">Fetching Data</p>}
                {breweryQuery.data?.data.data.length == 0 && !breweryQuery.isFetching  && <p className="text-center">No Data Exists</p>}
                {breweryQuery.data?.data.data.length!= 0 && !breweryQuery.isFetching && <>
                    <table className="p-4 mt-4">
                        <thead><tr className="bg-gray-200">
                            <th className="p-2 rounded-l-md text-left text-sm">S.No</th>
                            <th className="p-2 text-sm text-left">Brewery Name</th>
                            <th className="p-2 text-sm text-left">Location</th>
                            <th className="p-2 text-sm text-left">Date Of Creation</th>
                            <th className="p-2 text-sm text-left rounded-r-md">Action</th>
                        </tr>    </thead>
                        <tbody>{breweryQuery.data?.data.data.map((e: any, index: number) => <tr key={index + 1}>
                            <td className="p-2 text-sm">{index + 1 < 10 ? `0${index + 1}` : `${index + 1}`}</td>
                            <td className="p-2 text-sm">{e.name}</td>
                            <td className="p-2 text-sm">{e.address.text}</td>
                            <td className="p-2 text-sm">{new Date(e.createdAt).toLocaleDateString()}</td>
                            <td className="p-2 text-sm">
                                <div className="flex gap-2">
                                    <CiEdit onClick={() => {
                                        setBreweryName(e.name)
                                        setStatus(`${e.schedule[0].status}` as '1' | '2')
                                        onOpen1()
                                    }} className=" cursor-pointer border-[0.15rem] text-4xl text-red-600 rounded-lg p-2 border-red-600" />
                                    <AiOutlineDelete onClick={onOpen2} className="cursor-pointer bg-[#f5d0e1] text-4xl text-red-600 rounded-lg p-2 " />
                                </div>
                            </td>
                        </tr>)}</tbody>
                    </table>
                    <button className="px-16 py-2 bg-[#A92223] w-max rounded text-white m-auto" type="button" onClick={() => {
                        setPage((prev) => prev + 1)
                    }}>Next Page</button>
                </>}
                </>
            }
            {addBrewery &&
                <>
                <div className="flex justify-between">
                    <p className="text-xl font-semibold">Add Brewery</p>
                </div>
                {!!message && <p className="text-red-600 text-center">{message}</p>}
                <form onSubmit={handleSubmit} className="mt-4 p-4">
                    <div className="sm:w-[80%] flex flex-col gap-4 w-full">
                        <div className="flex gap-4">
                            <Input
                                onChange={(e) => {
                                    setBreweryToAdd(e.target.value)
                                }}
                                className="w-full"
                                type="text"
                                label="Brewery Name"
                                placeholder="Enter Brewery Name"
                                labelPlacement="outside"
                            />
                            <Autocomplete
                                required
                                label="Location"
                                placeholder="Enter Location"
                                labelPlacement="outside"
                                variant="flat"
                                endContent={
                                    <>
                                        <SiGooglemaps />
                                    </>
                                }
                                items={googleData&&!!location ? googleData : [{ label: "" }]}
                                defaultItems={[{label:""}]}
                                className="w-full"
                                // allowsCustomValue={true}
                                onSelectionChange={(key) => {
                                    const finding = googleData.find((e: any) => e.label == key)
                                    console.log(finding)
                                    setBreweryLocationToAdd({
                                            latitude: `${finding.geometry.location.lat}`,
                                            longitude: `${finding.geometry.location.lng}`,
                                            text: key
                                        }
                                    )
                                }}
                                onInputChange={(e) => {
                                    setLocation(e)
                                }}
                            >
                                {(item) => <AutocompleteItem key={item.label}>{item.label}</AutocompleteItem>}
                            </Autocomplete>
                        </div>
                        <div className="flex flex-col gap-4">
                            <p className="font-semibold">Schedule Hours</p>
                            <table className="w-full">
                                <thead>
                                    <tr>
                                        <td className="font-semibold">Day</td>
                                        <td className="font-semibold">From</td>
                                        <td className="font-semibold"></td>
                                        <td className="font-semibold">To</td>
                                    </tr>
                                </thead>
                                <tbody className="gap-4">
                                    <tr>
                                        <td >
                                            
                                            <div className="pt-4 pr-4">
                                                <Select
                                                    required
                                                    items={users}
                                                    placeholder="Select A Day"
                                                    className="w-full"
                                                    onSelectionChange={(e: any): any => {
                                                        const finding = users.find((k) => k.id == e.entries().next().value[0])
                                                        setBreweryToAddDay(finding?.name)
                                                    }}
                                                >
                                                    {(user) => (
                                                        <SelectItem key={user.id} textValue={user.name}>
                                                            <div className="flex gap-2 items-center">
                                                                <span className="text-small">{user.name}</span>
                                                            </div>
                                                        </SelectItem>
                                                    )}
                                                </Select>
                                            </div>
                                        </td>
                                        <td className="rounded-lg">
                                            <div className="pt-4 pr-4">
                                                <TimeInput isRequired onChange={(e) => {
                                                    const startHour = `${e.hour < 10 ? `0${e.hour}` : `${e.hour}`}`
                                                    const startMinute = `${e.minute < 10 ? `0${e.minute}` : `${e.minute}`}`
                                                    console.log(startHour,startMinute)
                                                    setBreweryToAddStartTime(`${startHour}:${startMinute}`)
                                                }} />
                                            </div>
                                        </td>
                                        <td ><div className="pt-4 pr-4 flex items-center justify-center">
                                            <span>-</span>
                                            <span>-</span>
                                            <span>-</span>
                                            <span>-</span>
                                            <span>-</span>
                                            <span>-</span>
                                            <span>-</span>
                                            <span>-</span>
                                            <span>-</span>
                                            <span>-</span>
                                            <span>-</span>
                                            <span>-</span>
                                            <span>-</span>
                                        </div></td>
                                        <td ><div className="pt-4 pr-4">
                                            <TimeInput onChange={(e) => {
                                                const startHour = `${e.hour < 10 ? `0${e.hour}` : `${e.hour}`}`
                                                const startMinute = `${e.minute < 10 ? `0${e.minute}` : `${e.minute}`}`
                                                setBreweryToAddEndTime(`${startHour}:${startMinute}`)
                                            }} isRequired/>
                                        </div></td>
                                        <td><div className="pt-4 pr-4">
                                            <Select
                                                required
                                                items={[
                                                    { label: 'Open', id: 0 },
                                                    { label: 'Closed', id: 1 }
                                                    
                                                ]}
                                                defaultSelectedKeys={[1]}
                                                placeholder="Select Status"
                                                className="w-full"
                                                onSelectionChange={(e: any) => {
                                                    const status = e.entries().next().value[0]==0?1:2
                                                    setBreweryToAddStatus(status)
                                                }}
                                            >
                                                {(user) => (
                                                    <SelectItem  key={user.id} textValue={user.label}>
                                                        <div className="flex gap-2 items-center">
                                                            <span className="text-small">{user.label}</span>
                                                        </div>
                                                    </SelectItem>
                                                )}
                                            </Select>
                                        </div></td>
                                    </tr>  
                                </tbody>
                            </table>
                        </div>   
                        <button type="submit" className="px-16 py-2 bg-[#A92223] w-max rounded text-white">Add Brewery</button>
                    </div>
                </form>
                </>
            }
            <Modal
                size={"xl"}
                isOpen={isOpen1}
                backdrop="blur"
                onOpenChange={onOpenChange1}
                placement="center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col text-xl gap-1">Edit Brewery Status</ModalHeader>
                            <ModalBody className="flex flex-col gap-4 pb-8">
                                <Input
                                    className="w-full"
                                    type="text"
                                    label="Brewery Name"
                                    disabled
                                    value={`${breweryName}`}
                                    placeholder="Enter Brewery Name"
                                    labelPlacement="outside"
                                />
                                <Select
                                    size={'md'}
                                    className="w-full"
                                    labelPlacement={"outside"}
                                    label="Select Status"
                                    placeholder="Open"
                                    // onSelectionChange={setValue as any}
                                    defaultSelectedKeys={[status as '1'|'2']}                            
                                >
                                    {selections.map((animal) => (
                                        <SelectItem  key={animal.key}>
                                            {animal.label}
                                        </SelectItem>
                                    ))}
                                </Select>
                                <button className="px-16 py-2 bg-[#A92223] w-max rounded text-white">Save Changes</button>
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
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col text-xl gap-1">Delete Brewery</ModalHeader>
                            <ModalBody className="flex flex-col gap-4 pb-8">
                                <p className="text-sm text-gray-400">Are you sure you want to delete this Brewery?</p>
                                <div className="flex w-full gap-4">
                                    <button className="px-16 w-full py-2 bg-[#A92223]  rounded text-white">No</button>
                                    <button className="px-16 w-full py-2 border-2 border-[#A92223] text-[#A92223]  rounded ">Delete</button>
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
                onClose={() => {
                    setAddBrewery(!addBrewery)
                }}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col text-xl gap-1">Brewery Added Successfuly</ModalHeader>
                            <ModalBody className="flex flex-col gap-4 pb-8">
                                <p className="text-sm text-gray-400">New Brewery has been added successfully</p>
                                {/* <button className="px-16 w-max py-2 bg-[#A92223]  rounded text-white">Okay</button> */}
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}