import React from 'react';
import {loadStripe} from '@stripe/stripe-js'
import {Elements} from '@stripe/react-stripe-js'
import axios from 'axios'
import { useState } from 'react';
import CheckoutForm from './CheckoutForm';


const stripePromise = loadStripe('pk_test_51Q15zpL1p85UlzvMkpV2XWnY2YoisVOq0btCraIaFUFhTSyNCtwschOYk2TzBij0k1mrqOC0bpfo46GyN5o1uhPQ00qkPZxHAV')


const Stripe = ({orderId, price}) => {
   const [clientSecret, setClientSecret] = useState('')
   const apperance = {
     theme: 'stripe'
   }
   const options = {
    apperance,
    clientSecret
   }

   const create_payment = async () => {
    try{
        const {data} = await axios.post('http://localhost:5000/api/order/create-payment',{price},{withCredentials:true})
        setClientSecret(data.clientSecret)
    }catch(error){
        console.log(error.message.data)
    }
   }

    return (
        <div className='mt-4'>
            {
                clientSecret ? (
                    <Elements options={options} stripe={stripePromise}>
                        <CheckoutForm orderId={orderId} />
                    </Elements>
                ) : <button onClick={create_payment} 
                className='px-10 py-[6px] rounded-sm hover:shadow-green-700/30 hover:shadow-lg bg-green-700 text-white'>
                    start Payment
                </button>
            }
        </div>
    );
};

export default Stripe;


// C:\Users\eldad\PhpstormProjects\Ecommerce full stack\frontend>npm i @stripe/stripe-js --force
// npm warn using --force Recommended protections disabled.

// added 1 package, and audited 412 packages in 4s

// 135 packages are looking for funding
//   run `npm fund` for details

// found 0 vulnerabilities

// C:\Users\eldad\PhpstormProjects\Ecommerce full stack\frontend>npm i @stripe/react-stripe-js

// added 1 package, and audited 413 packages in 3s

// 135 packages are looking for funding
//   run `npm fund` for details

// found 0 vulnerabilities