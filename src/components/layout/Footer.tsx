'use client';
import Image from "next/image";
import {FaFacebook, FaInstagram} from "react-icons/fa";
import {
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    useDisclosure
} from "@nextui-org/react";
import Link from "next/link";
import {useRouter} from "next/navigation";


export default function Footer() {
    const router = useRouter(); // Initialize the router

    const {isOpen: isOpen1, onOpen: onOpen1, onOpenChange: onOpenChange1} = useDisclosure();

    const handleLoginClick = () => {
        router.push('/auth/login'); // Navigate to the login page
    };

    return (
        <>
            <div className="relative min-h-[30rem] Voigante mt-16 ">
                <Image
                    priority className="w-full h-full absolute" style={{opacity: '0.1'}}
                    src={'/images/home/mystery.png'} alt="mystery" width={500} height={700}/>
                <div className="px-8 sm:px-32 py-8 mt-16">
                    <div className="relative min-h-[6rem]  p-2">
                        <Image
                            priority className="w-full h-full absolute z-[1]" src={'/images/home/check.png'}
                            alt="mystery nav" width={300} height={300}/>
                        <div className="mt-8 flex flex-col px-16 pb-4 gap-4">
                            <div className="flex items-center gap-4  relative z-[4]">
                                <div className="min-h-[0.5rem] rounded-full w-[5rem] bg-orange-400"></div>
                                <p style={{fontFamily: "VoiganteDisplay"}}>🗺️ Embark on an Exciting Journey!</p>
                                <div className="min-h-[0.5rem] rounded-full w-[5rem] bg-orange-400"></div>
                            </div>
                            <div className="z-[4] relative flex flex-wrap gap-8 sm:gap-0 sm:justify-between">
                                <p className="text-[1.5rem] sm:text-[2.2rem] Voigante">Join the Ultimate Treasure Hunt
                                    Adventure!</p>
                                <button onClick={() => {
                                    onOpen1();
                                }}
                                        className="relative h-[3rem]  flex justify-center items-center px-8 py-4 sm:px-20 sm:py-2 box-border">
                                    <Image
                                        priority
                                        className="w-full h-full absolute top-0 w-full h-full z-[-1] sm:object-contain object-cover"
                                        src={"/images/button/Frame.svg"}
                                        alt="button Frame 1"
                                        width={50}
                                        height={50}
                                    />
                                    <p className="w-max">Book Now</p>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div
                        className="pt-8 px-0 sm:p-8 relative z-[1] flex flex-wrap sm:flex-nowrap justify-between sm:justify-start  sm:gap-8 justify-center">
                        <div className="w-1/2 flex flex-col gap-4">
                            <div className="min-h-[5rem] w-[5rem]">
                                <Image
                                    priority className="w-full h-full" src={'/images/layout/riddleNavbar.png'}
                                    alt="mystery nav" width={300} height={300}/>
                            </div>
                            <p className="text-sm">That is the inspiration for my Treasure Hunts. I want to bring joy to
                                others while experiencing joy myself. I trust your experience is everything you hoped it
                                would be, and then some.</p>
                            <div className="flex gap-4">
                                {/* Facebook Link */}
                                <Link href="https://www.facebook.com/RiddleTheCity" target="_blank"
                                      rel="noopener noreferrer">
                                    <FaFacebook className="rounded-full text-black p-1 text-2xl bg-[#E2CEAB]"/>
                                </Link>
                                {/*<FaTwitter className="  rounded-full text-black p-1  text-2xl bg-[#E2CEAB]"/>*/}
                                <Link href="https://www.instagram.com/riddlethecity" target="_blank"
                                      rel="noopener noreferrer">
                                    <FaInstagram className=" rounded-full text-black p-1  text-2xl bg-[#E2CEAB]"/>
                                </Link>
                            </div>
                        </div>
                        <div className="w-1/2 p-4 sm:w-1/4 flex flex-col gap-4">
                            <p className="text-xl">Quick Links</p>
                            <Link href={'/'}>Home</Link>
                            <Link href={`/about`}>About Us</Link>
                            <Link href={'/listings'}>Breweries</Link>

                        </div>
                        <div className="w-1/2 pt-4 sm:w-1/4 flex flex-col gap-4">
                            <Link href={`${process.env.NEXT_PUBLIC_BASEURL}/#packages`}>Packages</Link>
                        </div>
                        <div className="w-1/2 p-4 sm:w-1/4 flex flex-col gap-4">
                            {/*<p>Support</p>*/}
                            {/*<p>Feedback</p>*/}
                            <Link href={'/faq'}>FAQ</Link>
                            <Link href={'/contact'}>Contact US</Link>
                        </div>
                    </div>


                </div>
            </div>
            <div className="relative min-h-[2rem]">
                <Image priority className="absolute object-cover h-full w-full" src={'/images/layout/footerbg.png'} alt="footer bg"
                       width={500} height={200}/>
                <div className="relative flex flex-wrap justify-around z-[4] p-[0.8rem]">
                    <p className="text-center">Copyrights ©2023 Riddle the City | All Rights Reserved</p>
                    <div className="flex gap-4">
                        <p>Privacy Policy</p>
                        <p>Terms & Conditions</p>
                    </div>
                </div>
            </div>
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
                            <ModalHeader className="flex flex-col text-xl gap-1">Register Yourself!</ModalHeader>
                            <ModalBody className="flex flex-col gap-4 pb-8">
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
    );
}