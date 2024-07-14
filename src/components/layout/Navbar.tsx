import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <>
      <div
        className="absolute flex justify-center w-full top-[2rem]  "
        style={{ fontFamily: "VoiganteDisplay" }}
      >
        <div style={{ background: 'url("/images/layout/navbar.png")',backgroundRepeat:'no-repeat',backgroundSize:'cover' }}
          className="flex flex-col xl:hidden gap-4 z-[99999999999999999999999] relative px-8 min-w-[85%] py-4 m-auto items-center justify-center">
          <div className="flex justify-center">
            <Image
              src={"/images/layout/riddleNavbar.png"}
              alt="riddle logo"
              width={100}
              height={100}
            />
          </div>
          <div className="flex gap-4 flex-wrap justify-center ">
            <div className="flex gap-[1.5rem] sm:gap-16 items-center">
              <Link className="cursor-pointer" href={'/'}>Home</Link>
              <Link className="cursor-pointer" href={'/packages'}>Packages</Link>
              <Link href={'/breweries'}>Breweries</Link>
              <Link href={'treasure-hunt'}>Treasure Hunt</Link>
            </div>
            <div className="flex gap-[1.5rem] sm:gap-16 items-center">
              <Link href={'/riddles'}>Riddles</Link>
              <Link href={'/booking'}>Booking</Link>
              <Link href={'/about'}>About</Link>
              <Link href={'/contact'}>Contact</Link>
            </div>
          </div>
        </div>
        <div
          style={{ background: 'url("/images/layout/navbar.png")' }}
          className="hidden gap-16 px-8 xl:flex z-[99999999999999999999999] relative min-w-[85%] py-4 m-auto items-center justify-center"
        >
          <div className="flex gap-16 items-center">
            <Link className="cursor-pointer" href={'/'}>Home</Link>
            <Link className="cursor-pointer" href={'/packages'}>Packages</Link>
            <Link href={'/breweries'}>Breweries</Link>
            <Link href={'treasure-hunt'}>Treasure Hunt</Link>
          </div>
          <div>
            <Image
              src={"/images/layout/riddleNavbar.png"}
              alt="riddle logo"
              width={100}
              height={100}
            />
          </div>
          <div className="flex gap-16 items-center">
            <Link href={'/riddles'}>Riddles</Link>
            <Link href={'/booking'}>Booking</Link>
            <Link href={'/about'}>About</Link>
            <Link href={'/contact'}>Contact</Link>
          </div>
        </div>
      </div>
    </>
  );
}
