import React from 'react';
import {loadStripe} from '@stripe/stripe-js'
import {Elements} from '@stripe/react-stripe-js'
import axios from 'axios'
const stripePromise = loadStripe('')


const Stripe = ({orderId, price}) => {
    return (
        <div>
            stripe Page
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