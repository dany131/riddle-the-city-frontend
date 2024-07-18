'use client';

import { Bar, Line, PolarArea } from "react-chartjs-2"
import { Chart, ArcElement, RadialLinearScale, CategoryScale, LinearScale, PointElement,LineElement,BarElement } from 'chart.js'
import Image from "next/image";
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, useDisclosure } from "@nextui-org/react";

import { AiOutlineStock } from "react-icons/ai";
Chart.register(RadialLinearScale);
Chart.register(CategoryScale);
Chart.register(LinearScale);
Chart.register(ArcElement);
Chart.register(PointElement);
Chart.register(LineElement);
Chart.register(BarElement);


const options: any = {
    responsive: true,
    plugins: {
        legend: {
            position: "bottom",
        },
        title: {
            display: true,
            text: "Pie Chart Example",
        },
    },
};

const selections = [
    { label: 'Open', key: 1 }
]

export default function Dashboard() {
    return (
        <>
            <div className="flex justify-between">
                <p className="text-xl font-semibold">Dashboard</p>
            </div>

            <div className="flex gap-4 flex-wrap sm:flex-nowrap">
                <div className="flex gap-4 p-4 w-full justify-between items-center border-[0.15rem] rounded-lg">
                    <div className="flex flex-col gap-2">
                        <p className="font-semibold">Active Hunts</p>
                        <p className="font-bold text-3xl">110</p>
                        <p className="p-1 w-max bg-green-200 text-green-600 rounded-full flex gap-2 items-center"><AiOutlineStock /> 12.08%</p>
                    </div>
                    <div className="h-[5rem] w-[5rem] bg-gray-200 p-4 rounded-full">
                        <Image className="w-full h-full object-contain" src={'/images/admin/main/dashboard/drink.svg'} alt="drink" width={100} height={100}/>
                    </div>
                </div>
                <div className="flex gap-4 p-4 w-full justify-between items-center border-[0.15rem] rounded-lg">
                    <div className="flex flex-col gap-2">
                        <p className="font-semibold">User Engagement</p>
                        <p className="font-bold text-3xl">1.2K</p>
                        <p className="p-1 w-max bg-green-200 text-green-600 rounded-full flex gap-2 items-center"><AiOutlineStock /> 12.08%</p>
                    </div>
                    <div className="h-[5rem] w-[5rem] bg-gray-200 p-4 rounded-full">
                        <Image className="w-full h-full object-contain" src={'/images/admin/main/dashboard/drink.svg'} alt="drink" width={100} height={100} />
                    </div>
                </div>
                <div className="flex gap-4 p-4 w-full justify-between items-center border-[0.15rem] rounded-lg">
                    <div className="flex flex-col gap-2">
                        <p className="font-semibold">Brewery Participant</p>
                        <p className="font-bold text-3xl">514</p>
                        <p className="p-1 w-max bg-red-200 text-red-600 rounded-full flex gap-2 items-center"><AiOutlineStock /> 12.08%</p>
                    </div>
                    <div className="h-[5rem] w-[5rem] bg-gray-200 p-4 rounded-full">
                        <Image className="w-full h-full object-contain" src={'/images/admin/main/dashboard/drink.svg'} alt="drink" width={100} height={100} />
                    </div>
                </div>
                <div className="flex gap-4 p-4 w-full justify-between items-center border-[0.15rem] rounded-lg">
                    <div className="flex flex-col gap-2">
                        <p className="font-semibold">Riddle Completion</p>
                        <p className="font-bold text-3xl">13.2k</p>
                        <p className="p-1 w-max bg-green-200 text-green-600 rounded-full flex gap-2 items-center"><AiOutlineStock /> 12.08%</p>
                    </div>
                    <div className="h-[5rem] w-[5rem] bg-gray-200 p-4 rounded-full">
                        <Image className="w-full h-full object-contain" src={'/images/admin/main/dashboard/drink.svg'} alt="drink" width={100} height={100} />
                    </div>
                </div>
            </div>

            <div className="flex gap-4 sm:flex-nowrap flex-wrap">
                <div className="flex flex-col sm:w-[60%] gap-4">
                    <div className="p-8 border-[0.15rem] rounded-lg">
                        <div className="flex justify-between">
                            <p className="font-bold">User Engagement Over Time</p>
                            <Select
                                size={'md'}
                                variant="bordered"
                                className="w-[10rem] self-start"
                                placeholder="6 Months"
                            >
                                {selections.map((animal: any) => (
                                    <SelectItem key={animal.key}>
                                        {animal.label}
                                    </SelectItem>
                                ))}
                            </Select>
                        </div>
                        <div className="flex gap-4">
                            <Line className="!h-[20rem] !w-full" options={options} data={{
                                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
                                datasets: [{
                                    label: 'My First Dataset',
                                    data: [65, 59, 80, 81, 56, 55, 40],
                                    fill: false,
                                    borderColor: '#FF3B3B',
                                    tension: 0.1
                                }]
                            }} />
                        </div>
                    </div>

                    <div className="p-8 border-[0.15rem] rounded-lg">
                        <div className="flex justify-between">
                            <p className="font-bold">Riddle Completions</p>
                            <Select
                                size={'md'}
                                variant="bordered"
                                className="w-[10rem] self-start"
                                placeholder="6 Months"
                            >
                                {selections.map((animal: any) => (
                                    <SelectItem key={animal.key}>
                                        {animal.label}
                                    </SelectItem>
                                ))}
                            </Select>
                        </div>
                        <div className="flex gap-4">
                            <Bar className="!h-[20rem] !w-full" options={options} data={{
                                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
                                datasets: [{
                                    label: 'My First Dataset',
                                    data: [65, 59, 80, 81, 56, 55, 40],
                                    backgroundColor: [
                                        'rgba(255, 99, 132)',
                                        'rgba(255, 159, 64)',
                                        'rgba(255, 205, 86)',
                                        'rgba(75, 192, 192)',
                                        'rgba(54, 162, 235)',
                                        'rgba(153, 102, 255)',
                                        'rgba(201, 203, 207)'
                                    ],
                                    borderColor: [
                                        'rgb(255, 99, 132)',
                                        'rgb(255, 159, 64)',
                                        'rgb(255, 205, 86)',
                                        'rgb(75, 192, 192)',
                                        'rgb(54, 162, 235)',
                                        'rgb(153, 102, 255)',
                                        'rgb(201, 203, 207)'
                                    ],
                                    borderWidth: 1
                                }]
                            }}/>
                            
                        </div>
                    </div>
                </div>
                <div className="flex sm:w-[40%] w-full flex-col gap-8 p-8 border-[0.15rem] rounded-lg">
                    <p className="font-bold">Brewery Status</p>
                    <PolarArea options={options} data={{
                        labels: [
                            'Red',
                            'Green',
                            'Yellow',
                            'Grey',
                            'Blue'
                        ],
                        datasets: [{
                            label: 'My First Dataset',
                            data: [11, 16, 7, 3, 14],
                            backgroundColor: [
                                'rgb(255, 99, 132)',
                                'rgb(75, 192, 192)',
                                'rgb(255, 205, 86)',
                                'rgb(201, 203, 207)',
                                'rgb(54, 162, 235)'
                            ]
                        }]
                    }} />
                </div>
            </div>
        </>
    )
}