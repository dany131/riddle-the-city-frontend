'use client';
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
    Textarea,
    useDisclosure
} from "@nextui-org/react";
import {useState} from "react";
import {Autocomplete, AutocompleteItem} from "@nextui-org/react";
import {useInfiniteScroll} from "@nextui-org/use-infinite-scroll";
import {useMutation, useQuery, useQueryClient} from "react-query";
import axiosInstance from "@/app/utils/axiosInstance";
import {useRouter} from "next/navigation";
import {ImSpinner2} from "react-icons/im";
import {toast} from "react-toastify";


const selections = [
    {label: 'Open', key: 1}
];

export default function CreateRiddle() {
    const navigate = useRouter();
    const {isOpen: isOpen1, onOpen: onOpen1, onOpenChange: onOpenChange1, onClose: onClose1} = useDisclosure();
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState<any>('');
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);
    const [message, setMessage] = useState('');
    const [error,setError]=useState(false)
    const [huntToAdd, setHuntToAdd] = useState({
        name: "",
        description: "",
        brewery: "",
        riddles: [
            {
                title: "",
                description: "",
                reward: "",
                hint: ""
            }
        ]
    });

    const breweryQuery = useQuery(['breweries', searchQuery], ({queryKey}) => {
        return axiosInstance.get(`/riddle/api/brewery/all?page=1&limit=20&searchQuery=${queryKey[1]}`);
    }, {
        onSuccess(data) {
            console.log(data);
            setHasMore(breweryQuery.data?.data.lastPage != page);
        },
        onError(err) {
            console.log(err);
        }
    });

    function onLoadMore() {
        setPage((prev) => prev + 1);
    }

    const [, scrollerRef] = useInfiniteScroll({
        hasMore,
        isEnabled: isOpen,
        shouldUseLoader: false, // We don't want to show the loader at the bottom of the list
        onLoadMore
    });

    const queryClient = useQueryClient();

    const huntAddMutation = useMutation((data: any) => axiosInstance.post(`/riddle/api/hunt`, data), {
        onSuccess(data) {
            console.log('post data', data);
            queryClient.invalidateQueries('hunts');
            setMessage('');
            onOpen1();
        },
        onError(error: any) {
            if (Array.isArray(error.response.data.message)) {
                toast.error(error.response.data.message[0], {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light"
                });
            } else {
                toast.error(error.response.data.message, {
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
        }
    });

    function buttonSubmit() {
        const filterRiddles = huntToAdd.riddles.filter((e) => {
            if (e.description=='' || e.hint=='' || e.reward=='' || e.title=='') {
                return e;
            }
        });
        const filterRiddlesNew = huntToAdd.riddles.filter((e) => {
            if (e.description != '' || e.hint != '' || e.reward != '' || e.title != '') {
                return e;
            }
        });
        const addHuntData = {
            ...huntToAdd,
            riddles: filterRiddlesNew
        };
        console.log('addHunt',addHuntData)
        if (filterRiddles.length != 0 || huntToAdd.name=='' || huntToAdd.brewery=='' || huntToAdd.description=='' ) {
            setError(true)
        }
        else {
            setError(false)
            huntAddMutation.mutate(addHuntData);
        }
        // if (filterRiddles) {
        //     const addHuntData = {
        //         ...huntToAdd,
        //         riddles:filterRiddles
        //     }
        //     huntAddMutation.mutate(addHuntData)
        // }
        // else {
        //     setMessage('Please Fill All The Info To Add A New Hunt')
        // }
    }

    console.log('hunt to add', huntToAdd);
    return (
        <>
            <div className="flex justify-between">
                <p className="text-xl font-semibold">Create New Hunt</p>
            </div>
            {message && <p className="text-red-600 text-center">{message}</p>}
            <div className=" border-[0.1rem] p-4 flex flex-col gap-[3rem] rounded-lg">
                <div className="flex flex-col gap-4">
                    <p className="font-semibold">Hunt Details</p>
                    <div className="flex flex-col gap-4 rounded-lg sm:w-[70%] w-full border-[0.1rem] p-4">
                        <Input
                            value={huntToAdd.name}
                            className=" w-full"
                            type="text"
                            isInvalid={huntToAdd.name == '' && error}
                            errorMessage="Please Enter Hunt Name"
                            label="Hunt Name"
                            placeholder="Enter Hunt Name"
                            onChange={(e) => {
                                setHuntToAdd((prev) => {
                                    const find = breweryQuery.data?.data.data.find((j: any) => j.name == e);
                                    return ({
                                        ...prev,
                                        name: e.target.value
                                    });
                                });
                            }}
                            labelPlacement="outside"
                            classNames={{ label: "!font-semibold" }}
                        />
                        <Textarea
                            value={huntToAdd.description}
                            label="Hunt Description"
                            placeholder="Write description..."
                            isInvalid={huntToAdd.description == '' && error}
                            errorMessage="Please Enter Hunt Description"
                            onChange={(e) => {
                                setHuntToAdd((prev) => {
                                    const find = breweryQuery.data?.data.data.find((j: any) => j.name == e);
                                    return ({
                                        ...prev,
                                        description: e.target.value
                                    });
                                });
                            }}
                            className=" w-full"
                            labelPlacement="outside"
                            size="lg"
                            minRows={5}
                            classNames={{ description: "!h-[15rem]", label: "!font-semibold" }}
                        />

                        <Autocomplete
                            className="sm:w-[70%] w-full font-semibold"
                            variant="flat"
                            isLoading={breweryQuery.isLoading}
                            defaultItems={(breweryQuery.data?.data.data ? breweryQuery.data?.data.data : [{
                                name: "",
                                _id: ""
                            }] as any)}
                            label="Brewery Name"
                            labelPlacement="outside"
                            placeholder="Select a Brewery"
                            isInvalid={huntToAdd.brewery == '' && error}
                            errorMessage="Please Select Brewery"
                            defaultSelectedKey={huntToAdd.brewery}
                            scrollRef={scrollerRef}
                            onInputChange={(e) => {
                                setSearchQuery(e);
                            }}
                            onSelectionChange={(e) => {
                                setHuntToAdd((prev: any) => {
                                    // const find = breweryQuery.data?.data.data.find((j: any) => j.name == e)
                                    return ({
                                        ...prev,
                                        brewery: e
                                    });
                                });
                                // console.log(e)
                            }}
                            // selectionMode="single"
                            // classNames={{}}
                            onOpenChange={setIsOpen}
                        >
                            {(item: any) => (
                                <AutocompleteItem key={item._id} className="capitalize">
                                    {item.name}
                                </AutocompleteItem>
                            )}
                        </Autocomplete>
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <h1 className="font-semibold">Create Riddles</h1>
                    {huntToAdd.riddles.map((e, index: number) =>
                        <div className="sm:w-[70%] w-full flex flex-col gap-4 border-[0.1rem] p-4 rounded-lg">
                            <div className="flex gap-4">

                                <Input
                                    value={e.title}
                                    isInvalid={e.title == '' && error}
                                    errorMessage="Please Enter Riddle Title"
                                    onChange={(j) => {
                                        const value = j.target.value;
                                        const find = huntToAdd.riddles.find((e, index1) => index1 == index);
                                        find!.title = value;
                                        const newRiddles = huntToAdd.riddles.map((k, index1) => {
                                            if (index1 == index) {
                                                return find;
                                            }
                                            return k;
                                        });
                                        setHuntToAdd((prev: any) => {
                                            return (
                                                {
                                                    ...prev,
                                                    riddles: newRiddles
                                                }
                                            );
                                        });
                                    }}
                                    className="w-full"
                                    type="text"
                                    label="Title "
                                    placeholder="Enter Riddle Title"
                                    labelPlacement="outside"
                                    classNames={{ label: "!font-semibold" }}
                                />
                            </div>
                            <Textarea
                                value={e.description}
                                label="Description"
                                isInvalid={e.description == '' && error}
                                errorMessage="Please Enter Riddle Description"
                                placeholder="Write description..."
                                onChange={(j) => {
                                    const value = j.target.value;
                                    const find = huntToAdd.riddles.find((e, index1) => index1 == index);
                                    find!.description = value;
                                    const newRiddles = huntToAdd.riddles.map((k, index1) => {
                                        if (index1 == index) {
                                            return find;
                                        }
                                        return k;
                                    });
                                    setHuntToAdd((prev: any) => {
                                        return (
                                            {
                                                ...prev,
                                                riddles: newRiddles
                                            }
                                        );
                                    });
                                }}
                                className="w-full"
                                labelPlacement="outside"
                                size="lg"
                                minRows={10}
                                classNames={{ description: "!h-[15rem]", label: "!font-semibold" }}
                            />
                            <div className="flex gap-4">
                                <Textarea
                                    onChange={(j) => {
                                        const value = j.target.value;
                                        const find = huntToAdd.riddles.find((e, index1) => index1 == index);
                                        find!.reward = value;
                                        const newRiddles = huntToAdd.riddles.map((k, index1) => {
                                            if (index1 == index) {
                                                return find;
                                            }
                                            return k;
                                        });
                                        setHuntToAdd((prev: any) => {
                                            return (
                                                {
                                                    ...prev,
                                                    riddles: newRiddles
                                                }
                                            );
                                        });
                                    }}
                                    value={e.reward}
                                    isInvalid={e.reward == '' && error}
                                    errorMessage="Please Enter Riddle Reward"
                                    label="Reward"
                                    placeholder="Write Reward..."
                                    className="w-full"
                                    labelPlacement="outside"
                                    size="lg"
                                    minRows={5}
                                    classNames={{ description: "!h-[5rem]", label: "!font-semibold" }}
                                /> <Textarea
                                    value={e.hint}
                                    isInvalid={e.hint == '' && error}
                                    errorMessage="Please Enter Riddle Hint"
                                    label="Hint"
                                    onChange={(j) => {
                                        const value = j.target.value;
                                        const find = huntToAdd.riddles.find((e, index1) => index1 == index);
                                        find!.hint = value;
                                        const newRiddles = huntToAdd.riddles.map((k, index1) => {
                                            if (index1 == index) {
                                                return find;
                                            }
                                            return k;
                                        });
                                        setHuntToAdd((prev: any) => {
                                            return (
                                                {
                                                    ...prev,
                                                    riddles: newRiddles
                                                }
                                            );
                                        });
                                    }}
                                    placeholder="Write Hint..."
                                    className="w-full"
                                    labelPlacement="outside"
                                    size="lg"
                                    minRows={5}
                                    classNames={{ description: "!h-[5rem]", label: "!font-semibold" }}
                                />
                            </div>
                            {index != 0 && <button onClick={() => {
                                const oldRiddles = huntToAdd.riddles.filter((j, index1) => index1 != index);
                                setHuntToAdd((prev) => {
                                    return (
                                        {
                                            ...prev,
                                            riddles: oldRiddles
                                        }
                                    );
                                });
                                // setCreateRiddle(!createRiddle)
                                // onOpen1()
                            }} className="px-16 py-2 bg-[#A92223] rounded text-white w-max ">Delete Riddle</button>}
                            {/* <button onClick={() => {
                            // setCreateRiddle(!createRiddle)
                            // onOpen1()
                        }} className="px-16 py-2 bg-[#A92223] rounded text-white w-max">Save</button> */}
                        </div>
                    )}
                </div>
                <div className="flex flex-wrap gap-4">
                    <button onClick={() => {
                        const oldRiddles = huntToAdd.riddles;
                        setHuntToAdd((prev) => {
                            return (
                                {
                                    ...prev,
                                    riddles: [
                                        ...oldRiddles,
                                        {
                                            title: "",
                                            description: "",
                                            reward: "",
                                            hint: ""
                                        }
                                    ]
                                }
                            );
                        });
                        // setCreateRiddle(!createRiddle)
                        // onOpen1()
                    }} className="px-16 py-2 bg-[#A92223] rounded text-white w-max ">Add More Riddles
                    </button>
                    <button onClick={buttonSubmit}
                            className="px-16 py-2 bg-[#A92223] flex justify-center rounded text-white w-max ">{huntAddMutation.isLoading ?
                        <ImSpinner2 className="text-xl animate-spin"/> : "Submit"}</button>
                </div>
                {/* <button onClick={() => {
                    // setCreateRiddle(!createRiddle)
                    // onOpen1()
                }} className="px-16 py-2 bg-[#A92223] rounded text-white w-max ">Add More Riddles</button>
                <button onClick={() => {
                    // setCreateRiddle(!createRiddle)
                    // onOpen1()
                }} className="px-16 py-2 bg-[#A92223] rounded text-white w-max ">Submit</button> */}
            </div>

            <Modal
                size={"xl"}
                isOpen={isOpen1}
                backdrop="blur"
                onOpenChange={onOpenChange1}
                placement="center"
                onClose={() => {
                    navigate.push('/admin/manage-hunts');
                }}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col text-xl gap-1">Hunt Created Successfully</ModalHeader>
                            <ModalBody className="flex flex-col gap-4 pb-8">
                                <p className="text-sm text-gray-400">Riddles have been created successfully & QR Code is
                                    generated</p>
                                {/* <button className="px-16 w-max py-2 bg-[#A92223]  rounded text-white">Okay</button> */}
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}