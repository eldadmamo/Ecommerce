const formidable = require("formidable")
const { responseReture } = require("../../utiles/response")
const cloudinary = require('cloudinary').v2
const categoryModel = require('../../models/categoryModel')

class categoryControllers {
    add_category = async (req,res) => {
        const form = formidable()
        form.parse(req,async(err,fields,files) => {
            if(err){
                responseReture(res,404,{error:'Something went Wrong'})
            } else {
                let {name} = fields
                let {image} = files
                name = name.trim()
                const slug = name.split(' ').join('-')

                cloudinary.config({
                    cloud_name: process.env.cloud_name,
                    api_key : process.env.api_key,
                    api_secret: process.env.api_secret,
                    secure: true 
                })

                try{
                    const result = await cloudinary.uploader.upload(image.filepath,{folder: 'categorys'})
                    if(result){
                        const category = await categoryModel.create({ 
                            name,
                            image: result.url,
                            slug,
                        })
                        responseReture(res,201,{category, message:'Category Added Successfully'})

                    } else {
                        responseReture(res,404,{error:'Image Upload went Wrong'})
                    }

                }catch(error){
                    responseReture(res,500,{error:'Internal Server Wrong'})
                }

            }

        })
    }

    get_category = async(req,res) => {
        const {page,searchValue,parPage} = req.query;
        const skipPage = parseInt(parPage) * (parseInt(page) - 1)


        try{
            let skipPage = ''
            if(parPage && page){
                  skipPage = parseInt(parPage) * (parseInt(page) - 1)
            }
            if(searchValue && page && parPage){
                 const categorys = await categoryModel.find({
                    $text: {$search: searchValue}
                 }).skip(skipPage).limit(parPage).sort({createdAt: -1})
                 const totalCategory = await categoryModel.find({
                    $text: {$search: searchValue}
                 }).countDocuments()
                 responseReture(res,200,{categorys,totalCategory})
            } else if(searchValue === '' && page && parPage){
                const categorys = await categoryModel.find({}).skip(skipPage).limit(parPage).sort({createdAt: -1})
                 const totalCategory = await categoryModel.find({}).countDocuments()
                 responseReture(res,200,{categorys,totalCategory})
            }
             else {
                const categorys = await categoryModel.find({}).skip(skipPage)
                .limit(parPage).sort({createdAt: -1})
                const totalCategory = await categoryModel.find({}).countDocuments()
                responseReture(res,200,{categorys,totalCategory})
            }

        } catch(error){
            console.log(error.message)
        }

    }


}


module.exports = new categoryControllers()