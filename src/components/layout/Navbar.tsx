import Image from "next/image";

export default function Navbar() {
  return (
    <>
      <div
        className="absolute flex justify-center w-full top-[2rem]"
        style={{ fontFamily: "VoiganteDisplay" }}
      >
        <div style={{ background: 'url("/images/layout/navbar.png")',backgroundRepeat:'no-repeat',backgroundSize:'cover' }}
          className="flex flex-col xl:hidden gap-4  px-8 min-w-[85%] py-4 m-auto items-center justify-center">
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
              <p>Home</p>
              <p>Packages</p>
              <p>Breweries</p>
              <p>Treasure Hunt</p>
            </div>
            <div className="flex gap-[1.5rem] sm:gap-16 items-center">
              <p>Riddles</p>
              <p>Booking</p>
              <p>About</p>
              <p>Contact</p>
            </div>
          </div>
        </div>
        <div
          style={{ background: 'url("/images/layout/navbar.png")' }}
          className="hidden gap-16 px-8 xl:flex min-w-[85%] py-4 m-auto items-center justify-center"
        >
          <div className="flex gap-16 items-center">
            <p>Home</p>
            <p>Packages</p>
            <p>Breweries</p>
            <p>Treasure Hunt</p>
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
            <p>Riddles</p>
            <p>Booking</p>
            <p>About</p>
            <p>Contact</p>
          </div>
        </div>
      </div>
    </>
  );
}
