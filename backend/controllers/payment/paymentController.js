const stripeModel = require('../../models/stripeModel')
const sellerModel = require('../../models/sellerModel')
const {v4: uuidv4} = require('uuid')
const { responseReture } = require('../../utiles/response')
const stripe = require('stripe')('sk_test_51Q15zpL1p85UlzvMzG44kIhk6sxgdMW3imEkAfas3697zmNtwhyNPmkvil1vBtjN08YGWSLliy1jH5ADV3AKXujT00Z9LrqrU3');
const {mongo:{ObjectId}} = require('mongoose')
const sellerWallet = require('../../models/sellerWallet')
const withdrawRequest = require('../../models/withdrawRequest')

class paymentController{

    create_stripe_connect_account = async (req,res) =>{
        const {id} = req
        const uid = uuidv4()

        try {
            const stripeInfo = await stripeModel.findOne({ sellerId: id })
            if (stripeInfo) {
                await stripeModel.deleteOne({ sellerId: id })
                const account = await stripe.accounts.create({ type: 'express' })

                const accountLink = await stripe.accountLinks.create({
                    account: account.id,
                    refresh_url: 'http://localhost:5174/refresh',
                    return_url: `http://localhost:5174/success?activeCode=${uid}`,
                    type: 'account_onboarding'
                })
                await stripeModel.create({
                    sellerId: id,
                    stripeId: account.id,
                    code: uid
                })
                responseReture(res,201,{url: accountLink.url})
            }else{
                const account = await stripe.accounts.create({ type: 'express' })

                const accountLink = await stripe.accountLinks.create({
                    account: account.id,
                    refresh_url: 'http://localhost:5174/refresh',
                    return_url: `http://localhost:5174/success?activeCode=${uid}`,
                    type: 'account_onboarding'
                })
                await stripeModel.create({
                    sellerId: id,
                    stripeId: account.id,
                    code: uid
                })
                responseReture(res,201,{url: accountLink.url})
            }
        } catch (error) {
            console.log('stripe connect account error '+error.message)
            responseReture(res, 500, { error: error.message }) // Ajoute un retour d'erreur si nécessaire
        }
    } 

    active_stripe_connect_account = async(req,res) =>{
        const {activeCode} = req.params
        const {id} = req

         try {
            const userStripeInfo = await stripeModel.findOne({code: activeCode})

            if (userStripeInfo) {
                await sellerModel.findByIdAndUpdate(id,{
                    payment: 'active'
                })
                responseReture(res, 200, {message: 'payment Active'})
            } else {
                responseReture(res, 404, {message: 'payment Active Fails'})
            }
         } catch (error) {
            responseReture(res, 500, {message: 'Internal Server Error'})
         }
    }

    sumAmount = (data) => {
        let sum = 0;
        for(let i=0; i < data.length; i++){
            sum = sum + data[i].amount;
        }
        return sum
    }

    get_seller_payment_details = async (req,res) => {
        const {sellerId} = req.params
        
        try{
        const payments = await sellerWallet.find({sellerId})

        const pendingWithdraws = await withdrawRequest.find({
           $and: [
             {
               sellerId: {
                 $eq: sellerId
               }
             }, 
             {
             status:{
               $eq: 'pending'
             }
             }
           ]
        })

        const successWithdraws = await withdrawRequest.find({
            $and: [
              {
                sellerId: {
                  $eq: sellerId
                }
              }, 
              {
              status:{
                $eq: 'success'
              }
              }
            ]
         })

         const pendingAmount = this.sumAmount(pendingWithdraws)
         const withdrawAmount = this.sumAmount(successWithdraws)
         const totalAmount = this.sumAmount(payments)

         let availableAmount = 0;

         if(totalAmount > 0){
            availableAmount = totalAmount - (pendingAmount + withdrawAmount)
         }

         responseReture(res, 200, {
            totalAmount,
            pendingAmount,
            withdrawAmount,
            availableAmount,
            pendingWithdraws,
            successWithdraws,
         })

        } catch(error){
        console.log(error.message)
        }
    }
    
    withdrawal_request = async (req,res) => {
        const {amount,sellerId} = req.body

        try{
            const withdrawal = await withdrawRequest.create({
                sellerId,
                amount: parseInt(amount)
            })
            responseReture(res, 200, {withdrawal, message: "Withdrawal Request Send"})
        } catch(error){
            responseReture(res, 500, {message: "Internal Server Error"})
        }

    }

    get_payment_request = async (req,res) => {
        try{
            const withdrawalRequest = await withdrawRequest.find({status: 'pending'})

            responseReture(res, 200, {withdrawalRequest})
        } catch(error){
            console.log(error.message)
            responseReture(res, 500, {message: 'Interval Server Error'})
        }
    }

    payment_request_confirm = async (req, res) => {
        const {paymentId} = req.body;

        try {
            
            const payment = await withdrawRequest.findById(paymentId);
            
            const {stripeId} = await stripeModel.findOne({
                sellerId: new ObjectId(payment.sellerId)
            });
    
            
            const amount = Math.round(payment.amount * 100); 
    
           
            await stripe.transfers.create({
                amount: amount, 
                currency: 'usd',
                destination: stripeId
            });
    
            
            await withdrawRequest.findByIdAndUpdate(paymentId, { status: 'success' });
    
        
            responseReture(res, 200, { payment, message: 'Request Confirm Success' });
        } catch (error) {
            console.log(error);
            responseReture(res, 500, { message: 'Internal Server Error' });
        }
    }

}

module.exports = new paymentController()