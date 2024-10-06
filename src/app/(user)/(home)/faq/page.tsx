'use client';
import Image from "next/image";
import {useState} from "react";


export default function Faq() {
    const [activeIndex, setActiveIndex] = useState(null);

    const faqs = [
        {
            question: "What do I need to bring to my treasure hunt?",
            answer: "A smartphone with QR code scanning capabilities, a small flashlight (a friend with another smartphone will do), and a sense of adventure."
        },
        {
            question: "How long do your treasure hunts take?",
            answer: "It all depends on you. Most of them have 5 riddles to solve. This can be accomplished in under an hour. You hunt at your own pace, claiming the prizes as you earn them or waiting until the end of the hunt to claim your booty. You can even claim your rewards at a later date if you are pressed for time."
        },
        {
            question: "Do I have to claim my rewards immediately?",
            answer: "No, you can continue the hunt and claim them at a later date."
        },
        {
            question: "Do 3 day passes start at the time of purchase or when I start my first hunt?",
            answer: "Currently they start at the time of purchase, so be sure to be on site before purchasing the 3 day pass. The single brewery pass can be purchased well in advance or onsite."
        },
        {
            question: "How do your treasure hunts work?",
            answer: "You solve riddles to find QR codes hidden within or around the brewery. Riddles are made to be semi-challenging. There is a hint button that you can click to get you closer to the answer. Scan the QR codes and earn rewards. The final reward is a physical prize you pick from our treasure chests."
        },
        {
            question: "What if I don’t have cellphone reception at a brewery?",
            answer: "Most breweries have their own wi-fi network. Just ask for the password and login."
        },
        {
            question: "Are these hunts appropriate for children?",
            answer: "Yes, riddles are written to be family friendly. But, most rewards (often in the form of discounts) are geared more towards adults. The physical reward at the end could be for anyone."
        },
        {
            question: "I know a brewery is open but you have it marked as closed. Why?",
            answer: "This is probably due to a private event at that location. When private events are taking place the treasure hunts will be unavailable."
        },
        {
            question: "Do you have group treasure hunts?",
            answer: "You can definitely hunt in a group but if you want to earn rewards each participant needs to purchase the hunt and scan each QR code."
        },
        {
            question: "Can I hunt the same hunt multiple times?",
            answer: "You currently can only hunt each brewery once per day. But if you have a 3 day pass or membership you can come back every day the hunt is available."
        },
        {
            question: "Can you bring Riddle the City to my town?",
            answer: "Possibly. We are looking for good places to expand. Send us your suggestions and we’ll add your town to our list. RiddletheCity@gmail.com"
        },
        {
            question: "What is your contact information?",
            answer: "You can reach us by email at RiddletheCity@gmail.com, by phone at (615) 380-1111, or by mail at 301 Northcreek Blvd, Unit 116, Goodlettsville, TN 37072."
        }
    ];

    const toggleFaq = (index: any) => {
        if (activeIndex === index) {
            setActiveIndex(null); // Close the currently active one if clicked again
        } else {
            setActiveIndex(index); // Open the clicked one
        }
    };

    return (
        <>
            <div className="flex flex-col" style={{fontFamily: "VoiganteDisplay"}}>
                <div className="min-h-[70vh] relative">
                    <Image
                        
                        className="absolute top-0 h-full object-cover w-full"
                        style={{opacity: "1"}}
                        src={"/images/layout/Mask group.svg"}
                        alt="home-banner"
                        width={1000}
                        height={500}
                    />
                    <div
                        className="pt-[23rem] sm:pt-72 md:pt-56 z-[999] relative flex flex-col md:flex-nowrap flex-wrap gap-4 px-8 sm:px-28 pb-16 ">
                        <p>Home <span className="mx-2">/</span> FAQ</p>
                        <h1 className="text-[4rem]">FAQs</h1>
                    </div>
                </div>

                <div className="px-8 mt-24 sm:px-4 pb-16 flex flex-col items-center gap-8 relative">
                    <div className="flex items-center gap-4">
                        <div className="h-[0.5rem] rounded-full w-[5rem] bg-orange-400"></div>
                        <p style={{fontFamily: "VoiganteDisplay"}}>FAQs</p>
                        <div className="h-[0.5rem] rounded-full w-[5rem] bg-orange-400"></div>
                    </div>

                    {/* FAQs Dropdown Section */}
                    <div className="w-full sm:w-3/4">
                        {faqs.map((faq, index) => (
                            <div key={index} className="my-4 border-b border-gray-300">
                                <div
                                    className="flex justify-between items-center cursor-pointer py-2"
                                    onClick={() => toggleFaq(index)}
                                >
                                    <h3 className="text-xl font-semibold text-orange-400">
                                        {faq.question}
                                    </h3>
                                    <span className="text-orange-400">
                                        {activeIndex === index ? '-' : '+'}
                                    </span>
                                </div>
                                {activeIndex === index && (
                                    <p className="mt-2 text-lg">{faq.answer}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}