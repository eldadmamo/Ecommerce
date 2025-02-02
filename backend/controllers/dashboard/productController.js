const formidable = require("formidable")
const {responseReture} = require("../../utiles/response");
const cloudinary = require('cloudinary').v2;
const productModel = require('../../models/productModel')


class productController{
    add_product = async (req,res) => {
        const {id} = req;
        const form = formidable({multiples: true})

        form.parse(req,async(err,field,files) => {
            let {name,category,description,stock,price,discount,shopName,brand} = field;
            let {images} = files;
            name = name.trim()
            const slug = name.split(' ').join('-')
             
            cloudinary.config({
                cloud_name: process.env.cloud_name,
                api_key: process.env.api_key,
                api_secret: process.env.api_secret,
                secure: true
            })

            try{
                let allImageUrl = [];

                if(!Array.isArray(images)){
                    images = [images];
                }

                for(let i=0; i < images.length; i++){
                    const result = await cloudinary.uploader.upload(images[i]
                    .filepath,{ folder: 'products' });
                    allImageUrl.push(result.url);
                }

                await productModel.create({
                    sellerId: id,
                    name,
                    slug,
                    shopName,
                    category: category.trim(),
                    description: description.trim(),
                    stock: parseInt(stock),
                    price: parseInt(price),
                    discount: parseInt(discount),
                    images: allImageUrl,
                    brand: brand.trim()
                })
                responseReture(res,201,{message: 'Product added Successfully'})
            } catch(error){
                responseReture(res,500,{error: error.message})
            }

        }) 
    }
    products_get = async (req,res) => {
        const {page,searchValue,parPage} = req.query;
        const {id} = req;

        const skipPage = parseInt(parPage) * (parseInt(page) - 1)

        try{
            if(searchValue){
            const products = await productModel.find({
                $text: {$search: searchValue},
                sellerId: id
                }).skip(skipPage).limit(parPage).sort({createdAt: -1})
            const totalProduct = await productModel.find({
                $text: {$search: searchValue},
                sellerId: id
                }).countDocuments()
                responseReture(res,200,{products,totalProduct})
            } else {
                const products = await productModel.find({sellerId: id}).skip(skipPage)
                    .limit(parPage).sort({createdAt: -1})
                const totalProduct = await productModel.find({sellerId: id}).countDocuments()
                    responseReture(res,200,{products,totalProduct})
            }
        }catch(error){
            console.log(error.message)
        }
    }

    product_get = async(req,res) => {
        const {productId} = req.params; 
        try{
            const product = await productModel.findById(productId)
            responseReture(res, 200,{product})
        } catch(error){
            console.log(error.message)
        }
    }

    product_update = async (req,res) => {
        let {name,description,stock,price,discount,brand,productId} = req.body;
        name = name.trim()
        const slug = name.split(' ').join('-')

        try{
            await productModel.findByIdAndUpdate(productId,{
                name,description,stock,price,discount,brand,productId,slug
            })
            const product = await productModel.findById(productId)
            responseReture(res,200,{product, message:"Product Updated Successfully"})
        } catch(error){
            responseReture(res,500,{error:error.message})
        }
    }

    product_image_update = async(req,res) => {
        const form = formidable({multiple: true})

        form.parse(req, async (err,field,files) => {
            const {oldImage,productId} = field;
            const {newImage} = files;

            if(err){
                responseReture(res,400,{error: error.message})
            } else {
                try{
                    cloudinary.config({
                        cloud_name: process.env.cloud_name,
                        api_key: process.env.api_key,
                        api_secret: process.env.api_secret,
                        secure: true
                    })

                    const result = await cloudinary.uploader.upload(
                        newImage.filepath,{folder: 'products'})

                    if(result) {
                        let {images} = await productModel.findById(productId)
                        const index = images.findIndex(img => img === oldImage)
                        images[index] = result.url;
                        await productModel.findByIdAndUpdate(productId,{images})

                        const product = await productModel.findById(productId)
                        responseReture(res,200,{product, message: 'Image Uploaded Successfully'})

                    } else {
                        responseReture(res,404,{error: error.message})
                    }
                } catch(error){

                }
            }
        })
    }
     
}

module.exports = new productController()