
const {Schema, model} = require("mongoose")

const withdrawSchema = new Schema({
    sellerId: {
        type: String,
        required: true 
    },
    amount: {
        type: Number,
        required: true 
    },
    status: {
        type: String,
        default: 'pending' 
    }
},{timestamps:true})

module.exports = model("withdrawRequest", withdrawSchema)