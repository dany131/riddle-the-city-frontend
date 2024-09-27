'use client'
import axiosInstance from "@/app/utils/axiosInstance"
import { Checkbox, Textarea } from "@nextui-org/react"
import { Vujahday_Script } from "next/font/google"
import Image from "next/image"
import { FormEvent } from "react"
import { ImSpinner2 } from "react-icons/im"
import { useMutation } from "react-query"
const Vujahday = Vujahday_Script(
    {
        weight: "400",
        subsets: ['latin']
    }
)
export default function Contact() {
    const contactMutation = useMutation((data:any) => axiosInstance.post('/platform/contact-us', data))
    function handleSubmit(e: FormEvent) {
        e.preventDefault()
        const form = e.target as any as HTMLFormElement
        const formData = new FormData(form)
        console.log([...formData.entries()])
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            message:formData.get('message')
        }
        contactMutation.mutate(data)
    }
    return (
        <>
            <div className="flex flex-col" style={{ fontFamily: "VoiganteDisplay" }}>
                <div className="min-h-[70vh] relative">
                    <Image
                        priority
                        className="absolute top-0 h-full w-full"
                        style={{ opacity: "1" }}
                        src={"/images/contact/image 14.png"}
                        alt="home-banner"
                        width={1000}
                        height={500}
                    />
                    <div className="pt-[16rem] sm:pt-72 md:pt-56 z-[9999999] relative flex flex-col md:flex-nowrap flex-wrap gap-4 px-8 sm:px-28 pb-16 ">
                        <p>Home <span className="mx-2">/</span> Contact</p>
                        <h1 className="text-[4rem]">Contact</h1>
                    </div>
                </div>
                <div className="px-8 mt-24  sm:px-4 pb-16 flex flex-col items-center gap-8 relative">
                    <div className="flex flex-wrap w-full gap-4 justify-center">
                        <div className="flex flex-col gap-[2.5rem] sm:min-w-[20%] min-w-[100%]  items-center bg-[#2A1B15] p-8">
                            <div className="relative flex flex-col items-center gap-2">
                                <Image className="top-0 left-[20%] h-[3rem] w-[3rem]" src={'/images/contact/Vector (4).svg'} width={80} height={80} alt="strawberry icon" />
                                <p className={`text-4xl ${Vujahday.className} text-[#DF9135]`} >address</p>
                            </div>
                            <h1 className="text-lg">ADDRESS</h1>
                            <div>
                                <p>301 Northcreek Blvd, </p>
                                <p>Unit 116 Goodlettsville, TN 37072</p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-[2.5rem] sm:min-w-[20%]  min-w-[100%]  items-center bg-[#2A1B15] p-8">
                            <div className="relative flex flex-col items-center gap-2">
                                <Image className=" top-0 left-[20%] h-[3rem] w-[3rem]" src={'/images/contact/Vector (5).svg'} width={80} height={80} alt="strawberry icon" />
                                <p className={`text-4xl ${Vujahday.className} text-[#DF9135]`} >phone</p>
                            </div>
                            <h1 className="text-lg">PHONE</h1>
                            <div>
                                <p>1 (615) 380-1111</p>
                                {/*<p>1 (200) 123-4567</p>*/}
                            </div>
                        </div>
                        <div className="flex flex-col gap-[2.5rem] sm:min-w-[20%]  min-w-[100%] items-center bg-[#2A1B15] p-8">
                            <div className="relative flex flex-col items-center gap-2">
                                <Image className=" top-0 left-[20%] h-[3rem] w-[3rem]" src={'/images/contact/Vector (6).svg'} width={80} height={80} alt="strawberry icon" />
                                <p className={`text-4xl ${Vujahday.className} text-[#DF9135]`} >mail</p>
                            </div>
                            <h1 className="text-lg">MAIL</h1>
                            <div>
                                <p>riddlethecity@gmail.com</p>
                                {/*<p>hr@yoursite.com</p>*/}
                            </div>
                        </div>
                        <div className="flex flex-col gap-[2.5rem] sm:min-w-[20%]  min-w-[100%] items-center bg-[#2A1B15] p-8">
                            <div className="relative flex flex-col items-center gap-2">
                                <Image className=" top-0 left-[20%] h-[3rem] w-[3rem]" src={'/images/contact/Vector (7).svg'} width={80} height={80} alt="strawberry icon" />
                                <p className={`text-4xl ${Vujahday.className} text-[#DF9135]`} >hours</p>
                            </div>
                            <h1>HOURS</h1>
                            <div className="flex flex-col items-center">
                                <p>Variable based on Brewery hours</p>
                                {/*<p>Sat: 9 AM - 4 PM,</p>*/}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="px-8 mt-24  sm:px-4 pb-16 flex flex-col items-center gap-8 relative">
                    <div className="flex items-center gap-4">
                        <div className="h-[0.5rem] rounded-full w-[5rem] bg-orange-400"></div>
                        <p style={{ fontFamily: "VoiganteDisplay" }}>Contact Us</p>
                        <div className="h-[0.5rem] rounded-full w-[5rem] bg-orange-400"></div>
                    </div>
                    <h1 style={{ fontWeight: 400 }} className="text-[3rem] Voigante">Get in Touch</h1>
                    <form onSubmit={handleSubmit} className="sm:w-[70%] flex flex-wrap  gap-2">
                        <div className="flex w-full gap-4">
                            <input  required className="w-full p-2 bg-[#2A1B15] border-2 border-[#867460] rounded" type="text" name="name" id="" placeholder="Name"/>
                            <input required className="w-full p-2 bg-[#2A1B15] border-2 border-[#867460] rounded" type="text" name="email" id="" placeholder="E-mail"/>
                        </div>
                        <Textarea
                            required
                            name="message"
                            variant={'bordered'}
                            minRows={100}
                            // label="Description"
                            // labelPlacement="outside"
                            placeholder="Message"
                            className="w-full "
                            classNames={{
                                // base: "!bg-[#2A1B15]",
                                // description:"!bg-[#2A1B15]",
                                input: "!bg-[#2A1B15] !border-none !outline-none !border-2 !rounded !border-[#867460]",
                                inputWrapper: "!border-none !outline-none !border-2 !p-0 !rounded !border-[#867460] ",
                                innerWrapper:"!rounded !border-2 !border-[#867460] "

                            }}
                        />
                        <div className="flex flex-col gap-4 items-start">
                            <Checkbox required><p className="text-gray-400">I agree that my submitted data is being collected and stored.</p></Checkbox>
                            <button type="submit" className="relative h-[3rem]  z-[1]  flex justify-center items-center px-8 py-4 sm:px-8 sm:py-2 box-border">
                                <Image
                                    priority
                                    className="w-full h-full absolute top-0 w-full h-full z-[-1] object-contain"
                                    src={"/images/button/Frame.svg"}
                                    alt="button Frame 1"
                                    width={50}
                                    height={50}
                                />
                                <p className="w-max p-4">{contactMutation.isLoading ? <ImSpinner2 className="text-xl animate-spin" /> : "Submit Now"}</p>
                            </button>
                            {/* <div className="p-[0.3rem] border-[#867460] max-h-[0.3rem] border-2"></div>
                            <p>I agree that my submitted data is being collected and stored.</p> */}
                        </div>

                    </form>
                </div>
            </div>
        </>
    )
}