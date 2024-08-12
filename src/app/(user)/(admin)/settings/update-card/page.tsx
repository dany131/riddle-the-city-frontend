'use client'
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useQuery } from 'react-query';
import axiosInstance from '@/app/utils/axiosInstance';
import Payment from '@/components/user/layout/Payment';
const stripePromise = loadStripe('pk_test_51PkygCIZASCLbug8qI63eXXhDkNWGwho4ADU1RSxysg8EaLREa361nBHfusl1pYcUXO28xlO2lsMpyhHjxmibjQ100UEAxoxng');
export default function UpdateCard() {
    const clientSecretQuery = useQuery(['clientSecret'], () => axiosInstance.put('/riddle/api/payment/card'))
    return (
        <>
            <div className="flex flex-col border-1 rounded-lg gap-4 p-4">
                <p className="font-semibold">Update Card Info</p>
                {clientSecretQuery.data?.data && 
                    <Elements stripe={stripePromise} options={{
                        clientSecret: clientSecretQuery.data.data.data.clientSecret
                    }}>
                        <Payment/>
                        </Elements>
                    
                }
            </div>
        </>
    )
}