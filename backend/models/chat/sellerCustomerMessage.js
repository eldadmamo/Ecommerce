const {Schema, model} = require("mongoose")


const sellerCustomerMsgSchema = new Schema({
    senderName:{
        type: String,
        required: true
    },
    senderId:{
        type: String,
        required: true
    },
    receverId:{
        type: String,
        required: true
    },
    message:{
        type: String,
        required: true
    },
    status:{
        type: String,
        default: 'unseen'
    }
},{timeseries: true})

module.exports = new model("seller_customer_msgs", sellerCustomerMsgSchema)