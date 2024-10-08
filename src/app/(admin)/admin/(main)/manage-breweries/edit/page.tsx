'use client'
import { Autocomplete, AutocompleteItem, Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, useDisclosure } from "@nextui-org/react";
import axios from "axios";
import { FormEvent, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { SiGooglemaps } from "react-icons/si";
import { TimeInput } from "@nextui-org/date-input";
import { ImSpinner2 } from "react-icons/im";
import axiosInstance from "@/app/utils/axiosInstance";
import { Time } from "@internationalized/date";
import { time } from "console";
import { toast } from "react-toastify";
import {useRouter} from "next/navigation";
import Image from "next/image";
import { FieldValues, useForm } from "react-hook-form";
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
export default function EditBrewery(data: any) {
    const navigate = useRouter();
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [profileImage,setProfileImage]=useState<File|null>(null)
    const [message, setMessage] = useState('')
    const [googleData, setGoogleData] = useState<any>()
    const [locationText, setLocationText] = useState('')
    const [location, setLocation] = useState('')
    const [breweryToAdd, setBreweryToAdd] = useState<any>()
    const[error,setError]=useState(false)
    // const [breweryLocationName, setBreweryLocationName] = useState<any>()
    const [brewerySchedule, setBrewerySchedule] = useState([
        {
            "day": 'Sunday',
            "time": {
                "start": '',
                "end": ''
            },
            "status": 1
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
    const queryClient = useQueryClient()
    const breweryQuery = useQuery(['individualBrewery', data.searchParams.id], ({ queryKey }) => {
        return axiosInstance.get(`/brewery?breweryId=${queryKey[1]}`)
    }, {
        onSuccess(data) {
            console.log(data)
            const addressNotAvailable = {
                "latitude": data.data.data.brewery.address.location.coordinates[0],
                "longitude": data.data.data.brewery.address.location.coordinates[1],
                "text": data.data.data.brewery.address.text
            }
            const scheduleRiddle = data.data.data.brewery.schedule.map((e:any) => {
                return {
                    status: e.status,
                    time: e.time,
                    day:e.day
                }
            })
            setBreweryToAdd(
                {
                    ...data.data.data.brewery,
                    address: addressNotAvailable,
                    schedule:scheduleRiddle

                }
            )
            setLocation(data.data.data.brewery.address.text)
            // setBreweryLocationName(addressNotAvailable.text)
            // const huntsData = {
            //     name: data.data.data.name,
            //     description: data.data.data.description,
            //     // brewery: data.data.data.brewery._id,
            //     riddles: []
            // }
            // const riddlesToAdd = data.data.data.riddles.map((e: any) => {
            //     return (
            //         {
            //             title: e.title,
            //             description: e.description,
            //             reward: e.reward,
            //             hint: e.hint
            //         }
            //     )
            // })
            // huntsData.riddles = riddlesToAdd
            // setHuntToAdd(huntsData)
        },
        onError(err) {
            console.log(err)
        },
        refetchOnWindowFocus: false,
    })
    const breweryEditMutation = useMutation((datas: any) => axiosInstance.put(`/brewery?breweryId=${data.searchParams.id}`, datas), {
        onSuccess(data) {
            console.log('put data', data)
            queryClient.invalidateQueries('breweries')
            navigate.push('/admin/manage-breweries');

            // onClose1()
        },
        onError(error: any) {
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
    const {register,handleSubmit,setValue,formState:{errors}}=useForm()

    function handleSubmitt(e: FormEvent) {
        e.preventDefault()
        const filterBrewery = breweryToAdd.schedule.find((f:any) => {
            if (f.time.start!='' || f.time.end!='') {
                return f
            }
        })
        console.log('filter',filterBrewery)
        const name = breweryToAdd.name != ''
        const address = !`${breweryToAdd.address.latitude}` && !`${breweryToAdd.address.longitude}` && !`${breweryToAdd.address.text}`
        // console.log(breweryToAdd.address.latitude, breweryToAdd.address.longitude, breweryToAdd.address.text, breweryToAdd.name, filterBrewery)
        // console.log(name,address,filterBrewery)
        if (!filterBrewery || !name || !location) {
            setError(true)
        }
        else {
            setError(false)
            const formData= new FormData()
            Object.entries(breweryToAdd.address).forEach((e)=>{
                formData.append(`address[${e[0]}]`,e[1] as any)
            })
            formData.append(`name`,breweryToAdd.name as any)
            // console.log('fileee',profileImage)
            if(profileImage){

                formData.append('file',profileImage as any)
            }
            // formData.append('file',)
            
            breweryToAdd.schedule.forEach((e:any,index:number)=>{

                // console.log('process',e)
                Object.entries(e).forEach((j,ind)=>{
                    // console.log('key',j)
                    if(typeof j[1] =='object'){
                        Object.entries(j[1]!).forEach((k)=>{
                            formData.append(`schedule[${index}][${j[0]}][${k[0]}]`,k[1] as any)
                        })
                    }
                    else{
                        formData.append(`schedule[${index}][${j[0]}]`,j[1] as any)
                    }
                })
            })
            console.log('breweryDataaaa',[...formData.entries()])
            breweryEditMutation.mutate(breweryToAdd)
        }
        // if (!filterBrewery && name) {
        //     setMessage('')
        // }
        // else {
        //     setMessage('Enter Missing Days Info, Brewery Name and Location')
        // }
        // console.log('filter', filterBrewery)
        // const breweryData = {
        //     "name": breweryToAdd,
        //     "address": breweryLocationToAdd,
        //     "schedule": filterBrewery
        // }
        // if (filterBrewery) {
        //     console.log(breweryData)
        //     setMessage('Add Schedules For The Breweries Before Submitting')
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

    

    const googleMapsQuery = useQuery(['googlemapsGeocode', location], ({ queryKey }) => axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${queryKey[1]}&components=country:us&key=${process.env.NEXT_PUBLIC_GOOGLEAPI}`), {
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
    // console.log('breweryData', breweryToAdd)
    // console.log('location',location)
    console.log('errors',errors)
    // console.log('googledata', googleData)
    // console.log('breweryLocation', breweryToAdd?.address.text)
    return (
        <>
            <div className="flex justify-between">
                <p className="text-xl font-semibold">Edit Location</p>
            </div>
            {!!message && <p className="text-red-600 text-center">{message}</p>}
            {breweryToAdd && <form onSubmit={handleSubmitt} className="mt-4 p-4 border-[0.1rem] flex flex-col gap-4 rounded-lg">
                <div className="sm:w-[80%] flex flex-col gap-4 w-full">
                    <div className="flex gap-4 flex-wrap w-full">
                        <div className="flex gap-4 w-full">
                        <Input
                            value={breweryToAdd?.name}
                            isInvalid={breweryToAdd?.name == '' && error}
                            errorMessage="Please Enter Location Name"
                            onChange={(e) => {
                                setBreweryToAdd((prev: any) => {
                                    return {
                                        ...prev,
                                        name: e.target.value
                                    }
                                })
                                // setBreweryToAdd(e.target.value)
                            }}
                            className="w-full"
                            type="text"
                            label="Location Name"
                            placeholder="Enter Location Name"
                            labelPlacement="outside"
                        />

                        <Autocomplete
                            required
                            label="Location"
                            placeholder="Enter Location"
                            labelPlacement="outside"
                            variant="flat"
                            isInvalid={location == '' && error}
                            errorMessage="Please Enter Location"
                            endContent={
                                <>
                                    <SiGooglemaps />
                                </>
                            }
                            defaultInputValue={`${breweryToAdd.address.text}`}
                            items={googleData && !!location ? googleData : [{ label: "" }]}
                            defaultItems={[{ label: "" }]}
                            className="w-full"
                            onSelectionChange={(key: any) => {
                                const finding = googleData.find((e: any) => e.label == key)
                                console.log(finding)
                                setLocationText(key ? key : '')
                                if (finding) {
                                    setBreweryToAdd((prev:any) => {
                                        return (
                                            {
                                                ...prev,
                                                address: {
                                                    latitude: `${finding.geometry.location.lat}`,
                                                    longitude: `${finding.geometry.location.lng}`,
                                                    text: key
                                                }
                                            }
                                        )
                                    })
                                    // setBreweryLocationToAdd({
                                    //     latitude: `${finding.geometry.location.lat}`,
                                    //     longitude: `${finding.geometry.location.lng}`,
                                    //     text: key
                                    // }
                                    // )
                                }
                            }}
                            // onChange={(e) => {
                            //     console.log(e)
                            // }}
                            onInputChange={(e) => {
                                // if (e != '' && e != locationText) {
                                // }
                                setLocation(e)
                                // if (locationText!= location) {
                                // }
                                console.log(e)
                                console.log('input changed')
                                // if (e!='') {

                                // }
                            }}
                        >
                            {(item: any) => <AutocompleteItem key={item.label}>{item.label}</AutocompleteItem>}
                        </Autocomplete>
                        </div>
                        
                        <div className="relative min-h-[10rem] w-[10rem] flex flex-col gap-2">
                            <p className="text-sm">Location Logo</p>
                            <label htmlFor="breweryLogo" className="cursor-pointer block">
                            <Image src={previewImage?previewImage:breweryToAdd.media.includes('placeholder')?'/images/user/profile/profile.png':`${process.env.NEXT_PUBLIC_MEDIA_URL}/${breweryToAdd.media}`} alt="brewery Logo" width={100} height={100} className="h-full w-full object-contain"/>
                            </label>
                            <input onChange={(e)=>{
                                if (e.target.files && e.target.files.length > 0) {
                                    // console.log('files',e.target.files[0])
                                    const file = e.target.files[0];
                                    console.log('filesss',file)
                                    setProfileImage(file);
                                    setPreviewImage(URL.createObjectURL(file));
                                    // setValue('file',e.target.files[0] as any)
                                }
                            }} className="absolute invisible" id="breweryLogo"  type="file"/>
                        </div>
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
                                        {/* && (!!brewerySchedule.find((e) => (e.time.end != '' && e.day == o.name)) || !!brewerySchedule.find((e) => (e.time.end != '')) == false) */}
                                        {/* ((!!brewerySchedule.find((e) => (e.time.start != ''))) == false) && (!!brewerySchedule.find((e) => (e.time.end != '' && e.day == o.name)) || !!brewerySchedule.find((e) => (e.time.end != ''))==false) */}
                                        <td className="rounded-lg">
                                            <div className="pt-4 pr-4">
                                                <TimeInput
                                                    className="!pb-0"
                                                    isInvalid={(((breweryToAdd.schedule.length == 0)) || breweryToAdd.schedule.find((e: any) => e.day == o.name)?.time.start == '') && error}
                                                    errorMessage="Please Enter Start Time"
                                                    defaultValue={breweryToAdd.schedule.find((e: any) => e.day == o.name) ? new Time(parseInt(breweryToAdd.schedule.find((e: any) => e.day == o.name).time.start.split(':')[0]), parseInt(breweryToAdd.schedule.find((e: any) => e.day == o.name).time.start.split(':')[1])) : null}
                                                    aria-label="starttime" isRequired onChange={(f) => {
                                                    const findDay = breweryToAdd.schedule.find((e: any) => e.day == o.name)
                                                    console.log('find the day', findDay)
                                                    console.log('day value',f)
                                                    if (!f) {
                                                        if (findDay) {
                                                            if (findDay.time.end == '') {
                                                                const newSchedule = breweryToAdd.schedule.filter((e: any) => {
                                                                    if (e.day != findDay.day) {
                                                                        return e
                                                                    }
                                                                })
                                                                setBreweryToAdd((prev: any) => {
                                                                    return (
                                                                        {
                                                                            ...prev,
                                                                            schedule: newSchedule
                                                                        }
                                                                    )
                                                                })
                                                            }
                                                            else {
                                                                findDay!.time.start = ``
                                                                const newSchedule = breweryToAdd.schedule.map((e: any) => {
                                                                    if (e.day == findDay.day) {
                                                                        return findDay
                                                                    }
                                                                    return e
                                                                })
                                                                setBreweryToAdd((prev: any) => {
                                                                    return (
                                                                        {
                                                                            ...prev,
                                                                            schedule: newSchedule
                                                                        }
                                                                    )
                                                                })
                                                            }
                                                        }
                                                        // else {

                                                        // }
                                                    }
                                                    else {
                                                        if (findDay) {
                                                            const startHour = `${f.hour < 10 ? `0${f.hour}` : `${f.hour}`}`
                                                            const startMinute = `${f.minute < 10 ? `0${f.minute}` : `${f.minute}`}`
                                                            findDay!.time.start = `${startHour}:${startMinute}`
                                                            const newSchedule = breweryToAdd.schedule.map((e: any) => {
                                                                if (e.day == findDay.day) {
                                                                    return findDay
                                                                }
                                                                return e
                                                            })
                                                            setBreweryToAdd((prev: any) => {
                                                                return (
                                                                    {
                                                                        ...prev,
                                                                        schedule: newSchedule
                                                                    }
                                                                )
                                                            })
                                                        }
                                                        else {
                                                            const newDay = {
                                                                day: o.name,
                                                                status: 1,
                                                                time: { start: "", end: "" }
                                                            }
                                                            const startHour = `${f.hour < 10 ? `0${f.hour}` : `${f.hour}`}`
                                                            const startMinute = `${f.minute < 10 ? `0${f.minute}` : `${f.minute}`}`
                                                            newDay!.time.start = `${startHour}:${startMinute}`
                                                            setBreweryToAdd((prev: any) => {
                                                                return (
                                                                    {
                                                                        ...prev,
                                                                        schedule: [
                                                                            ...breweryToAdd.schedule,
                                                                            newDay
                                                                        ]
                                                                    }
                                                                )
                                                            })
                                                        }
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
                                                isInvalid={(((breweryToAdd.schedule.length == 0)) || breweryToAdd.schedule.find((e: any) => e.day == o.name)?.time.end == '') && error}
                                                errorMessage="Please Enter End Time"
                                                defaultValue={breweryToAdd.schedule.find((e: any) => e.day == o.name) ? new Time(parseInt(breweryToAdd.schedule.find((e: any) => e.day == o.name).time.end.split(':')[0]), parseInt(breweryToAdd.schedule.find((e: any) => e.day == o.name).time.end.split(':')[1])) : null} aria-label="endtime" onChange={(f) => {
                                                const findDay = breweryToAdd.schedule.find((e: any) => e.day == o.name)
                                                console.log('find the day', findDay)
                                                console.log('day value', f)
                                                if (!f) {
                                                    console.log('im here')
                                                    if (findDay) {
                                                        if (findDay.time.start == '') {
                                                            const newSchedule = breweryToAdd.schedule.filter((e: any) => {
                                                                if (e.day != findDay.day) {
                                                                    return e
                                                                }
                                                            })
                                                            setBreweryToAdd((prev: any) => {
                                                                return (
                                                                    {
                                                                        ...prev,
                                                                        schedule: newSchedule
                                                                    }
                                                                )
                                                            })
                                                        }
                                                        else {
                                                            findDay!.time.end = ``
                                                            const newSchedule = breweryToAdd.schedule.map((e: any) => {
                                                                if (e.day == findDay.day) {
                                                                    return findDay
                                                                }
                                                                return e
                                                            })
                                                            setBreweryToAdd((prev: any) => {
                                                                return (
                                                                    {
                                                                        ...prev,
                                                                        schedule: newSchedule
                                                                    }
                                                                )
                                                            })
                                                        }
                                                    }
                                                    // else {

                                                    // }
                                                }
                                                else {
                                                    console.log('no im here')
                                                    if (findDay) {
                                                        const startHour = `${f.hour < 10 ? `0${f.hour}` : `${f.hour}`}`
                                                        const startMinute = `${f.minute < 10 ? `0${f.minute}` : `${f.minute}`}`
                                                        findDay!.time.end = `${startHour}:${startMinute}`
                                                        const newSchedule = breweryToAdd.schedule.map((e: any) => {
                                                            if (e.day == findDay.day) {
                                                                return findDay
                                                            }
                                                            return e
                                                        })
                                                        setBreweryToAdd((prev: any) => {
                                                            return (
                                                                {
                                                                    ...prev,
                                                                    schedule: newSchedule
                                                                }
                                                            )
                                                        })
                                                    }
                                                    else {
                                                        const newDay = {
                                                            day: o.name,
                                                            status: 1,
                                                            time: { start: "", end: "" }
                                                        }
                                                        const startHour = `${f.hour < 10 ? `0${f.hour}` : `${f.hour}`}`
                                                        const startMinute = `${f.minute < 10 ? `0${f.minute}` : `${f.minute}`}`
                                                        newDay!.time.end = `${startHour}:${startMinute}`
                                                        setBreweryToAdd((prev: any) => {
                                                            return (
                                                                {
                                                                    ...prev,
                                                                    schedule: [
                                                                        ...breweryToAdd.schedule,
                                                                        newDay
                                                                    ]
                                                                }
                                                            )
                                                        })
                                                    }
                                                }
                                            }} isRequired />
                                        </div></td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
                <button type="submit" className="px-16 py-2 bg-[#A92223] flex justify-center rounded text-white w-max ">{breweryEditMutation.isLoading ? <ImSpinner2 className="text-xl animate-spin" /> : 'Update Location'}</button>
            </form>}
            {!breweryToAdd && <div className="flex justify-center h-full items-center"><ImSpinner2 className="text-4xl animate-spin" /></div>}

        </>
    )
}