'use client';
import {CiEdit} from "react-icons/ci";
import {AiOutlineDelete} from "react-icons/ai";
import {
    Autocomplete,
    AutocompleteItem,
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
import {FormEvent, useState} from "react";
import {SiGooglemaps} from "react-icons/si";
import {useMutation, useQuery, useQueryClient} from "react-query";
import axiosInstance from "@/app/utils/axiosInstance";
import {TimeInput} from "@nextui-org/date-input";
import axios from "axios";
import {useRouter} from "next/navigation";
import {Time} from "@internationalized/date";
import Link from "next/link";
import {ImSpinner2} from "react-icons/im";
import Image from "next/image";


const selections = [
    {label: 'Open', key: 1},
    {label: 'Closed', key: 2}
];

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
];

type BreweryEditData = {
    name?: string,
    address?: {
        latitude?: number,
        longitude?: number,
        text?: string
    },
    schedule?: [
        {
            day?: 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday',
            time?: {
                start?: string,
                end?: string
            },
            status?: 1 | 2
        }
    ]
}

export default function ManageBreweries() {
    const navigate = useRouter();
    console.log('brewery pageee');
    const {isOpen: isOpen1, onOpen: onOpen1, onOpenChange: onOpenChange1, onClose: onClose1} = useDisclosure();
    const {isOpen: isOpen2, onOpen: onOpen2, onOpenChange: onOpenChange2} = useDisclosure();

    // const [breweryToEdit,setBreweryToEdit]=useState<null|BreweryEditData>()
    // const [status, setStatus] = useState<Status>()
    // const [breweryEditId,setBreweryEditId]=useState<null|string>()
    // const [addBrewery, setAddBrewery] = useState(false)
    const [page, setPage] = useState(1);
    const [breweryName, setBreweryName] = useState<any>();
    const [breweryToAdd, setBreweryToAdd] = useState<any>();
    const [breweryLocationToAdd, setBreweryLocationToAdd] = useState<any>();
    // const [breweryToAddDay, setBreweryToAddDay] = useState<any>()
    // const [breweryToAddStartTime, setBreweryToAddStartTime] = useState<any>()
    // const [breweryToAddEndTime, setBreweryToAddEndTime] = useState<any>()
    // const [breweryToAddStatus, setBreweryToAddStatus] = useState<any>()
    const [message, setMessage] = useState('');
    const [googleData, setGoogleData] = useState<any>();
    const [location, setLocation] = useState('');
    const queryClient = useQueryClient();
    const googleMapsQuery = useQuery(['googlemapsGeocode', location], ({queryKey}) => axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${queryKey[1]}&key=${process.env.NEXT_PUBLIC_GOOGLEAPI}`), {
        onSuccess(data) {
            const datas = data.data.results.map((e: any) => {
                return {label: e.formatted_address, geometry: e.geometry};
            });
            setGoogleData(datas);
        },
        enabled: !!location
    });
    const breweryQuery = useQuery(['breweries', page], ({queryKey}) => {
        return axiosInstance.get(`/brewery/all?page=${queryKey[1]}&limit=10`);
    }, {
        onSuccess(data) {
            console.log(data);
        },
        onError(err) {
            console.log(err);
        }
    });

    const breweryEditMutation = useMutation((data: BreweryEditData) => axiosInstance.put(`/brewery?breweryId=${breweryName._id}`, data), {
        onSuccess(data) {
            console.log('put data', data);
            queryClient.invalidateQueries('breweries');
            onClose1();
        }
    });

    // console.log('google',googleData)
    // console.log('edit selection', breweryToEdit)
    // console.log('brewery to edit',breweryName)
    return (
        <>

            <>
                <div className="flex justify-between items-center">
                    <p className="text-xl font-semibold">Manage Locations</p>
                    <Link href={'/admin/manage-breweries/create'}
                          className="sm:px-16 px-4 py-2 bg-[#A92223] flex justify-center rounded text-white w-max ">Add
                        Location</Link>
                </div>
                {breweryQuery.isFetching && <div className="flex justify-center h-full items-center"><ImSpinner2
                    className="text-4xl animate-spin"/></div>}
                {/* {breweryQuery.data?.data.data.length == 0 && !breweryQuery.isFetching  && <p className="text-center">No Data Exists</p>} */}
                {!breweryQuery.isFetching && <>
                    <table className="p-4 w-full block sm:table  overflow-auto mt-4">
                        <thead>
                        <tr className="bg-gray-200">
                            <th className="p-2 rounded-l-md text-left text-sm">S.No</th>
                            <th className="p-2 text-sm text-left">Location Name</th>
                            <th className="p-2 text-sm text-left">Location</th>
                            <th className="p-2 text-sm text-left">Date Of Creation</th>
                            <th className="p-2 text-sm text-left">Location Logo</th>
                            <th className="p-2 text-sm text-left rounded-r-md">Action</th>
                        </tr>
                        </thead>
                        <tbody>{breweryQuery.data?.data.data.map((e: any, index: number) => <tr
                            className="border-b-2 border-solid border-gray-200" key={index + 1}>
                            <td className="p-2 text-sm">{index + 1 < 10 ? `0${index + 1}` : `${index + 1}`}</td>
                            <td className="p-2 text-sm">{e.name}</td>
                            <td className="p-2 text-sm">{e.address.text}</td>
                            <td className="p-2 text-sm">{new Date(e.createdAt).toLocaleDateString()}</td>

                            <td className="p-2 text-sm"><Image className="w-[3rem] h-[3rem] object-contain" src={e.media?e.media.includes('placeholder')?'/images/user/profile/profile.png':`${process.env.NEXT_PUBLIC_MEDIA_URL}/${e.media}`:'/images/user/profile/profile.png'} alt="brewery Logo" width={100} height={100}/></td>
                            <td className="p-2 text-sm">
                                <div className="flex gap-2">
                                    <Link href={`/admin/manage-breweries/edit?id=${e._id}`}><CiEdit
                                        className=" cursor-pointer border-[0.15rem] text-4xl text-red-600 rounded-lg p-2 border-red-600"/></Link>

                                    {/* <AiOutlineDelete onClick={onOpen2} className="cursor-pointer bg-[#f5d0e1] text-4xl text-red-600 rounded-lg p-2 " /> */}
                                </div>
                            </td>
                        </tr>)}</tbody>
                    </table>

                    {<div className="flex flex-wrap gap-4">
                        {!!breweryQuery.data?.data.lastPage && breweryQuery.data?.data.lastPage != page &&
                            <button className="px-16 py-2 bg-[#A92223] flex justify-center rounded text-white w-max "
                                    type="button" onClick={() => {
                                setPage((prev) => prev + 1);
                            }}>Next Page</button>}

                        {
                            page != 1 &&
                            <button className="px-16 py-2 bg-[#A92223] flex justify-center rounded text-white w-max "
                                    type="button" onClick={() => {
                                setPage((prev) => prev - 1);
                            }}>Previous Page</button>
                        }
                    </div>}
                </>}
            </>
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
                                <div className="flex w-full flex-wrap gap-4 h-[15rem] overflow-auto">
                                    {/* <div className="flex flex-">

                                    </div> */}
                                    <Input
                                        classNames={{label: "!font-semibold"}}
                                        // onChange={(e) => {
                                        //     setBreweryToEdit((prev) => {
                                        //         return {
                                        //             ...prev, name: e.target.value
                                        //         }
                                        //     })
                                        // }}
                                        className="w-full"
                                        type="text"
                                        label="Brewery Name"
                                        defaultValue={`${breweryName.name}`}
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
                                                <SiGooglemaps/>
                                            </>
                                        }
                                        defaultInputValue={`${breweryName.address.text}`}
                                        items={googleData && !!location ? googleData : [{label: ""}]}
                                        defaultItems={[{label: ""}]}
                                        className="w-full !font-semibold"
                                        // allowsCustomValue={true}
                                        onSelectionChange={(key) => {
                                            const finding = googleData.find((e: any) => e.label == key);
                                            console.log(finding);
                                            setBreweryLocationToAdd({
                                                    latitude: `${finding.geometry.location.lat}`,
                                                    longitude: `${finding.geometry.location.lng}`,
                                                    text: key
                                                }
                                            );
                                        }}
                                        onInputChange={(e) => {
                                            setLocation(e);
                                        }}
                                    >
                                        {(item) => <AutocompleteItem key={item.label}>{item.label}</AutocompleteItem>}
                                    </Autocomplete>
                                    {breweryName?.schedule?.map((f: any, index: number) => <div
                                        className="p-4 border-2 rounded-lg flex flex-col gap-4">
                                        <Input
                                            label="Day"
                                            disabled
                                            defaultValue={`${f.day}`}
                                            classNames={{label: "font-semibold"}}
                                            className="w-full"
                                            labelPlacement="outside"
                                            type="text"
                                            // label="Brewery Name"
                                            // placeholder="Enter Brewery Name"
                                            // labelPlacement="outside"
                                        />
                                        {/* <Select
                                            required
                                            items={users}
                                            label="Select A Day"
                                            labelPlacement="outside"
                                            placeholder="Select A Day"
                                            className="w-full"
                                            defaultSelectedKeys={[`${users.find((e) => e.name == f.day)?.id}`]}
                                            // defaultSelectedKeys={new Set(['0'].entries()) as any}
                                            classNames={{ label: "!font-semibold" }}
                                            onSelectionChange={(e: any): any => {
                                                console.log(e)
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
                                        <TimeInput
                                            defaultValue={new Time(parseInt(f.time.start.split(':')[0]), parseInt(f.time.start.split(':')[1]))}
                                            label="Starting Time" labelPlacement="outside"
                                            classNames={{label: "!font-semibold"}} isRequired onChange={(e) => {
                                            const findDay = breweryName.schedule.find((e: any, index1: number) => index1 == index);
                                            const startHour = `${e.hour < 10 ? `0${e.hour}` : `${e.hour}`}`;
                                            const startMinute = `${e.minute < 10 ? `0${e.minute}` : `${e.minute}`}`;
                                            findDay!.time.start = `${startHour}:${startMinute}`;
                                            const newSchedule = breweryName.riddles.map((p: any, index1: number) => {
                                                if (index1 == index) {
                                                    return findDay;
                                                }
                                                return p;
                                            });
                                            setBreweryName(newSchedule);
                                            // const startHour = `${e.hour < 10 ? `0${e.hour}` : `${e.hour}`}`
                                            // const startMinute = `${e.minute < 10 ? `0${e.minute}` : `${e.minute}`}`
                                            // console.log(startHour, startMinute)
                                            // setBreweryToAddStartTime(`${startHour}:${startMinute}`)
                                        }}/>
                                        <TimeInput
                                            defaultValue={new Time(parseInt(f.time.end.split(':')[0]), parseInt(f.time.end.split(':')[1]))}
                                            label="Ending Time" labelPlacement="outside"
                                            classNames={{label: "!font-semibold"}} onChange={(e) => {
                                            const findDay = breweryName.schedule.find((e: any, index1: number) => index1 == index);
                                            const startHour = `${e.hour < 10 ? `0${e.hour}` : `${e.hour}`}`;
                                            const startMinute = `${e.minute < 10 ? `0${e.minute}` : `${e.minute}`}`;
                                            findDay!.time.end = `${startHour}:${startMinute}`;
                                            const newSchedule = breweryName.riddles.map((p: any, index1: number) => {
                                                if (index1 == index) {
                                                    return findDay;
                                                }
                                                return p;
                                            });
                                            setBreweryName(newSchedule);
                                            // const startHour = `${e.hour < 10 ? `0${e.hour}` : `${e.hour}`}`
                                            // const startMinute = `${e.minute < 10 ? `0${e.minute}` : `${e.minute}`}`
                                            // console.log(startHour, startMinute)
                                            // setBreweryToAddStartTime(`${startHour}:${startMinute}`)
                                        }} isRequired/>
                                    </div>)}

                                    {/* <Select
                                        required
                                        items={[
                                            { label: 'Open', id: 1 },
                                            { label: 'Closed', id: 2 }

                                        ]}
                                        defaultSelectedKeys={[`${breweryName.schedule[0].status}`]}
                                        placeholder="Select Status"
                                        className="w-full"
                                        label="Select Status" labelPlacement="outside" classNames={{ label: "!font-semibold" }}
                                        onSelectionChange={(e: any) => {
                                            const status = e.entries().next().value[0]
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
                                    </Select> */}
                                </div>
                                {/* <Select
                                    size={'md'}
                                    className="w-full"
                                    labelPlacement={"outside"}
                                    label="Select Status"
                                    placeholder="Open"
                                    onSelectionChange={(e: any) => {
                                        console.log(e.entries().next().value)
                                        if (e.entries().next().value != undefined) {
                                            setBreweryToEdit((prev:any) => {
                                                return {
                                                    ...prev,
                                                    schedule: [
                                                        {
                                                            status: parseInt(e.entries().next().value[0])
                                                        }
                                                    ]
                                                }
                                            })
                                        }
                                    }}
                                    defaultSelectedKeys={[status as '1'|'2']}
                                >
                                    {selections.map((animal) => (
                                        <SelectItem  key={animal.key}>
                                            {animal.label}
                                        </SelectItem>
                                    ))}
                                </Select> */}
                                <button onClick={() => {
                                    const addressNotAvailable = {
                                        "latitude": breweryName.address.location.coordinates[0],
                                        "longitude": breweryName.address.location.coordinates[1],
                                        "text": breweryName.address.text
                                    };
                                    console.log('locationnnnnn', breweryLocationToAdd);
                                    const breweryData: BreweryEditData = {
                                        "name": breweryToAdd ? breweryToAdd : breweryName.name,
                                        "address": breweryLocationToAdd ? breweryLocationToAdd : addressNotAvailable,
                                        "schedule": breweryName.schedule
                                    };
                                    console.log('breweryData', breweryData.address);
                                    setMessage('');
                                    breweryEditMutation.mutate(breweryData);
                                    // addBreweryMutation.mutate(breweryData)
                                    navigate.push('/admin/manage-breweries');

                                    // if (breweryToEdit) {
                                    //     breweryEditMutation.mutate(breweryToEdit)
                                    //     setBreweryToEdit(null)
                                    // }
                                }}
                                        className="px-16 py-2 bg-[#A92223] w-max rounded text-white">{breweryEditMutation.isLoading ?
                                    <ImSpinner2 className="text-xl animate-spin"/> : "Save Changes"}</button>
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
                                    <button
                                        className="px-16 w-full py-2 border-2 border-[#A92223] text-[#A92223]  rounded ">Delete
                                    </button>
                                </div>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}