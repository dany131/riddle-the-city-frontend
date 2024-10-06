'use client';
import {
    Button,
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
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ModalHomeWithButton(){
    const router = useRouter(); // Initialize the router

    const {isOpen: isOpen1, onOpen: onOpen1, onOpenChange: onOpenChange1} = useDisclosure();


    const handleLoginClick = () => {
        router.push('/auth/login'); // Navigate to the login page
    };

    return (
        <>
        <button onClick={() => {
                onOpen1();
            }}
            className="relative h-[3rem]  flex justify-center items-center px-8 py-4 sm:px-20 sm:py-2 box-border">
            <Image
                
                className="w-full h-full absolute top-0 w-full h-full z-[2] sm:object-contain object-cover"
                src={"/images/button/Frame.svg"}
                alt="button Frame 1"
                width={50}
                height={50}
            />
            <p className="w-max relative z-[4]">Book Now</p>
        </button>
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
                    <ModalHeader className="flex flex-col text-xl gap-1 text-center">Register Yourself!</ModalHeader>
                    <ModalBody className="flex flex-col gap-4 pb-8 items-center">
                        <p className="text-sm text-gray-400">Please register yourself before booking.</p>
                        <button onClick={handleLoginClick}
                                className="px-16 w-max py-2 bg-[#A92223]  rounded text-white">Okay
                        </button>
                    </ModalBody>
                </>
            )}
        </ModalContent>
    </Modal>
        </>
    )
}