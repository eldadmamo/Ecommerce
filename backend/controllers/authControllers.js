const adminModel = require('../models/adminModel');
const { responseReture } = require('../utiles/response');
const bcrypts = require("bcrypt");
const { createToken } = require('../utiles/tokenCreate');
const { response } = require('express');
const { default: api } = require('../../dashboard/src/api/api');
const sellerModel = require('../models/sellerModel');
const sellerCustomerModel = require('../models/chat/sellerCustomerModel');

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
}

module.exports = new authControllers()