'use client'
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
export default function UpdateCard() {
    return (
        <>
            <div className="flex flex-col border-1 rounded-lg gap-4 p-4">
                <p className="font-semibold">Update Card Info</p>
                <PaymentElement/>
            </div>
        </>
    )
}