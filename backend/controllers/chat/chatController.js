const {mongo:{ObjectId}} = require('mongoose')
const sellerModel = require('../../models/sellerModel');
const customerModel = require('../../models/customerModel');
const sellerCustomerModel = require('../../models/chat/sellerCustomerModel');
const sellerCustomerMessage = require('../../models/chat/sellerCustomerMessage');
const { responseReture } = require('../../utiles/response');


class chatController{
    
    add_customer_friend = async (req, res) => {
        const { sellerId, userId } = req.body;
    
        try {
            if (sellerId !== '') {
                const seller = await sellerModel.findById(sellerId);
                const user = await customerModel.findById(userId);
    
                // Ensure seller-customer models exist
                await sellerCustomerModel.updateOne(
                    { myId: userId },
                    { $setOnInsert: { myId: userId, myFriends: [] } },
                    { upsert: true }
                );
    
                await sellerCustomerModel.updateOne(
                    { myId: sellerId },
                    { $setOnInsert: { myId: sellerId, myFriends: [] } },
                    { upsert: true }
                );
    
                const checkSeller = await sellerCustomerModel.findOne({
                    $and: [
                        { myId: { $eq: userId } },
                        { myFriends: { $elemMatch: { fdId: sellerId } } },
                    ],
                });
    
                if (!checkSeller) {
                    await sellerCustomerModel.updateOne(
                        { myId: userId },
                        {
                            $push: {
                                myFriends: {
                                    fdId: sellerId,
                                    name: seller.shopInfo?.shopName,
                                    image: seller.image,
                                },
                            },
                        }
                    );
                }
    
                const checkCustomer = await sellerCustomerModel.findOne({
                    $and: [
                        { myId: { $eq: sellerId } },
                        { myFriends: { $elemMatch: { fdId: userId } } },
                    ],
                });
    
                if (!checkCustomer) {
                    await sellerCustomerModel.updateOne(
                        { myId: sellerId },
                        {
                            $addToSet: {
                                myFriends: {
                                    fdId: userId,
                                    name: user.name,
                                    image: '',
                                },
                            },
                        }
                    );
                }
    
                const messages = await sellerCustomerMessage.find({
                    $or: [
                        { $and: [{ receverId: { $eq: sellerId } }, { senderId: { $eq: userId } }] },
                        { $and: [{ receverId: { $eq: userId } }, { senderId: { $eq: sellerId } }] },
                    ],
                });
    
                const MyFriends = await sellerCustomerModel.findOne({ myId: userId }) || { myFriends: [] };
                const currentFd = MyFriends.myFriends.find((s) => s.fdId === sellerId);
    
                responseReture(res, 200, {
                    MyFriends: MyFriends.myFriends,
                    currentFd,
                    messages,
                });
            } else {
                const MyFriends = await sellerCustomerModel.findOne({ myId: userId }) || { myFriends: [] };
                responseReture(res, 200, {
                    MyFriends: MyFriends.myFriends,
                });
            }
        } catch (error) {
            console.error(error);
            responseReture(res, 500, { error: 'An error occurred' });
        }
    };

    customer_message_add = async(req,res) => {
        const {userId, text, sellerId,name} = req.body

        try{
            const message = await sellerCustomerMessage.create({
                senderId: userId,
                senderName: name,
                receverId: sellerId,
                message: text
            })

            const data = await sellerCustomerModel.findOne({
                myId: userId,
            })
            let myFriends = data.myFriends
            let index = myFriends.findIndex(f => f.fdId === sellerId)

            while(index > 0){
                let temp = myFriends[index] 
                myFriends[index] = myFriends[index - 1]
                myFriends[index - 1] = temp
                index--
            }

            await sellerCustomerModel.updateOne(
            {
                myId: userId
            },
            {
                myFriends
            }
        )



        const data1 = await sellerCustomerModel.findOne({
            myId: sellerId,
        })
        let myFriends1 = data1.myFriends
        let index1 = myFriends1.findIndex(f => f.fdId === userId)

        while(index1 > 0){
            let temp1 = myFriends[index1] 
            myFriends[index1] = myFriends[index1 - 1]
            myFriends[index1 - 1] = temp1
            index1--
        }

        await sellerCustomerModel.updateOne(
        {
            myId: sellerId
        },
        {
            myFriends1
        }
    )

    responseReture(res, 200, {message})


        }catch(error){
            console.log(error.message)
        }

    }
    

}

module.exports = new chatController()