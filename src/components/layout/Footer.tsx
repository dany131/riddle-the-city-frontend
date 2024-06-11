import Image from "next/image"

export default function Footer() {
    return (
        <>
            <div className="relative min-h-[2rem]">
                <Image priority className="absolute h-full w-full" src={'/images/layout/footerbg.png'} alt="footer bg" width={500} height={200} />
                <div className="relative flex justify-around z-[4] p-[0.8rem]">
                    <p>Copyrights ©2023 Riddle the City | All Rights Reserved</p>
                    <div className="flex gap-4">
                        <p>Privacy Policy</p>
                        <p>Terms & Conditions</p>
                    </div>
                </div>
            </div>
        </>
    )
}