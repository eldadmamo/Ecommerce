const adminModel = require('../models/adminModel');
const { responseReture } = require('../utiles/response');
const bcrypts = require("bcrypt");
const { createToken } = require('../utiles/tokenCreate');
const { response } = require('express');
const { default: api } = require('../../dashboard/src/api/api');
const sellerModel = require('../models/sellerModel');
const sellerCustomerModel = require('../models/chat/sellerCustomerModel');
const formidable = require('formidable');
const cloudinary = require("cloudinary").v2;

class authControllers{
    
    admin_login = async (req,res) => {
        const {email,password} = req.body;
        try{
            const admin = await adminModel.findOne({email}).select('+password')
            console.log(admin);

            if(admin){
                const match = await bcrypts.compare(password,admin.password);
                // console.log(match)
                if(match){
                    const token = await createToken({
                        id: admin.id,
                        role: admin.role
                    })
                    console.log(token)
                    res.cookie('accessToken', token,{
                        expires: new Date(Date.now() + 7*24*60*60*1000)
                    });
                    responseReture(res,200,{token, message:"Login Success"})
                } else {
                    responseReture(res,404,{error:"Password Wrong"})
                }
            } else {
                responseReture(res,404,{error:"Email not Found"})
            }
        } catch(error){
            responseReture(res,500,{error: error.message})
        }
    }

    seller_register = async(req,res) => {
        const {name,email,password} = req.body

        try{
            const getUser = await sellerModel.findOne({email});
            if(getUser){
                responseReture(res,404,{error:'Email Already Exit'})
            } else {
                const seller = await sellerModel.create({
                    name,
                    email,
                    password: await bcrypts.hash(password,10),
                    method: 'manually',
                    shopInfo:{}
                })
                await sellerCustomerModel.create({
                    myId: seller.id
                })

                const token = await createToken({
                    id: seller.id,
                    role:seller.role
                })

                res.cookie('accessToken',token,{
                    expires: new Date(Date.now() + 7*24*24*60*1000)
                })

                responseReture(res,201,{token, message:'Register Success'})
            }
        }catch(error){
            responseReture(res,500,{token, message:'Internal Server Error'})
        }
    }

    seller_login = async(req,res) => {
        const {email,password} = req.body;
        try{
            const seller = await sellerModel.findOne({email}).select('+password');
            if(seller){
                const match = await bcrypts.compare(password,seller.password);

                if(match){
                    const token = await createToken({
                        id: seller.id,
                        role: seller.role 
                    })
                    console.log(token);
                    res.cookie('accessToken', token, {
                        expires: new Date(Date.now() + 7*24*24*60*1000)
                    })
                    responseReture(res,200,{token, message:"Login Success"})
                } else {
                    responseReture(res,404,{error:"Password Wrong"})
                }
            } else {
                responseReture(res,404,{error:"Email not Found"})
            }
        }catch(error){
            responseReture(res,500,{error: error.message})
        }
    }

    getUser = async (req,res) => {
        const {id,role} = req;

        try{
            if(role === 'admin'){
                const user = await adminModel.findById(id)
                responseReture(res,200, {userInfo: user}) 
            } else {
                const seller = await sellerModel.findById(id);
                responseReture(res,200,{userInfo: seller});
            }
        } catch(error){
            responseReture(res,500,{error: error.message})
        }
    }

    profile_image_upload = async(req, res) => {
        const {id} = req
        const form = formidable({ multiples: true })
        form.parse(req, async(err,_,files) => {
                cloudinary.config({
                cloud_name: process.env.cloud_name,
                api_key: process.env.api_key,
                api_secret: process.env.api_secret,
                secure: true
            })
            const { image } = files

            try {
                const result = await cloudinary.uploader.upload(image.filepath, { folder: 'profile'})
                if (result) {
                    await sellerModel.findByIdAndUpdate(id, {
                        image: result.url
                    }) 
                    const userInfo = await sellerModel.findById(id)
                    responseReture(res, 201,{ message : 'Profile Image Upload Successfully',userInfo})
                } else {
                    responseReture(res, 404,{ error : 'Image Upload Failed'})
                }
                
            } catch (error) {
                responseReture(res, 500,{ error : error.message })
            }
 

        })
    }

    profile_info_add = async (req,res) => {
        const {division,district,shopName,sub_district} = req.body;
        const {id} = req;

        try{
            await sellerModel.findByIdAndUpdate(id,{
                shopInfo:{
                    shopName,
                    division,
                    district ,
                    sub_district
                }
            })

            const userInfo = await sellerModel.findById(id)
            responseReture(res,201,{message: 'Profile info Add Successfully', userInfo})

        } catch(error){
            responseReture(res, 500,{error: error.message})
        }

    }

    logout = async (req,res) => {
        try{
            res.cookie('accessToken', null, {
                expires: new Date(Date.now()),
                httpOnly: true
            })
            responseReture(res, 200, {message: 'logout Success'})
        }catch(error){
            responseReture(res,200,{error: error.message})
        }
    }

}

module.exports = new authControllers()