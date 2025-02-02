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

    update_category = async (req,res) => {
        console.log(req.body)

    }

    update_category = async (req,res) => {
        const form = formidable()
        form.parse(req,async(err,fields,files) => {
            if(err){
                responseReture(res,404,{error:'Something went Wrong'})
            } else {
                let {name} = fields
                let {image} = files
                const {id} = req.params;
                
                name = name.trim()
                const slug = name.split(' ').join('-')

                

                try{
                    let result = null;
                    if(image){
                        cloudinary.config({
                            cloud_name: process.env.cloud_name,
                            api_key : process.env.api_key,
                            api_secret: process.env.api_secret,
                            secure: true 
                        });

                    result = await cloudinary.uploader.upload(image.filepath, 
                        {folder: 'categorys'}
                    )}

                    const updateData = {
                        name,
                        slug, 
                    }

                    if(result){
                        updateData.image = result.url;
                    }
                    
                    const category = await categoryModel.findByIdAndUpdate(id,updateData, {new : true})
                    
                    responseReture(res,200, {category, message: 'Category Updated Successfully'})

                } catch(error){
                    responseReture(res,500,{error:'Internal Server Wrong'})
                }

            }

        })
    }

    deleteCategory = async (req,res) => {
        try{
            const categoryId = req.params.id;
            const deleteCategory = await categoryModel.findByIdAndDelete(categoryId);

            if(!deleteCategory){
                console.log(`category with id ${categoryId} not found`)
                return res.status(404).json({message: 'Category not found'})
            }
            res.status(200).json({message: 'Category deleted Successfully'});

        }catch(error){
            console.log(`Error delete category with id ${categoryId}:`, error);
            res.status(500).json({message: 'Internal Server Error'});
        }
    }

}


module.exports = new categoryControllers()