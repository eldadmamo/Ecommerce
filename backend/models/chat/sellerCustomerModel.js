const {Schema, model} = require("mongoose")


const sellerCustomerSchema = new Schema({
    myId:{
        type: String,
        required: true
    },
    myFriends:{
        type: Array,
        default: []
    }
},{timeseries: true})

module.exports = new model("seller_customers", sellerCustomerSchema)