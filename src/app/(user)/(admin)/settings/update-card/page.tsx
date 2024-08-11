'use client'
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
const stripePromise = loadStripe('pk_test_51PkygCIZASCLbug8qI63eXXhDkNWGwho4ADU1RSxysg8EaLREa361nBHfusl1pYcUXO28xlO2lsMpyhHjxmibjQ100UEAxoxng');
export default function UpdateCard() {
    return (
        <>
            <div className="flex flex-col border-1 rounded-lg gap-4 p-4">
                <p className="font-semibold">Update Card Info</p>
                {/* <Elements stripe={stripePromise} options={{
                    clientSecret
                }}>
                    <PaymentElement />
                </Elements> */}
            </div>
        </>
    )
}