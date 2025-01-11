const formidable = require("formidable")
const { responseReture } = require("../../utiles/response")
const cloudinary = require('cloudinary').v2
const sellerModel = require('../../models/sellerModel')
const categoryModel = require("../../models/categoryModel")

class sellerController {

    request_seller_get = async (req, res) => {
        const {page,searchValue, parPage} = req.query 
        const skipPage = parseInt(parPage) * (parseInt(page) - 1)

        try {
            if (searchValue) {
                
            } else {
                const sellers = await sellerModel.find({ status:  'pending'}).skip(skipPage).limit(parPage).sort({ createdAt: -1})
                const totalSeller = await sellerModel.find({ status: 'pending' }).countDocuments()
                responseReture(res, 200,{ sellers,totalSeller })
            }
        } catch (error) {
            responseReture(res, 500,{ error: error.message }) 
        }
    }

    get_seller = async (req,res) => {
        const {sellerId} = req.params;
        try{
            const seller = await sellerModel.findById(sellerId)
            responseReture(res,200, {seller})
        } catch(e){
            responseReture(res, 500, {error: error.message})
        }
    }

    seller_status_update = async (req,res) => {
        const {sellerId,status} = req.body;
        try{
            await sellerModel.findByIdAndUpdate(sellerId,{status})
            const seller = await sellerModel.findById(sellerId)
            responseReture(res,200, {seller, message:'Seller Status Updated Successfully'})
        } catch(e){
            responseReture(res, 500, {error: error.message})
        }
    }

}


module.exports = new sellerController()