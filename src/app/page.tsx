import Image from "next/image";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
export default function Home() {
  return (
    <>
      <div className="flex flex-col ">
        <div className="min-h-[100vh] relative">
          <Image
            className="absolute top-0 h-full w-full"
            style={{ opacity: "0.2" }}
            src={"/images/home/home-banner.png"}
            alt="home-banner"
            width={1000}
            height={500}
          />
          <div className="pt-56 flex gap-4 px-28 pb-16 justify-center">
            <div className="flex flex-col gap-4 w-1/2 justify-center">
              <p style={{ fontFamily: "VoiganteDisplay" }} className="text-5xl">
                Treasure Hunt through Nashville Breweries
              </p>
              <p className="text-sm font-extralight">
                That is the inspiration for my Treasure Hunts.  I want to bring
                joy to others while experiencing joy myself.  I trust your
                experience is everything you hoped it would be, and then some.
              </p>
              <button className="relative h-[3rem] self-start flex justify-center items-center p-8">
                <Image
                  className="w-full h-full absolute top-0 w-full h-full z-[-1]"
                  src={"/images/button/Frame.svg"}
                  alt="button Frame 1"
                  width={50}
                  height={50}
                />
                <p>Explore Packages</p>
              </button>
            </div>
            <div className="w-1/2">
              <div className="h-[28rem] w-full">
                <Image
                  className="w-full h-full"
                  src={"/images/home/home-img1.svg"}
                  alt="home img1"
                  width={150}
                  height={150}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="px-28 flex flex-col items-center gap-8 relative">
          <Image
            className="absolute w-full h-full z-[-1]"
            style={{ opacity: "0.2" }}
            src={"/images/home/featured-package.png"}
            alt="featured package"
            width={400}
            height={500}
          />
          <div className="pt-8">
            <div className="flex items-center gap-4 ">
              <div className="h-[0.5rem] rounded-full w-[5rem] bg-orange-400"></div>
              <p style={{ fontFamily: "VoiganteDisplay" }}>Packages</p>
              <div className="h-[0.5rem] rounded-full w-[5rem] bg-orange-400"></div>
            </div>
          </div>
          <div>
            <p className="text-5xl" style={{ fontFamily: "VoiganteDisplay" }}>
              Featured Packages
            </p>
          </div>
          <div className="flex flex-wrap gap-8 mb-16">
            <div
              className="h-[30rem] w-[28rem] flex flex-col items-center pt-16"
              style={{
                background: "url('/images/home/featured-frame.svg')",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                fontFamily: "VoiganteDisplay",
              }}
            >
              <div className="bg-[#1413135e] min-w-[50%] p-4">
                <p className="w-full text-center text-xl">Day Pass</p>
              </div>
              <div className="flex flex-col gap-4 mt-16">
                <div>
                  <p className="text-center text-lg">$29 per person</p>
                </div>
                <div>
                  <p className="text-center text-lg">$29 per week</p>
                </div>
                <div>
                  <p className="text-center text-lg">
                    Unlimited Brewery Visits
                  </p>
                </div>
              </div>
            </div>
            <div
              className="h-[30rem] w-[28rem] flex flex-col items-center pt-16"
              style={{
                background: "url('/images/home/featured-frame.svg')",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                fontFamily: "VoiganteDisplay",
              }}
            >
              <div className="bg-[#1413135e] min-w-[50%] p-4">
                <p className="w-full text-center text-xl">
                  Single Brewery Pass
                </p>
              </div>
              <div className="flex flex-col gap-4 mt-16">
                <div>
                  <p className="text-center text-lg">$10 per person</p>
                </div>
                <div>
                  <p className="text-center text-lg">$20 for a family with 2</p>
                </div>
                <div>
                  <p className="text-center text-lg">adults, for one brewery</p>
                </div>
              </div>
            </div>
            <div
              className="h-[30rem] w-[28rem] flex flex-col items-center pt-16"
              style={{
                background: "url('/images/home/featured-frame.svg')",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                fontFamily: "VoiganteDisplay",
              }}
            >
              <div className="bg-[#1413135e] min-w-[50%] p-4">
                <p className="w-full text-center text-xl">
                  Single Person Membership
                </p>
              </div>
              <div className="flex flex-col gap-4 mt-16">
                <div>
                  <p className="text-center text-lg">$79 per year</p>
                </div>
                <div>
                  <p className="text-center text-lg">Unlimited Hunts for</p>
                </div>
                <div>
                  <p className="text-center text-lg">One Person</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-4 px-28 mt-16">
          <div className="w-1/2 flex flex-col gap-4 items-center justify-center">
            <div className="flex items-center gap-4 self-start">
              <div className="h-[0.5rem] rounded-full w-[5rem] bg-orange-400"></div>
              <p>About Us</p>
              <div className="h-[0.5rem] rounded-full w-[5rem] bg-orange-400"></div>
            </div>
            <div className="flex flex-col gap-4">
              <p className="text-6xl" style={{ fontFamily: "VoiganteDisplay" }}>
                Riddle the City
              </p>
              <p className="text-sm">
                I remember having treasure hunts as a child and how much fun it
                was to figure out all of the clues.  Some were simple, while
                others took a bit to puzzle out.  I can honestly say I don't
                remember any prizes.  The journey on the way was the real
                adventure.
              </p>
              <p className="text-sm">
                That is the inspiration for my Treasure Hunts.  I want to bring
                joy to others while experiencing joy myself.  I trust your
                experience is everything you hoped it would be, and then some. ​
              </p>
              <button className="relative h-[3rem] self-start flex justify-center items-center mt-4 p-8">
                <Image
                  className="w-full h-full absolute top-0 w-full h-full z-[-1]"
                  src={"/images/button/Frame.svg"}
                  alt="button Frame 1"
                  width={50}
                  height={50}
                />
                <p>Explore Packages</p>
              </button>
            </div>
          </div>
          <div className="w-1/2">
            <div className="h-[25rem]">
              <Image
                className="w-full h-full"
                src={"/images/home/aboutus.svg"}
                alt="about us"
                width={200}
                height={300}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col mt-16">
          <div className="flex flex-col gap-8">
            <div className="px-28 flex items-center gap-4 self-start">
              <div className="h-[0.5rem] rounded-full w-[5rem] bg-orange-400"></div>
              <p>Testimonials</p>
              <div className="h-[0.5rem] rounded-full w-[5rem] bg-orange-400"></div>
            </div>
            <div className="px-28 flex gap-8 justify-between">
              <h1 className={`text-4xl `} style={{ fontFamily: "VoiganteDisplay" }}>What Client Say About Us</h1>
              <div className="flex gap-4">
                <button className="min-h-[3rem] w-[3rem]">
                  <Image className="w-full h-full" priority src={'/images/layout/forwardButton.svg'} alt="back button" width={100} height={100} />
                </button>
                <button className="min-h-[3rem] w-[3rem]">
                  <Image className="w-full h-full" priority src={'/images/layout/backButton.svg'} alt="back button" width={100} height={100} />
                </button>
              </div>
            </div>
            <div className="flex gap-16 ">
              <div className="w-[40%] min-h-[15rem] relative" >
                <Image
                  className="w-full h-full absolute top-0 z-[-1]"
                  src={"/images/layout/testimonialBox.png"}
                  alt="about us"
                  width={200}
                  height={300}
                />
                <div className="flex flex-col w-full p-16">
                  <div className="flex justify-between gap-8 mb-4">
                    <div className="w-[3rem] h-[3rem]">
                      <Image
                        className="w-full h-full"
                        src={"/images/layout/person.png"}
                        alt="client"
                        width={50}
                        height={50}
                      />
                    </div>
                    <div>
                      <p>Sarah Thompson</p>
                      <p>Customer</p>
                    </div>
                    <div className="w-[6rem] h-[4rem]">
                      <Image
                        className="w-full h-full"
                        src={"/images/layout/stars.png"}
                        alt="client"
                        width={50}
                        height={50}
                      />
                    </div>
                  </div>
                  <p className="w-full">I remember having treasure hunts as a child and how much fun it was to figure out all of the clues.  Some were simple, while others took a bit to puzzle out.  I can honestly say I don't remember any prizes.  The journey on the way was the real adventure.</p>
                </div>
              </div>
              <div className="w-[40%] min-h-[15rem] relative" >
                <Image
                  className="w-full h-full absolute top-0 z-[-1]"
                  src={"/images/layout/testimonialBox.png"}
                  alt="about us"
                  width={200}
                  height={300}
                />
                <div className="flex flex-col w-full p-16">
                  <div className="flex justify-between gap-8 mb-4">
                    <div className="w-[3rem] h-[3rem]">
                      <Image
                        className="w-full h-full"
                        src={"/images/layout/person.png"}
                        alt="client"
                        width={50}
                        height={50}
                      />
                    </div>
                    <div>
                      <p>Sarah Thompson</p>
                      <p>Customer</p>
                    </div>
                    <div className="w-[6rem] h-[4rem]">
                      <Image
                        className="w-full h-full"
                        src={"/images/layout/stars.png"}
                        alt="client"
                        width={50}
                        height={50}
                      />
                    </div>
                  </div>
                  <p className="w-full">I remember having treasure hunts as a child and how much fun it was to figure out all of the clues.  Some were simple, while others took a bit to puzzle out.  I can honestly say I don't remember any prizes.  The journey on the way was the real adventure.</p>
                </div>
              </div>
              <div className="w-[40%] min-h-[15rem] relative" >
                <Image
                  className="w-full h-full absolute top-0 z-[-1]"
                  src={"/images/layout/testimonialBox.png"}
                  alt="about us"
                  width={200}
                  height={300}
                />
                <div className="flex flex-col w-full p-16">
                  <div className="flex justify-between gap-8 mb-4">
                    <div className="w-[3rem] h-[3rem]">
                      <Image
                        className="w-full h-full"
                        src={"/images/layout/person.png"}
                        alt="client"
                        width={50}
                        height={50}
                      />
                    </div>
                    <div>
                      <p>Sarah Thompson</p>
                      <p>Customer</p>
                    </div>
                    <div className="w-[6rem] h-[4rem]">
                      <Image
                        className="w-full h-full"
                        src={"/images/layout/stars.png"}
                        alt="client"
                        width={50}
                        height={50}
                      />
                    </div>
                  </div>
                  <p className="w-full">I remember having treasure hunts as a child and how much fun it was to figure out all of the clues.  Some were simple, while others took a bit to puzzle out.  I can honestly say I don't remember any prizes.  The journey on the way was the real adventure.</p>
                </div>
              </div>
              <div className="w-[40%] min-h-[15rem] relative" >
                <Image
                  className="w-full h-full absolute top-0 z-[-1]"
                  src={"/images/layout/testimonialBox.png"}
                  alt="about us"
                  width={200}
                  height={300}
                />
                <div className="flex flex-col w-full p-16">
                  <div className="flex justify-between gap-8 mb-4">
                    <div className="w-[3rem] h-[3rem]">
                      <Image
                        className="w-full h-full"
                        src={"/images/layout/person.png"}
                        alt="client"
                        width={50}
                        height={50}
                      />
                    </div>
                    <div>
                      <p>Sarah Thompson</p>
                      <p>Customer</p>
                    </div>
                    <div className="w-[6rem] h-[4rem]">
                      <Image
                        className="w-full h-full"
                        src={"/images/layout/stars.png"}
                        alt="client"
                        width={50}
                        height={50}
                      />
                    </div>
                  </div>
                  <p className="w-full">I remember having treasure hunts as a child and how much fun it was to figure out all of the clues.  Some were simple, while others took a bit to puzzle out.  I can honestly say I don't remember any prizes.  The journey on the way was the real adventure.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative min-h-[30rem] mt-16 ">
          <Image priority className="w-full h-full absolute" style={{opacity:'0.3'}} src={'/images/home/mystery.png'} alt="mystery" width={500} height={700} />
          <div className="px-32 py-8 mt-16">
            <div className="relative min-h-[6rem] p-2">
              <Image priority className="w-full h-full absolute z-[1]" src={'/images/home/mystery-nav.png'} alt="mystery nav" width={300} height={300} />
              <div className="mt-8 flex flex-col px-16 pb-4 gap-4">
                <div className="flex items-center gap-4  relative z-[4]">
                  <div className="min-h-[0.5rem] rounded-full w-[5rem] bg-orange-400"></div>
                  <p style={{ fontFamily: "VoiganteDisplay" }}>Packages</p>
                  <div className="min-h-[0.5rem] rounded-full w-[5rem] bg-orange-400"></div>
                </div>
                <div className="z-[4] relative flex justify-between">
                  <p className="text-[2.2rem]" style={{fontFamily:'VoiganteDisplay'}}>Join the Ultimate Treasure Hunt Adventure!</p>
                  <button className="relative h-[3rem]  flex justify-center items-center px-20 py-2 box-border">
                    <Image
                      className="w-full h-full absolute top-0 w-full h-full z-[-1]"
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
           
            <div className="p-8 flex gap-8 justify-center">
              <div className="w-1/2 flex flex-col gap-4">
                <div className="min-h-[5rem] w-[5rem]">
                  <Image priority className="w-full h-full" src={'/images/layout/riddleNavbar.png'} alt="mystery nav" width={300} height={300} />
                </div>
                <p className="text-sm">That is the inspiration for my Treasure Hunts.  I want to bring joy to others while experiencing joy myself.  I trust your experience is everything you hoped it would be, and then some.</p>
                <div className="flex gap-4">
                  <FaFacebook className="text-xl"/>
                  <FaTwitter className="text-xl" />
                  <FaInstagram className="text-xl"/>
                </div>
              </div>
              <div className="w-1/4 flex flex-col gap-4">
                <p>Quick Links</p>
                <p>Home</p>
                <p>About Us</p>
                <p>Breweries</p>
                <p>Booking</p>
                <p>Riddles</p>
              </div>
              <div className="w-1/4 flex flex-col gap-4">
                <p className="mt-[2.75rem]">Treasure Hunt</p>
                <p>Packages</p>
              </div>
              <div className="w-1/4 flex flex-col gap-4">
                <p>Support</p>
                <p>Feedback</p>
                <p>FAQ</p>
                <p>Contact US</p>
              </div>
            </div>
            

          </div>
        </div>
      </div>
    </>
  );
}
