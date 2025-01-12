const cardModel = require("../../models/cardModel");
const { responseReture } = require("../../utiles/response");



class cardController {

    add_to_card = async(req,res) => {
        const {userId,productId,quantity} = req.body;
        try{
            const product = await cardModel.findOne({
            $and:[
                {
                    productId:{
                        $eq: productId
                    }
                },
                {
                    userId:{
                        $eq: userId
                    }
                }
            ]
            })

            if (product) {
                responseReture(res,404,{error: "Product Already Added to Cart"})
            } else {
                const product = await cardModel.create({
                    userId,
                    productId,
                    quantity
                })
                responseReture(res,201,{message: "Added to Card Successfully",product})
            }

        } catch(error){
            console.log(error.message)
        }
    }
}

module.exports = new cardController(); 