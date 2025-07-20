import { loadStripe } from '@stripe/stripe-js'
import React from 'react'
import PaymentForm from './PaymentForm'
import { Elements } from '@stripe/react-stripe-js'

const Payment = () => {
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_KEY)

  return (
    <Elements stripe={stripePromise}>
<PaymentForm></PaymentForm>
    </Elements>
  )
}

export default Payment