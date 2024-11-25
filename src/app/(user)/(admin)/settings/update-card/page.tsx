'use client';
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import {useQuery, useMutation} from 'react-query';
import axiosInstance from '@/app/utils/axiosInstance';
import Payment from '@/components/user/layout/Payment';
import SavedPaymentCard from '@/components/user/layout/SavedPaymentCard';
import {useState} from 'react';
import {Modal, ModalBody, ModalContent, ModalHeader, useDisclosure, Button} from "@nextui-org/react";
import {ImSpinner2} from "react-icons/im";
import Link from 'next/link';


const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY || "");

export default function UpdateCard() {
    const [clientSecret, setClientSecret] = useState(null);
    const {isOpen, onOpen, onClose} = useDisclosure();

    const savedCardQuery = useQuery(['savedCard'], () => axiosInstance.get('/payment/card'));

    const getClientSecret = useMutation(() => axiosInstance.put('/payment/card'), {
        onSuccess: (data) => {
            setClientSecret(data.data.data.clientSecret);
        }
    });

    const confirmUpdateCard = () => {
        getClientSecret.mutate(); // Fetch clientSecret when user confirms update
    };

    console.log(Object.entries(savedCardQuery.data?.data.data).length)

    return (
        <>
            <div className="flex flex-col border rounded-lg gap-4 p-4">
                <p className="font-semibold text-lg md:text-xl">Payment Methods</p>

                {savedCardQuery.isFetching ? (
                    <div className={`flex justify-center items-center h-48`}>
                        <ImSpinner2 className="text-4xl animate-spin"/>
                    </div>
                ) : (
                    <>
                        <div id="card">
                            {savedCardQuery.data?.data?.data && Object.keys(savedCardQuery.data.data.data).length > 0 ? (
                                <SavedPaymentCard card={savedCardQuery.data.data.data}/>
                            ) : (
                                <p className="text-center">No saved payment method found.</p>
                            )}
                        </div>

                        <div className="flex gap-4 flex-wrap sm:justify-start justify-center">
                            <button
                                type="button"
                                onClick={onOpen}
                                className="px-16 py-2 bg-[#A92223] rounded text-white">
                                Update Card
                            </button>

                            {Object.entries(savedCardQuery.data?.data.data).length >0 &&  <Link
                            href={'/packages'}
                                className="px-16 py-2 bg-[#A92223] rounded text-white">
                                Buy A Package
                            </Link> }
                        </div>
                    </>
                )}

                <Modal
                    size="xl"
                    isOpen={isOpen}
                    backdrop="blur"
                    onClose={onClose}
                    placement="center"
                >
                    <ModalContent>
                        <ModalHeader className="flex flex-col text-xl gap-1">Update Your Card</ModalHeader>
                        <ModalBody className="flex flex-col gap-4 pb-8">
                            {clientSecret ? (
                                <Elements stripe={stripePromise} options={{clientSecret}}>
                                    <Payment/>
                                </Elements>
                            ) : (
                                <><p className="text-sm text-gray-500">
                                    Are you sure you want yo update your card ?
                                </p><Button
                                    onPress={confirmUpdateCard}
                                    className="px-16 py-2 bg-[#A92223] flex rounded text-white w-max">
                                    Confirm Update
                                </Button></>

                            )}
                        </ModalBody>
                    </ModalContent>
                </Modal>
            </div>
        </>
    );
}