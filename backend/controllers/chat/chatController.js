const {mongo:{ObjectId}} = require('mongoose')
const sellerModel = require('../../models/sellerModel');
const customerModel = require('../../models/customerModel');
const sellerCustomerModel = require('../../models/chat/sellerCustomerModel');

class chatController{
    

   add_cutomer_friend = async(req,res) => {
    const {sellerId, userId} = req.body;


    try{
        if(sellerId !== ''){
            const seller = await sellerModel.findById(sellerId)
            const user = await customerModel.findById(userId)
            const checkSeller = await sellerCustomerModel.findOne({
                $and: [
                    {
                        myId: {
                            $eq: userId
                        }
                    },
                    {
                        myFriends: {
                            $elemMatch:{
                                faId: sellerId
                            }
                        }
                    }
                ]
            })
            // console.log(checkSeller)
            if(!checkSeller){
                await sellerCustomerModel.updateOne({
                    myId: userId 
                },
                {
                    $push: {
                        myFriends: {
                            fdId: sellerId,
                            name: seller.shopInfo?.shopName,
                            image: seller.image
                        }
                    }
                }) 
            }

            const checkCustomer = await sellerCustomerModel.findOne({
                $and: [
                    {
                        myId: {
                            $eq: sellerId
                        }
                    },
                    {
                        myFriends: {
                            $elemMatch:{
                                faId: userId
                            }
                        }
                    }
                ]
            })
            // console.log(checkSeller)
            if(!checkCustomer){
                await sellerCustomerModel.updateOne({
                    myId: sellerId 
                },
                {
                    $push: {
                        myFriends: {
                            fdId: userId,
                            name: user.name,
                            image: ""
                        }
                    }
                }) 
            }
            
        }
        

    }catch(error){
        console.log(error.message)
    }

   }

}

module.exports = new chatController()