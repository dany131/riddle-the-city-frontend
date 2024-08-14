'use client'
import axiosInstance from "@/app/utils/axiosInstance";
import { Autocomplete, AutocompleteItem, Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, useDisclosure } from "@nextui-org/react";
import { FormEvent, useState } from "react";
import { TimeInput } from "@nextui-org/date-input";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { SiGooglemaps } from "react-icons/si";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ImSpinner2 } from "react-icons/im";
import { toast } from "react-toastify";
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

export default function CreateBrewery() {
    const navigate=useRouter()
    const { isOpen: isOpen3, onOpen: onOpen3, onOpenChange: onOpenChange3 } = useDisclosure();
    const [breweryToAdd, setBreweryToAdd] = useState<any>()
    const [breweryLocationToAdd, setBreweryLocationToAdd] = useState<any>()
    const [locationText,setLocationText]=useState('')
    // const [breweryToAddDay, setBreweryToAddDay] = useState<any>()
    // const [breweryToAddStartTime, setBreweryToAddStartTime] = useState<any>()
    // const [breweryToAddEndTime, setBreweryToAddEndTime] = useState<any>()
    // const [breweryToAddStatus, setBreweryToAddStatus] = useState<any>()
    const [brewerySchedule, setBrewerySchedule] = useState([
        {
            "day": 'Sunday',
            "time": {
                "start": '',
                "end": ''
            },
            "status":1
        },
        {
            "day": 'Monday',
            "time": {
                "start": '',
                "end": ''
            },
            "status": 1
        },
        {
            "day": 'Tuesday',
            "time": {
                "start": '',
                "end": ''
            },
            "status": 1
        },
        {
            "day": 'Wednesday',
            "time": {
                "start": '',
                "end": ''
            },
            "status": 1
        },
        {
            "day": 'Thursday',
            "time": {
                "start": '',
                "end": ''
            },
            "status": 1
        },
        {
            "day": 'Friday',
            "time": {
                "start": '',
                "end": ''
            },
            "status": 1
        },
        {
            "day": 'Saturday',
            "time": {
                "start": '',
                "end": ''
            },
            "status": 1
        }
    ])
    const [message, setMessage] = useState('')
    const [googleData, setGoogleData] = useState<any>()
    const [location, setLocation] = useState('')
    const [error,setError]=useState(false)
    const queryClient=useQueryClient()
    function handleSubmit(e: FormEvent) {
        e.preventDefault()
        const filterBrewery = brewerySchedule.filter((f) => {
            if (f.time.start && f.time.end) {
                return f
            }
        })
        console.log('filter', filterBrewery)
        if (filterBrewery.length == 0 || !breweryToAdd || !breweryLocationToAdd) {
            setError(true)
            // console.log('empty',true)
        }
        else {
            const breweryData = {
                "name": breweryToAdd,
                "address": breweryLocationToAdd,
                "schedule": filterBrewery
            }
            setError(false)
            addBreweryMutation.mutate(breweryData)
        }

        // if (filterBrewery) {
        //     console.log(breweryData)
        //     // setMessage('Add Schedules For The Breweries Before Submitting')
        //     addBreweryMutation.mutate(breweryData)
        // }
        // if (breweryToAdd && breweryLocationToAdd ) {
            // const breweryData = {
            //     "name": breweryToAdd,
            //     "address": breweryLocationToAdd,
            //     "schedule": [
            //         {
            //             "day": breweryToAddDay,
            //             "time": {
            //                 "start": breweryToAddStartTime,
            //                 "end": breweryToAddEndTime
            //             },
            //             "status": breweryToAddStatus
            //         }
            //     ]
            // }
            // console.log(breweryData)
            // setMessage('')
            // addBreweryMutation.mutate(breweryData)
        // }
        // else {
        //     setMessage('All Fields Must Be Filled')
        // }
    }
    const googleMapsQuery = useQuery(['googlemapsGeocode', location], ({ queryKey }) => axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${queryKey[1]}&key=${process.env.NEXT_PUBLIC_GOOGLEAPI}`), {
        onSuccess(data) {
            const datas = data.data.results.map((e: any) => {
                return { label: e.formatted_address, geometry: e.geometry }
            })
                setGoogleData(datas)
            // if (location != '') {
            // }
        },
        // enabled: !!location
    })
    
    const addBreweryMutation = useMutation((data: any) => axiosInstance.post('/riddle/api/brewery', data), {
        onSuccess(data) {
            console.log(data)
            queryClient.invalidateQueries('breweries')
            setBreweryToAdd(null)
            setMessage("")
            // setBreweryToAddDay(null)
            // setBreweryToAddEndTime(null)
            // setBreweryToAddStartTime(null)
            // setBreweryToAddStatus(null)
            setBreweryLocationToAdd(null)
            onOpen3()
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
                toast.error(error.response.data.message[0], {
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

    console.log('brewery', brewerySchedule)
    console.log('name',breweryToAdd)
    // console.log('check', (!!brewerySchedule.find((e) => (e.time.start != ''))), !!brewerySchedule.find((e) => (e.time.end != '' && e.day == 'Monday')))
    // console.log('google data', googleData)
    // console.log('location name', locationText)
    // console.log('typing location',location)
    return (
        <>
            <div className="flex justify-between">
                <p className="text-xl font-semibold">Add Brewery</p>
            </div>
            {!!message && <p className="text-red-600 text-center">{message}</p>}
            <form onSubmit={handleSubmit} className="mt-4 p-4 border-[0.1rem] flex flex-col gap-4 rounded-lg">
                <div className="sm:w-[80%] flex flex-col gap-4 w-full">
                    <div className="flex gap-4">
                        <Input
                            onChange={(e) => {
                                setBreweryToAdd(e.target.value)
                            }}
                            className="w-full"
                            type="text"
                            isInvalid={!!breweryToAdd == false && error}
                            errorMessage="Please Enter Brewery Name"
                            label="Brewery Name"
                            placeholder="Enter Brewery Name"
                            labelPlacement="outside"
                        />
                        
                        <Autocomplete
                            required
                            label="Location"
                            placeholder="Enter Location"
                            labelPlacement="outside"
                            isInvalid={!!locationText == false && error}
                            errorMessage="Please Enter Location"
                            variant="flat"
                            // value={breweryLocationToAdd?breweryLocationToAdd.text:''}
                            endContent={
                                <>
                                    <SiGooglemaps />
                                </>
                            }
                            // value={"Rashid Minhas Rd, FB Indus-Area Block 21 Block 21 Gulberg Town, Karachi, Karachi City, Sindh, Pakistan"}
                            defaultSelectedKey={locationText}
                            items={googleData  ? googleData : [{ label:'' }]}
                            defaultItems={[{label:""}]}
                            className="w-full"
                            // allowsCustomValue={true}
                            onSelectionChange={(key:any) => {
                                const finding = googleData.find((e: any) => e.label == key)
                                console.log(finding)
                                setLocationText(key ? key : '')
                                if (finding) {
                                    setBreweryLocationToAdd({
                                        latitude: `${finding.geometry.location.lat}`,
                                        longitude: `${finding.geometry.location.lng}`,
                                        text: key
                                    }
                                    )
                                }
                            }}
                            // onChange={(e) => {
                            //     console.log(e)
                            // }}
                            onInputChange={(e) => {
                                if (e != '' && e!=locationText) {
                                    setLocation(e)
                                }
                                // if (locationText!= location) {
                                // }
                                console.log('input changed')
                                // if (e!='') {
                                    
                                // }
                            }}
                        >
                            {(item) => <AutocompleteItem key={item.label}>{item.label}</AutocompleteItem>}
                        </Autocomplete>
                    </div>
                    <div className="flex flex-col gap-4">
                        <p className="font-semibold">Schedule Hours</p>
                        <table className="w-full block sm:table overflow-auto">
                            <thead>
                                <tr>
                                    <td className="font-semibold">Day</td>
                                    <td className="font-semibold">From</td>
                                    <td className="font-semibold"></td>
                                    <td className="font-semibold">To</td>
                                </tr>
                            </thead>
                            <tbody className="gap-4">
                                {users.map((o) =>
                                    <tr>
                                        <td >

                                            <div className="pt-4 min-w-[8rem] pr-4">
                                                <Input
                                                    // onChange={(e) => {
                                                    //     setBreweryToAdd(e.target.value)
                                                    // }}
                                                    disabled
                                                    defaultValue={`${o.name}`}
                                                    className="w-full"
                                                    type="text"
                                                    // label="Brewery Name"
                                                    // placeholder="Enter Brewery Name"
                                                    // labelPlacement="outside"
                                                />
                                                {/* <Select
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
                                                </Select> */}
                                            </div>
                                        </td>
                                        <td className="rounded-lg">
                                            <div className="pt-4 pr-4">
                                                <TimeInput
                                                    className="!pb-0"
                                                    isInvalid={((!!brewerySchedule.find((e) => (e.time.start != ''))) == false) && (!!brewerySchedule.find((e) => (e.time.end != '' && e.day == o.name)) || !!brewerySchedule.find((e) => (e.time.end != '')) == false) && error}
                                                    errorMessage="Please Enter Start Time"
                                                    aria-label="starttime" isRequired onChange={(f) => {
                                                        if (!f) {
                                                            const findDay = brewerySchedule.find((e) => e.day == o.name)
                                                            // const startHour = `${f.hour < 10 ? `0${f.hour}` : `${f.hour}`}`
                                                            // const startMinute = `${f.minute < 10 ? `0${f.minute}` : `${f.minute}`}`
                                                            findDay!.time.start = ``
                                                            const newSchedule = brewerySchedule.map((p) => {
                                                                if (p.day == findDay?.day) {
                                                                    return findDay
                                                                }
                                                                return p
                                                            })
                                                            setBrewerySchedule(newSchedule)
                                                        }
                                                        else {
                                                            const findDay = brewerySchedule.find((e) => e.day == o.name)
                                                            const startHour = `${f.hour < 10 ? `0${f.hour}` : `${f.hour}`}`
                                                            const startMinute = `${f.minute < 10 ? `0${f.minute}` : `${f.minute}`}`
                                                            findDay!.time.start = `${startHour}:${startMinute}`
                                                            const newSchedule = brewerySchedule.map((p) => {
                                                                if (p.day == findDay?.day) {
                                                                    return findDay
                                                                }
                                                                return p
                                                            })
                                                            setBrewerySchedule(newSchedule)
                                                        }
                                                    // const startHour = `${e.hour < 10 ? `0${e.hour}` : `${e.hour}`}`
                                                    // const startMinute = `${e.minute < 10 ? `0${e.minute}` : `${e.minute}`}`
                                                    // console.log(startHour, startMinute)
                                                    // setBreweryToAddStartTime(`${startHour}:${startMinute}`)
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
                                            <TimeInput
                                                className="!pb-0"
                                                isInvalid={((!!brewerySchedule.find((e) => (e.time.end != ''))) == false) && (!!brewerySchedule.find((e) => (e.time.start != '' && e.day == o.name)) || !!brewerySchedule.find((e) => (e.time.start != '')) == false) && error}
                                                errorMessage="Please Enter End Time"
                                                aria-label="endtime" onChange={(f) => {
                                                    if (!f) {
                                                        const findDay = brewerySchedule.find((e) => e.day == o.name)
                                                        findDay!.time.end = ``
                                                        const newSchedule = brewerySchedule.map((p) => {
                                                            if (p.day == findDay?.day) {
                                                                return findDay
                                                            }
                                                            return p
                                                        })
                                                        setBrewerySchedule(newSchedule)
                                                    }
                                                    else {
                                                        const findDay = brewerySchedule.find((e) => e.day == o.name)
                                                        const startHour = `${f.hour < 10 ? `0${f.hour}` : `${f.hour}`}`
                                                        const startMinute = `${f.minute < 10 ? `0${f.minute}` : `${f.minute}`}`
                                                        findDay!.time.end = `${startHour}:${startMinute}`
                                                        const newSchedule = brewerySchedule.map((p) => {
                                                            if (p.day == findDay?.day) {
                                                                return findDay
                                                            }
                                                            return p
                                                        })
                                                        setBrewerySchedule(newSchedule)
                                                    }
                                            }} isRequired />
                                        </div></td>
                                        {/* <td><div className="pt-4 pr-4">
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
                                                    const status = e.entries().next().value[0] == 0 ? 1 : 2
                                                    setBreweryToAddStatus(status)
                                                }}
                                            >
                                                {(user) => (
                                                    <SelectItem key={user.id} textValue={user.label}>
                                                        <div className="flex gap-2 items-center">
                                                            <span className="text-small">{user.label}</span>
                                                        </div>
                                                    </SelectItem>
                                                )}
                                            </Select>
                                        </div></td> */}
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
                <button type="submit" className="px-16 py-2 bg-[#A92223] flex justify-center rounded text-white w-max ">{addBreweryMutation.isLoading ? <ImSpinner2 className="text-xl animate-spin" /> : 'Add Brewery'}</button>
            </form>
            <Modal
                size={"xl"}
                isOpen={isOpen3}
                backdrop="blur"
                onOpenChange={onOpenChange3}
                placement="center"
                onClose={() => {
                    navigate.push('/admin/manage-breweries')
                    // setAddBrewery(!addBrewery)
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